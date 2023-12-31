import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState(null);

  const addToCart = (plant) => {
    setCart(prevCart => {
      const itemInCart = prevCart.find(item => item.id === plant.id);
      if (itemInCart) {
        return prevCart.map(item => 
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...plant, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (plant) => {
    setCart(prevCart => prevCart.filter(item => item.id !== plant.id));
  };

  const adjustQuantity = (plant, quantity) => {
    setCart(prevCart => prevCart.map(item => 
      item.id === plant.id ? { ...item, quantity: parseInt(quantity) } : item
    ));
  };

  const clearCart = () => {
    setCart([]); 
  };

  const storeCustomerInfo = (info) => {
    setCustomerInfo(info);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      adjustQuantity, 
      clearCart,
      customerInfo,
      storeCustomerInfo 
    }}>
      {children}
    </CartContext.Provider>
  );
};
