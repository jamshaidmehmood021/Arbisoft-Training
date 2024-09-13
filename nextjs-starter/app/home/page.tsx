'use client'
import React, { useContext } from 'react'

import { AuthContext } from '@/app/context/authContext'

const Home = () => {
  const authContext = useContext(AuthContext);
  
  if (!authContext) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }

  const { user, name, userID } = authContext;

  return (
    <div>
        <h1>Home</h1>
        <p>User: {user}</p>
        <p>Name: {name}</p>
        <p>UserId: {userID}</p>
    </div>
  )
}

export default Home