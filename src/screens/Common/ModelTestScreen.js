// src/screens/ModelTestScreen.js
import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageUploader from '../../components/ImageUploader';

const ModelTestScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [isNormal, setIsNormal] = useState(true); // true for normal photo, false for histopathology

  const handleSubmitSuccess = () => {
    navigation.navigate('Results');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.uploadArea}>
        <Text style={styles.pageTitle}>Yapay Zeka Modeli ile Test</Text>
        
        {/* Photo Type Selection */}
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionTitle}>Fotoğraf Türü Seçin</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[styles.optionButton, isNormal && styles.activeOption]}
              onPress={() => setIsNormal(true)}
            >
              <Ionicons 
                name="camera-outline" 
                size={24} 
                color={isNormal ? '#fff' : '#007AFF'} 
              />
              <Text style={[styles.optionText, isNormal && styles.activeOptionText]}>
                Normal Fotoğraf
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.optionButton, !isNormal && styles.activeOption]}
              onPress={() => setIsNormal(false)}
            >
              <Ionicons 
                name="medical-outline" 
                size={24} 
                color={!isNormal ? '#fff' : '#007AFF'} 
              />
              <Text style={[styles.optionText, !isNormal && styles.activeOptionText]}>
                Histopatolojik Fotoğraf
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ImageUploader
          setImage={setImage}
          onSubmitSuccess={handleSubmitSuccess}
          isNormal={isNormal}
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
  selectionContainer: {
    marginBottom: 20,
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003087',
    textAlign: 'center',
    marginBottom: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
  },
  activeOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
    textAlign: 'center',
  },
  activeOptionText: {
    color: '#fff',
  },
});

export default ModelTestScreen;