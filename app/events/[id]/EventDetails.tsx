'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function EventDetails({ event, eventID }) {
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
    }, [session, eventID]);

    const changeRegistration = async (email, eventID) => {
        try {
            const response = await fetch('/api/changeRegistration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    eventID,
                }),
            });
        } catch (err) {
            console.error('Failed to change registration:', err);
        }
    }

    return (
        <div>
            <h1>{event.name + eventID}</h1>
            <h3>{formattedDate}</h3>
            <h3>{userCount}/{event.capacity} people are currently signed up for this event</h3>
            <div>{event.description}</div>
            {session ? (
                <>
                    {isRegistered ? (
                        <>
                            <div>You are signed up for this event</div>
                            <button onClick={()=>changeRegistration(session.user.email,eventID)}>Cancel registration</button>
                        </>
                    ) : isFull ? (
                        <div>Event is at full capacity</div>
                    ) : (
                        <button onClick={()=>changeRegistration(session.user.email,eventID)}>Sign up</button>
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