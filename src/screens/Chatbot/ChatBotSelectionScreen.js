import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const ChatbotSelectionScreen = ({ navigation }) => {
  const handleSelectChatbot = (chatbotType) => {
    navigation.navigate('ChatBot', { chatbotType });
  };

  const chatbotOptions = [
    {
      type: 'disease',
      title: 'Ağız Kanseri Danışmanı',
      subtitle: 'Hastalık hakkında bilgi alın',
      description: 'Ağız kanseri belirtileri, risk faktörleri ve önleme yöntemleri hakkında bilgi edinin',
      icon: 'medical',
      gradient: ['#667eea', '#764ba2'],
      iconBg: 'rgba(255,255,255,0.2)'
    },
    {
      type: 'recipe',
      title: 'Sağlıklı Beslenme Asistanı',
      subtitle: 'Beslenme önerileri alın',
      description: 'Ağız sağlığını destekleyen yemek tarifleri ve beslenme önerileri',
      icon: 'nutrition',
      gradient: ['#f093fb', '#f5576c'],
      iconBg: 'rgba(255,255,255,0.2)'
    }
  ];

  const renderChatbotCard = (option) => (
    <TouchableOpacity
      key={option.type}
      style={styles.cardContainer}
      onPress={() => handleSelectChatbot(option.type)}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={option.gradient}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={[styles.iconContainer, { backgroundColor: option.iconBg }]}>
          <Ionicons name={option.icon} size={32} color="#fff" />
        </View>
        
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{option.title}</Text>
          <Text style={styles.cardSubtitle}>{option.subtitle}</Text>
          <Text style={styles.cardDescription}>{option.description}</Text>
        </View>
        
        <View style={styles.arrowContainer}>
          <Ionicons name="chevron-forward" size={24} color="rgba(255,255,255,0.8)" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#f8f9fa', '#e9ecef']}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Ionicons name="chatbubbles" size={32} color="#667eea" />
          <Text style={styles.title}>AI Asistan</Text>
        </View>
        <Text style={styles.subtitle}>Size nasıl yardımcı olabiliriz?</Text>
        <Text style={styles.description}>
          Yapay zeka destekli asistanlarımızdan birini seçerek sorularınızın yanıtlarını alabilirsiniz
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        {chatbotOptions.map(renderChatbotCard)}
      </View>

      <View style={styles.footer}>
        <View style={styles.infoContainer}>
          <Ionicons name="information-circle-outline" size={20} color="#6c757d" />
          <Text style={styles.infoText}>
            Asistanlarımız 7/24 hizmetinizdedir
          </Text>
        </View>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2d3748',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#4a5568',
    marginBottom: 8,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 20,
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  cardContainer: {
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 120,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 18,
  },
  arrowContainer: {
    paddingLeft: 12,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoText: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default ChatbotSelectionScreen;