// AccessoryItem.js

import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AccessoryItem.module.css';

function AccessoryItem({ accessory }) {
    console.log("Accessory: ", accessory); // added console.log
  return (
    <div className={styles.accessoryItem}>
      <Link to={`/accessory/${accessory.id}`} className={styles.accessoryLink}>
        <img src={accessory.image} alt={accessory.name} className={styles.accessoryImage} />
        <div className={styles.nameAndPrice}>
          <p className={styles.accessoryNameAndPrice}>
            {accessory.name} - ${accessory.price}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default AccessoryItem;
