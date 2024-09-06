import React from 'react';
import {  Routes, Route } from 'react-router-dom';

import SignUp from 'pages/signUp';
import SignIn from 'pages/signIn';
import AddPost from 'pages/addPost';
import DrawerComponent from 'components/drawer';

const App = () => {

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
