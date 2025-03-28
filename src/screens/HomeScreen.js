import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const { logout, userType } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Role-based menu items
  const getMenuItems = () => {
    const commonItems = [
      {
        title: 'Hakkımızda',
        description: 'Biz kimiz ve projemiz',
        icon: 'people-outline',
        route: 'About',
      },
      {
        title: 'ChatBot',
        description: 'Sanal doktorunuza sorular sorun',
        icon: 'chatbubble-ellipses-outline',
        route: 'ChatBotSelection',
      },
    ];

    const doctorItems = [
      {
        title: 'Doktor İstekleri',
        description: 'Onay bekleyen istekleri görüntüle',
        icon: 'document-text-outline',
        route: 'DoctorRequests',
      },
      {
        title: 'Doktor Test',
        description: 'Modeli test et',
        icon: 'flask-outline',
        route: 'DoctorTest',
      },
      {
        title: 'Doktor Onay',
        description: 'İstekleri onayla veya reddet',
        icon: 'checkmark-circle-outline',
        route: 'DoctorApproval',
      },
    ];

    const userGuestItems = [
      {
        title: 'Model',
        description: 'Yapay zeka modelimizi deneyin',
        icon: 'brain-outline',
        route: 'ModelSelection',
      },
      {
        title: 'Sonuçlarım',
        description: 'Yüklemelerinizi ve sonuçları görün',
        icon: 'list-outline',
        route: 'Results',
      },
      {
        title: 'Hastalık Bilgi',
        description: 'Ağız kanseri hakkında bilgi alın',
        icon: 'information-circle-outline',
        route: 'Details',
      },
    ];

    if (userType === 'doctor') {
      return [...doctorItems, ...commonItems];
    } else {
      return [...userGuestItems, ...commonItems];
    }
  };

  const menuItems = getMenuItems();

  return (
    <ImageBackground
      source={require('../../assets/images/background.jpg')} // Medikal temalı bir arkaplan önerilir
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Teşhis Uygulaması</Text>
            <Text style={styles.subtitle}>
              Sağlığınız için yapay zeka destekli çözümler
            </Text>
          </View>

          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => navigation.navigate(item.route)}
              >
                <Ionicons name={item.icon} size={28} color="#007AFF" style={styles.cardIcon} />
                <View style={styles.cardTextContainer}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDescription}>{item.description}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#888" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={20} color="#fff" style={styles.logoutIcon} />
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </ScrollView>
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
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Hafif şeffaf beyaz katman
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003087', // Koyu mavi, medikal bir ton
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  menuContainer: {
    flex: 1,
    width: '100%',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardIcon: {
    marginRight: 15,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#003087',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF3B30', // Kırmızı çıkış butonu
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: 'center',
  },
  logoutIcon: {
    marginRight: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomeScreen;