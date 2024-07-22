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


function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);

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
          <Route path="/addFood" element={ isAuthenticated ?
            <ErrorBoundary>
              <AddItem />
            </ErrorBoundary> : 
            <ErrorBoundary>
            <LogIn />
          </ErrorBoundary> 
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
