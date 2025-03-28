// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = (type, id) => {
    setIsLoggedIn(true);
    setUserType(type);
    setUserId(id);
    console.log('Logged in as', type, 'with ID', id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setUserId(null);
    console.log('Logged out');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);