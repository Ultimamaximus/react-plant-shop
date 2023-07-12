import React, { useState, useEffect } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
import PlantItem from "./PlantItem";

const PlantList = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    const getPlants = async () => {
      const querySnapshot = await getDocs(collection(db, "plants"));
      setPlants(querySnapshot.docs.map((doc) => doc.data()));
    };

    getPlants();
  }, []);

  return (
    <div>
      {plants.map((plant, index) => (
        <PlantItem key={index} plant={plant} />
      ))}
    </div>
  );
};

export default PlantList;

