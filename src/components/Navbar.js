import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import CartIcon from './CartIcon';
import styles from './Navbar.module.css';
import { IoPersonCircleOutline, IoSearchOutline } from 'react-icons/io5';
import { ReactComponent as Logo } from './Logo.svg';
import { CategoryContext } from '../context/CategoryContext';
import { AccessoriesContext } from '../context/AccessoriesContext';

function Navbar() {
  const { setSelectedCategory } = useContext(CategoryContext);
  const { setSelectedAccessory } = useContext(AccessoriesContext);

  const plants = [
    { label: 'Low Light Plants', path: '/', category: 'low-light' },
    { label: 'Pet Safe Plants', path: '/', category: 'pet-safe' },
    { label: 'All Plants', path: '/', category: 'all' }
  ];

  const accessories = [
    { label: 'Pots', path: '/accessories', category: 'pot' },
    { label: 'Fertilizers', path: '/accessories', category: 'fertilizer' },
    { label: 'All Accessories', path: '/accessories', category: 'all' }
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleAccessorySelect = (category) => {
    setSelectedAccessory(category);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Logo className={styles.logo} />
      </div>
      <div className={styles.menuItems}>
      <Link to="/all" className={styles.navLink}>Shop All</Link>
        <Dropdown title="Plants" items={plants} onSelect={handleCategorySelect} />
        <Dropdown title="Accessories" items={accessories} onSelect={handleAccessorySelect} />
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
