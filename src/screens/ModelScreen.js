import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Button, Image } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Kullanıcı durumu kontrolü için
import DoctorComments from '../components/DoctorComments'; // Yeni bileşeni dahil ediyoruz
import ImageUploader from '../components/ImageUploader'; // Yeni bileşeni dahil ediyoruz

const ModelScreen = () => {
  const { isLoggedIn } = useAuth();  // Kullanıcı giriş durumu
  const [image, setImage] = useState(null);
  const [modelResult, setModelResult] = useState(null);
  const [doctorComments, setDoctorComments] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [doctorQualification, setDoctorQualification] = useState('');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.uploadArea}>
        <Text style={styles.pageTitle}>Yapay Zeka Modeli ile Ağız Kanseri Tespiti</Text>

        {/* ImageUploader bileşenini burada kullanıyoruz */}
        <ImageUploader image={image} setImage={setImage} setModelResult={setModelResult} />

        {/* Sonuçlar */}
        <View style={styles.resultDisplayContainer}>
          <Text style={styles.sectionTitle}>Sonuçlar</Text>
          {modelResult?.image && (
            <Image source={{ uri: modelResult.image }} style={styles.resultImage} />
          )}
          {modelResult?.decision && <Text style={styles.decisionText}>Model Kararı: {modelResult.decision}</Text>}
        </View>
      </View>

      {isLoggedIn && (
        <View style={styles.doctorCommentsContainer}>
          <DoctorComments
            doctorComments={doctorComments}
            setDoctorComments={setDoctorComments}
            doctorName={doctorName}
            setDoctorName={setDoctorName}
            doctorQualification={doctorQualification}
            setDoctorQualification={setDoctorQualification}
            handleSaveComment={() => alert('Doktor yorumları kaydedildi!')}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F9FF', // Softer background color
  },
  uploadArea: {
    padding: 20,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2B2D42', // Darker text color
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2B2D42',
  },
  resultDisplayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#FF4C4C', // Red for the decision text
  },
  doctorCommentsContainer: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});

export default ModelScreen;
