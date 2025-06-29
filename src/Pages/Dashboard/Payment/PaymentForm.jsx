import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Spinner from "../../../Components/Spinner/Spinner";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) return <Spinner />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    setIsProcessing(true);

    const { error: methodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (methodError) {
      setError(methodError.message);
      setIsProcessing(false);
      return;
    } else {
      setError("");
    }

    const amountInCents = Math.round((parcelInfo.cost || 0) * 100);

    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
      parcelId,
    });

    const clientSecret = res.data.clientSecret;

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: parcelInfo?.senderName || "Anonymous",
          email: parcelInfo?.created_by || "unknown@example.com",
        },
      },
    });

    if (result.error) {
      console.error(result.error.message);
      setError(result.error.message);
      setIsProcessing(false);
    } else if (result.paymentIntent.status === "succeeded") {
      const paymentInfo = {
        parcelId,
        transactionId: result.paymentIntent.id,
        email: user.email,
        amount: parcelInfo.cost,
      };

      const paymentRes = await axiosSecure.post("/payments", paymentInfo);

      if (paymentRes.data?.paymentId) {
        Swal.fire({
          icon: "success",
          title: "Payment Successful!",
          text: `Tracking ID: ${parcelInfo.trackingId}`,
          confirmButtonColor: "#10b981",
        }).then(() => {
          navigate("/dashboard/my-parcels");
        });
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
      >
        <h2 className="text-lg font-semibold text-center">Pay For Parcel Pickup</h2>

        <div className="border border-gray-300 p-4 rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#32325d",
                  "::placeholder": { color: "#a0aec0" },
                },
                invalid: { color: "#e53e3e" },
              },
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400 transition duration-300"
        >
          {isProcessing ? "Processing..." : `Pay ৳${parcelInfo?.cost || 0}`}
        </button>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
