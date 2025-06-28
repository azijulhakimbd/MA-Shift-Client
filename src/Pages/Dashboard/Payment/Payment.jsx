import React from 'react';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';
const stipePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')
const Payment = () => {
    return (
        <Elements stripe={stipePromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;