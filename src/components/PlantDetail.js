// PlantDetail.js
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
        const data = docSnap.data();
        data.id = docSnap.id;
        setPlant(data);
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
      <div className={styles.imageContainer}>
        <img className={styles.plantImage} src={plant.image} alt={plant.name} />
      </div>
      <div className={styles.detailText}>
        <h2>{plant.name}</h2>
        <p className={styles.description}>{plant.description}</p>
        <p className={styles.price}>${plant.price}</p>
        <hr className={styles.separator} />
        <button className={styles.addToCartButton} onClick={() => addToCart(plant)}>Add to Cart</button>
      </div>
    </div>
  );
}

export default PlantDetail;
