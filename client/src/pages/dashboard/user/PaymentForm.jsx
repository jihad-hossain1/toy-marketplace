import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import toast from "react-hot-toast";
// const clientSecret = import.meta.env.VITE_STRIPE_KEY;
import { Alert, Button } from "@material-tailwind/react";
import { LuCheckCheck } from "react-icons/lu";
import { useGetSingleUserCartQuery } from "../../../redux/features/api/userApi";
import { useSelector } from "react-redux";

const PaymentForm = ({ total }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const userId = user?._id;
  const {
    data: cartsItem,
    isLoading,
    isError,
    error,
  } = useGetSingleUserCartQuery(userId) || {};

  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentInfo, setPaymentInfo] = useState({});

  if (isError) {
    return <div>{error?.message}</div>;
  }
  useEffect(() => {
    if (total) {
      axios
        .post(
          `${import.meta.env.VITE_BASE_URL}/api/users/create-payment-intent`,
          {
            total,
            cartsItem,
            userId,
          }
        )
        .then((res) => {
          //   console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
    if (paymentInfo.status == "succeeded") {
      // axios.post(
      //   `${import.meta.env.VITE_BASE_URL}/api/users/create-payment-intent`,
      //   {
      //     transactionId: paymentInfo?.id,
      //   }
      // );
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
            name: user?.fullname,
            email: user?.email,
          },
        },
      });
    if (confirmError) {
      // console.log("[error]", confirmError);
      setCardError(confirmError.message);
    } else {
      // console.log("[paymentIntent]", paymentIntent);

      if (paymentIntent.status === "succeeded") {
        setPaymentInfo(paymentIntent);
        console.log("succeeded");
        const paymentInfo = {
          transactionId: paymentIntent.id,
          date: new Date(),
        };
        // toast.success(`your transaction id:  ${paymentInfo.transactionId}`);
      }
    }
  };
  // console.log(paymentInfo);
  return (
    <>
      {paymentInfo?.status == "succeeded" ? (
        <div className="mt-4">
          <Alert
            variant="ghost"
            open={paymentInfo?.status == "succeeded"}
            // onClose={() => setOpen(false)}
            animate={{
              mount: { y: 0 },
              unmount: { y: 100 },
            }}
          >
            <div className="text-sm flex flex-col gap-2">
              <h4 className="flex items-center gap-1">
                <LuCheckCheck className="text-green-600" size={22} /> Payment
                Successfull,
              </h4>
              <h4>TR_ID: {paymentInfo?.id}</h4>
            </div>
          </Alert>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 lg:mt-7">
          <div className="flex justify-between items-center">
            <h4 className="my-2">Payment Getway</h4>
            <h4 className="my-2">Give Card Info</h4>
          </div>
          <div className="border p-2 rounded">
            <CardElement />
          </div>
          <button
            type="submit"
            disabled={!stripe}
            className="bg-green-500 text-white w-full py-2 rounded mt-6 shadow-sm hover:bg-green-600/95"
          >
            Pay
          </button>
          {cardError && <div>{cardError}</div>}
        </form>
      )}
    </>
  );
};

export default PaymentForm;
