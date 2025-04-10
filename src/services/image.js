// src/services/image.js
import apiFetch from './api';

export const uploadImage = async (userId, imageUri, isNormal = true) => {
  const url = `/images/upload?user_id=${userId}`;
  console.log('Uploading image to:', url);

  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: `upload_${userId}.jpg`,
  });
  formData.append('is_normal', isNormal);  // is_normal parametresini ekle

  try {
    const response = await apiFetch(url, {
      method: 'POST',
      body: formData,
    });
    console.log('Upload successful, response:', response);
    return response;
  } catch (error) {
    console.error('Upload failed - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const getUserUploads = async (userId) => {
  const url = `/images/user-uploads?user_id=${userId}`;
  console.log('Fetching user uploads from:', url);
  try {
    const response = await apiFetch(url, {
      method: 'GET',
    });
    console.log('User uploads response:', response);
    return response;
  } catch (error) {
    console.error('Failed to fetch user uploads - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const getDoctorRequests = async () => {
  const url = '/images/doctor-requests';
  console.log('Fetching doctor requests from:', url);
  try {
    const response = await apiFetch(url, {
      method: 'GET',
    });
    console.log('Doctor requests response:', response);
    return response;
  } catch (error) {
    console.error('Failed to fetch doctor requests - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const getImageUploadById = async (id) => {
  const url = `/images/uploads/${id}`;
  console.log('Fetching image upload from:', url);
  try {
    const response = await apiFetch(url, {
      method: 'GET',
    });
    console.log('Image upload response:', response);
    return response;
  } catch (error) {
    console.error('Failed to fetch image upload - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const updateRequestStatus = async (id, status, comment) => {
  const url = `/images/update-request/${id}?status=${status}&doctor_comment=${encodeURIComponent(comment || '')}`;
  console.log('Updating request at:', url);
  try {
    const response = await apiFetch(url, {
      method: 'PUT',
    });
    console.log('Update request response:', response);
    return response;
  } catch (error) {
    console.error('Failed to update request - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export default {
  uploadImage,
  getUserUploads,
  getDoctorRequests,
  getImageUploadById,
  updateRequestStatus,
};