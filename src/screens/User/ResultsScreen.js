// src/screens/ResultsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getUserUploads } from '../../services/image';
import ResultCard from '../../components/ResultCard';

const ResultsScreen = ({ navigation }) => {
  const { userId, userType } = useAuth();
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    if (userType === 'doctor') {
      navigation.navigate('Home');
    } else if (userId) {
      fetchUploads();
    }
  }, [userId, userType, navigation]);

  const fetchUploads = async () => {
    try {
      const data = await getUserUploads(userId);
      data.map((item) => {
        item.file_path = item.file_path.replace('uploads\\', '');
        return item;
      });
      console.log('Uploads:', data);
      setUploads(data);
    } catch (error) {
      console.error('Error fetching uploads:', error);
    }
  };

  if (userType === 'doctor') {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={uploads}
        renderItem={({ item }) => <ResultCard upload={item} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.emptyText}>Henüz yükleme yok.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F7FA' },
  emptyText: { fontSize: 16, color: '#666', textAlign: 'center', marginTop: 20 },
});

export default ResultsScreen;