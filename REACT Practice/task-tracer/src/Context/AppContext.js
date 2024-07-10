import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showApiData, setShowApiData] = useState(false);
  

  return (
    <AppContext.Provider value={{ showAddForm, setShowAddForm, showApiData, setShowApiData }}>
      {children}
    </AppContext.Provider>
  );
};
