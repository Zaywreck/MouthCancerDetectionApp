// src/services/image.js
import apiFetch from './api';

export const uploadImage = async (userId, imageUri) => {
  // user_id'yi URL'de query parametresi olarak ekliyoruz
  const url = `/images/upload?user_id=${userId}`;
  console.log('Uploading image to:', url);

  // FormData sadece file içerecek
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  });

  try {
    const response = await apiFetch(url, {
      method: 'POST',
      body: formData,
    });
    console.log('Upload successful, response:', response);
    return response;
  } catch (error) {
    console.error('Upload failed, full error:', error);
    throw error; // Hata detaylarını üst katmana ilet
  }
};

export const getUserUploads = async (userId) => {
  return apiFetch(`/images/user-uploads?user_id=${userId}`, {
    method: 'GET',
  });
};

export const getDoctorRequests = async () => {
  return apiFetch('/images/doctor-requests'); // Bekleyen talepleri döndürür
};

export const getImageUploadById = async (id) => {
  return apiFetch(`/images/uploads/${id}`); // Belirli bir talebin detaylarını döndürür
};

export const updateRequestStatus = async (id, status, comment) => {
  const url = `/images/update-request/${id}?status=${status}&doctor_comment=${encodeURIComponent(comment || '')}`;
  return apiFetch(url, {
    method: 'PUT',
  });
};