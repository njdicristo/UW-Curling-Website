'use client';

import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { EmbeddedCheckout } from '@stripe/react-stripe-js';
import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import EmbeddedCheckoutButton from '@/components/EmbeddedCheckoutButton';

async function getEvent(id: string) {
    const record = await fetch(
        `https://pocketbase-docker-billowing-pine-9885.fly.dev/api/collections/events/records/${id}`,
        {
            next: { revalidate: 10 },
        }
    );
    const data = await record.json();
    return data;
}

export default function EventPage({ params }: any) {
    const [event, setEvent] = useState<any>(null);
    const { data: session } = useSession();
    const [isRegistered, setIsRegistered] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const formattedDate = event ? new Date(event.date).toLocaleDateString() : '';

    //gets event data on page load
    useEffect(() => {
        async function fetchEvent() {
            const eventData = await getEvent(params.id);
            setEvent(eventData);
            console.log(eventData);
        }
        fetchEvent();
    }, [params.id]);

    const changeRegistration = async (email: string, eventID: string) => {
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
        <>
            <ResponsiveAppBar />
            <div>
                {event ? (
                    <>
                        <h1>{event.name}</h1>
                        <h3>{formattedDate}</h3>
                        <div>{event.description}</div>

                        {session ? (
                            <>
                                {isRegistered ? (
                                    <>
                                        <div>You are signed up for this event</div>
                                        <button onClick={() => changeRegistration(session.user.email, event.id)}>
                                            Cancel
                                        </button>
                                    </>
                                ) : isFull ? (
                                    <div className="text-red-500">This Event is at full capacity</div>
                                ) : (
                                    <>
                                        {(event.cost != 0) && (
                                            <EmbeddedCheckoutButton
                                                eventId={params.id}
                                                userEmail={session.user.email}
                                            />)

                                        }
                                        <div>{event.users?.length || 0} / {event.capacity || 0} users registered</div>
                                        <div>You are not signed up for this event</div>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                Not signed in <br />
                                <button onClick={() => signIn()}>Sign in to continue</button>
                            </>
                        )}
                    </>
                ) : (
                    <div>Loading event...</div>
                )}
            </div>
        </>
    );
}
