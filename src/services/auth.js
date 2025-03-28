// src/services/auth.js
import apiFetch from './api';

export const registerUser = async (email, password, userType) => {
  return apiFetch('/users/register', {
    method: 'POST',
    body: JSON.stringify({ email, password, user_type: userType }),
  });
};

export const loginUser = async (email, password) => {
  return apiFetch('/users/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};