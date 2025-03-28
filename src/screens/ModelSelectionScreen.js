// screens/ModelSelectionScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

const ModelSelectionScreen = ({ navigation }) => {
  const { userType } = useAuth();

  const options = [
    {
      title: 'Modeli Dene',
      description: 'Yapay zeka modelini test et',
      icon: 'brain-outline',
      route: 'ModelTest',
      visible: true, // Herkes görebilir
    },
    {
      title: 'Doktor Talepleri',
      description: 'Gelen hasta taleplerini incele',
      icon: 'document-text-outline',
      route: 'DoctorRequests',
      visible: userType === 'doctor', // Sadece doktorlar görebilir
    },
    {
      title: 'Doktor Deneme',
      description: 'Doktorlar için test ekranı',
      icon: 'medkit-outline',
      route: 'DoctorTest',
      visible: userType === 'doctor', // Sadece doktorlar görebilir
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Model Seçenekleri</Text>
      <Text style={styles.subtitle}>Lütfen bir seçenek belirleyin</Text>
      <View style={styles.optionsContainer}>
        {options
          .filter((option) => option.visible)
          .map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionCard}
              onPress={() => navigation.navigate(option.route)}
            >
              <Ionicons name={option.icon} size={28} color="#007AFF" style={styles.optionIcon} />
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>{option.title}</Text>
                <Text style={styles.optionDescription}>{option.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003087',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionsContainer: {
    width: '100%',
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003087',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default ModelSelectionScreen;