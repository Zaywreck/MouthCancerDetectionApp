import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getDoctorRequests } from '../services/image';
import { BASE_URL } from '../services/api';

const DoctorRequestsScreen = () => {
  const [requests, setRequests] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getDoctorRequests();
        const updatedData = data.map((request) => ({
          ...request,
          file_path: request.file_path.replace("uploads\\", ""),
        }));
        setRequests(updatedData);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.pageTitle}>Doktor Talepleri</Text>
      {requests.length > 0 ? (
        requests.map((request) => {
          const uri = `${BASE_URL}/${request.file_path}`; // Her request için dinamik URI
          return (
            <TouchableOpacity
              key={request.id}
              style={styles.requestCard}
              onPress={() => navigation.navigate('DoctorApproval', { requestId: request.id })}
            >
              <Image source={{ uri }} style={styles.thumbnail} />
              <View style={styles.info}>
                <Text style={styles.username}>Kullanıcı ID: {request.user_id}</Text>
                <Text style={styles.date}>Yükleme Tarihi: {new Date(request.uploaded_at).toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          );
        })
      ) : (
        <Text style={styles.noRequestText}>Henüz bir talep yok.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F5F7FA' },
  pageTitle: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', color: '#003087', marginBottom: 20 },
  requestCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 8, padding: 10, marginBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  thumbnail: { width: 60, height: 60, borderRadius: 8 },
  info: { flex: 1, paddingHorizontal: 10 },
  username: { fontSize: 14, fontWeight: '600', color: '#003087' },
  date: { fontSize: 14, color: '#666', marginTop: 5 },
  noRequestText: { fontSize: 16, color: '#666', textAlign: 'center' },
});

export default DoctorRequestsScreen;