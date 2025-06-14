// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userId, setUserId] = useState(null);
  const [skipAutoGuest, setSkipAutoGuest] = useState(false);

  const login = (type, id) => {
    setIsLoggedIn(true);
    setUserType(type);
    setUserId(id);
    console.log('Logged in as', type, 'with ID', id);
  };

  // Accept skip parameter to control auto guest
  const logout = (skip = false) => {
    setIsLoggedIn(false);
    setUserType(null);
    setUserId(null);
    setSkipAutoGuest(skip);
    console.log('Logged out');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, userId, login, logout, skipAutoGuest, setSkipAutoGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);