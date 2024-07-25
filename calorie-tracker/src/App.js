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
//const AddItem = lazy(() => import('./Pages/AddItem'));
const AddItemCustomHookVersion = lazy(() => import('./Pages/AddItemCustomHookVersion'));
// const AdminDashboard = lazy(() => import('./Pages/AdminDashboard'));
const AdminDashboardCustomHookVersion = lazy(() => import('./Pages/AdminDashboardCustomHookVersion'));
const AdminReport = lazy(() => import('./Pages/AdminReport'));
//const EditFoodEntry = lazy(() => import('./Pages/EditFoodEntry'));
const EditItemCustomHookVersion = lazy(() => import('./Pages/EditItemCustomHookVersion'));
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
            <Route path="/home" element={isAuthenticated ? <Suspense fallback={<div> <Bars /></div>}> <Home /> </Suspense>:  <Suspense fallback={<div> <Bars /></div>}><LogIn /> </Suspense>} />
            <Route path="/" element={<Suspense fallback={<div> <Bars /></div>}><LogIn /> </Suspense>} />
            <Route path="/signUp" element={<Suspense fallback={<div> <Bars /></div>}><SignUp /> </Suspense>} />
            <Route path="/addFood" element={isAuthenticated ? <Suspense fallback={<div> <Bars /></div>}> <AddItemCustomHookVersion /> </Suspense> : <Suspense fallback={<div> <Bars /></div>}> <LogIn /> </Suspense>} />
            <Route path="/invite" element={isAuthenticated ? <Suspense fallback={<div> <Bars /></div>}><InviteFriend /> </Suspense>: <Suspense fallback={<div> <Bars /></div>}> <LogIn /> </Suspense>} />

            {isAdmin && (
              <>
                <Route path="/adminDashboard" element={<Suspense fallback={<div> <Bars /></div>}><AdminDashboardCustomHookVersion /> </Suspense>} />
                <Route path="/report" element={<Suspense fallback={<div> <Bars /></div>}><AdminReport /> </Suspense>} />
                <Route path="/food/edit/:foodId" element={<Suspense fallback={<div> <Bars /></div>}> <EditItemCustomHookVersion /> </Suspense>} />
              </>
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
