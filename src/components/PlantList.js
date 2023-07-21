import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import PlantItem from "./PlantItem";
import styles from "./PlantList.module.css";
import { CartContext } from '../context/CartContext';
import { CategoryContext } from '../context/CategoryContext';

const PlantList = () => {
  const [plants, setPlants] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { selectedCategory } = useContext(CategoryContext);

  useEffect(() => {
    const getPlants = async () => {
      let plantQuery;
      if (selectedCategory === 'all') {
        plantQuery = collection(db, "plants");
      } else {
        plantQuery = query(collection(db, "plants"), where("categories", "array-contains", selectedCategory));
      }
      const querySnapshot = await getDocs(plantQuery);
      const plants = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPlants(plants);
    };

    getPlants();
  }, [selectedCategory]);

  return (
    <div>
      <div className={styles.productsHeading}>
        <h1>Products</h1>
        <div className={styles.lineSeparator}></div>
      </div>
      <div className={styles.plantList}>
        {plants.map((plant) => (
          <PlantItem key={plant.id} plant={plant} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default PlantList;
