import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from './components/Navbar';
import PlantList from './components/PlantList';
import PlantDetail from './components/PlantDetail';
import AccessoriesList from './components/AccessoriesList';
import AccessoryDetail from './components/AccessoryDetail';
import { CartProvider } from './context/CartContext';
import { CategoryProvider } from './context/CategoryContext';
import { AccessoriesProvider } from './context/AccessoriesContext';
import AllProductsList from './components/AllProductsList';
import Cart from './components/Cart';
import Banner from './components/Banner';
import Footer from './components/Footer';
import CheckoutForm from './components/CheckoutForm';
import OrderSuccess from './components/OrderSuccess';
import LandingPage from './components/LandingPage'; // new import

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CartProvider>
        <CategoryProvider>
          <AccessoriesProvider>
            <Router>
              <Banner />
              <Navbar />
              <div className="app">
                <Routes>
                  <Route path="/" element={<LandingPage />} /> 
                  <Route path="/plants" element={<PlantList />} /> 
                  <Route path="/plant/:id" element={<PlantDetail />} />
                  <Route path="/accessories" element={<AccessoriesList />} />
                  <Route path="/accessory/:id" element={<AccessoryDetail />} />
                  <Route path="/all" element={<AllProductsList />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<CheckoutForm />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                </Routes>
              </div>
              <Footer />
            </Router>
          </AccessoriesProvider>
        </CategoryProvider>
      </CartProvider>
    </Elements>
  );
}

export default App;
