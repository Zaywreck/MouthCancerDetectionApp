// components/ImageUploader.js
import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageUploader = ({ image, setImage, setModelResult, onSubmitSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Resim galerisi izni verilmedi!');
      return;
    }

    setLoading(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setModelResult({
          decision: 'Positive', // Örnek (API ile değiştirilecek)
          image: result.assets[0].uri,
        });
        setSubmitted(false);
      } else {
        alert('Resim seçimi iptal edildi');
      }
    } catch (error) {
      console.error('Error while picking image:', error);
      alert('Resim yükleme hatası!');
    } finally {
      setLoading(false);
    }
  };

  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Kamera izni verilmedi!');
      return;
    }

    setLoading(true);
    try {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setModelResult({
          decision: 'Positive', // Örnek (API ile değiştirilecek)
          image: result.assets[0].uri,
        });
        setSubmitted(false);
      } else {
        alert('Fotoğraf çekme iptal edildi');
      }
    } catch (error) {
      console.error('Error while taking photo:', error);
      alert('Fotoğraf çekme hatası!');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert('Lütfen bir resim yükleyin!');
      return;
    }

    setIsSubmitting(true);
    try {
      // API'ye gönderme simülasyonu
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        alert('Resim doktor onayına gönderildi!');
        if (onSubmitSuccess) onSubmitSuccess(); // Doktor onay ekranına yönlendirme
      }, 2000);
    } catch (error) {
      console.error('Error while submitting image:', error);
      alert('Resim gönderme hatası!');
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.imageUploadContainer}>
      <Text style={styles.sectionTitle}>Resim Yükle</Text>
      <Button title="Resim Seç" onPress={handleImageUpload} disabled={loading || isSubmitting} />
      <Button title="Fotoğraf Çek" onPress={handleTakePhoto} disabled={loading || isSubmitting} />
      
      {loading && <ActivityIndicator size="large" color="#007AFF" style={styles.loadingIndicator} />}
      
      {image && !loading && !submitted && (
        <Image source={{ uri: image }} style={styles.uploadedImage} />
      )}

      {image && !submitted && !isSubmitting && (
        <Button title="Doktor Onayına Gönder" onPress={handleSubmit} />
      )}

      {isSubmitting && (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loadingIndicator} />
      )}

      {submitted && !isSubmitting && (
        <Text style={styles.submittedText}>Resim doktor onayına gönderildi!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageUploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#003087',
  },
  uploadedImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  submittedText: {
    marginTop: 10,
    fontSize: 16,
    color: '#007AFF',
  },
});

export default ImageUploader;