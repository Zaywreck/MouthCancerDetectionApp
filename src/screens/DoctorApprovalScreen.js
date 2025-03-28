// screens/DoctorApprovalScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const DoctorApprovalScreen = ({ route }) => {
  const { image, modelResult } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doktor Onayı Bekleniyor</Text>
      {image && (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={styles.decisionText}>Model Kararı: {modelResult?.decision || 'Bilinmiyor'}</Text>
        </>
      )}
      <Text style={styles.infoText}>Resminiz doktor onayı için gönderildi. Lütfen bekleyin.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003087',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  decisionText: {
    fontSize: 16,
    color: '#FF3B30',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default DoctorApprovalScreen;