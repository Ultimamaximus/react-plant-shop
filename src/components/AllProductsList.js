import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PlantItem from "./PlantItem";
import AccessoryItem from "./AccessoryItem";
import styles from "./AllProductsList.module.css";

const AllProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getAllProducts = async () => {
      const plantsSnapshot = await getDocs(collection(db, "plants"));
      const plants = plantsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), type: "plant" }));

      const accessoriesSnapshot = await getDocs(collection(db, "accessories"));
      const accessories = accessoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data(), type: "accessory" }));

      const allProducts = [...plants, ...accessories];
      allProducts.sort((a, b) => a.id > b.id ? 1 : -1); // this will sort by id, change this line to sort by another field

      setProducts(allProducts);
    };

    getAllProducts();
  }, []);

  return (
    <div>
      <div className={styles.productsHeading}>
        <h1>All Products</h1>
        <div className={styles.lineSeparator}></div>
      </div>
      <div className={styles.productList}>
        {products.map((product) => 
          product.type === "plant" ? 
          <PlantItem key={product.id} plant={product} /> :
          <AccessoryItem key={product.id} accessory={product} />
        )}
      </div>
    </div>
  );
};

export default AllProductsList;
