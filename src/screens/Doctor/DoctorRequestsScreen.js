import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, RefreshControl, ActivityIndicator, FlatList } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { getDoctorRequests, getDoctorRequestStatistics } from '../../services/image';
import { BASE_URL } from '../../services/api';

const DoctorRequestsScreen = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // all, pending, approved, rejected
  const [statistics, setStatistics] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const navigation = useNavigation();

  const filters = [
    { key: 'all', label: 'Tümü', icon: 'layers', color: '#007AFF' },
    { key: 'pending', label: 'Bekleyen', icon: 'time', color: '#FFC107' },
    { key: 'approved', label: 'Onaylanan', icon: 'checkmark-circle', color: '#28A745' },
    { key: 'rejected', label: 'Reddedilen', icon: 'close-circle', color: '#DC3545' },
  ];

  const fetchRequests = async (isRefresh = false) => {
    try {
      if (isRefresh) setRefreshing(true);
      else setLoading(true);
      
      // Tüm talepleri getir
      const data = await getDoctorRequests();
      const updatedData = data.map((request) => ({
        ...request,
        file_path: request.file_path.replace("uploads\\", ""),
      }));
      setRequests(updatedData);
      
      // İstatistikleri getir
      try {
        const stats = await getDoctorRequestStatistics();
        setStatistics(stats);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        // Fallback: Manuel hesaplama
        const pending = updatedData.filter(r => r.status === 'pending').length;
        const approved = updatedData.filter(r => r.status === 'approved').length;
        const rejected = updatedData.filter(r => r.status === 'rejected').length;
        setStatistics({ total: updatedData.length, pending, approved, rejected });
      }
      
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Filter requests based on active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(request => request.status === activeFilter));
    }
  }, [requests, activeFilter]);

  useEffect(() => {
    fetchRequests();
  }, []);

  // Refresh when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchRequests();
    }, [])
  );

  const onRefresh = () => {
    fetchRequests(true);
  };

  const handleFilterPress = (filterKey) => {
    setActiveFilter(filterKey);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <Ionicons name="checkmark-circle" size={20} color="#28A745" />;
      case 'rejected':
        return <Ionicons name="close-circle" size={20} color="#DC3545" />;
      default:
        return <Ionicons name="time-outline" size={20} color="#FFC107" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Onaylandı';
      case 'rejected':
        return 'Reddedildi';
      default:
        return 'Beklemede';
    }
  };

  const getPhotoTypeText = (isNormal) => {
    return isNormal ? 'Normal Fotoğraf' : 'Histopatolojik';
  };

  const getFilterCount = (filterKey) => {
    switch (filterKey) {
      case 'all':
        return statistics.total;
      case 'pending':
        return statistics.pending;
      case 'approved':
        return statistics.approved;
      case 'rejected':
        return statistics.rejected;
      default:
        return 0;
    }
  };

  const renderRequestCard = ({ item: request }) => {
          const uri = `${BASE_URL}/${request.file_path}`;
          return (
            <TouchableOpacity
              key={request.id}
              style={styles.requestCard}
              onPress={() => navigation.navigate('DoctorApproval', { requestId: request.id })}
            >
              <Image source={{ uri }} style={styles.thumbnail} />
              <View style={styles.info}>
                <View style={styles.infoHeader}>
                  <Text style={styles.patientId}>Hasta ID: {request.user_id}</Text>
                  <View style={styles.statusContainer}>
                    {getStatusIcon(request.status)}
                    <Text style={[styles.statusText, { 
                      color: request.status === 'approved' ? '#28A745' : 
                             request.status === 'rejected' ? '#DC3545' : '#FFC107' 
                    }]}>
                      {getStatusText(request.status)}
                    </Text>
                  </View>
                </View>
                
                <Text style={styles.uploadDate}>
                  📅 {new Date(request.uploaded_at).toLocaleDateString('tr-TR')} 
                  {' '}{new Date(request.uploaded_at).toLocaleTimeString('tr-TR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </Text>
                
                <Text style={styles.photoType}>
                  📸 {getPhotoTypeText(request.is_normal)}
                </Text>
                
                {request.model_result && (
                  <Text style={styles.modelResult}>
                    🤖 {request.model_result}
                  </Text>
                )}
              </View>
              
              <Ionicons name="chevron-forward" size={20} color="#007AFF" />
            </TouchableOpacity>
          );
  };

  const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
          <Ionicons name="document-outline" size={64} color="#ccc" />
      <Text style={styles.noRequestText}>
        {activeFilter === 'all' ? 'Henüz hiç talep yok' : `${filters.find(f => f.key === activeFilter)?.label} talep yok`}
      </Text>
          <Text style={styles.noRequestSubtext}>
        {activeFilter === 'all' 
          ? 'Hastalardan gelen talepler burada görünecek'
          : `Bu kategoride görüntülenecek talep bulunmuyor`
        }
          </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Talepler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="documents-outline" size={28} color="#003087" />
        <Text style={styles.pageTitle}>Doktor Talepleri</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Ionicons name="refresh" size={24} color="#003087" />
        </TouchableOpacity>
      </View>
      
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Ionicons name="checkmark-circle" size={24} color="#28A745" />
          <Text style={[styles.statNumber, { color: '#28A745' }]}>{statistics.approved}</Text>
          <Text style={styles.statLabel}>Onaylanan</Text>
        </View>
        
        <View style={styles.statCard}>
          <Ionicons name="close-circle" size={24} color="#DC3545" />
          <Text style={[styles.statNumber, { color: '#DC3545' }]}>{statistics.rejected}</Text>
          <Text style={styles.statLabel}>Reddedilen</Text>
        </View>
        
        <View style={styles.statCard}>
          <Ionicons name="time" size={24} color="#FFC107" />
          <Text style={[styles.statNumber, { color: '#FFC107' }]}>{statistics.pending}</Text>
          <Text style={styles.statLabel}>Bekleyen</Text>
        </View>
        
        <View style={styles.statCard}>
          <Ionicons name="layers" size={24} color="#007AFF" />
          <Text style={[styles.statNumber, { color: '#007AFF' }]}>{statistics.total}</Text>
          <Text style={styles.statLabel}>Toplam</Text>
        </View>
      </View>
      
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            const count = getFilterCount(filter.key);
            
            return (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterTab,
                  isActive && { backgroundColor: filter.color }
                ]}
                onPress={() => handleFilterPress(filter.key)}
              >
                <Ionicons 
                  name={filter.icon} 
                  size={18} 
                  color={isActive ? '#fff' : filter.color} 
                />
                <Text style={[
                  styles.filterTabText,
                  isActive && { color: '#fff' }
                ]}>
                  {filter.label}
                </Text>
                <View style={[
                  styles.filterBadge,
                  isActive ? { backgroundColor: 'rgba(255,255,255,0.3)' } : { backgroundColor: filter.color }
                ]}>
                  <Text style={[
                    styles.filterBadgeText,
                    isActive ? { color: '#fff' } : { color: '#fff' }
                  ]}>
                    {count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
    </ScrollView>
      </View>

      {/* Request List */}
      <FlatList
        data={filteredRequests}
        renderItem={renderRequestCard}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
        contentContainerStyle={filteredRequests.length === 0 ? styles.emptyListContainer : styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F5F7FA' 
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  pageTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#003087', 
    flex: 1,
    textAlign: 'center',
    marginLeft: -28, // Offset for icon width
  },
  refreshButton: {
    padding: 8,
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  filterScrollContent: {
    paddingHorizontal: 16,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    marginRight: 8,
    color: '#666',
  },
  filterBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 24,
    alignItems: 'center',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyListContainer: {
    flexGrow: 1,
  },
  requestCard: { 
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
    marginBottom: 5,
  },
  patientId: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#003087' 
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },
  uploadDate: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 3,
  },
  photoType: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  modelResult: {
    fontSize: 13,
    color: '#007AFF',
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  noRequestText: { 
    fontSize: 18, 
    color: '#003087', 
    fontWeight: '600',
    marginTop: 15,
    textAlign: 'center',
  },
  noRequestSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
    textAlign: 'center',
  },
});

export default DoctorRequestsScreen;