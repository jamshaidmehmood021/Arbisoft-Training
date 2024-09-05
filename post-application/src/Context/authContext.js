import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // fix import

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('Token');
        return token ? jwtDecode(token).email : null;
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const token = localStorage.getItem('Token');
            if (token) {
                try {
                    setUser(jwtDecode(token).email);
                } catch (e) {
                    console.error('Failed to decode token:', e);
                }
            } else {
                setUser(null);
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const login = (token) => {
        localStorage.setItem('Token', token);
        setUser(jwtDecode(token).email); 
        navigate('/home'); 
    };

    const logout = () => {
        localStorage.removeItem('Token');
        setUser(null);
        navigate('/');
    };

    const contextValue = {
        user, login, logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
