// Dropdown.js

import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Dropdown.module.css';

function Dropdown({ title, items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.dropdownButton}>
        {title}
      </button>

      {isOpen && (
        <div className={`${styles.dropdownContent} ${isOpen ? styles.active : ""}`}>
          {items.map((item, index) => (
            <Link 
              to={item.path} 
              key={index} 
              className={styles.dropdownItem}
              onClick={() => onSelect(item.category)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
