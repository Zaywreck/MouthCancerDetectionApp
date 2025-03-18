import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MessagesSection from '../components/MessagesSection';
import MessageInput from '../components/MessageInput';

const ChatbotScreen = ({ route }) => {
  const { chatbotType } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (inputText.trim()) {
      setMessages([...messages, { type: 'text', content: inputText }]);
      setInputText('');
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
      <Text style={styles.chatbotTitle}>{chatbotType === 'disease' ? 'Hastalık Chatbotu' : 'Yemek Tarifi Chatbotu'}</Text>
      <Text style={styles.welcomeMessage}>{getWelcomeMessage()}</Text>

      <View style={styles.messagesContainer}>
        <MessagesSection messages={messages} />
      </View>
      <View style={styles.inputSection}>
        <MessageInput
          inputText={inputText}
          setInputText={setInputText}
          handleSendMessage={handleSendMessage}
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
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default ChatbotScreen;
