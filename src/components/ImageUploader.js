import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ImageUploader = ({ image, setImage, setModelResult }) => {
  const [loading, setLoading] = useState(false); // Yükleniyor durumu
  const [submitted, setSubmitted] = useState(false); // Gönderildi durumu
  const [isSubmitting, setIsSubmitting] = useState(false); // API'ye gönderme işlemi durumu

  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Resim galerisi izni verilmedi!');
      return;
    }

    setLoading(true); // Yükleme başladığını belirtiyoruz
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Düzgün kullanım
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setModelResult({
          decision: 'Positive', // Örnek model sonucu
          image: result.assets[0].uri,
        });
        setSubmitted(false); // Resim seçildikten sonra gönder butonunu etkinleştir
      } else {
        alert('Resim seçimi iptal edildi');
      }
    } catch (error) {
      console.error("Error while picking image:", error);
      alert('Resim yükleme hatası!');
    } finally {
      setLoading(false); // Yükleme işlemi bitti
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
          decision: 'Positive', // Örnek model sonucu
          image: result.assets[0].uri,
        });
        setSubmitted(false); // Fotoğraf çekildikten sonra gönder butonunu etkinleştir
      } else {
        alert('Fotoğraf çekme iptal edildi');
      }
    } catch (error) {
      console.error("Error while taking photo:", error);
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
    
    setIsSubmitting(true); // Gönderme işlemine başla

    try {
      // Burada API'ye gönderme işlemi yapılabilir.
      // Örnek: await api.uploadImage(image);

      // Simülasyon olarak 2 saniye bekliyoruz
      setTimeout(() => {
        setIsSubmitting(false); // İşlem tamamlandı
        setSubmitted(true); // Gönderim tamamlandı
        alert('Resim başarıyla gönderildi!');
      }, 2000);
    } catch (error) {
      console.error("Error while submitting image:", error);
      alert('Resim gönderme hatası!');
      setIsSubmitting(false); // Hata durumunda işlemi sonlandır
    }
  };

  return (
    <View style={styles.imageUploadContainer}>
      <Text style={styles.sectionTitle}>Resim Yükle</Text>
      <Button title="Resim Seç" onPress={handleImageUpload} />
      <Button title="Fotoğraf Çek" onPress={handleTakePhoto} />
      
      {loading && <ActivityIndicator size="large" color="#FF4C4C" style={styles.loadingIndicator} />}
      
      {image && !loading && !submitted && (
        <Image source={{ uri: image }} style={styles.uploadedImage} />
      )}

      {/* Gönder butonunu ekliyoruz */}
      {image && !submitted && !isSubmitting && (
        <Button title="Gönder" onPress={handleSubmit} />
      )}

      {/* Yükleniyor göstergesi */}
      {isSubmitting && (
        <ActivityIndicator size="large" color="#FF4C4C" style={styles.loadingIndicator} />
      )}

      {/* Gönderildikten sonra başarı mesajı */}
      {submitted && !isSubmitting && (
        <Text style={styles.submittedText}>Resim başarıyla gönderildi!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageUploadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2B2D42',
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
    color: 'green',
  },
});

export default ImageUploader;
