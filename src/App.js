import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Footer from './components/Footer';
import PlantList from './components/PlantList';
import PlantDetail from './components/PlantDetail';
import { CartProvider } from './context/CartContext';
import Cart from './components/Cart';
import CustomerContactForm from './components/CustomerContactForm';
import CheckoutForm from './components/CheckoutForm';
import OrderSuccess from './components/OrderSuccess';
import CartDrawer from './components/CartDrawer'; // import CartDrawer

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CartProvider>
        <Router>
        <Banner />
          <Navbar />
          <div className="app">
            <Routes>
              <Route path="/" element={<PlantList />} />
              <Route path="/plant/:id" element={<PlantDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/customer-info" element={<CustomerContactForm />} /> 
              <Route path="/checkout" element={<CheckoutForm />} />
              <Route path="/order-success" element={<OrderSuccess />} />
            </Routes>
          </div>
          <Footer />
          <CartDrawer /> {/* use CartDrawer */}
        </Router>
      </CartProvider>
    </Elements>
  );
}

export default App;
