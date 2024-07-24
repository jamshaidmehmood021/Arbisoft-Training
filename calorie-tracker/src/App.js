import React, { Suspense, lazy } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import { selectIsAuthenticated } from './Features/users/userSlice';
import { useSelector } from 'react-redux';
import { Bars } from 'react-loading-icons';


const Home = lazy(() => import('./Pages/Home'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const LogIn = lazy(() => import('./Pages/LogIn'));
const AddItem = lazy(() => import('./Pages/AddItem'));
const AdminDashboard = lazy(() => import('./Pages/AdminDashboard'));
const AdminReport = lazy(() => import('./Pages/AdminReport'));
const EditFoodEntry = lazy(() => import('./Pages/EditFoodEntry'));
const InviteFriend = lazy(() => import('./Pages/InviteFriend'));

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user === 'admin@gmail.com';

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div> <Bars /></div>}>
          <Routes>
            <Route path="/home" element={isAuthenticated ? <Home /> : <LogIn />} />
            <Route path="/" element={<LogIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/addFood" element={isAuthenticated ? <AddItem /> : <LogIn />} />
            <Route path="/invite" element={isAuthenticated ? <InviteFriend /> : <LogIn />} />

            {isAdmin && (
              <>
                <Route path="/adminDashboard" element={<AdminDashboard />} />
                <Route path="/report" element={<AdminReport />} />
                <Route path="/food/edit/:foodId" element={<EditFoodEntry />} />
              </>
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
