import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const DoctorComments = ({
  doctorComments,
  setDoctorComments,
  doctorName,
  setDoctorName,
  doctorQualification,
  setDoctorQualification,
  handleSaveComment,
}) => {
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
      <Button title="Yorumları Kaydet" onPress={handleSaveComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  doctorCommentsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2B2D42',
  },
  commentInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
  },
  doctorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  inputField: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
});

export default DoctorComments;
