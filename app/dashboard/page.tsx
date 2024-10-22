'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation"
export default function dashboard() {
    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated(){
        redirect('/api/auth/signin?callbackUrl=/dashboard')
      }
    })
  
    if (status === 'loading') {
      return <p>Loading...</p>;
    }
    if(session?.user.role !== "admin"){
      redirect('/denied')
    }
  
    return (
      <div>
        <h1>Welcome to the dashboard, {session.user?.name}!</h1>
        <p>Email: {session.user?.email}</p>
      </div>
    );
  }