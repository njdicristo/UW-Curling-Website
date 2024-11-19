'use client';

import { useSession, signIn } from 'next-auth/react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase-docker-billowing-pine-9885.fly.dev');

const signUp = async (eventID: string, email: string, username: string) => {
    const response = await fetch(
        `https://pocketbase-docker-billowing-pine-9885.fly.dev/api/collections/events/records/${eventID}`
    );
    const event = await response.json();

    const userData = event.users || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (userData.some((user: any) => user.email === email)) {
        console.log("User already signed up for this event.");
        return;
    }

    userData.push({ email, username });

    await pb.collection('Events').update(eventID, { users: userData });
    console.log("Signed up successfully!");
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
