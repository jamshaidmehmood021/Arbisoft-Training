import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showApiData, setShowApiData] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [editedData, setEditedData] = useState({})
  return (
    <AppContext.Provider value={{ showAddForm, setShowAddForm, showApiData, setShowApiData, editTask, setEditTask, editedData, setEditedData }}>
      {children}
    </AppContext.Provider>
  );
};
