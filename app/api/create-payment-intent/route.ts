import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const body = await request.text();
    if (!body) {
        return new Response(JSON.stringify({ error: 'request body is required' }), { status: 400 });
    }
    const { amount, eventID } = JSON.parse(body);
  console.log(amount, eventID);
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { eventID },
    });

    //Send the client secret to the frontend

  return new Response(JSON.stringify({
    clientSecret: paymentIntent.client_secret,
}), { status: 200 });
  } catch (err) {
    // console.error('Failed to create payment intent:', err);
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  }
}