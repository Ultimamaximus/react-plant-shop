import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { CartContext } from '../context/CartContext';
import styles from './PlantDetail.module.css';

const PlantDetail = () => {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const { addToCart } = useContext(CartContext);

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
      <img className={styles.plantImage} src={plant.image} alt={plant.name} />
      <div className={styles.detailText}>
        <h2>{plant.name}</h2>
        <p>{plant.description}</p>
        <p>${plant.price}</p>
        <button className={styles.addToCartButton} onClick={() => addToCart(plant)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default PlantDetail;
