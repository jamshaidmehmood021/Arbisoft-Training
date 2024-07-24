import React from 'react';
import './App.css';
import SignUp from './Pages/SignUp';
import LogIn from './Pages/LogIn';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import AddItem from './Pages/AddItem';
import ErrorBoundary from './ErrorBoundary';
import { selectIsAuthenticated } from './Features/users/userSlice';
import { useSelector } from 'react-redux';
import AdminDashboard from './Pages/AdminDashboard';
import AdminReport from './Pages/AdminReport';
import EditFoodEntry from './Pages/EditFoodEntry';
import InviteFriend from './Pages/InviteFriend';

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user === 'admin@gmail.com';

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/home" element={ isAuthenticated ?
            <ErrorBoundary>
              <Home />
            </ErrorBoundary> : 
            <ErrorBoundary>
            <LogIn />
          </ErrorBoundary> 
          } />
          <Route path="/" element={
            <ErrorBoundary>
              <LogIn />
            </ErrorBoundary>
          } />
          <Route path="/signUp" element={
            <ErrorBoundary>
              <SignUp />
            </ErrorBoundary>
          } />
          <Route path="/addFood" element={  isAuthenticated ?
            <ErrorBoundary>
              <AddItem />
            </ErrorBoundary> :
            <ErrorBoundary>
              <LogIn />
            </ErrorBoundary> 
          } />
          <Route path="/invite" element={  isAuthenticated ?
            <ErrorBoundary>
              <InviteFriend/>
            </ErrorBoundary> :
            <ErrorBoundary>
              <LogIn />
            </ErrorBoundary> 
          } />


        {isAdmin && (
          <>
            <Route path="/adminDashboard" element={
              <ErrorBoundary>
                <AdminDashboard />
              </ErrorBoundary>} 
              />
            <Route path="/report" element={
              <ErrorBoundary>
                <AdminReport />
                </ErrorBoundary>
              } 
              />
            <Route path = "/food/edit/:foodId" element={
              <ErrorBoundary>
                <EditFoodEntry/>
                </ErrorBoundary>
                }
              />
          </>
        )}
        </Routes>
      </BrowserRouter>
   
    </div>
  );
}

export default App;
