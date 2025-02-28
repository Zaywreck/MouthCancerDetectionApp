import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useAuth } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Teşhis uygulamamıza hoşgeldiniz...</Text>
        <Text style={styles.description}>
          Aşağıdaki seçeneklerden birini seçerek devam edebilirsiniz
        </Text>
        <View style={styles.grid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Model')}
          >
            <Text style={styles.cardTitle}>Model &rarr;</Text>
            <Text style={styles.cardDescription}>
              Yapay zeka modelimizi deneyebilirsiniz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details')}
          >
            <Text style={styles.cardTitle}>Hastalık Bilgi &rarr;</Text>
            <Text style={styles.cardDescription}>
              Ağız kanseri hakkında detaylı bilgi alabilirsiniz
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={styles.cardTitle}>Hakkımızda &rarr;</Text>
            <Text style={styles.cardDescription}>
              Biz kimiz ve bu proje nasıl yapıldı
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: 'rgb(81, 121, 255)',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgb(0,0,0)',
    marginBottom: 30,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
  },
  card: {
    width: '45%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  logoutButton: {
    padding: 10,
    backgroundColor: 'rgb(253, 132, 132)',
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
