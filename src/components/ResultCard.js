// src/components/ResultCard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';

const ResultCard = ({ upload }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.card}>
        <Image source={{ uri: `http://192.168.1.108:8000/uploads/${upload.file_path}` }} style={styles.thumbnail} />
        <View style={styles.info}>
          <Text style={styles.username}>Kullanıcı ID: {upload.user_id}</Text>
          <Text style={styles.diagnosis}>Doktor Teşhisi: {upload.status === 'approved' ? 'Onaylandı' : upload.status === 'rejected' ? 'Reddedildi' : 'Beklemede'}</Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.expandButton}>
          <Text style={styles.expandText}>Genişlet</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={{ uri: `http://192.168.1.108:8000/uploads/${upload.file_path}` }} style={styles.fullImage} />
            <Text style={styles.modalText}>Kullanıcı ID: {upload.user_id}</Text>
            <Text style={styles.modalText}>Doktor Teşhisi: {upload.status === 'approved' ? 'Onaylandı' : upload.status === 'rejected' ? 'Reddedildi' : 'Beklemede'}</Text>
            <Text style={styles.modalText}>Model Sonucu: {upload.model_result || 'Bilinmiyor'}</Text>
            <Text style={styles.modalText}>Yükleme Tarihi: {new Date(upload.uploaded_at).toLocaleString()}</Text>
            <Text style={styles.modalText}>Yorum: {upload.doctor_comments || 'Yok'}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Kapat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  info: {
    flex: 1,
    paddingHorizontal: 10,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#003087',
  },
  diagnosis: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  expandButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  expandText: {
    color: '#fff',
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  closeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ResultCard;