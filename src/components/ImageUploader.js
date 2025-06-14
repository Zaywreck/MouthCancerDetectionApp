// src/components/ImageUploader.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { uploadImage } from '../services/image';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { Ionicons } from '@expo/vector-icons';

const ImageUploader = ({ 
  setImage, 
  onSubmitSuccess, 
  isNormal = true, 
  skipSubmit = false, 
  setModelResult = null 
}) => {
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
      allowsEditing: true, // Enable editing/cropping
      aspect: [4, 3], // Set aspect ratio for cropping
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setLocalImage(uri);
      setImage(uri);
      
      // For doctor mode, simulate model result
      if (skipSubmit && setModelResult) {
        simulateModelResult(uri);
      }
    }
  };

  const openGallery = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true, // Enable editing/cropping
      aspect: [4, 3], // Set aspect ratio for cropping
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setLocalImage(uri);
      setImage(uri);
      
      // For doctor mode, simulate model result
      if (skipSubmit && setModelResult) {
        simulateModelResult(uri);
      }
    }
  };

  // Simulate model result for doctor testing
  const simulateModelResult = (imageUri) => {
    const mockResults = [
      { decision: 'Kanser Riski Yüksek', confidence: '87%' },
      { decision: 'Normal Görünüm', confidence: '92%' },
      { decision: 'Şüpheli Lezyon', confidence: '76%' },
      { decision: 'İnceleme Gerekli', confidence: '68%' },
    ];
    
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    
    if (setModelResult) {
      setModelResult({
        image: imageUri,
        decision: randomResult.decision,
        confidence: randomResult.confidence,
        type: isNormal ? 'Normal' : 'Histopatolojik',
        timestamp: new Date().toISOString(),
      });
    }
  };

  const cropImage = async () => {
    if (!localImage) return;

    Alert.alert(
      'Resmi Kırp',
      'Resmi kırpmak için galeriyi açacağız. Lütfen aynı resmi seçin ve kırpın.',
      [
        { text: 'Devam Et', onPress: () => openCropMode() },
        { text: 'İptal', style: 'cancel' },
      ]
    );
  };

  const openCropMode = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, // Enable editing/cropping
        aspect: [4, 3], // Set aspect ratio for cropping
        quality: 1,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setLocalImage(uri);
        setImage(uri);
        
        // Update model result for doctor mode after cropping
        if (skipSubmit && setModelResult) {
          simulateModelResult(uri);
        }
      }
    } catch (error) {
      console.error('Crop mode error:', error);
      Alert.alert('Hata', 'Kırpma sırasında bir hata oluştu.');
    }
  };

  const enhanceImage = async () => {
    if (!localImage) return;

    try {
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        localImage,
        [
          { resize: { width: 800 } }, // Resize to optimal width
        ],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      setLocalImage(manipulatedImage.uri);
      setImage(manipulatedImage.uri);
      Alert.alert('Başarılı', 'Resim iyileştirildi!');
      
      // Update model result for doctor mode after enhancement
      if (skipSubmit && setModelResult) {
        simulateModelResult(manipulatedImage.uri);
      }
    } catch (error) {
      console.error('Enhancement error:', error);
      Alert.alert('Hata', 'Resim iyileştirme sırasında bir hata oluştu.');
    }
  };

  const retakePhoto = () => {
    setLocalImage(null);
    setImage(null);
    
    // Clear model result for doctor mode
    if (skipSubmit && setModelResult) {
      setModelResult(null);
    }
  };

  const handleSubmit = async () => {
    if (skipSubmit) {
      Alert.alert('Bilgi', 'Bu doktor test modudur. Gerçek sunucu gönderimi yapılmaz.');
      return;
    }
    
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
          <Ionicons name="camera-outline" size={24} color="#fff" style={styles.uploadIcon} />
          <Text style={styles.uploadText}>Resim Yükle</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Image source={{ uri: localImage }} style={styles.imagePreview} />
          
          {/* Image action buttons */}
          <View style={styles.imageActions}>
            <TouchableOpacity onPress={cropImage} style={styles.actionButton}>
              <Ionicons name="crop-outline" size={20} color="#007AFF" />
              <Text style={styles.actionButtonText}>Kırp</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={enhanceImage} style={styles.actionButton}>
              <Ionicons name="sparkles-outline" size={20} color="#007AFF" />
              <Text style={styles.actionButtonText}>İyileştir</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={retakePhoto} style={styles.actionButton}>
              <Ionicons name="refresh-outline" size={20} color="#007AFF" />
              <Text style={styles.actionButtonText}>Yeniden</Text>
            </TouchableOpacity>
          </View>

          {!skipSubmit ? (
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.submitButton, isSubmitting && styles.disabledButton]}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? 'Gönderiliyor...' : 'Doktor Onayına Gönder'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.doctorModeInfo}>
              <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
              <Text style={styles.doctorModeText}>
                Doktor Test Modu - Sonuçlar aşağıda görüntülenecek
              </Text>
            </View>
          )}
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  uploadIcon: {
    marginRight: 8,
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
    marginBottom: 15,
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
    flex: 1,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#007AFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
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
  doctorModeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  doctorModeText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    textAlign: 'center',
  },
});

export default ImageUploader;