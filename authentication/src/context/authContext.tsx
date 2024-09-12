import React, { createContext, useState, useEffect, memo, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  email: string;
  name: string;
  id: string;
}

interface AuthContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  name: string | null;
  setName: React.Dispatch<React.SetStateAction<string | null>>;
  userID: string | null;
  setUserID: React.Dispatch<React.SetStateAction<string | null>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = memo(({ children }) => {
  const navigate = useNavigate();
  
  const [user, setUser] = useState<string | null>(() => {
    const token = localStorage.getItem('Token');
    return token ? jwtDecode<DecodedToken>(token).email : null;
  });
  
  const [name, setName] = useState<string | null>(() => {
    const token = localStorage.getItem('Token');
    return token ? jwtDecode<DecodedToken>(token).name : null;
  });
  
  const [userID, setUserID] = useState<string | null>(() => {
    const token = localStorage.getItem('Token');
    return token ? jwtDecode<DecodedToken>(token).id : null;
  });

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('Token');
      if (token) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(token);
          setUser(decodedToken.email);
          setName(decodedToken.name);
          setUserID(decodedToken.id);
        } catch (e) {
          console.error('Failed to decode token:', e);
        }
      } else {
        setUser(null);
        setName(null);
        setUserID(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem('Token');
    setUser(null);
    setName(null);
    setUserID(null);
    navigate('/');
  };

  const contextValue: AuthContextType = {
    user, setUser, name, setName, userID, setUserID, logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
});

export { AuthContext, AuthProvider };
