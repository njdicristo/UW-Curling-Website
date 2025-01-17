
import React from 'react';

const EventPaymentComponent = ({ amount, name, sku }) => {
    let stripe = Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

    async function startCheckout() {
        const {error} = await stripe.redirectToCheckout({
            lineItems: [{sku,quanity:1}],
            mode: 'payment',
            successUrl: 'http://localhost:3000/success',
            cancelUrl: 'http://localhost:3000/canceled',
        });
        if (error) {
            console.warn('Payment error:', error);
        }
    }
    return (
        <>
            <h2>Event Payment</h2>
            <button onClick={startCheckout}></button>
        </>
    );
};

export default EventPaymentComponent;