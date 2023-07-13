import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PlantItem from "./PlantItem";
import styles from "./PlantList.module.css";

const PlantList = () => {
  const [plants, setPlants] = useState([]);

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
        <PlantItem key={plant.id} plant={plant} />
      ))}
    </div>
  );
};

export default PlantList;
