import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MessagesSection from '../../components/MessagesSection';
import MessageInput from '../../components/MessageInput';
import { sendChatbotMessage } from './chatbotApi';

const ChatbotScreen = ({ route, navigation }) => {
  const { chatbotType } = route.params;
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mesaj gönderme fonksiyonunu yeni api katmanından kullan
  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const userMessage = { type: 'text', content: inputText, isBot: false };
      setMessages(prev => [...prev, userMessage]);
      setIsLoading(true);
      try {
        const botResponse = await sendChatbotMessage(chatbotType, inputText);
        setMessages(prev => [...prev, { 
          type: 'text', 
          content: botResponse && (botResponse.recommendation || botResponse.message || botResponse.response || botResponse.result || ''), 
          isBot: true 
        }]);
      } catch (error) {
        setMessages(prev => [...prev, { type: 'text', content: 'Bir hata oluştu. Lütfen tekrar deneyin.', isBot: true }]);
      }
      setInputText('');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const welcomeMessage = getWelcomeMessage();
    setMessages([{ type: 'text', content: welcomeMessage, isBot: true }]);
  }, []);

  const getWelcomeMessage = () => {
    if (chatbotType === 'disease') {
      return 'Merhaba! 👋 Ağız kanseri hakkında merak ettiğiniz konuları sorabilirsiniz. Size en doğru bilgileri vermeye çalışacağım.';
    } else if (chatbotType === 'recipe') {
      return 'Merhaba! 🍽️ Ağız sağlığınızı destekleyecek beslenme önerileri ve sağlıklı tarifler hakkında size yardımcı olabilirim.';
    }
  };

  const getChatbotInfo = () => {
    if (chatbotType === 'disease') {
      return {
        title: 'Ağız Kanseri Danışmanı',
        subtitle: 'AI destekli sağlık asistanı',
        icon: 'medical',
        gradient: ['#667eea', '#764ba2']
      };
    } else if (chatbotType === 'recipe') {
      return {
        title: 'Beslenme Asistanı',
        subtitle: 'AI destekli beslenme uzmanı',
        icon: 'nutrition',
        gradient: ['#f093fb', '#f5576c']
      };
    }
  };

  const chatbotInfo = getChatbotInfo();

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      {/* Modern Header */}
      <LinearGradient
        colors={chatbotInfo.gradient}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          
          <View style={styles.headerInfo}>
            <View style={styles.avatarContainer}>
              <Ionicons name={chatbotInfo.icon} size={24} color="#fff" />
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>{chatbotInfo.title}</Text>
              <Text style={styles.headerSubtitle}>{chatbotInfo.subtitle}</Text>
            </View>
          </View>
          
          <View style={styles.onlineIndicator}>
            <View style={styles.onlineDot} />
          </View>
        </View>
      </LinearGradient>

      {/* Messages Area with improved keyboard handling */}
    <KeyboardAwareScrollView
        style={styles.messagesWrapper}
        contentContainerStyle={styles.messagesContentContainer}
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      keyboardShouldPersistTaps="handled"
        extraScrollHeight={50}
        scrollToInputAdditionalOffset={50}
        enableResetScrollToCoords={false}
      animatedScroll={true}
        keyboardOpeningTime={250}
        extraHeight={100}
        showsVerticalScrollIndicator={false}
    >
        <View style={styles.messagesContainer}>
          <MessagesSection messages={messages} isLoading={isLoading} />
        </View>
      </KeyboardAwareScrollView>

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <MessageInput
          inputText={inputText}
          setInputText={setInputText}
          handleSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
    paddingBottom: 20,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '500',
  },
  onlineIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  messagesWrapper: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  messagesContentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    minHeight: 200,
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 34 : 12,
    paddingHorizontal: 0,
  },
});

export default ChatbotScreen;