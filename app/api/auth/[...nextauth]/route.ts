import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { pb, authenticatePocketBase } from '@/src/lib/pb';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID! ?? "",
      clientSecret: process.env.GOOGLE_SECRET! ?? "",
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const email = user.email;

        await authenticatePocketBase();

        try { //check if user exists
          const existingUser = await pb.collection("users").getFirstListItem(`email="${email}"`);
          token.role = existingUser.role || "user";
        } catch (err) { //user doesn't exist
          console.log("Creating user in PocketBase:", {
            email: user.email,
            name: user.name,
            role: "user",
            error: err
          });

          const newUser = await pb.collection("users").create({
            email: user.email,
            name: user.name,
            role: "user",
            password: "password123",
            passwordConfirm: "password123",
          });
        }
      }
      return token
    },
    async session({ session, token }) {
      console.log("Signing in user:", session.user.email);
      if (token.role) {
        session.user.role = token.role;
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };