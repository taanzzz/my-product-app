import NextAuth, { type AuthOptions, type Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

// ✅ Backend থেকে আসা রেসপন্সের জন্য একটি টাইপ
interface LoginResponse {
  token: string;
}

// ✅ NextAuth-এর JWT টাইপের সাথে আমাদের কাস্টম টোকেন যোগ করার জন্য
interface CustomJWT extends JWT {
  customToken?: string;
}

// ✅ NextAuth-এর Session টাইপের সাথে আমাদের কাস্টম টোকেন যোগ করার জন্য
interface CustomSession extends Session {
  customToken?: string;
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }): Promise<CustomJWT> {
      // ✅ এখানে token-কে CustomJWT হিসেবে টাইপ করা হয়েছে
      if (account && user) {
        try {
          const response = await fetch('http://localhost:5000/api/users/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
            }),
          });
          
          // ✅ data-কে LoginResponse হিসেবে টাইপ করা হয়েছে
          const data: LoginResponse = await response.json();

          if (response.ok) {
            token.customToken = data.token;
          }
        } catch (error) {
          console.error("Error fetching custom token:", error);
          // Return the original token on error
          return token as CustomJWT;
        }
      }
      return token as CustomJWT;
    },
    async session({ session, token }: { session: Session; token: CustomJWT }): Promise<CustomSession> {
      // ✅ এখানে session এবং token উভয়েরই সঠিক টাইপ দেওয়া হয়েছে
      const sessionWithToken = session as CustomSession;
      if (token.customToken) {
        sessionWithToken.customToken = token.customToken;
      }
      return sessionWithToken;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };