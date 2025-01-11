'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function EventDetails({ event, eventId }) {
    const { data: session } = useSession();
    const [isRegistered, setIsRegistered] = useState(false);
    const [isFull, setIsFull] = useState(event.userCount >= event.capacity);
    const [userCount, setUserCount] = useState(event.userCount);
    const formattedDate = new Date(event.date).toLocaleDateString();

    useEffect(() => {
        // Check if the user is registered
        if (session) {
            // Logic to check if the user is already registered
            // This can be done by fetching the event details and checking if the user is in the list of registered users
        }
    }, [session, eventId]);

    const register = async () => {
        if (!session) return;

        try {
            const response = await fetch('/api/events/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventId,
                    userId: session.user.id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to register for event');
            }

            setIsRegistered(true);
            setUserCount(userCount + 1);
        } catch (err) {
            console.error('Failed to register for event:', err);
        }
    };

    const unregister = async () => {
        if (!session) return;

        try {
            const response = await fetch('/api/events/unregister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    eventId,
                    userId: session.user.id,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to unregister from event');
            }

            setIsRegistered(false);
            setUserCount(userCount - 1);
        } catch (err) {
            console.error('Failed to unregister from event:', err);
        }
    };

    return (
        <div>
            <h1>{event.name}</h1>
            <h3>{formattedDate}</h3>
            <h3>{userCount}/{event.capacity} people are currently signed up for this event</h3>
            <div>{event.description}</div>
            {session ? (
                <>
                    {isRegistered ? (
                        <>
                            <div>You are signed up for this event</div>
                            <button onClick={unregister}>Cancel registration</button>
                        </>
                    ) : isFull ? (
                        <div>Event is at full capacity</div>
                    ) : (
                        <button onClick={register}>Sign up</button>
                    )}
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