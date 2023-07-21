// AccessoriesList.js

import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import AccessoryItem from "./AccessoryItem";
import styles from "./AccessoriesList.module.css";
import { CartContext } from '../context/CartContext';
import { AccessoriesContext } from '../context/AccessoriesContext';

const AccessoriesList = () => {
  const [accessories, setAccessories] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { selectedAccessory } = useContext(AccessoriesContext);

  useEffect(() => {
    const getAccessories = async () => {
      let accessoryQuery;
      if (selectedAccessory === 'all') {
        accessoryQuery = collection(db, "accessories");
      } else {
        accessoryQuery = query(collection(db, "accessories"), where("categories", "array-contains", selectedAccessory));
      }
      const querySnapshot = await getDocs(accessoryQuery);
      const accessories = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setAccessories(accessories);
    };

    getAccessories();
  }, [selectedAccessory]);

  return (
    <div className={styles.accessoriesList}>
      {accessories.map((accessory) => (
        <AccessoryItem key={accessory.id} accessory={accessory} onAddToCart={addToCart} />
      ))}
    </div>
  );
};

export default AccessoriesList;
