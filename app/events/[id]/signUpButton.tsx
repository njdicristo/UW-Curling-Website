// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSession, signIn, signOut } from "next-auth/react"
import React from "react"
import PocketBase from 'pocketbase';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { getEvent } from "./page";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const pb = new PocketBase('http://127.0.0.1:8090');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const signUp = async () => {
  await fetch('http://

export default function signUpButton() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
}}