// src/screens/ResultsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { getUserUploads } from '../services/image';
import ResultCard from '../components/ResultCard';

const ResultsScreen = ({ navigation }) => {
  const { userId, userType } = useAuth();
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    if (userType === 'doctor') {
      navigation.navigate('Home'); // Redirect doctors to Home
    } else if (userId) {
      fetchUploads();
    }
  }, [userId, userType, navigation]);

  const fetchUploads = async () => {
    try {
      const data = await getUserUploads(userId);
      setUploads(data);
    } catch (error) {
      console.error('Error fetching uploads:', error);
    }
  };

  if (userType === 'doctor') {
    return null; // Prevent rendering while redirecting
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sonuçlarım</Text>
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003087',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ResultsScreen;