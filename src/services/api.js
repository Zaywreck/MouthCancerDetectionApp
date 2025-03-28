// src/services/api.js
const BASE_URL = 'http://192.168.1.108:8000'; // Replace with your backend IP

const apiFetch = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text(); // Sunucudan dönen hata mesajını al
    console.error('API error response:', errorText);
    throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
  }

  return response.json();
};



export default apiFetch;