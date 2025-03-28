// src/services/image.js
import apiFetch from './api';

export const uploadImage = async (userId, imageUri, modelResult) => {
  const formData = new FormData();
  formData.append('user_id', userId);
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  });
  if (modelResult) {
    formData.append('model_result', modelResult);
  }

  return apiFetch('/images/upload', {
    method: 'POST',
    body: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getDoctorRequests = async () => {
  return apiFetch('/images/doctor-requests', {
    method: 'GET',
  });
};

export const updateRequestStatus = async (requestId, status) => {
  return apiFetch(`/images/update-request/${requestId}?status=${status}`, {
    method: 'PUT',
  });
};