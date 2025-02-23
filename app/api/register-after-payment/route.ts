import { pb, authenticatePocketBase } from '@/src/lib/pb';
import { stripe } from '@/src/lib/stripe';

export async function POST(request) {

    const body = await request.text();
    if (!body) {
        return new Response(JSON.stringify({ error: 'Request body is required' }), { status: 400 });
    }

    const { email, eventID, sessionId } = JSON.parse(body);

    // Validate the Stripe Checkout session
    try {
        const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

        // Ensure the payment was successful
        if (stripeSession.payment_status !== 'paid') {
            return new Response(JSON.stringify({ error: 'Payment was not successful' }), { status: 400 });
        }

        // Ensure the email in the session metadata matches the authenticated user
        if (stripeSession.metadata.userEmail !== email) {
            return new Response(JSON.stringify({ error: 'Email mismatch' }), { status: 403 });
        }

        // Ensure the event ID in the session metadata matches the request
        if (stripeSession.metadata.eventId !== eventID) {
            return new Response(JSON.stringify({ error: 'Event ID mismatch' }), { status: 403 });
        }
    } catch (err) {
        console.error('Error validating Stripe session:', err);
        return new Response(JSON.stringify({ error: 'Invalid Stripe session' }), { status: 400 });
    }

    // Proceed with registration logic
    console.log("Regisgering for", email, "on event", eventID);

    await authenticatePocketBase();
    const record = await pb.collection('events').getOne(eventID);
    if (!record) {
        return new Response(JSON.stringify({ error: 'Event not found' }), { status: 404 });
    }

    let { capacity, users } = record;
    users = users || [];
    if (users.includes(email)) {
        console.log("User is already registered");
        return new Response(JSON.stringify({ error: 'User is already registered' }), { status: 400 });
    }

    if (users.length >= capacity) {
        return new Response(JSON.stringify({ error: 'Event is at full capacity' }), { status: 400 });
    }

    console.log("Adding", email, "to registrations");
    await pb.collection('events').update(eventID, { users: [...users, email] });

    const response = {
        message: "User successfully registered",
        isRegistered: true,
    };
    return new Response(JSON.stringify(response), { status: 200 });
}