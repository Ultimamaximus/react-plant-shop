import React from 'react';
import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <section className={styles.landingPage}>
      <div className={styles.heroContent}>
        <h1 className={styles.title}>Welcome to Our Plant Shop</h1>
        <p className={styles.subtitle}>Discover the joy of plant parenting</p>
        <button className={styles.shopNowButton}>Shop Now</button>
      </div>
    </section>
  );
}

export default LandingPage;
