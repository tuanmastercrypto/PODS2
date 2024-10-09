//@ts-nocheck
import React from "react";
import { FUNDING, PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: any) => void;
  onError: (error: any) => void; // Add an error callback prop
}

const PayPalButton = ({ amount, onSuccess, onError }: PayPalButtonProps) => {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        
        currency: 'USD',
      
      }}
    >
      <PayPalButtons
        fundingSource={FUNDING.PAYPAL}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details); // Call onSuccess callback on approval
          });
        }}
        onError={(err) => {
          console.error("PayPal Checkout error", err);
          onError(err); // Trigger the onError callback
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
