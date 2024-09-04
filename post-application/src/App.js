import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignUp from 'Components/Sign Up';
import SignIn from 'Components/Sign In';
import DrawerComponent from 'Components/Drawer';



const App = () => {
  return (
    <BrowserRouter>
      <DrawerComponent/>
      <Routes>
      <Route path="/" element ={ <SignUp/>}/> 
      <Route path="/signIn" element ={ <SignIn/>}/>      
      </Routes>
    </BrowserRouter>
  );
};

export default App;
