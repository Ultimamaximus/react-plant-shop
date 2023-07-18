// Dropdown.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dropdown.module.css';

function Dropdown({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.dropdown}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.dropdownButton}>
        {title}
      </button>

      {isOpen && (
        <div className={styles.dropdownContent}>
          {items.map((item, index) => (
            <Link to={item.path} key={index} className={styles.dropdownItem}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;