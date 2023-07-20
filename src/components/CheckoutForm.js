import React, { useState, useContext } from 'react';
import { CardElement, useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { httpsCallable } from 'firebase/functions';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom'; 
import { collection, addDoc } from 'firebase/firestore';
import { db, functionsInstance } from '../firebase';
import styles from './CheckoutForm.module.css';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#303238',
      fontSize: '16px',
      fontFamily: 'sans-serif',
      fontSmoothing: 'antialiased',
      '::placeholder': {
        color: '#CFD7DF',
      },
    },
    invalid: {
      color: '#e5424d',
      ':focus': {
        color: '#303238',
      },
    },
  },
};

const CheckoutForm = () => {
  const { cart, clearCart, billingInfo, shippingInfo } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); 
  
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
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        const order = {
          billingInfo,
          shippingInfo,
          items: cart,
          total: parseFloat(totalCost),
        };
        await addDoc(collection(db, "orders"), order);
        clearCart();
        navigate("/order-success"); 
      }
    }
    
    setProcessing(false);
  };

  return (
    <div className={styles['checkout-form']}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className={styles['payment-form']}>
      <h3 className={styles['section-title']}>Payment Details</h3>
<div className={styles['payment-details']}>
  <CardNumberElement options={CARD_ELEMENT_OPTIONS} className={styles['card-element']} />
  <CardExpiryElement options={CARD_ELEMENT_OPTIONS} className={styles['card-element']} />
  <CardCvcElement options={CARD_ELEMENT_OPTIONS} className={styles['card-element']} />
  <input type="text" placeholder="Name on Card" required className={styles['input']} />
  <p className={styles['total']}>Total: ${totalCost}</p>
</div>

<h3 className={styles['section-title']}>Billing Details</h3>
        <div className={styles['billing-details']}>
          <input type="text" placeholder="First Name" required className={styles['input']} />
          <input type="text" placeholder="Last Name" required className={styles['input']} />
          <input type="text" placeholder="Address" required className={styles['input']} />
          <input type="text" placeholder="City" required className={styles['input']} />
          <input type="text" placeholder="State" required className={styles['input']} />
          <input type="text" placeholder="ZIP code" required className={styles['input']} />
          <input type="text" placeholder="Phone number" required className={styles['input']} />
        </div>

        <h3 className={styles['section-title']}>Shipping Details</h3>
        <div className={styles['shipping-details']}>
          <input type="text" placeholder="First Name" required className={styles['input']} />
          <input type="text" placeholder="Last Name" required className={styles['input']} />
          <input type="text" placeholder="Address" required className={styles['input']} />
          <input type="text" placeholder="City" required className={styles['input']} />
          <input type="text" placeholder="State" required className={styles['input']} />
          <input type="text" placeholder="ZIP code" required className={styles['input']} />
          <input type="text" placeholder="Phone number" required className={styles['input']} />
        </div>

        <div className={styles['confirm-order']}>
          <p className={styles['total']}>Total: ${totalCost}</p>
          <button type="submit" disabled={!stripe || processing} className={styles['pay-button']}>
            Confirm Order
          </button>
        </div>
        {error && <div className={styles['error']}>{error}</div>}
      </form>
    </div>
  );
}

export default CheckoutForm;
