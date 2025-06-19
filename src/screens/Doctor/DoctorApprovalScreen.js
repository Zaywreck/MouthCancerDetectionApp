import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getImageUploadById, updateRequestStatus } from '../../services/image';
import { BASE_URL } from '../../services/api';

const DoctorApprovalScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { requestId } = route.params;
  const [request, setRequest] = useState(null);
  const [doctorComment, setDoctorComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        setLoading(true);
        console.log('Fetching request with ID:', requestId);
        const data = await getImageUploadById(requestId);
        console.log('Received request data:', data);
        data.file_path = data.file_path.replace("uploads\\", "");
        setRequest(data);
      } catch (error) {
        console.error('Error fetching request with ID:', requestId, 'Error:', error);
        Alert.alert('Hata', `Talep bilgileri yüklenirken bir hata oluştu. Talep ID: ${requestId}`);
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [requestId]);

  const handleApprove = async () => {
    if (!doctorComment.trim()) {
      Alert.alert('Uyarı', 'Lütfen onay yorumunuzu yazın.');
      return;
    }

    Alert.alert(
      'Talebi Onayla',
      'Bu talebi onaylamak istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Onayla', 
          style: 'default',
          onPress: async () => {
            try {
              setSubmitting(true);
              await updateRequestStatus(requestId, 'approved', doctorComment);
              Alert.alert(
                'Başarılı', 
                'Talep başarıyla onaylandı!',
                [{ text: 'Tamam', onPress: () => navigation.goBack() }]
              );
            } catch (error) {
              console.error('Error approving request:', error);
              Alert.alert('Hata', 'Talep onaylanırken bir hata oluştu.');
            } finally {
              setSubmitting(false);
            }
          }
        }
      ]
    );
  };

  const handleReject = async () => {
    if (!doctorComment.trim()) {
      Alert.alert('Uyarı', 'Lütfen red gerekçenizi yazın.');
      return;
    }

    Alert.alert(
      'Talebi Reddet',
      'Bu talebi reddetmek istediğinizden emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Reddet', 
          style: 'destructive',
          onPress: async () => {
            try {
              setSubmitting(true);
              await updateRequestStatus(requestId, 'rejected', doctorComment);
              Alert.alert(
                'Başarılı', 
                'Talep başarıyla reddedildi!',
                [{ text: 'Tamam', onPress: () => navigation.goBack() }]
              );
            } catch (error) {
              console.error('Error rejecting request:', error);
              Alert.alert('Hata', 'Talep reddedilirken bir hata oluştu.');
            } finally {
              setSubmitting(false);
            }
          }
        }
      ]
    );
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'approved':
        return { text: 'Onaylandı', color: '#28A745', icon: 'checkmark-circle' };
      case 'rejected':
        return { text: 'Reddedildi', color: '#DC3545', icon: 'close-circle' };
      default:
        return { text: 'Beklemede', color: '#FFC107', icon: 'time-outline' };
    }
  };

  const getPhotoTypeText = (isNormal) => {
    return isNormal ? 'Normal Fotoğraf' : 'Histopatolojik Fotoğraf';
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Talep detayları yükleniyor...</Text>
      </View>
    );
  }

  if (!request) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#DC3545" />
        <Text style={styles.errorText}>Talep bulunamadı</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const uri = `${BASE_URL}/${request.file_path}`;
  const statusInfo = getStatusInfo(request.status);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.headerBackButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#003087" />
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Talep Detayı</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <Ionicons name={statusInfo.icon} size={24} color={statusInfo.color} />
          <Text style={[styles.statusText, { color: statusInfo.color }]}>
            {statusInfo.text}
          </Text>
        </View>

        {/* Image Card */}
        <View style={styles.imageCard}>
          <Image source={{ uri }} style={styles.fullImage} />
          <View style={styles.imageInfo}>
            <Text style={styles.imageInfoText}>
              📸 {getPhotoTypeText(request.is_normal)}
            </Text>
          </View>
        </View>

        {/* Patient Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Hasta Bilgileri</Text>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Hasta ID:</Text>
            <Text style={styles.infoValue}>{request.user_id}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Talep ID:</Text>
            <Text style={styles.infoValue}>{request.id}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Yükleme Tarihi:</Text>
            <Text style={styles.infoValue}>
              {new Date(request.uploaded_at).toLocaleDateString('tr-TR')} - {' '}
              {new Date(request.uploaded_at).toLocaleTimeString('tr-TR', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </Text>
          </View>
          
          {request.model_result && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Model Sonucu:</Text>
              <Text style={[styles.infoValue, styles.modelResultText]}>
                {request.model_result}
              </Text>
            </View>
          )}
        </View>

        {/* Doctor Comment Section */}
        <View style={styles.commentCard}>
          <Text style={styles.cardTitle}>Doktor Yorumu</Text>
          <TextInput
            style={styles.commentInput}
            placeholder={request.status === 'pending' ? 
              "Değerlendirmenizi ve yorumlarınızı yazın..." : 
              "Mevcut yorum..."
            }
            value={doctorComment}
            onChangeText={setDoctorComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            editable={request.status === 'pending'}
            returnKeyType="done"
          />
          
          {request.doctor_comments && (
            <View style={styles.existingComment}>
              <Text style={styles.existingCommentLabel}>Mevcut Yorum:</Text>
              <Text style={styles.existingCommentText}>{request.doctor_comments}</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        {request.status === 'pending' && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.actionButton, styles.rejectButton, submitting && styles.disabledButton]}
              onPress={handleReject}
              disabled={submitting}
            >
              <Ionicons name="close-circle-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>
                {submitting ? 'İşleniyor...' : 'Reddet'}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.actionButton, styles.approveButton, submitting && styles.disabledButton]}
              onPress={handleApprove}
              disabled={submitting}
            >
              <Ionicons name="checkmark-circle-outline" size={20} color="#fff" />
              <Text style={styles.buttonText}>
                {submitting ? 'İşleniyor...' : 'Onayla'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {request.status !== 'pending' && (
          <View style={styles.completedInfo}>
            <Ionicons name="information-circle-outline" size={24} color="#007AFF" />
            <Text style={styles.completedText}>
              Bu talep daha önce {statusInfo.text.toLowerCase()} durumuna getirilmiş.
            </Text>
          </View>
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: '#F5F7FA',
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#DC3545',
    marginTop: 15,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  headerBackButton: {
    padding: 8,
  },
  pageTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#003087',
  },
  placeholder: {
    width: 40,
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  imageCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: 'hidden',
  },
  fullImage: { 
    width: '100%', 
    height: 300,
  },
  imageInfo: {
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  imageInfoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003087',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#003087',
    flex: 2,
    textAlign: 'right',
  },
  modelResultText: {
    color: '#007AFF',
    fontStyle: 'italic',
  },
  commentCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  commentInput: { 
    borderWidth: 1, 
    borderColor: '#e0e0e0', 
    borderRadius: 8, 
    padding: 15, 
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    minHeight: 100,
  },
  existingComment: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  existingCommentLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 5,
  },
  existingCommentText: {
    fontSize: 14,
    color: '#333',
  },
  buttonContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  approveButton: { 
    backgroundColor: '#28A745',
  },
  rejectButton: { 
    backgroundColor: '#DC3545',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600',
    marginLeft: 8,
  },
  completedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e3f2fd',
    marginHorizontal: 16,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  completedText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 10,
    textAlign: 'center',
  },
});

export default DoctorApprovalScreen;