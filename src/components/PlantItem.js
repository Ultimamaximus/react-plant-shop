import React from 'react';

function PlantItem({ plant, onAddToCart }) {
  return (
    <div className="plant-item">
      <img src={plant.image} alt={plant.name} />
      <h2>{plant.name}</h2>
      <p>{plant.description}</p>
      <p>${plant.price}</p>
      <button onClick={() => onAddToCart(plant)}>Add to Cart</button>
    </div>
  );
}

export default PlantItem;
