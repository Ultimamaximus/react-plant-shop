import React from 'react';
import PlantList from './components/PlantList';

function App() {
  const handleAddToCart = (plant) => {
    // Functionality to add plant to the cart goes here
    console.log("Added to cart: ", plant);
  };

  return (
    <div className="app">
      <h1>My Plant Store</h1>
      <PlantList onAddToCart={handleAddToCart} />
    </div>
  );
}

export default App;

