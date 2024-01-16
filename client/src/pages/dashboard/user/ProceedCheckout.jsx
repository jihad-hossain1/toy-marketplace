import React, { useState } from "react";
import PaymentForm from "./PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const ProceedCheckout = ({ total }) => {
  const [toggle, setToggle] = useState(false);

  const handlePayment = () => {
    //
  };
  return (
    <>
      <button
        onClick={() => setToggle(!toggle)}
        className="uppercase py-2 px-4 rounded bg-pink-400 text-white w-full hover:bg-pink-500/95 "
      >
        proceed to checkout
      </button>

      {toggle && (
        <Elements stripe={stripePromise}>
          <PaymentForm total={total} />
        </Elements>
      )}
      {/* <Elements stripe={stripePromise}>
      </Elements> */}
      {/* <PaymentForm total={total} /> */}
    </>
  );
};

export default ProceedCheckout;
