import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
// const clientSecret = import.meta.env.VITE_STRIPE_KEY;

const PaymentForm = ({ total }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (total) {
      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/api/users/create-payment-intent`,
          {
            total,
          }
        )
        .then((res) => {
          //   console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: "jihad",
            email: "jihad@gmail.com",
          },
        },
      });
    if (confirmError) {
      // console.log("[error]", confirmError);
      setCardError(confirmError.message);
    } else {
      // console.log("[paymentIntent]", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("succeeded");
        const paymentInfo = {
          transactionId: paymentIntent.id,
          date: new Date(),
        };
        toast.success(`your transaction id:  ${paymentInfo.transactionId}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {cardError && <div>{cardError}</div>}
    </form>
  );
};

export default PaymentForm;
