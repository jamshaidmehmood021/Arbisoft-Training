import React, { createContext, useContext, useState } from 'react';

const StateCContext = createContext();

export const useStateC = () => useContext(StateCContext);

export const StateCProvider = ({ children }) => {
  const [stateC, setStateC] = useState("Initial State C");

  return (
    <StateCContext.Provider value={{ stateC, setStateC }}>
      {children}
    </StateCContext.Provider>
  );
};
