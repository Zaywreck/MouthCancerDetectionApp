// src/screens/DoctorRequestsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getDoctorRequests, updateRequestStatus } from '../services/image'; // Import services

const DoctorRequestsScreen = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getDoctorRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const handleUpdateStatus = async (requestId, status) => {
    try {
      await updateRequestStatus(requestId, status);
      fetchRequests(); // Refresh list after update
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const renderRequest = ({ item }) => (
    <View style={styles.requestItem}>
      <Image source={{ uri: `file://${item.file_path}` }} style={styles.image} />
      <Text style={styles.resultText}>Model Result: {item.model_result || 'Unknown'}</Text>
      <Text style={styles.statusText}>Status: {item.status}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => handleUpdateStatus(item.id, 'approved')}
          style={[styles.actionButton, styles.approveButton]}
        >
          <Text style={styles.buttonText}>Onayla</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleUpdateStatus(item.id, 'rejected')}
          style={[styles.actionButton, styles.rejectButton]}
        >
          <Text style={styles.buttonText}>Reddet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Doktor Onay Bekleyenler</Text>
      <FlatList
        data={requests}
        renderItem={renderRequest}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Onay bekleyen istek yok.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003087',
    marginBottom: 20,
    textAlign: 'center',
  },
  requestItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  statusText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  approveButton: {
    backgroundColor: '#28A745',
  },
  rejectButton: {
    backgroundColor: '#DC3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default DoctorRequestsScreen;