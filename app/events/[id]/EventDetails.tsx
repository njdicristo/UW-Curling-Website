'use client';

import { useSession, signIn } from 'next-auth/react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pocketbase-docker-billowing-pine-9885.fly.dev');

const signUp = async (eventID: string, email: string, username: string) => {
    const response = await fetch(
        `https://pocketbase-docker-billowing-pine-9885.fly.dev/api/collections/events/records/${eventID}`
    );
    const event = await response.json();

    // Check if the event is at capacity
    const { signedup, capacity } = event;
    if (signedup >= capacity) {
        console.log("Event is at full capacity. Cannot sign up.");
        return;
    }

    const userData = event.users || [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (userData.some((user: any) => user.email === email)) {
        console.log("User already signed up for this event.");
        return;
    }

    userData.push({ email, username });

    // Increment the signedup field by 1
    const updatedSignedUpCount = signedup + 1;

    await pb.collection('Events').update(eventID, { users: userData, signedup: updatedSignedUpCount });
    console.log("Signed up successfully!");
};


const signOut = async (eventID: string, email: string) => {
    try {
        // Fetch the event details
        const response = await fetch(
            `https://pocketbase-docker-billowing-pine-9885.fly.dev/api/collections/events/records/${eventID}`
        );
        if (!response.ok) {
            console.error("Failed to fetch event details.");
            return;
        }
        const event = await response.json();

        // Get the current users
        const userData = event.users || [];

        // Check if the user exists
        const updatedUsers = userData.filter((user: { email: string }) => user.email !== email);

        if (updatedUsers.length === userData.length) {
            console.log("User is not signed up for this event.");
            return;
        }

        // Decrement the signedup field by 1
        const updatedSignedUpCount = event.signedup > 0 ? event.signedup - 1 : 0;

        // Update the event in PocketBase with the updated users and signedup count
        await pb.collection('events').update(eventID, { users: updatedUsers, signedup: updatedSignedUpCount });
        console.log("Signed out successfully!");
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EventDetails({ event, eventId }: { event: any; eventId: string }) {
    const { data: session } = useSession();

    return (
        <div>
            <h1>{event.name}</h1>
            <h3>{event.signedup}/{event.capacity} people are currently signed up for this event</h3>
            <div>{event.description}</div>
            {session ? (
                <>
                    <button
                        onClick={() => signUp(eventId, session.user.email, session.user.name)}
                    >
                        Sign up
                    </button>
                    <button
                        onClick={() => signOut(eventId, session.user.email)}
                    >
                        Remove signed in user from database
                    </button>
                </>
            ) : (
                <>
                    Not signed in <br />
                    <button onClick={() => signIn()}>Sign in to continue</button>
                </>
            )}
        </div>
    );
}
