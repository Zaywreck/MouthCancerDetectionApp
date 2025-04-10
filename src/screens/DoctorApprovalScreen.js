import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { getImageUploadById, updateRequestStatus } from '../services/image';
import { BASE_URL } from '../services/api';

const DoctorApprovalScreen = () => {
  const route = useRoute();
  const { requestId } = route.params;
  const [request, setRequest] = useState(null);
  const [doctorComment, setDoctorComment] = useState('');

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await getImageUploadById(requestId);
        data.file_path = data.file_path.replace("uploads\\", "");
        setRequest(data);
      } catch (error) {
        console.error('Error fetching request:', error);
      }
    };
    fetchRequest();
  }, [requestId]);

  const handleApprove = async () => {
    try {
      await updateRequestStatus(requestId, 'approved', doctorComment);
      alert('Talep onaylandı!');
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async () => {
    try {
      await updateRequestStatus(requestId, 'rejected', doctorComment);
      alert('Talep reddedildi!');
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  if (!request) return <Text>Yükleniyor...</Text>;

  const uri = `${BASE_URL}/${request.file_path}`; // URI'yi dinamik olarak render sırasında hesapla

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.pageTitle}>Talep Detayı</Text>
      <Image source={{ uri }} style={styles.fullImage} />
      <Text style={styles.modelResult}>Model Sonucu: {request.model_result || 'Bilinmiyor'}</Text>
      <Text style={styles.modelResult}>Kullanıcı ID: {request.user_id}</Text>
      <Text style={styles.modelResult}>Talep Id: {request.id}</Text>
      <Text style={styles.modelResult}>Yükleme Tarihi: {new Date(request.uploaded_at).toLocaleString()}</Text>
      <TextInput
        style={styles.commentInput}
        placeholder="Yorumunuzu buraya yazın"
        value={doctorComment}
        onChangeText={setDoctorComment}
        multiline
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
          <Text style={styles.buttonText}>Onayla</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rejectButton} onPress={handleReject}>
          <Text style={styles.buttonText}>Reddet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 16, backgroundColor: '#F5FAFA' }, // flex yerine flexGrow kullanıldı
  pageTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#003087', marginBottom: 20 },
  fullImage: { width: '100%', height: 300, borderRadius: 8, marginBottom: 20 },
  modelResult: { fontSize: 16, color: '#666', marginBottom: 10 },
  commentInput: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, height: 100, textAlignVertical: 'top', marginBottom: 20 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around' },
  approveButton: { backgroundColor: '#28A745', padding: 12, borderRadius: 8 },
  rejectButton: { backgroundColor: '#DC3545', padding: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default DoctorApprovalScreen;