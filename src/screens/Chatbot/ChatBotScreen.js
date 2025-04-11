import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MessagesSection from '../../components/MessagesSection';
import MessageInput from '../../components/MessageInput';
import axios from 'axios';

// Flask API endpoint (localhost for dev, replace with your server URL for production)
const API_URL = 'http://192.168.72.1:3058/recommend'; // Flask appınızın çalıştığı adres

const ChatbotScreen = ({ route }) => {
  const { chatbotType } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Welcome mesajını ilk yüklemede ekle
  useEffect(() => {
    const welcomeMessage = getWelcomeMessage();
    setMessages([{ type: 'text', content: welcomeMessage, isBot: true }]);
  }, []);

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      // Kullanıcı mesajını ekle
      const userMessage = { type: 'text', content: inputText, isBot: false };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputText('');
      setIsLoading(true);

      try {
        // Flask API'ye POST isteği gönder
        const response = await axios.post(API_URL, {
          prompt: inputText,
        });

        // API yanıtını al ve mesajlara ekle
        const botResponse = response.data.recommendation || 'Bir hata oluştu, lütfen tekrar deneyin.';
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'text', content: botResponse, isBot: true },
        ]);
      } catch (error) {
        console.error('API hatası:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { type: 'text', content: 'Üzgünüm, bir hata oluştu!', isBot: true },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getWelcomeMessage = () => {
    if (chatbotType === 'disease') {
      return 'Hastalık hakkında bilgi almak isterseniz, lütfen sorununuzu yazın.';
    } else if (chatbotType === 'recipe') {
      return 'Yemek tarifi konusunda yardımcı olabilirim, istediğiniz tarifi yazabilirsiniz.';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chatbotTitle}>
        {chatbotType === 'disease' ? 'Hastalık Chatbotu' : 'Yemek Tarifi Chatbotu'}
      </Text>
      <View style={styles.messagesContainer}>
        <MessagesSection messages={messages} />
      </View>
      <View>
        <MessageInput
          inputText={inputText}
          setInputText={setInputText}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f9ff',
    padding: 16,
  },
  chatbotTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2A3D56',
    marginBottom: 10,
  },
  welcomeMessage: {
    fontSize: 16,
    color: '#00796b',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 20,
  },
});

export default ChatbotScreen;