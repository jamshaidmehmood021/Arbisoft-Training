import React, { createContext, useContext, useState } from 'react';

const StateBContext = createContext();

export const useStateB = () => useContext(StateBContext);

export const StateBProvider = ({ children }) => {
  const [stateB, setStateB] = useState("Initial State B");

  return (
    <StateBContext.Provider value={{ stateB, setStateB }}>
      {children}
    </StateBContext.Provider>
  );
};
