import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlantList from './components/PlantList';
import PlantDetail from './components/PlantDetail';

function App() {
  const handleAddToCart = (plant) => {
    // Functionality to add plant to the cart goes here
    console.log("Added to cart: ", plant);
  };

  return (
    <Router>
      <div className="app">
        <h1>My Plant Store</h1>
        <Routes>
          <Route path="/" element={<PlantList onAddToCart={handleAddToCart} />} />
          <Route path="/plant/:id" element={<PlantDetail onAddToCart={handleAddToCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
