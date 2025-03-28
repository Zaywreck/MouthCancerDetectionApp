// screens/DoctorRequestsScreen.js
import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';
import DoctorComments from '../components/DoctorComments';

const DoctorRequestsScreen = ({ route }) => {
  const { image, modelResult } = route.params || {}; // Örnek veri, gerçekte bir liste olacak
  const [doctorComments, setDoctorComments] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [doctorQualification, setDoctorQualification] = useState('');

  const handleSaveComment = () => {
    alert('Doktor yorumları kaydedildi!');
    // Burada yorumları backend'e kaydetme işlemi yapılabilir
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.requestArea}>
        <Text style={styles.pageTitle}>Doktor Talepleri</Text>
        {image ? (
          <>
            <Image source={{ uri: image }} style={styles.requestImage} />
            <Text style={styles.decisionText}>Model Kararı: {modelResult?.decision || 'Bilinmiyor'}</Text>
          </>
        ) : (
          <Text style={styles.noRequestText}>Henüz bir talep yok.</Text>
        )}
      </View>
      {image && (
        <View style={styles.commentsContainer}>
          <DoctorComments
            doctorComments={doctorComments}
            setDoctorComments={setDoctorComments}
            doctorName={doctorName}
            setDoctorName={setDoctorName}
            doctorQualification={doctorQualification}
            setDoctorQualification={setDoctorQualification}
            handleSaveComment={handleSaveComment}
            isDoctor={true}
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
    backgroundColor: '#F5F7FA',
  },
  requestArea: {
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
  requestImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  decisionText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#FF3B30',
    marginBottom: 10,
  },
  noRequestText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  commentsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
});

export default DoctorRequestsScreen;