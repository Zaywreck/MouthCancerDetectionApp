// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import { registerUser } from '../../services/auth'; // Import service


const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('doctor');

  const handleRegister = async () => {
    if (!email.includes('@') || password.length < 8) {
      Alert.alert('Hata', 'Lütfen geçerli bir email ve en az 8 karakterli şifre girin.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor.');
      return;
    }

    try {
      const data = await registerUser(email, password, userType);
      Alert.alert(
        'Başarılı',
        `${userType === 'doctor' ? 'Doktor' : 'Kullanıcı'} kaydı tamamlandı! Giriş yapabilirsiniz.`,
        [{ text: 'Tamam', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Hata', error.message || 'Kayıt başarısız.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.registerArea}>
        <Text style={styles.header}>Kayıt Ol</Text>
        <Text style={styles.subHeader}>Hesap türünüzü seçin ve kaydolun</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => setUserType('doctor')}
            style={[styles.tabButton, userType === 'doctor' && styles.activeTab]}
          >
            <Image
              source={require('../../../assets/doctor-icon.png')}
              style={[styles.icon, userType === 'doctor' && styles.activeIcon]}
            />
            <Text style={[styles.tabText, userType === 'doctor' && styles.activeTabText]}>Doktor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setUserType('user')}
            style={[styles.tabButton, userType === 'user' && styles.activeTab]}
          >
            <Image
              source={require('../../../assets/user-icon.png')}
              style={[styles.icon, userType === 'user' && styles.activeIcon]}
            />
            <Text style={[styles.tabText, userType === 'user' && styles.activeTabText]}>Kullanıcı</Text>
          </TouchableOpacity>
        </View>

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
        <TextInput
          placeholder="Şifreyi Onayla"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
          <Text style={styles.buttonText}>
            {userType === 'doctor' ? 'Doktor Olarak Kayıt Ol' : 'Kullanıcı Olarak Kayıt Ol'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          style={styles.loginLink}
        >
          <Text style={styles.loginLinkText}>Zaten hesabınız var mı? Giriş yapın</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  registerArea: {
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
    justifyContent: 'center',
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
    maxWidth: 150,
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
  registerButton: {
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
  loginLink: {
    marginTop: 20,
    alignItems: 'center',
  },
  loginLinkText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default RegisterScreen;