// src/screens/ModelTestScreen.js
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import ImageUploader from '../components/ImageUploader';

const ModelTestScreen = ({ navigation }) => {
  const { userType } = useAuth();
  const [image, setImage] = useState(null);
  const [modelResult, setModelResult] = useState(null);

  const handleSubmitSuccess = () => {
    navigation.navigate('Results');
  };

  if (userType === 'doctor') {
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.uploadArea}>
        <Text style={styles.pageTitle}>Yapay Zeka Modeli ile Test</Text>
        <ImageUploader
          setImage={setImage}
          setModelResult={setModelResult}
          onSubmitSuccess={handleSubmitSuccess}
        />
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
});

export default ModelTestScreen;