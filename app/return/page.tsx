import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import { stripe } from "@/src/lib/stripe";

async function getSession(sessionId: string) {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session;
}

export default async function CheckoutReturn({ searchParams }: { searchParams: { session_id: string } }) {
    const sessionId = searchParams.session_id;
    const session = await getSession(sessionId);

    if (session?.status === "open") {
        return <p>Payment did not work.</p>;
    }

    if (session?.status === "complete") {
        // Extract metadata from the session
        const { eventId, userEmail } = session.metadata;

        // Call the registerAfterPayment API
        console.log("Registering user for event", eventId);
        try {
            const response = await fetch('http://localhost:3000/api/register-after-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',//df
                body: JSON.stringify({
                    email: userEmail,
                    eventID: eventId,
                    sessionId: sessionId,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to register for the event');
            }

            return (
                <>
                    <ResponsiveAppBar />
                    <h3>
                        We appreciate your business! You are now registered for the event.
                    </h3>
                </>
            );
        } catch (err) {
            console.error('Failed to register for the event:', err);
            return (
                <>
                    <ResponsiveAppBar />
                    <p>Payment was successful, but registration failed. Please contact support.</p>
                </>
            );
        }
    }

    return null;
}
