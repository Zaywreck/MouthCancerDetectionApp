// src/screens/HistopathologyTestScreen.js
import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import ImageUploader from '../../components/ImageUploader';

const HistopathologyTestScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);

  const handleSubmitSuccess = () => {
    navigation.navigate('Results');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.uploadArea}>
        <Text style={styles.pageTitle}>Histopatolojik Görüntü Testi</Text>
        <ImageUploader
          setImage={setImage}
          onSubmitSuccess={handleSubmitSuccess}
          isNormal={false}  // Histopatolojik fotoğraf
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

export default HistopathologyTestScreen;