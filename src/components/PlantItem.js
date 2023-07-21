// PlantItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './PlantItem.module.css';

function PlantItem({ plant }) {
  console.log("Plant: ", plant);
  return (
    <div className={styles.plantItem}>
      <Link to={`/plant/${plant.id}`} className={styles.plantLink}>
        <img src={plant.image} alt={plant.name} className={styles.plantImage} />
        <div className={styles.nameAndPrice}>
          <p className={styles.plantNameAndPrice}>
            {plant.name} - ${plant.price}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default PlantItem;
