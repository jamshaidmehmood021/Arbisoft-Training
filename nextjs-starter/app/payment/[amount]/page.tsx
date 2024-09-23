"use client";

import CheckoutPage from "@/app/components/CheckoutPage";
import convertToSubcurrency from "@/app/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment({ params }: { params: { amount: string } }) {
  const { amount } = params;
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const orderData = searchParams.get('orderData');

    if (orderData) {
      setOrder(JSON.parse(decodeURIComponent(orderData)));
    }
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-tr from-blue-500 to-purple-500 p-10">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Secure Checkout</h1>
        <p className="text-lg text-gray-600 mb-4">You are about to pay <span className="font-bold text-blue-500">${amount}</span></p>
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(Number(amount)),
            currency: "usd",
          }}
        >
          <CheckoutPage amount={Number(amount)} order={order} />
        </Elements>
      </div>
    </main>
  );
}
