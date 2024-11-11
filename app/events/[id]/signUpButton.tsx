import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"
import PocketBase from 'pocketbase';
import { getEvent } from "./page";

const pb = new PocketBase('http://127.0.0.1:8090');

const signUp = async () => {
  await fetch('http://

export default function signUpButton() {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <button onClick={(signUp)}>Sign up</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}