'use client';

import { signIn } from 'next-auth/react';
import loginButton from '@/components/login-btn';

export default function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn('google')}>
        Sign in with Google
      </button>
    </div>
  );
}