'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import LoginButton from '@/components/login-btn';

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div>
        <h1>Welcome to the Home Page</h1>
        <p>You are not signed in.</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome back, {session.user?.name}!</h1>
      <p>Email: {session.user?.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}