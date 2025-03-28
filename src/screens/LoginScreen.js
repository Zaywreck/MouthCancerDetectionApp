// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../services/auth'; // Import service

const LoginScreen = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('doctor');

  // Inside handleLogin in LoginScreen.js
  const handleLogin = async () => {
    if (loginType === 'doctor' || loginType === 'user') {
      if (!email.includes('@') || password.length < 8) {
        Alert.alert('Hata', 'Lütfen geçerli bir email ve en az 8 karakterli şifre girin.');
        return;
      }
      try {
        const data = await loginUser(email, password);
        login(data.user_type, data.id); // Pass userId to context
        Alert.alert('Başarılı', `${loginType === 'doctor' ? 'Doktor' : 'Kullanıcı'} olarak giriş yaptınız.`);
      } catch (error) {
        Alert.alert('Hata', error.message || 'Giriş başarısız.');
      }
    } else {
      login('guest', null); // No userId for guest
      Alert.alert('Başarılı', 'Misafir olarak giriş yaptınız.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginArea}>
        <Text style={styles.header}>Hoş Geldiniz</Text>
        <Text style={styles.subHeader}>Platforma nasıl giriş yapmak istersiniz?</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setLoginType('doctor')}
            style={[styles.tabButton, loginType === 'doctor' && styles.activeTab]}
          >
            <Image
              source={require('../../assets/doctor-icon.png')}
              style={[styles.icon, loginType === 'doctor' && styles.activeIcon]}
            />
            <Text style={[styles.tabText, loginType === 'doctor' && styles.activeTabText]}>Doktor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLoginType('user')}
            style={[styles.tabButton, loginType === 'user' && styles.activeTab]}
          >
            <Image
              source={require('../../assets/user-icon.png')}
              style={[styles.icon, loginType === 'user' && styles.activeIcon]}
            />
            <Text style={[styles.tabText, loginType === 'user' && styles.activeTabText]}>Kullanıcı</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLoginType('guest')}
            style={[styles.tabButton, loginType === 'guest' && styles.activeTab]}
          >
            <Image
              source={require('../../assets/guest-icon.png')}
              style={[styles.icon, loginType === 'guest' && styles.activeIcon]}
            />
            <Text style={[styles.tabText, loginType === 'guest' && styles.activeTabText]}>Misafir</Text>
          </TouchableOpacity>
        </View>

        {loginType === 'doctor' || loginType === 'user' ? (
          <>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TextInput
              placeholder="Şifre"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.buttonText}>
                {loginType === 'doctor' ? 'Doktor Girişi' : 'Kullanıcı Girişi'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.buttonText}>Misafir Olarak Devam Et</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  loginArea: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#003087',
  },
  subHeader: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  tabButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeTab: {
    backgroundColor: '#007AFF',
    borderColor: '#005BB5',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  activeTabText: {
    color: '#fff',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
  activeIcon: {
    tintColor: '#fff',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#B0BEC5',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default LoginScreen;