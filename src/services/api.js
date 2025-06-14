// src/services/api.js
const url = process.env.EXPO_PUBLIC_API_URL;
// const port = process.env.EXPO_PUBLIC_API_PORT;
export const BASE_URL = `${url}`;

const apiFetch = async (endpoint, options = {}) => {
  console.log(BASE_URL + endpoint);
  
  // FormData kullanılıyorsa Content-Type header'ını set etme
  // Browser/React Native otomatik olarak multipart/form-data set edecek
  const headers = { ...options.headers };
  
  // FormData değilse Content-Type: application/json set et
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: headers,
  });

  if (!response.ok) {
    const errorText = await response.text(); // Sunucudan dönen hata mesajını al
    console.error('API error response:', errorText);
    throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
  }

  return response.json();
};

export default apiFetch;