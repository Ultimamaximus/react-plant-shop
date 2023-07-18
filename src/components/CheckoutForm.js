import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; 
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CheckoutForm = () => {
  const { cart, clearCart, customerInfo } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); 
  
  const functionsInstance = getFunctions();
  const createStripePaymentIntent = httpsCallable(functionsInstance, 'createStripePaymentIntent');
  
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const totalCost = cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setProcessing(true);
    
    const { data: { clientSecret } } = await createStripePaymentIntent({ amount: parseFloat(totalCost) * 100 });
    
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    
    if (result.error) {
      switch (result.error.type) {
        case 'card_error':
          setError('There was a problem with your card. Please check your card details and try again.');
          break;
        case 'api_connection_error':
          setError('There was a problem connecting to the payment service. Please try again.');
          break;
        default:
          setError(result.error.message);
          break;
      }
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setError(null);

        // define order object
        const order = {
          customerInfo,
          items: cart,
          total: parseFloat(totalCost),
        };

        // add order to Firebase
        try {
          await addDoc(collection(db, "orders"), order);
          console.log("Order stored successfully!");
        } catch (e) {
          console.error("Error storing order: ", e);
        }

        clearCart();
        navigate("/order-success"); 
      }
    }
    
    setProcessing(false);
  };
  
  return (
    <div>
      <h2>Checkout</h2>
      <p>Total: ${totalCost}</p>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe || processing}>
          Pay
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
}

export default CheckoutForm;
