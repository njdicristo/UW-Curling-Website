import { NextResponse } from "next/server";
import { stripe } from "@/src/lib/stripe";

export async function POST(req){
    try{
        const {priceID}=await(req.json());

        const checkoutSession=await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceID,
                }
            ],
            mode: 'payment',
            return_url: `${req.header.get('origin')}/return?session_id={CHECKOUT_SESSION_ID}`,
        });
        return NextResponse.json({id:checkoutSession.id,client_secret:checkoutSession.client_secret});
    } catch (err){
        console.error(err);
        return NextResponse.json({message:err.message},{status:500});
    }
}