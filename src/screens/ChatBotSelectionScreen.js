import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ikonlar için (npm install @expo/vector-icons)

const ChatbotSelectionScreen = ({ navigation }) => {
  const handleSelectChatbot = (chatbotType) => {
    navigation.navigate('Merhaba', { chatbotType });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chatbot Seçimi</Text>
        <Text style={styles.subtitle}>Size nasıl yardımcı olabiliriz?</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectChatbot('disease')}
      >
        <Ionicons name="medical-outline" size={24} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Hastalık Hakkında Yardım</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleSelectChatbot('recipe')}
      >
        <Ionicons name="restaurant-outline" size={24} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Yemek Tarifi Yardımı</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA', // Hafif gri-mavi, medikal ton
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003087', // Koyu mavi, HomeScreen ile uyumlu
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666', // Gri, ikincil metin
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF', // Teal yerine iOS mavi, medikal ve modern
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: 280, // Biraz daha geniş
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonIcon: {
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ChatbotSelectionScreen;