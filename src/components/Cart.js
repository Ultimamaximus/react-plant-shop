import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
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
      <h1 className={styles.title}>Shopping Cart</h1>
      {

        cart.length === 0 ? (
          <p className={styles.emptyCartMessage}>Your cart is looking a little plant-shy.</p>
        ) : (

          <>
            {cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img src={item.image} alt={item.name} />
                <div className={styles.cartItemInfo}>
                  <h2>{item.name}</h2>
                  <p>${item.price}</p>
                  <div className={styles.quantityControl}>
                    <label>
                      Quantity:
                      <input type="number" min="1" value={item.quantity} onChange={(event) => handleQuantityChange(item, event)} />
                    </label>
                    <button className={styles.removeButton} onClick={() => handleRemoveClick(item)}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
            <Link to="/checkout">
              <button className={styles.checkoutButton}>Go to Checkout</button>
            </Link>
          </>
        )
      }
    </div>
  );
}

export default Cart;
