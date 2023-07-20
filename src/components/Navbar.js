import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import styles from './Navbar.module.css';
import { IoPersonCircleOutline, IoCartOutline, IoSearchOutline } from 'react-icons/io5';

function Navbar() {
  const plants = [
    { label: 'Fruit Plants', path: '/fruit-plants' },
    { label: 'Flower Plants', path: '/flower-plants' },
    // Add more here as needed
  ];

  const accessories = [
    { label: 'Pots', path: '/accessories/pots' },
    { label: 'Fertilizers', path: '/accessories/fertilizers' },
    // Add more here as needed
  ];

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.navLink}>Shop All</Link>
      <Dropdown title="Plants" items={plants} />
      <Dropdown title="Accessories" items={accessories} />
      <Link to="/gifts" className={styles.navLink}>Gifts</Link>
      <div className={styles.icons}>
        <IoSearchOutline className={styles.icon} />
        <IoPersonCircleOutline className={styles.icon} />
        <Link to="/cart"><IoCartOutline className={styles.icon} /></Link>
      </div>
    </nav>
  );
}

export default Navbar;

