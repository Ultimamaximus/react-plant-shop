import React, { useState, useContext } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase'; 
import { CartContext } from '../context/CartContext';  // <-- import the CartContext
import { useNavigate } from 'react-router-dom';  // <-- import useNavigate

const CustomerContactForm = () => {
  const navigate = useNavigate();  // <-- declare navigate
  const { storeCustomerInfo } = useContext(CartContext);  // <-- get storeCustomerInfo from the context

  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Pass the form data up to the parent component
    storeCustomerInfo({ email, country, state, city, street });  // <-- call storeCustomerInfo with the form data

    navigate('/checkout');  // <-- navigate to checkout
  
    // Add a new document with a generated id to Firestore
    try {
      await addDoc(collection(db, "customers"), {
        email: email,
        country: country,
        state: state,
        city: city,
        street: street,
      });
      console.log("Customer info stored successfully!");
    } catch (e) {
      console.error("Error storing customer info: ", e);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h2>Contact Information</h2>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        required
      />

      <h2>Shipping address</h2>

      <label htmlFor="country">Country</label>
      <input
        id="country"
        type="text"
        value={country}
        onChange={event => setCountry(event.target.value)}
        required
      />

      <label htmlFor="state">State</label>
      <input
        id="state"
        type="text"
        value={state}
        onChange={event => setState(event.target.value)}
        required
      />

      <label htmlFor="city">City</label>
      <input
        id="city"
        type="text"
        value={city}
        onChange={event => setCity(event.target.value)}
        required
      />

      <label htmlFor="street">Street</label>
      <input
        id="street"
        type="text"
        value={street}
        onChange={event => setStreet(event.target.value)}
        required
      />

      <button type="submit">Next</button>
    </form>
  );
};

export default CustomerContactForm;