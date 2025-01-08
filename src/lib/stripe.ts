import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const balance = await stripe.balance.retrieve();
console.log(balance.available[0].amount);