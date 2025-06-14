// src/components/ResultCard.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../services/api';

const ResultCard = ({ upload }) => {
  const [modalVisible, setModalVisible] = useState(false);
  let uri = BASE_URL + "/" + upload.file_path;

  const getStatusInfo = (status) => {
    switch (status) {
      case 'approved':
        return { text: 'Onaylandı', color: '#28A745', icon: 'checkmark-circle', bgColor: '#d4f6d4' };
      case 'rejected':
        return { text: 'Reddedildi', color: '#DC3545', icon: 'close-circle', bgColor: '#f8d7da' };
      default:
        return { text: 'Beklemede', color: '#FFC107', icon: 'time', bgColor: '#fff3cd' };
    }
  };

  const getPhotoTypeText = (isNormal) => {
    return isNormal ? 'Normal Fotoğraf' : 'Histopatolojik Fotoğraf';
  };

  const statusInfo = getStatusInfo(upload.status);

  return (
    <>
      <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
        <Image source={{ uri: uri }} style={styles.thumbnail} />
        
        <View style={styles.info}>
          <View style={styles.infoHeader}>
            <Text style={styles.uploadId}>Test #{upload.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusInfo.bgColor }]}>
              <Ionicons name={statusInfo.icon} size={14} color={statusInfo.color} />
              <Text style={[styles.statusText, { color: statusInfo.color }]}>
                {statusInfo.text}
              </Text>
            </View>
          </View>
          
          <Text style={styles.photoType}>
            📸 {getPhotoTypeText(upload.is_normal)}
          </Text>
          
          <Text style={styles.uploadDate}>
            📅 {new Date(upload.uploaded_at).toLocaleDateString('tr-TR')} - {' '}
            {new Date(upload.uploaded_at).toLocaleTimeString('tr-TR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
          
          {upload.model_result && (
            <Text style={styles.modelResult}>
              🤖 Model: {upload.model_result}
            </Text>
          )}
        </View>
        
        <View style={styles.expandIcon}>
          <Ionicons name="chevron-forward" size={20} color="#007AFF" />
        </View>
        </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Test Detayları</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Image */}
            <Image source={{ uri: uri }} style={styles.fullImage} />

            {/* Status Badge */}
            <View style={[styles.modalStatusBadge, { backgroundColor: statusInfo.bgColor }]}>
              <Ionicons name={statusInfo.icon} size={20} color={statusInfo.color} />
              <Text style={[styles.modalStatusText, { color: statusInfo.color }]}>
                {statusInfo.text}
              </Text>
            </View>

            {/* Info Rows */}
            <View style={styles.modalInfoContainer}>
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalInfoLabel}>Test ID:</Text>
                <Text style={styles.modalInfoValue}>{upload.id}</Text>
              </View>
              
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalInfoLabel}>Hasta ID:</Text>
                <Text style={styles.modalInfoValue}>{upload.user_id}</Text>
              </View>
              
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalInfoLabel}>Fotoğraf Türü:</Text>
                <Text style={styles.modalInfoValue}>{getPhotoTypeText(upload.is_normal)}</Text>
              </View>
              
              <View style={styles.modalInfoRow}>
                <Text style={styles.modalInfoLabel}>Yükleme Tarihi:</Text>
                <Text style={styles.modalInfoValue}>
                  {new Date(upload.uploaded_at).toLocaleDateString('tr-TR')} - {' '}
                  {new Date(upload.uploaded_at).toLocaleTimeString('tr-TR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </Text>
              </View>
              
              {upload.model_result && (
                <View style={styles.modalInfoRow}>
                  <Text style={styles.modalInfoLabel}>Model Sonucu:</Text>
                  <Text style={[styles.modalInfoValue, styles.modelResultText]}>
                    {upload.model_result}
                  </Text>
                </View>
              )}
              
              {upload.doctor_comments && (
                <View style={styles.commentSection}>
                  <Text style={styles.commentLabel}>Doktor Yorumu:</Text>
                  <Text style={styles.commentText}>{upload.doctor_comments}</Text>
                </View>
              )}
            </View>
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
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  infoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  uploadId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#003087',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  photoType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  uploadDate: {
    fontSize: 13,
    color: '#666',
    marginBottom: 3,
  },
  modelResult: {
    fontSize: 13,
    color: '#007AFF',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  expandIcon: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#003087',
  },
  closeButton: {
    padding: 5,
  },
  fullImage: {
    width: '100%',
    height: 250,
  },
  modalStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginVertical: 15,
    borderRadius: 8,
  },
  modalStatusText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  modalInfoContainer: {
    padding: 20,
  },
  modalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems: 'flex-start',
  },
  modalInfoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    flex: 1,
  },
  modalInfoValue: {
    fontSize: 14,
    color: '#003087',
    flex: 2,
    textAlign: 'right',
  },
  modelResultText: {
    color: '#007AFF',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  commentSection: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  commentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 8,
  },
  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default ResultCard;