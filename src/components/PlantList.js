import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PlantItem from "./PlantItem";
import styles from "./PlantList.module.css";
import { CartContext } from '../context/CartContext';

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const { addToCart } = useContext(CartContext); // Get addToCart from context

  useEffect(() => {
    const getPlants = async () => {
      const querySnapshot = await getDocs(collection(db, "plants"));
      const plants = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPlants(plants);
    };

    getPlants();
  }, []);

  return (
    <div className={styles.plantList}>
      {plants.map((plant) => (
        <PlantItem key={plant.id} plant={plant} onAddToCart={addToCart} /> // Pass addToCart to PlantItem
      ))}
    </div>
  );
};

export default PlantList;
