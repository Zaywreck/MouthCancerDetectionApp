import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const ChatbotSelectionScreen = ({ navigation }) => {
  const handleSelectChatbot = (chatbotType) => {
    // Seçilen chatbot'a göre yönlendirme yapılıyor
    navigation.navigate('Merhaba', { chatbotType });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatbot Seçin</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectChatbot('disease')}
      >
        <Text style={styles.buttonText}>Hastalık Hakkında Yardım</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectChatbot('recipe')}
      >
        <Text style={styles.buttonText}>Yemek Tarifi Yardımı</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f9ff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2A3D56',
  },
  button: {
    backgroundColor: '#00796b',
    padding: 15,
    marginBottom: 20,
    width: 250,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ChatbotSelectionScreen;
