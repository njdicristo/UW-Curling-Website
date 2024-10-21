'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation"
export default function dashboard() {
    const { data: session, status } = useSession();
  
    if (status === 'loading') {
      return <p>Loading...</p>;
    }
  
    if (!session) {
      return (
        redirect('/api/auth/signin?callbackUrl=/dashboard')
        
      );
    }
  
    return (
      <div>
        <h1>Welcome to the dashboard, {session.user?.name}!</h1>
        <p>Email: {session.user?.email}</p>
      </div>
    );
  }