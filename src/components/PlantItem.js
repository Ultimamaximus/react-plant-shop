import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PlantItem.module.css';

function PlantItem({ plant, onAddToCart }) {
  return (
    <div className={styles.plantItem}>
      <Link to={`/plant/${plant.id}`}>
        <img src={plant.image} alt={plant.name} className={styles.plantImage} />
        <h2>{plant.name}</h2>
      </Link>
      <button onClick={() => onAddToCart(plant)} className={styles.addToCartButton}>Add to Cart</button>
    </div>
  );
}

export default PlantItem;
