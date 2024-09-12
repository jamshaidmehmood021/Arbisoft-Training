import './App.css'
import {  Routes, Route } from 'react-router-dom';

import SignUp from './Pages/signUp' 
import SignIn from './Pages/signIn'

const  App = () => {
  

  return (
    
      <div>
        <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
         </Routes>
      </div>
    
  )
}

export default App
