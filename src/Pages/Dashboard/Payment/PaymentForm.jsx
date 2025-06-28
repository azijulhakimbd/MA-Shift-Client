import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error,setError]=useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if(error){
        setError(error.message)
        
    } else{
        setError('')
        console.log(paymentMethod);
        
    }
  };
  return (
    <div>
         <form
      onSubmit={handleSubmit}
      className="max-w-md w-full mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-xl font-semibold text-center text-gray-700">
        Pay For Parcel Pickup
      </h2>

      <div className="border border-gray-300 p-4 rounded-md">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#32325d',
                '::placeholder': { color: '#a0aec0' },
              },
              invalid: { color: '#e53e3e' },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 disabled:bg-gray-400 transition duration-300"
      >
        Pay For Parcel Pickup
      </button>
      {
        error && <p className="text-red-500">{error}</p>
      }
    </form>
    </div>
  );
};

export default PaymentForm;
