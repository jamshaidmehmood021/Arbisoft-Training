import React, { createContext, useContext, useState } from 'react';

const StateAContext = createContext();

export const useStateA = () => useContext(StateAContext);

export const StateAProvider = ({ children }) => {
  const [stateA, setStateA] = useState("Initial State A");

  return (
    <StateAContext.Provider value={{ stateA, setStateA }}>
      {children}
    </StateAContext.Provider>
  );
};
