import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import styles from './PlantItem.module.css';

function PlantItem({ plant }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className={styles.plantItem}>
      <Link to={`/plant/${plant.id}`}>
        <img src={plant.image} alt={plant.name} className={styles.plantImage} />
        <h2>{plant.name}</h2>
      </Link>
      <button onClick={() => addToCart(plant)} className={styles.addToCartButton}>Add to Cart</button>
    </div>
  );
}

export default PlantItem;
