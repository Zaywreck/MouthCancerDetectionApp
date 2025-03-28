// src/components/ImageUploader.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { uploadImage } from '../services/image';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImageUploader = ({ setImage, setModelResult, onSubmitSuccess, skipSubmit = false }) => {
  const { userId } = useAuth();
  const [localImage, setLocalImage] = useState(null); // Local state for preview
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = () => {
    Alert.alert(
      'Resim Seç',
      'Bir seçenek belirleyin',
      [
        { text: 'Kamera', onPress: () => openCamera() },
        { text: 'Galeri', onPress: () => openGallery() },
        { text: 'İptal', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const openCamera = () => {
    launchCamera({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Hata', 'Kamera açılamadı: ' + response.errorMessage);
        return;
      }
      const uri = response.assets[0].uri;
      setLocalImage(uri);
      setImage(uri); // Update parent state
      // Simulate model result (replace with actual AI model call)
      const result = { decision: 'Positive', image: uri };
      setModelResult(result);
    });
  };

  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Hata', 'Galeri açılamadı: ' + response.errorMessage);
        return;
      }
      const uri = response.assets[0].uri;
      setLocalImage(uri);
      setImage(uri); // Update parent state
      // Simulate model result (replace with actual AI model call)
      const result = { decision: 'Positive', image: uri };
      setModelResult(result);
    });
  };

  const handleSubmit = async () => {
    if (!localImage) {
      Alert.alert('Hata', 'Lütfen bir resim yükleyin!');
      return;
    }
    if (skipSubmit) {
      // Skip backend submission for doctor testing
      Alert.alert('Başarılı', 'Model testi tamamlandı!');
      if (onSubmitSuccess) onSubmitSuccess();
      return;
    }
    if (!userId) {
      Alert.alert('Hata', 'Kullanıcı kimliği bulunamadı. Lütfen giriş yapın.');
      return;
    }
    setIsSubmitting(true);
    try {
      await uploadImage(userId, localImage, modelResult?.decision);
      setIsSubmitting(false);
      Alert.alert('Başarılı', 'Resim doktor onayına gönderildi!');
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error('Error submitting image:', error);
      Alert.alert('Hata', error.message || 'Resim gönderme hatası!');
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {!localImage ? (
        <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
          <Text style={styles.uploadText}>Resim Yükle</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Image source={{ uri: localImage }} style={styles.imagePreview} />
          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.submitButton, isSubmitting && styles.disabledButton]}
            disabled={isSubmitting}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Gönderiliyor...' : skipSubmit ? 'Test Et' : 'Doktor Onayına Gönder'}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#B0BEC5',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ImageUploader;