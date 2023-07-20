// CartDrawer.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import styles from './CartDrawer.module.css';

const CartDrawer = () => {
  const { cart, cartVisible, setCartVisible, removeFromCart } = useContext(CartContext);

  if (!cartVisible) {
    return null;
  }

  return (
    <div className={styles.cartDrawer}>
      <button onClick={() => setCartVisible(false)}>Close</button>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map(item => (
          <div key={item.id}>
            <img src={item.image} alt={item.name} width="50" height="50" />
            <p>{item.name}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartDrawer;
