// Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import CartIcon from './CartIcon';
import styles from './Navbar.module.css';
import { IoPersonCircleOutline, IoSearchOutline } from 'react-icons/io5';
import { ReactComponent as Logo } from './Logo.svg'; 

function Navbar() {
  const plants = [
    { label: 'Low Light Plants', path: '/fruit-plants' },
    { label: 'Pet Safe Plants', path: '/flower-plants' },
    { label: 'All Plants', path: '/flower-plants' }
  ];

  const accessories = [
    { label: 'Pots', path: '/accessories/pots' },
    { label: 'Fertilizers', path: '/accessories/fertilizers' },
  ];

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Logo className={styles.logo} />
      </div>
      <div className={styles.menuItems}>
        <Link to="/" className={styles.navLink}>Shop All</Link>
        <Dropdown title="Plants" items={plants} />
        <Dropdown title="Accessories" items={accessories} />
        <Link to="/gifts" className={styles.navLink}>Gifts</Link>
      </div>
      <div className={styles.icons}>
        <IoSearchOutline className={styles.icon} />
        <IoPersonCircleOutline className={styles.icon} />
        <Link to="/cart" className={styles.iconLink}><CartIcon /></Link>
      </div>
    </nav>
  );
}

export default Navbar;
