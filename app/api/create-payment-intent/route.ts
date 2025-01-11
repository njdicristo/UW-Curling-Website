import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { amount } = req.body;
    const eventID = req.body.eventID; 
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        metadata: { eventID },
      });

      //Send the client secret to the frontend
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}