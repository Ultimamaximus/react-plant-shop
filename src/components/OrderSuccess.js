import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div>
      <h2>Thank You For Your Order</h2>
      <p>Your order has been successfully placed and is now being processed. An email confirmation has been sent to your email address.</p>
      <p>Order Number: {/* Insert dynamic order number here */}</p>

      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default OrderSuccess;
