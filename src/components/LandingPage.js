// LandingPage.js

import React from 'react';
import styles from './LandingPage.module.css';
import { Link } from 'react-router-dom';


function LandingPage() {

  return (
    <section className={styles.landingPage}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Welcome to Silvanus Grove</h1>
        <p className={styles.subtitle}>Discover the joy of plant parenting</p>
        <Link to="/all">
          <button className={styles.shopNowButton}>Shop Now</button>
        </Link>
      </div>
    </section>
  );
}

export default LandingPage;
