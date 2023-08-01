import React, { useState, useContext, useRef } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
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
  const { cart, clearCart, storeCustomerInfo } = useContext(CartContext);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); 

  // Declare refs for your input fields
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipCodeRef = useRef();
  
  const createStripePaymentIntent = httpsCallable(functionsInstance, 'createStripePaymentIntent');
  
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [isSameAddress, setIsSameAddress] = useState(true);

  const totalCost = cart.reduce((total, item) => total + Math.round(item.price * item.quantity * 100), 0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    // Get billing info from inputs
    const billingInfo = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      address: addressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      zipCode: zipCodeRef.current.value,
    };

    // Store billing info in context
    storeCustomerInfo(billingInfo);
    
    setProcessing(true);
    
    const { data: { clientSecret } } = await createStripePaymentIntent({ amount: totalCost });
    
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
          customerInfo: billingInfo,
          items: cart,
          total: totalCost / 100,
        };
        await addDoc(collection(db, "orders"), order);
        clearCart();
        navigate("/order-success"); 
      }
    }
    
    setProcessing(false);
  };

  const handleCheck = () => {
    setIsSameAddress(!isSameAddress);
  };

  return (
    <div className={styles['checkout-form']}>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className={styles['payment-form']}>
        <h3 className={styles['section-title']}>Payment Details</h3>
        <div className={styles['payment-details']}>
          <CardElement options={CARD_ELEMENT_OPTIONS} className={styles['card-element']} />
          <input type="text" placeholder="Name on Card" required className={styles['input']} />
        </div>

        <h3 className={styles['section-title']}>Billing Details</h3>
        <div className={styles['billing-details']}>
        <input ref={firstNameRef} type="text" placeholder="First Name" required className={styles['input']} />
        <input ref={lastNameRef} type="text" placeholder="Last Name" required className={styles['input']} />
        <input ref={addressRef} type="text" placeholder="Address" required className={styles['input']} />
        <input ref={cityRef} type="text" placeholder="City" required className={styles['input']} />
        <input ref={stateRef} type="text" placeholder="State" required className={styles['input']} />
        <input ref={zipCodeRef} type="text" placeholder="ZIP code" required className={styles['input']} />
        </div>

        <div className={styles['address-check']}>
          <label>
            <input 
              type="checkbox"
              checked={isSameAddress}
              onChange={handleCheck}
              className={styles['checkbox']}
            /> Shipping Address same as Billing
          </label>
        </div>

        {!isSameAddress && (
          <>
            <h3 className={styles['section-title']}>Shipping Details</h3>
            <div className={styles['shipping-details']}>
              <input type="text" placeholder="First Name" required className={styles['input']} />
              <input type="text" placeholder="Last Name" required className={styles['input']} />
              <input type="text" placeholder="Address" required className={styles['input']} />
              <input type="text" placeholder="City" required className={styles['input']} />
              <input type="text" placeholder="State" required className={styles['input']} />
              <input type="text" placeholder="ZIP code" required className={styles['input']} />
            </div>
          </>
        )}

        <div className={styles['confirm-order']}>
          <p className={styles['total']}>Total: ${(totalCost / 100).toFixed(2)}</p>
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
