// AccessoryDetail.js
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { CartContext } from '../context/CartContext';
import styles from './AccessoryDetail.module.css';

const AccessoryDetail = () => {
  const { id } = useParams();
  const [accessory, setAccessory] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchAccessory = async () => {
      const docRef = doc(db, 'accessories', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        data.id = docSnap.id;
        setAccessory(data);
      } else {
        console.log('No such document!');
      }
    }

    fetchAccessory();
  }, [id]);

  if (!accessory) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.detailContainer}>
      <div className={styles.imageContainer}>
        <img className={styles.accessoryImage} src={accessory.image} alt={accessory.name} />
      </div>
      <div className={styles.detailText}>
        <h2>{accessory.name}</h2>
        <p className={styles.description}>{accessory.description}</p>
        <p className={styles.price}>${accessory.price}</p>
        <hr className={styles.separator} />
        <button className={styles.addToCartButton} onClick={() => addToCart(accessory)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default AccessoryDetail;
