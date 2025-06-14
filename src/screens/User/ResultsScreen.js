// src/screens/ResultsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { getUserUploads } from '../../services/image';
import ResultCard from '../../components/ResultCard';

const ResultsScreen = ({ navigation }) => {
  const { userId, userType } = useAuth();
  const [uploads, setUploads] = useState([]);
  const [filteredUploads, setFilteredUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all'); // all, pending, approved, rejected

  const filters = [
    { key: 'all', label: 'Tümü', icon: 'layers', color: '#007AFF' },
    { key: 'pending', label: 'Bekleyen', icon: 'time', color: '#FFC107' },
    { key: 'approved', label: 'Onaylanan', icon: 'checkmark-circle', color: '#28A745' },
    { key: 'rejected', label: 'Reddedilen', icon: 'close-circle', color: '#DC3545' },
  ];

  useEffect(() => {
    if (userType === 'doctor') {
      navigation.navigate('Home');
    } else if (userId) {
      fetchUploads();
    }
  }, [userId, userType, navigation]);

  // Filter uploads based on active filter
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredUploads(uploads);
    } else {
      setFilteredUploads(uploads.filter(upload => upload.status === activeFilter));
    }
  }, [uploads, activeFilter]);

  const fetchUploads = async (isRefresh = false) => {
    try {
      if (!isRefresh) {
        setLoading(true);
      }
      const data = await getUserUploads(userId);
      data.map((item) => {
        item.file_path = item.file_path.replace('uploads\\', '');
        return item;
      });
      setUploads(data);
    } catch (error) {
      console.error('Error fetching uploads:', error);
    } finally {
      setLoading(false);
      if (isRefresh) {
        setRefreshing(false);
      }
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchUploads(true);
  };

  const getUploadStats = () => {
    const approved = uploads.filter(upload => upload.status === 'approved').length;
    const rejected = uploads.filter(upload => upload.status === 'rejected').length;
    const pending = uploads.filter(upload => upload.status === 'pending').length;
    
    return { approved, rejected, pending, total: uploads.length };
  };

  const getFilterCount = (filterKey) => {
    const stats = getUploadStats();
    switch (filterKey) {
      case 'all':
        return stats.total;
      case 'pending':
        return stats.pending;
      case 'approved':
        return stats.approved;
      case 'rejected':
        return stats.rejected;
      default:
        return 0;
    }
  };

  const handleFilterPress = (filterKey) => {
    setActiveFilter(filterKey);
  };

  if (userType === 'doctor') {
    return null;
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Sonuçlarınız yükleniyor...</Text>
      </View>
    );
  }

  const stats = getUploadStats();

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="image-outline" size={64} color="#ccc" />
      <Text style={styles.emptyTitle}>
        {activeFilter === 'all' ? 'Henüz Yükleme Yok' : `${filters.find(f => f.key === activeFilter)?.label} Sonuç Yok`}
      </Text>
      <Text style={styles.emptySubtext}>
        {activeFilter === 'all' 
          ? 'AI model analizi için fotoğraf yükleyin ve sonuçlarınızı burada görüntüleyin.'
          : `Bu kategoride görüntülenecek sonuç bulunmuyor.`
        }
      </Text>
      {activeFilter === 'all' && (
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={() => navigation.navigate('Upload')}
        >
          <Ionicons name="camera" size={20} color="#fff" />
          <Text style={styles.uploadButtonText}>Fotoğraf Yükle</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="analytics" size={28} color="#003087" />
        <Text style={styles.pageTitle}>Test Sonuçlarım</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
          <Ionicons name="refresh" size={24} color="#003087" />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      {uploads.length > 0 && (
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
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredUploads}
        renderItem={({ item }) => <ResultCard upload={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={filteredUploads.length === 0 ? styles.emptyListContainer : styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor="#007AFF"
          />
        }
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
    marginLeft: -28, // Offset the icon width for center alignment
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#003087',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ResultsScreen;