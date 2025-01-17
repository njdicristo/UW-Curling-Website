import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-12-18.acacia',
});

export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response(JSON.stringify({ error: 'Not authenticated' }), { status: 401 });
    }
    if (session.user.role !== 'admin') {
        return new Response(JSON.stringify({ error: 'Access Denied' }), { status: 401 });
    }

    console.log("Creating product...");

    const body = await request.text();
    if (!body) {
        return new Response(JSON.stringify({ error: 'request body is required' }), { status: 400 });
    }
    const { name, description, unit_amount } = JSON.parse(body);
    try {
        const product = await stripe.products.create({
            name,
            description,
        });
        const price = await stripe.prices.create({
            unit_amount,
            currency: 'usd',
            product: product.id,
        });
        return new Response(JSON.stringify({ product, price }), { status: 200 });
    } catch (error) {
        console.error('Error creating event:', error);
        return new Response(JSON.stringify({ error: 'Failed to create event' }), { status: 500 });
    }
}
