import React, { useState, useContext } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { CartContext } from '../context/CartContext';  
import { useNavigate } from 'react-router-dom';
import './CustomerContactForm.css';

const CustomerContactForm = () => {
  const navigate = useNavigate();  
  const { storeCustomerInfo } = useContext(CartContext);

  const [customerInfo, setCustomerInfo] = useState({
    name: '', 
    email: '', 
    country: '', 
    state: '', 
    city: '', 
    street: ''
  });
  
  const [errors, setErrors] = useState({
    name: null,
    email: null,
    country: null,
    state: null,
    city: null,
    street: null
  });

  const handleChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if(!customerInfo.name){
      formIsValid = false;
      errors.name = 'Name is required';
    }

    if(!customerInfo.email){
      formIsValid = false;
      errors.email = 'Email is required';
    } else if(!/\S+@\S+\.\S+/.test(customerInfo.email)){
      formIsValid = false;
      errors.email = 'Email is not valid';
    }

    // Perform other checks as required

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(validateForm()){
      storeCustomerInfo(customerInfo);  
      navigate('/checkout');

      try {
        await addDoc(collection(db, "customers"), customerInfo);
        console.log("Customer info stored successfully!");
      } catch (e) {
        console.error("Error storing customer info: ", e);
      }
    }
  };
  
  return (
    <form className="customerForm" onSubmit={handleSubmit}>
      <h2>Contact Information</h2>

      <label htmlFor="name">Name</label>  
      <input
        id="name"
        name="name"
        type="text"
        value={customerInfo.name}  
        onChange={handleChange}
        required
      />
      {errors.name && <p>{errors.name}</p>}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        value={customerInfo.email}
        onChange={handleChange}
        required
      />
      {errors.email && <p>{errors.email}</p>}

      <h2>Shipping address</h2>

      {/* More fields like this, don't forget the error messages */}

      <button type="submit">Next</button>
    </form>
  );
};

export default CustomerContactForm;
