// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isDoctorLogin, setIsDoctorLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');

  const loginAsDoctor = (email) => {
    setIsDoctorLogin(true);
    setEmail(email);
    setIsLoggedIn(true);
  };

  const loginAsGuest = () => {
    setIsDoctorLogin(false);
    setEmail('');
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsDoctorLogin(false);
    setEmail('');
    setIsLoggedIn(false);
    console.log("logged out succesfully");
  };

  return (
    <AuthContext.Provider value={{ isDoctorLogin, isLoggedIn, email, loginAsDoctor, loginAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);