// src/services/image.js
import apiFetch, { BASE_URL } from './api';

export const uploadImage = async (userId, imageUri, isNormal = true, isDoctorTest = false) => {
  const url = `/images/upload?user_id=${userId}`;
  // console.log('Uploading image to:', url);

  const formData = new FormData();
  
  // Android için daha uyumlu FormData format
  const fileData = {
    uri: imageUri,
    type: 'image/jpeg',
    name: `upload_${userId}.jpg`,
  };
  
  formData.append('file', fileData);
  formData.append('is_normal', isNormal.toString());
  formData.append('is_doctor_test', isDoctorTest.toString());

  try {
    // FormData upload için özel fetch call
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      body: formData,
      headers: {
        // FormData için Content-Type header'ı otomatik set edilir
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload API error response:', errorText);
      throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
    }

    const result = await response.json();
    // console.log('Upload successful, response:', result);
    return result;
  } catch (error) {
    console.error('Upload failed - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const getUserUploads = async (userId) => {
  const url = `/images/user-uploads?user_id=${userId}`;
  // console.log('Fetching user uploads from:', url);
  try {
    const response = await apiFetch(url, {
      method: 'GET',
    });
    // console.log('User uploads response:', response);
    return response;
  } catch (error) {
    console.error('Failed to fetch user uploads - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const getDoctorRequests = async (status = null) => {
  let url = '/images/doctor-requests';
  if (status) {
    url += `?status=${status}`;
  }
  // console.log('Fetching doctor requests from:', url);
  try {
    const response = await apiFetch(url, {
      method: 'GET',
    });
    // console.log('Doctor requests response:', response);
    return response;
  } catch (error) {
    console.error('Failed to fetch doctor requests - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const getDoctorRequestStatistics = async () => {
  const url = '/images/doctor-request-statistics';
  // console.log('Fetching doctor request statistics from:', url);
  try {
    const response = await apiFetch(url, {
      method: 'GET',
    });
    // console.log('Doctor request statistics response:', response);
    return response;
  } catch (error) {
    console.error('Failed to fetch doctor request statistics - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const getImageUploadById = async (id) => {
  const url = `/images/upload/${id}`;
  // console.log('Fetching image upload from:', url);
  try {
    const response = await apiFetch(url, {
      method: 'GET',
    });
    // console.log('Image upload response:', response);
    return response;
  } catch (error) {
    console.error('Failed to fetch image upload - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const updateRequestStatus = async (id, status, comment) => {
  const url = `/images/update-request/${id}?status=${status}&doctor_comment=${encodeURIComponent(comment || '')}`;
  // console.log('Updating request at:', url);
  try {
    const response = await apiFetch(url, {
      method: 'PUT',
    });
    // console.log('Update request response:', response);
    return response;
  } catch (error) {
    console.error('Failed to update request - URL:', url, 'Error:', error.message);
    throw error;
  }
};

// Doktor test fonksiyonları

export const doctorTestClassification = async (doctorId, imageUri, isNormal = true) => {
  const url = `/images/doctor-test-classification?doctor_id=${doctorId}`;
  // console.log('Doctor testing classification at:', url);

  const formData = new FormData();
  
  // Android için daha uyumlu FormData format
  const fileData = {
    uri: imageUri,
    type: 'image/jpeg',
    name: `doctor_test_${doctorId}.jpg`,
  };
  
  formData.append('file', fileData);
  formData.append('is_normal', isNormal.toString());

  try {
    // FormData upload için özel fetch call
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      body: formData,
      headers: {
        // FormData için Content-Type header'ı otomatik set edilir
        // Manuel set etmeyin, boundary parameter'ı eksik olur
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Doctor test API error response:', errorText);
      throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
    }

    const result = await response.json();
    // console.log('Doctor test response:', result);
    return result;
  } catch (error) {
    console.error('Failed to run doctor test - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const getDoctorTestHistory = async (doctorId) => {
  const url = `/images/doctor-test-history?doctor_id=${doctorId}`;
  // console.log('Fetching doctor test history from:', url);
  try {
    const response = await apiFetch(url, {
      method: 'GET',
    });
    // console.log('Doctor test history response:', response);
    return response;
  } catch (error) {
    console.error('Failed to fetch doctor test history - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const getModelStatus = async () => {
  const url = '/images/model-status';
  // console.log('Checking model status at:', url);
  try {
    const response = await apiFetch(url, {
      method: 'GET',
    });
    // console.log('Model status response:', response);
    return response;
  } catch (error) {
    console.error('Failed to get model status - URL:', url, 'Error:', error.message);
    throw error;
  }
};

// Mevcut fonksiyonlar...

export const reclassifyImage = async (uploadId) => {
  const url = `/images/reclassify/${uploadId}`;
  // console.log('Reclassifying image at:', url);
  try {
    const response = await apiFetch(url, {
      method: 'POST',
    });
    // console.log('Reclassify response:', response);
    return response;
  } catch (error) {
    console.error('Failed to reclassify image - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const getClassificationResult = async (uploadId) => {
  const url = `/images/classification/${uploadId}`;
  // console.log('Getting classification result from:', url);
  try {
    const response = await apiFetch(url, {
      method: 'GET',
    });
    // console.log('Classification result response:', response);
    return response;
  } catch (error) {
    console.error('Failed to get classification result - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const testClassification = async (imagePath, debug = true) => {
  const url = `/images/test-classification?image_path=${encodeURIComponent(imagePath)}&debug=${debug}`;
  // console.log('Testing classification at:', url);
  try {
    const response = await apiFetch(url, {
      method: 'POST',
    });
    // console.log('Test classification response:', response);
    return response;
  } catch (error) {
    console.error('Failed to test classification - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export const clearModelCache = async () => {
  const url = '/images/clear-model-cache';
  // console.log('Clearing model cache at:', url);
  try {
    const response = await apiFetch(url, {
      method: 'POST',
    });
    // console.log('Clear cache response:', response);
    return response;
  } catch (error) {
    console.error('Failed to clear model cache - URL:', url, 'Error:', error.message);
    throw error;
  }
};

export default {
  uploadImage,
  getUserUploads,
  getDoctorRequests,
  getDoctorRequestStatistics,
  getImageUploadById,
  updateRequestStatus,
  doctorTestClassification,
  getDoctorTestHistory,
  getModelStatus,
  reclassifyImage,
  getClassificationResult,
  testClassification,
  clearModelCache,
};