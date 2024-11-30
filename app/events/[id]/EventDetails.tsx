'use client';

import { useSession, signIn } from 'next-auth/react';
import PocketBase from 'pocketbase';
import { useState, useEffect } from 'react';

const pb = new PocketBase('https://pocketbase-docker-billowing-pine-9885.fly.dev');

// Fetch event data
const getEventData = async (eventID: string) => {
    const response = await fetch(
        `https://pocketbase-docker-billowing-pine-9885.fly.dev/api/collections/events/records/${eventID}`
    );
    if (!response.ok) {
        throw new Error('Failed to fetch event data');
    }
    const event = await response.json();
    return {
        users: event.users || [],
        capacity: event.capacity || 0,
    };
};

export default function EventDetails({ event, eventId }: { event: any; eventId: string }) {
    const { data: session } = useSession();
    const [isRegistered, setIsRegistered] = useState(false);
    const [isFull, setIsFull] = useState(false);
    const [loading, setLoading] = useState(true);

    // Fetch event status
    const fetchEventStatus = async () => {
        setLoading(true);
        try {
            const eventData = await getEventData(eventId);

            if (session) {
                const userIsRegistered = eventData.users.some(
                    (user: { email: string }) => user.email === session.user.email
                );
                setIsRegistered(userIsRegistered);
            }

            const eventIsFull = eventData.users.length >= eventData.capacity;
            setIsFull(eventIsFull);
        } catch (error) {
            console.error('Error fetching event status:', error);
        }
        setLoading(false);
    };

    // Handle registration
    const register = async () => {
        try {
            const eventData = await getEventData(eventId);

            if (eventData.users.length >= eventData.capacity) {
                console.log('Event is at full capacity. Cannot sign up.');
                return;
            }

            if (eventData.users.some((user: { email: string }) => user.email === session?.user.email)) {
                console.log('User already signed up for this event.');
                return;
            }

            const updatedUsers = [
                ...eventData.users,
                { email: session?.user.email, username: session?.user.name },
            ];

            await pb.collection('events').update(eventId, { users: updatedUsers });
            console.log('Signed up successfully!');
            fetchEventStatus(); // Refresh state
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    // Handle unregistration
    const unregister = async () => {
        try {
            const eventData = await getEventData(eventId);

            const updatedUsers = eventData.users.filter(
                (user: { email: string }) => user.email !== session?.user.email
            );

            if (updatedUsers.length === eventData.users.length) {
                console.log('User is not signed up for this event.');
                return;
            }

            await pb.collection('events').update(eventId, { users: updatedUsers });
            console.log('Signed out successfully!');
            fetchEventStatus(); // Refresh state
        } catch (error) {
            console.error('Error during unregistration:', error);
        }
    };

    useEffect(() => {
        fetchEventStatus();
    }, [eventId, session]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{event.name}</h1>
            <h3>{event.signedup}/{event.capacity} people are currently signed up for this event</h3>
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
