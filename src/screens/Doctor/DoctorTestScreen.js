// src/screens/DoctorTestScreen.js
import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImageUploader from '../../components/ImageUploader';
import { useAuth } from '../../context/AuthContext';
import { doctorTestClassification, getModelStatus } from '../../services/image';

const DoctorTestScreen = () => {
  const { userId, userType } = useAuth();
  const [image, setImage] = useState(null);
  const [modelResult, setModelResult] = useState(null);
  const [isNormal, setIsNormal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modelStatus, setModelStatus] = useState(null);

  useEffect(() => {
    checkModelStatus();
  }, []);

  const checkModelStatus = async () => {
    try {
      const status = await getModelStatus();
      setModelStatus(status);
      console.log('Model status:', status);
    } catch (error) {
      console.error('Failed to check model status:', error);
    }
  };

  // Doktor için gerçek backend'e istek atan fonksiyon - YENİ SERVİS
  const handleDoctorTest = async (imageUri) => {
    if (!imageUri || !userId) {
      Alert.alert('Hata', 'Geçerli bir görüntü veya kullanıcı ID bulunamadı');
      return;
    }

    if (userType !== 'doctor') {
      Alert.alert('Hata', 'Bu özellik sadece doktorlar için geçerlidir');
      return;
    }

    setIsLoading(true);
    try {
      console.log('Doctor testing image with specialized endpoint...');
      console.log('Doctor ID:', userId, 'Image URI:', imageUri, 'Is Normal:', isNormal);
      
      // Yeni doktor test servisi kullan
      const response = await doctorTestClassification(userId, imageUri, isNormal);
      
      console.log('Doctor test response:', response);
      
      // Model sonucundan güven seviyesini çıkar (örnek: "99% risk, 0% normal")
      let confidence = null;
      if (response.model_result && typeof response.model_result === 'string') {
        const riskMatch = response.model_result.match(/(\d+)%\s*risk/);
        if (riskMatch) {
          confidence = `%${riskMatch[1]}`;
        }
      }
      
      // Yanıtı uygun formata çevir
      const testResult = {
        image: imageUri,
        decision: response.model_result || 'Analiz tamamlandı',
        confidence: confidence,
        type: response.test_type === 'normal' ? 'Normal Fotoğraf Analizi' : 'Histopatolojik Analiz',
        timestamp: response.timestamp || new Date().toISOString(),
        status: response.status || 'completed',
        doctorId: response.doctor_id,
        isNormal: response.is_normal
      };
      
      setModelResult(testResult);
      Alert.alert('Başarılı', 'AI model analizi tamamlandı!');
      
    } catch (error) {
      console.error('Doctor test error:', error);
      Alert.alert('Hata', `Model analizi sırasında hata oluştu: ${error.message}`);
      
      // Hata durumunda fallback sonuç
      setModelResult({
        image: imageUri,
        decision: 'Analiz hatası - Tekrar deneyin',
        confidence: null,
        type: isNormal ? 'Normal Fotoğraf' : 'Histopatolojik',
        timestamp: new Date().toISOString(),
        error: error.message,
        status: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Görüntü seçildiğinde otomatik olarak test et
  const handleImageSelected = (imageUri) => {
    setImage(imageUri);
    if (imageUri) {
      handleDoctorTest(imageUri);
    }
  };

  const handleRetryTest = () => {
    if (image) {
      handleDoctorTest(image);
    } else {
      Alert.alert('Hata', 'Önce bir görüntü seçin');
    }
  };

  const refreshModelStatus = () => {
    checkModelStatus();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.uploadArea}>
        <Text style={styles.pageTitle}>Doktorlar için Model Testi</Text>
        <Text style={styles.subtitle}>AI Model ile Analiz</Text>
        
        {/* Model Status Card */}
        <View style={[styles.modelStatusCard, 
          modelStatus?.model_loaded ? styles.modelActiveCard : styles.modelInactiveCard
        ]}>
          <View style={styles.modelStatusHeader}>
            <Ionicons 
              name={modelStatus?.model_loaded ? "checkmark-circle" : "alert-circle"} 
              size={20} 
              color={modelStatus?.model_loaded ? "#28a745" : "#dc3545"} 
            />
            <Text style={[styles.modelStatusText, 
              { color: modelStatus?.model_loaded ? "#28a745" : "#dc3545" }
            ]}>
              Model Durumu: {modelStatus?.status || 'Kontrol ediliyor...'}
            </Text>
            <TouchableOpacity onPress={refreshModelStatus} style={styles.refreshButton}>
              <Ionicons name="refresh-outline" size={16} color="#007AFF" />
            </TouchableOpacity>
          </View>
          {modelStatus?.load_time_formatted && (
            <Text style={styles.modelStatusSubtext}>
              Yüklenme zamanı: {new Date(modelStatus.load_time_formatted).toLocaleString('tr-TR')}
            </Text>
          )}
        </View>
        
        {/* Photo Type Selection */}
        <View style={styles.selectionContainer}>
          <Text style={styles.selectionTitle}>Test Edilecek Fotoğraf Türü</Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity
              style={[styles.optionButton, isNormal && styles.activeOption]}
              onPress={() => {
                setIsNormal(true);
                setModelResult(null); // Sonucu temizle
              }}
            >
              <Ionicons 
                name="camera-outline" 
                size={24} 
                color={isNormal ? '#fff' : '#007AFF'} 
              />
              <Text style={[styles.optionText, isNormal && styles.activeOptionText]}>
                Normal Fotoğraf
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.optionButton, !isNormal && styles.activeOption]}
              onPress={() => {
                setIsNormal(false);
                setModelResult(null); // Sonucu temizle
              }}
            >
              <Ionicons 
                name="medical-outline" 
                size={24} 
                color={!isNormal ? '#fff' : '#007AFF'} 
              />
              <Text style={[styles.optionText, !isNormal && styles.activeOptionText]}>
                Histopatolojik Fotoğraf
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <ImageUploader
          setImage={handleImageSelected}
          skipSubmit={true} // Form submit'i bypass et, direkt test yap
          isNormal={isNormal}
        />
        
        <View style={styles.resultDisplayContainer}>
          <Text style={styles.sectionTitle}>Model Test Sonuçları</Text>
          
          {isLoading && (
            <View style={styles.loadingContainer}>
              <Ionicons name="refresh-outline" size={48} color="#007AFF" />
              <Text style={styles.loadingText}>AI Model analiz yapıyor...</Text>
            </View>
          )}
          
          {modelResult?.image && !isLoading && (
            <>
              <Image source={{ uri: modelResult.image }} style={styles.resultImage} />
              
              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Ionicons name="analytics-outline" size={24} color="#003087" />
                  <Text style={styles.resultTitle}>AI Model Analizi</Text>
                  {modelResult.error && (
                    <Ionicons name="warning-outline" size={20} color="#FF3B30" style={{marginLeft: 10}} />
                  )}
                  {modelResult.status === 'completed' && (
                    <Ionicons name="checkmark-circle-outline" size={20} color="#28a745" style={{marginLeft: 10}} />
                  )}
                </View>
                
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Model Sonucu:</Text>
                  <Text style={[styles.resultValue, styles.decisionText]}>
                    {modelResult.decision}
                  </Text>
                </View>
                
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Analiz Türü:</Text>
                  <Text style={styles.resultValue}>{modelResult.type}</Text>
                </View>
                
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Test Zamanı:</Text>
                  <Text style={styles.resultValue}>
                    {new Date(modelResult.timestamp).toLocaleString('tr-TR')}
                  </Text>
                </View>

                {modelResult.doctorId && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Doktor ID:</Text>
                    <Text style={styles.resultValue}>{modelResult.doctorId}</Text>
                  </View>
                )}

                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Durum:</Text>
                  <Text style={[styles.resultValue, 
                    modelResult.status === 'completed' ? styles.successText : 
                    modelResult.status === 'error' ? styles.errorText : {}
                  ]}>
                    {modelResult.status === 'completed' ? 'Tamamlandı' : 
                     modelResult.status === 'error' ? 'Hata' : modelResult.status}
                  </Text>
                </View>
                
                {modelResult.error && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorLabel}>Hata:</Text>
                    <Text style={styles.errorText}>{modelResult.error}</Text>
                  </View>
                )}
              </View>

              {/* Retry button */}
              <TouchableOpacity onPress={handleRetryTest} style={styles.retryButton}>
                <Ionicons name="refresh-outline" size={20} color="#fff" />
                <Text style={styles.retryButtonText}>Yeniden Test Et</Text>
              </TouchableOpacity>
            </>
          )}
          
          {!modelResult && !isLoading && (
            <View style={styles.noResultContainer}>
              <Ionicons name="camera-outline" size={48} color="#ccc" />
              <Text style={styles.noResultText}>
                AI model ile test için bir resim yükleyin
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F7FA',
  },
  uploadArea: {
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
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  modelStatusCard: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
  },
  modelActiveCard: {
    backgroundColor: '#d4f6d4',
    borderColor: '#28a745',
  },
  modelInactiveCard: {
    backgroundColor: '#f8d7da',
    borderColor: '#dc3545',
  },
  modelStatusHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modelStatusText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  refreshButton: {
    padding: 4,
  },
  modelStatusSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginLeft: 28,
  },
  selectionContainer: {
    marginBottom: 20,
  },
  selectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003087',
    textAlign: 'center',
    marginBottom: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  optionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    backgroundColor: '#fff',
  },
  activeOption: {
    backgroundColor: '#007AFF',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 8,
    textAlign: 'center',
  },
  activeOptionText: {
    color: '#fff',
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d4edda',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#28a745',
  },
  infoText: {
    fontSize: 14,
    color: '#155724',
    marginLeft: 10,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#003087',
    textAlign: 'center',
  },
  resultDisplayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#007AFF',
    marginTop: 10,
    fontWeight: '500',
  },
  resultImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  decisionText: {
    fontWeight: '600',
    color: '#FF3B30',
  },
  successText: {
    color: '#28a745',
    fontWeight: '600',
  },
  errorText: {
    color: '#dc3545',
    fontWeight: '600',
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003087',
    marginLeft: 10,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingVertical: 4,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    flex: 1,
  },
  resultValue: {
    fontSize: 14,
    color: '#003087',
    flex: 1,
    textAlign: 'right',
  },
  errorContainer: {
    backgroundColor: '#f8d7da',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#dc3545',
  },
  errorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#721c24',
    marginBottom: 4,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  noResultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noResultText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default DoctorTestScreen;