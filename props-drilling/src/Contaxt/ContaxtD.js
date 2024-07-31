import React, { createContext, useContext, useState } from 'react';

const StateDContext = createContext();

export const useStateD = () => useContext(StateDContext);

export const StateDProvider = ({ children }) => {
  const [stateD, setStateD] = useState("Initial State D");

  return (
    <StateDContext.Provider value={{ stateD, setStateD }}>
      {children}
    </StateDContext.Provider>
  );
};
