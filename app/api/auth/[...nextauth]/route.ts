import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextRequest, NextResponse } from 'next/server';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);


export async function GET(req: NextRequest) {
  const response = await handler(req, NextResponse);
  return response;
}

export async function POST(req: NextRequest) {
  // Call the NextAuth handler for the POST request
  const response = await handler(req, NextResponse);
  return response;
}
