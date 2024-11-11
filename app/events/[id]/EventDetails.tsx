'use client';

import { useSession, signIn } from 'next-auth/react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');

const signUp = async (eventID: string, email: string, username: string) => {
    const response = await fetch(
        `http://127.0.0.1:8090/api/collections/events/records/${eventID}`
    );
    const event = await response.json();

    const userData = event.users || [];
    if (userData.some((user: any) => user.email === email)) {
        console.log("User already signed up for this event.");
        return;
    }

    userData.push({ email, username });

    await pb.collection('Events').update(eventID, { users: userData });
    console.log("Signed up successfully!");
};

export default function EventDetails({ event, eventId }: { event: any; eventId: string }) {
    const { data: session } = useSession();

    return (
        <div>
            <h1>{event.name}</h1>
            <div>{event.description}</div>
            {session ? (
                <button
                    onClick={() => signUp(eventId, session.user.email, session.user.name)}
                >
                    Sign up
                </button>
            ) : (
                <>
                    Not signed in <br />
                    <button onClick={() => signIn()}>Sign in</button>
                </>
            )}
        </div>
    );
}
