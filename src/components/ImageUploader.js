// src/components/ImageUploader.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { uploadImage } from '../services/image';

const ImageUploader = ({ onSubmitSuccess }) => {
  const { userId } = useAuth(); // Get userId from context
  const [image, setImage] = useState(null);
  const [modelResult, setModelResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!image) {
      Alert.alert('Hata', 'Lütfen bir resim yükleyin!');
      return;
    }
    if (!userId) {
      Alert.alert('Hata', 'Kullanıcı kimliği bulunamadı. Lütfen giriş yapın.');
      return;
    }
    setIsSubmitting(true);
    try {
      await uploadImage(userId, image, modelResult?.decision);
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
      {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.submitButton, isSubmitting && styles.disabledButton]}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Gönderiliyor...' : 'Doktor Onayına Gönder'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
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