'use client';

import ResponsiveAppBar from '@/components/ResponsiveAppBar';
import { useSession, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

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

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    useEffect(() => {
        async function fetchEvent() {
            const eventData = await getEvent(params.id);
            setEvent(eventData);
        }
        fetchEvent();
    }, [params.id]);

    useEffect(() => {
        if (session && event) {
            const checkRegistration = async () => {
                const res = await fetch(process.env.POCKETBASE_URL + '/api/collections/events/records?page=1&perPage=30', {
                    cache: 'no-store',
                });
                const data = await res.json();
                if (data.items.some((item: any) => item.users.includes(session.user.email))) {
                    setIsRegistered(true);
                } else {
                    setIsRegistered(false);
                }
            };
            checkRegistration();
            setIsFull(event.users?.length || 0 >= event.capacity);
        }
    }, [session, event]);

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

    const handlePayment = async (stripe: any, elements: any) => {
        if (!stripe || !elements) {
            return;
        }

        setIsPaymentProcessing(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret || '', {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (error) {
            console.error('Payment failed:', error);
            setIsPaymentProcessing(false);
        } else if (paymentIntent?.status === 'succeeded') {
            setIsPaymentProcessing(false);
            console.log('Payment succeeded');
            await changeRegistration(session.user.email, event.id);
        }
    };

    const startPaymentFlow = async () => {
        if (event && event.cost > 0) {
            const res = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: event.cost * 100, // cost in cents
                    eventID: event.id,
                }),
            });

            const { clientSecret } = await res.json();
            setClientSecret(clientSecret);
        } else {
            await changeRegistration(session.user.email, event.id);
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
                                        {event.cost > 0 && <>Cost: ${event.cost}</>}
                                        <div>{event.users?.length || 0} / {event.capacity || 0} users registered</div>
                                        <div>You are not signed up for this event</div>
                                        <button onClick={startPaymentFlow}>Sign up</button>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                Not signed in <br />
                                <button onClick={() => signIn()}>Sign in to continue</button>
                            </>
                        )}

                        {clientSecret && !isRegistered && !isFull && (
                            <Elements stripe={loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')}>
                                <div>
                                    <CardElement />
                                    <button
                                        onClick={(e) =>
                                            handlePayment(useStripe(), useElements())
                                        }
                                        disabled={isPaymentProcessing}
                                    >
                                        {isPaymentProcessing ? 'Processing...' : 'Pay Now'}
                                    </button>
                                </div>
                            </Elements>
                        )}
                    </>
                ) : (
                    <div>Loading event...</div>
                )}
            </div>
        </>
    );
}
