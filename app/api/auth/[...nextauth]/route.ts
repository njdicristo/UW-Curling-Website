import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.POCKETBASE_URL);

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

        try { //check if user exists
          const existingUser = await pb.collection("users").getFirstListItem(`email="${email}"`);
          token.role = existingUser?.role || "user";
        } catch (err) { //user doesn't exist
          console.log("Creating user in PocketBase:", {
            email: user.email,
            name: user.name,
            role: "user",
          });
          
          try {
            const newUser = await pb.collection('users').create({
              username: "user",
              password: "abc1234567",
              passwordConfirm: "abc1234567",
              email: user.email,
              name: user.name,
              role: "user",
            });
            //   const newUser = await fetch(process.env.POCKETBASE_URL + "/api/collections/users/records", {
            //     method: "POST",
            //     headers: {
            //       "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({
            //       username: "user",
            //       email: user.email,
            //       password: "abc123",
            //       passwordConfirm: "abc123",
            //       name: user.name,
            //       role: "user",
            //     }),
            //   });
            //   token.role = "user";
          } catch (err) {
            console.error("Failed to create user in PocketBase:", err);
          }
        }
      }
      return token
    },
    async session({ session, token }) {

      if (session?.user) {
        session.user.role = token.role
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };