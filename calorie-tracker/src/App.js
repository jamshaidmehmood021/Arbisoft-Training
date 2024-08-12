import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


import { selectIsAuthenticated } from './Features/users/userSlice';
import { UserProvider } from './Context/UserContext';
import Navbar from './Components/Navbar';
import ErrorBoundary from './ErrorBoundary';
import {
  LazyHome,
  LazySignUp,
  LazyLogIn,
  LazyAddItemCustomHookVersion,
  LazyAdminDashboardCustomHookVersion,
  LazyAdminReport,
  LazyEditItemCustomHookVersion,
  LazyInviteFriend
} from './LazyLoading';


const App = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user === 'admin@gmail.com';
  return (
    <UserProvider>
      <ErrorBoundary>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/home" element={isAuthenticated ? <LazyHome /> : <LazyLogIn />} />
            <Route path="/" element={<LazyLogIn />} />
            <Route path="/signUp" element={<LazySignUp />} />
            <Route path="/addFood" element={isAuthenticated ? <LazyAddItemCustomHookVersion /> : <LazyLogIn />} />
            <Route path="/invite" element={isAuthenticated ? <LazyInviteFriend /> : <LazyLogIn />} />

            {isAdmin && (
              <>
                <Route path="/adminDashboard" element={<LazyAdminDashboardCustomHookVersion />} />
                <Route path="/report" element={<LazyAdminReport />} />
                <Route path="/food/edit/:foodId" element={<LazyEditItemCustomHookVersion />} />
              </>
            )}
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </UserProvider>
  );
};

export default App;
