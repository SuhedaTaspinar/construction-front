// contexts/AuthContext.js
"use client"; // Next.js 13 ve üstü için "use client" gerekli

import { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ name: 'User' });
    } else {
      setUser(null);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ name: 'User' });
    router.push('/dashboard'); // Login olduktan sonra yönlendirme
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/auth/signin'); // Çıkış yaptıktan sonra yönlendirme
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
