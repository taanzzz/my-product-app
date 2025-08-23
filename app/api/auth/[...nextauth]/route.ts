import NextAuth, { type AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      
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

          const data = await response.json();

          if (response.ok) {
            
            token.customToken = data.token;
          }
        } catch (error) {
          console.error("Error fetching custom token:", error);
        }
      }
      return token;
    },
    async session({ session, token }) {
      
      if (token.customToken) {
        (session as any).customToken = token.customToken;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };