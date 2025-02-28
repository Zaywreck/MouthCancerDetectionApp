import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
  const { loginAsDoctor, loginAsGuest } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDoctor, setIsDoctor] = useState(true);

  const handleDoctorLogin = () => {
    if (!email.includes('@') || password.length < 8) {
      Alert.alert('Hata', 'Lütfen geçerli bir email ve en az 8 karakterli şifre girin.');
      return;
    }
    loginAsDoctor(email);
    Alert.alert('Başarılı', 'Doktor olarak giriş yaptınız.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginArea}>
        <Text style={styles.header}>Hoş Geldiniz</Text>
        <Text style={styles.subHeader}>Platforma nasıl giriş yapmak istersiniz?</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setIsDoctor(true)}
            style={[styles.tabButton, isDoctor && styles.activeTab]}>
            <Image source={require('../../assets/doctor-icon.png')} style={styles.icon} />
            <Text style={[styles.tabText, isDoctor && styles.activeTabText]}>Doktor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setIsDoctor(false)}
            style={[styles.tabButton, !isDoctor && styles.activeTab]}>
            <Image source={require('../../assets/guest-icon.png')} style={styles.icon} />
            <Text style={[styles.tabText, !isDoctor && styles.activeTabText]}>Misafir</Text>
          </TouchableOpacity>
        </View>

        {isDoctor ? (
          <>
            <TextInput
              placeholder='Email'
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <TextInput
              placeholder='Şifre'
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
            />
            <TouchableOpacity onPress={handleDoctorLogin} style={styles.loginButton}>
              <Text style={styles.buttonText}>Doktor Girişi</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={loginAsGuest} style={styles.loginButton}>
            <Text style={styles.buttonText}>Misafir Olarak Devam Et</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f9ff',
  },
  loginArea: {
    borderColor: 'rgba(0, 51, 102, 0.1)',
    borderWidth: 1,
    padding: 20,
    borderRadius: 8,
    boxShadow: '2 4px 6px rgba(0, 0, 0, 0.32)',
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
    // light blue color
    color: '#2b7fff',
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
    margin: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  activeTab: {
    backgroundColor: '#2b7fff',
    borderColor: '#005bb5',
  },
  activeTabText: {
    color: 'white',
  },
  tabText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#333',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: '#2b7fff',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default LoginScreen;
