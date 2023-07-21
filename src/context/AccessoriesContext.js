// AccessoriesContext.js

import React, { createContext, useState } from 'react';

export const AccessoriesContext = createContext();

export const AccessoriesProvider = ({ children }) => {
  const [selectedAccessory, setSelectedAccessory] = useState('all');

  return (
    <AccessoriesContext.Provider value={{ selectedAccessory, setSelectedAccessory }}>
      {children}
    </AccessoriesContext.Provider>
  );
};
