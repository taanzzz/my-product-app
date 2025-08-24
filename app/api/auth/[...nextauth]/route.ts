import NextAuth, { type AuthOptions, type Session } from "next-auth";
import { type JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

// ✅ Backend-এর লাইভ URL এখন এনভায়রনমেন্ট ভ্যারিয়েবল থেকে আসবে
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface LoginResponse {
  token: string;
}
interface CustomJWT extends JWT {
  customToken?: string;
}
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
      if (account && user) {
        try {
          // ✅✅✅ চূড়ান্ত সমাধান এখানেই ✅✅✅
          // localhost-এর পরিবর্তে লাইভ API URL ব্যবহার করা হচ্ছে
          const response = await fetch(`${API_BASE_URL}/api/users/google-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
            }),
          });
          
          const data: LoginResponse = await response.json();

          if (response.ok) {
            token.customToken = data.token;
          }
        } catch (error) {
          console.error("Error fetching custom token:", error);
          return token as CustomJWT;
        }
      }
      return token as CustomJWT;
    },
    async session({ session, token }: { session: Session; token: CustomJWT }): Promise<CustomSession> {
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