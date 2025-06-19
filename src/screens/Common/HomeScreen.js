import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const HomeScreen = ({ navigation }) => {
  const { logout, userType } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Role-based menu items
  const getMenuItems = () => {
    const aboutItem = {
      title: 'Hakkımızda',
      description: 'Biz kimiz ve projemiz',
      icon: 'people-outline',
      route: 'About',
      gradient: ['#4A90E2', '#357ABD'],
    };
    const diseaseInfoItem = {
      title: 'Hastalık Bilgi',
      description: 'Ağız kanseri hakkında bilgi alın',
      icon: 'information-circle-outline',
      route: 'Details',
      gradient: ['#50C878', '#3CB371'],
    };
    const chatBotItem = {
      title: 'AI Asistan',
      description: 'Sanal doktorunuza sorular sorun',
      icon: 'chatbubble-ellipses-outline',
      route: 'ChatBotSelection',
      gradient: ['#9B59B6', '#8E44AD'],
    };
    const doctorItems = [
      {
        title: 'Taleplerim',
        description: 'Onay bekleyen istekleri görüntüle',
        icon: 'document-text-outline',
        route: 'DoctorRequests',
        gradient: ['#E74C3C', '#C0392B'],
      },
      {
        title: 'Model Testi',
        description: 'Yapay zeka modelimizi test et',
        icon: 'flask-outline',
        route: 'DoctorTest',
        gradient: ['#F1C40F', '#F39C12'],
      },
      chatBotItem,
      aboutItem,
      diseaseInfoItem
    ];
    const userItems = [
      {
        title: 'Model',
        description: 'Yapay zeka modelimizi deneyin',
        icon: 'image-outline',
        route: 'ModelTest',
        gradient: ['#3498DB', '#2980B9'],
      },
      {
        title: 'Sonuçlarım',
        description: 'Yüklemelerinizi ve sonuçları görün',
        icon: 'list-outline',
        route: 'Results',
        gradient: ['#2ECC71', '#27AE60'],
      },
      chatBotItem,
      aboutItem,
      diseaseInfoItem
    ];
    const guestItems = [
      aboutItem,
      diseaseInfoItem
    ];
    if (userType === 'doctor') {
      return doctorItems;
    } else if (userType === 'user') {
      return userItems;
    } else {
      return [
        ...guestItems,
        {
          title: 'Diğer özelliklere erişmek için giriş yapınız',
          description: '',
          icon: 'log-in-outline',
          route: 'LoginPrompt',
          isLoginPrompt: true,
          gradient: ['#003087', '#002366'],
        }
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <LinearGradient
      colors={['#F8F9FA', '#E9ECEF']}
      style={styles.background}
    >
      <ScrollView 
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>OralHealth-AI</Text>
          <Text style={styles.subtitle}>
            Sağlığınız için yapay zeka destekli çözümler
          </Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => {
            const protectedRoutes = ['ModelTest', 'Results', 'ChatBotSelection', 'ChatBot'];
            const isProtected = protectedRoutes.includes(item.route);

            if (item.isLoginPrompt) {
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.card}
                  onPress={() => navigation.navigate('Login')}
                >
                  <LinearGradient
                    colors={item.gradient}
                    style={styles.cardGradient}
                  >
                    <Ionicons name={item.icon} size={28} color="#fff" style={styles.cardIcon} />
                    <View style={styles.cardTextContainer}>
                      <Text style={[styles.cardTitle, { color: '#fff' }]}>{item.title}</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              );
            }

            return (
              <TouchableOpacity
                key={index}
                style={styles.card}
                onPress={() => {
                  if (isProtected && userType === 'guest') {
                    alert('Lütfen bu özelliği kullanmak için giriş yapınız.');
                  } else {
                    navigation.navigate(item.route);
                  }
                }}
              >
                <LinearGradient
                  colors={item.gradient}
                  style={styles.cardGradient}
                >
                  <Ionicons name={item.icon} size={28} color="#fff" style={styles.cardIcon} />
                  <View style={styles.cardTextContainer}>
                    <Text style={[styles.cardTitle, { color: '#fff' }]}>{item.title}</Text>
                    <Text style={[styles.cardDescription, { color: 'rgba(255,255,255,0.9)' }]}>
                      {item.description}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {userType !== null && (
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
          >
            <LinearGradient
              colors={['#FF6B6B', '#EE5253']}
              style={styles.logoutGradient}
            >
              <Ionicons name="log-out-outline" size={20} color="#fff" style={styles.logoutIcon} />
              <Text style={styles.logoutText}>Çıkış Yap</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'rgb(55, 118, 235)',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  menuContainer: {
    flex: 1,
    width: '100%',
  },
  card: {
    width: '100%',
    height: 90,
    marginBottom: 15,
    borderRadius: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
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
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
  },
  logoutButton: {
    width: '100%',
    height: 50,
    marginTop: 20,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutGradient: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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