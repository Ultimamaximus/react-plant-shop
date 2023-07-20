import React from 'react';
import styles from './Footer.module.css';
import logo from './Logo.svg'; // import your logo

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.content}>
      <div className={styles.textContainer}>
        <div className={styles.column}>
          <h3>Products</h3>
          <ul>
            <li>Delivery Policy</li>
            <li>Design Services</li>
            <li>Covid Update</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>Affiliates</li>
            <li>Careers</li>
          </ul>
        </div>
        <div className={styles.column}>
          <h3>Support</h3>
          <ul>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Refund/Exchange Policy</li>
          </ul>
        </div>
      </div>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt="Your logo" />
      </div>
    </div>
  </footer>
);

export default Footer;
