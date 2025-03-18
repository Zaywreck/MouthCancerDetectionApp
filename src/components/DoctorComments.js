import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

const DoctorComments = ({
  doctorComments,
  setDoctorComments,
  doctorName,
  setDoctorName,
  doctorQualification,
  setDoctorQualification,
  handleSaveComment,
  isDoctor, // Doktor olup olmadığını kontrol ediyoruz
}) => {
  if (!isDoctor) {
    return (
      <View style={styles.notDoctorContainer}>
        <Text style={styles.notDoctorText}>Sadece doktorlar yorum yapabilir.</Text>
      </View>
    );
  }

  return (
    <View style={styles.doctorCommentsContainer}>
      <Text style={styles.sectionTitle}>Doktor Yorumları</Text>
      
      <TextInput
        value={doctorComments}
        onChangeText={setDoctorComments}
        placeholder="Doktor yorumlarını buraya yazınız..."
        style={styles.commentInput}
        multiline
      />
      
      <View style={styles.doctorInfo}>
        <TextInput
          value={doctorName}
          onChangeText={setDoctorName}
          placeholder="Doktor Adı"
          style={styles.inputField}
        />
        <TextInput
          value={doctorQualification}
          onChangeText={setDoctorQualification}
          placeholder="Doktor Unvanı"
          style={styles.inputField}
        />
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveComment}>
        <Text style={styles.saveButtonText}>Yorumları Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  doctorCommentsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F4F9F9', // Modern, açık ve ferah bir arka plan rengi
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#E3E8E8',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#2A3D56', // Medikal uygulamalar için koyu mavi tonları
  },
  commentInput: {
    height: 120,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    textAlignVertical: 'top',
    backgroundColor: '#FFFFFF',
  },
  doctorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#B0BEC5',
    borderRadius: 8,
    padding: 12,
    margin: 5,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#4CAF50', // Sağlık sektörüne uygun yeşil tonları
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notDoctorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notDoctorText: {
    fontSize: 18,
    color: '#FF3B30',
    fontWeight: 'bold',
  },
});

export default DoctorComments;
