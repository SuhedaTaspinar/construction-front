// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { getToken, removeToken } from '../utils/storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = getToken();
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const logout = () => {
        setToken(null);
        removeToken();
    };

    return (
        <AuthContext.Provider value={{ token, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
