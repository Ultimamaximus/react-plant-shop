import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import styles from './PlantDetail.module.css';

const PlantDetail = ({ onAddToCart }) => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      const docRef = doc(db, 'plants', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPlant(docSnap.data());
      } else {
        console.log('No such document!');
      }
    }

    fetchPlant();
  }, [id]);

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.detailContainer}>
      <img src={plant.image} alt={plant.name} className={styles.detailImage} />
      <div className={styles.detailInfo}>
        <h2 className={styles.detailName}>{plant.name}</h2>
        <p className={styles.detailDescription}>{plant.description}</p>
        <p className={styles.detailPrice}>${plant.price}</p>
        <button onClick={() => onAddToCart(plant)} className={styles.addToCartButton}>Add to Cart</button>
      </div>
    </div>
  );
}

export default PlantDetail;
