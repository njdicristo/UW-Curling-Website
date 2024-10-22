import NextAuth from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile){
        return {
          ...profile,
          role: profile.role ?? "member",
          id: profile.at_hash,
          email: profile.email,
          image: profile.picture,
          name: profile.name,
        }
      },
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if(user) {
        token.role = user.role
      }
      return token
    },
    async session({session, token}){
      
      if(session?.user){
        session.user.role = token.role
      }  
      return session 
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };