'use client';

import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function EventDetails({ event, eventID }) {
    const { data: session } = useSession();
    const [isRegistered, setIsRegistered] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const formattedDate = new Date(event.date).toLocaleDateString();

    useEffect(() => {
        if (session) {
            const checkRegistration = async () => {
                const res = await fetch(process.env.POCKETBASE_URL +
                    '/api/collections/events/records?page=1&perPage=30',
                    { cache: "no-store" }
                );
                const data = await res.json();
                return data.items as any[];
                if (data.users.includes(session.user.email)) {
                    setIsRegistered(true);
                } else {
                    setIsRegistered(false);
                }
            };
            checkRegistration();
            setIsFull(event.users?.length||0 >= event.capacity);
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

            if (!response.ok) {
                throw new Error('Failed to change registration');
            }

            const data = await response.json();
            setIsRegistered(data.isRegistered);
            setIsFull(event.users.length >= event.capacity);
        } catch (err) {
            console.error('Failed to change registration:', err);
        }
    };

    return (
        <div>
            <h1>{event.name}</h1>
            <h3>{formattedDate}</h3>
            <div>{event.description}</div>
            {session ? (
                <>
                    {(isRegistered ? (
                        <>
                            <div>You are signed up for this event</div>
                            <button onClick={() => changeRegistration(session.user.email, eventID)}>Cancel</button>
                        </>
                    ) : isFull ? (
                        <div className='text-red-500'>This Event is at full capacity</div>
                    ) : (
                        <>
                            <div>{event.users?.length||0} / {event.capacity||0} users registered</div>
                            <div>You are not signed up for this event</div>
                            <button onClick={() => changeRegistration(session.user.email, eventID)}>Sign up</button>
                        </>
                    )
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