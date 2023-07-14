import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLink}>Plant List</Link>
      <Link to="/cart" className={styles.navLink}>Cart</Link>
    </nav>
  );
}

export default Navbar;
