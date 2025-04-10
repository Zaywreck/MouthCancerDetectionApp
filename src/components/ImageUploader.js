// src/components/ImageUploader.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { uploadImage } from '../services/image';
import * as ImagePicker from 'expo-image-picker';

const ImageUploader = ({ setImage, onSubmitSuccess, isNormal = true }) => {
  const { userId, userType } = useAuth();
  const [localImage, setLocalImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (cameraStatus !== 'granted' || galleryStatus !== 'granted') {
      Alert.alert('Hata', 'Kamera veya galeri izni verilmedi!');
      return false;
    }
    return true;
  };

  const pickImage = () => {
    if (userType === 'guest') {
      Alert.alert('Kayıt Olun', 'Fotoğraf yüklemek için kayıt olmanız gerekmektedir.');
      return;
    }
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

  const openCamera = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setLocalImage(uri);
      setImage(uri);
    }
  };

  const openGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setLocalImage(uri);
      setImage(uri);
    }
  };

  const handleSubmit = async () => {
    if (!localImage) {
      Alert.alert('Hata', 'Lütfen bir resim yükleyin!');
      return;
    }
    if (userType === 'guest') {
      Alert.alert('Kayıt Olun', 'Fotoğraf yüklemek için kayıt olmanız gerekmektedir.');
      return;
    }
    if (!userId) {
      Alert.alert('Hata', 'Kullanıcı kimliği bulunamadı. Lütfen giriş yapın.');
      return;
    }
    setIsSubmitting(true);
    try {
      console.log('Submitting image with userId:', userId, 'URI:', localImage, 'isNormal:', isNormal);
      await uploadImage(userId, localImage, isNormal);
      setIsSubmitting(false);
      Alert.alert('Başarılı', 'Resim doktor onayına gönderildi!');
      if (onSubmitSuccess) onSubmitSuccess();
    } catch (error) {
      console.error('Full error details:', error);
      setIsSubmitting(false);
      Alert.alert('Hata', error.message || 'Bilinmeyen bir hata oluştu!');
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
              {isSubmitting ? 'Gönderiliyor...' : 'Doktor Onayına Gönder'}
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