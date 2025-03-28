import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { pb, authenticatePocketBase } from '@/src/lib/pb';

async function findOrCreateUser(email: string, name: string) {
  await authenticatePocketBase();

  try {
    const existingUser = await pb.collection("users").getFirstListItem(`email="${email}"`);
    return existingUser;
  } catch (err) {
    console.log("Creating user in PocketBase:", { email, name });

    const newUser = await pb.collection("users").create({
      email,
      name,
      role: "user",
      membership: false,
      practices_left: 2,
      password: "Password123", // Generate a random password
      passwordConfirm: "Password123",
    });

    console.log("User created in PocketBase:", newUser);
    return newUser;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const { email, name } = user;
        if (email && name) {
          const existingUser = await findOrCreateUser(email, name);
          token.role = existingUser.role || "user";
        }
      }
      return token;
    },

    async session({ session, token }) {
      console.log("Signing in user:", session?.user?.email || "Unknown User");
      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };