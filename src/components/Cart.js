import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import styles from './Cart.module.css';

function Cart() {
  const { cart, removeFromCart, adjustQuantity } = useContext(CartContext);

  

  const handleQuantityChange = (plant, event) => {
    adjustQuantity(plant, event.target.value);
  }

  const handleRemoveClick = (plant) => {
    removeFromCart(plant);
  }

  return (
    <div className={styles.cartContainer}>
      {cart.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <img src={item.image} alt={item.name} />
          <div className={styles.cartItemInfo}>
            <h2>{item.name}</h2>
            <p>${item.price}</p>
            <label>
              Quantity:
              <input type="number" min="1" value={item.quantity} onChange={(event) => handleQuantityChange(item, event)} />
            </label>
            <button onClick={() => handleRemoveClick(item)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
