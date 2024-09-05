import React, {useContext} from 'react';
import {  Routes, Route } from 'react-router-dom';
import { AuthContext } from 'Context/authContext';

import SignUp from 'Pages/Sign Up';
import SignIn from 'Pages/Sign In';
import AddPost from 'Pages/Add Post';
import DrawerComponent from 'Components/Drawer';

const App = () => {
  const { user } = useContext(AuthContext); 
  
  console.log(user);
  return (
    <>
        <DrawerComponent />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addPost" element={<AddPost />} />
        </Routes>
    </>
  );
};

export default App;
