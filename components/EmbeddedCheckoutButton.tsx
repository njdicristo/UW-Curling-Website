"use client";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useCallback, useRef, useState } from "react";

interface EmbeddedCheckoutButtonProps {
  eventId: string;
  userEmail: string;
}

export default function EmbeddedCheckoutButton({
  eventId,
  userEmail,
}: EmbeddedCheckoutButtonProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  const [showCheckout, setShowCheckout] = useState(false);
  const modalRef = useRef<HTMLDialogElement>(null);

  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId: "price_1QvUMDPn36nSOr0J1APJP0nf", // replace with actual priceID eventually
        eventId, 
        userEmail,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.client_secret);
  }, [eventId, userEmail]);

  const options = { fetchClientSecret };

  const handleCheckoutClick = () => {
    setShowCheckout(true);
    modalRef.current?.showModal();
  };

  const handleCloseModal = () => {
    setShowCheckout(false);
    modalRef.current?.close();
  };

  return (
    <div id="checkout" className="my-4">
      <button
        className="btn bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        onClick={handleCheckoutClick}
      >
        Open Modal with Embedded Checkout
      </button>
      <dialog ref={modalRef} className="modal backdrop-blur-sm">
        <div className="modal-box w-11/12 max-w-4xl bg-white rounded-lg shadow-xl">
          <h3 className="font-bold text-2xl text-gray-800 mb-4">
            Embedded Checkout
          </h3>
          <div className="py-4">
            {showCheckout && (
              <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            )}
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-300"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}