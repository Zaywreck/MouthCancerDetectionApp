import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../context/AuthContext'; // Kullanıcı durumu kontrolü için
import DoctorComments from '../components/DoctorComments'; // Yeni bileşeni dahil ediyoruz

const ModelScreen = () => {
  const { isLoggedIn } = useAuth();  // Kullanıcı giriş durumu
  const [image, setImage] = useState(null);
  const [modelResult, setModelResult] = useState(null);
  const [doctorComments, setDoctorComments] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [doctorQualification, setDoctorQualification] = useState('');

  useEffect(() => {
    // Uygulama açıldığında izinleri kontrol et
    const checkPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Resim galerisi izni verilmedi!');
      }

      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== 'granted') {
        alert('Kamera izni verilmedi!');
      }
    };

    checkPermissions();
  }, []);

  const handleImageUpload = async () => {
    // Resim seçme işlemine başlamadan önce izin kontrolü
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Resim galerisi izni verilmedi!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Mocking the model result
      setModelResult({
        decision: 'Positive',
        image: result.assets[0].uri, // Show uploaded image as result for simplicity
      });
    }
  };

  const handleTakePhoto = async () => {
    // Kamera izni kontrolü
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Kamera izni verilmedi!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Mocking the model result
      setModelResult({
        decision: 'Positive',
        image: result.assets[0].uri, // Show taken photo as result for simplicity
      });
    }
  };

  const handleSaveComment = () => {
    alert('Doktor yorumları kaydedildi!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.uploadArea}>
        <Text style={styles.pageTitle}>Yapay Zeka Modeli ile Ağız Kanseri Tespiti</Text>
        <View style={styles.content}>
          <View style={styles.imageUploadContainer}>
            <Text style={styles.sectionTitle}>Resim Yükle</Text>
            <Button title="Resim Seç" onPress={handleImageUpload} />
            <Button title="Fotoğraf Çek" onPress={handleTakePhoto} />
            {image && <Image source={{ uri: image }} style={styles.uploadedImage} />}
          </View>

          <View style={styles.resultDisplayContainer}>
            <Text style={styles.sectionTitle}>Sonuçlar</Text>
            {modelResult?.image && (
              <Image source={{ uri: modelResult.image }} style={styles.resultImage} />
            )}
            {modelResult?.decision && <Text style={styles.decisionText}>Model Kararı: {modelResult.decision}</Text>}
          </View>
        </View>
      </View>
      <View style={styles.doctorCommentsContainer}>
        {isLoggedIn && (
          <DoctorComments
            doctorComments={doctorComments}
            setDoctorComments={setDoctorComments}
            doctorName={doctorName}
            setDoctorName={setDoctorName}
            doctorQualification={doctorQualification}
            setDoctorQualification={setDoctorQualification}
            handleSaveComment={handleSaveComment}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f9ff',
  },
  uploadArea: {
    paddingTop: 10,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    boxShadow: '2 4px 6px rgba(0, 0, 0, 0.32)',
  },
  doctorCommentsContainer: {
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    boxShadow: '2 4px 6px rgba(0, 0, 0, 0.32)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  imageUploadContainer: {
    flex: 1,
    alignItems: 'center',
  },
  uploadedImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  resultDisplayContainer: {
    flex: 1,
    alignItems: 'center',
  },
  resultImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  decisionText: {
    fontSize: 16,
    marginTop: 10,
    color: 'black',
  },
});

export default ModelScreen;
