import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100; // accepts USD cents
  const publishableKey = "pk_test_cnSaAToRUsAeYBxZjIyr3QCv00taPpL0pv";

  const onToken = token => {
    console.log(token);
    alert("Payment Successful!");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Fanni Webshop Ltd."
      billingAddress
      shippingAddress
      description={`Your total is $${price}.`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
