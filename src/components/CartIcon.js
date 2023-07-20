import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IoCartOutline } from 'react-icons/io5';
import { CartContext } from '../context/CartContext';
import styles from './CartIcon.module.css';

const CartIcon = () => {
  const { cart } = useContext(CartContext);

  const itemCount = cart.reduce((count, curItem) => {
    return count + curItem.quantity;
  }, 0);

  return (
    <Link to="/cart" className={styles.cartIconContainer}>
      <IoCartOutline className={styles.cartIcon} />
      {itemCount > 0 && <div className={styles.itemCount}>{itemCount}</div>}
    </Link>
  );
}

export default CartIcon;
