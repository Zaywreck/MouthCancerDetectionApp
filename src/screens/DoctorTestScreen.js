// src/screens/DoctorTestScreen.js
import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import ImageUploader from '../components/ImageUploader';

const DoctorTestScreen = () => {
  const [image, setImage] = useState(null);
  const [modelResult, setModelResult] = useState(null);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.uploadArea}>
        <Text style={styles.pageTitle}>Doktorlar için Model Testi</Text>
        <ImageUploader
          setImage={setImage}
          setModelResult={setModelResult}
          skipSubmit={true} // No backend submission
        />
        <View style={styles.resultDisplayContainer}>
          <Text style={styles.sectionTitle}>Sonuçlar</Text>
          {modelResult?.image && (
            <Image source={{ uri: modelResult.image }} style={styles.resultImage} />
          )}
          {modelResult?.decision && (
            <Text style={styles.decisionText}>Model Kararı: {modelResult.decision}</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F7FA',
  },
  uploadArea: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#003087',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#003087',
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
    color: '#FF3B30',
  },
});

export default DoctorTestScreen;