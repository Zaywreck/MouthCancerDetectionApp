import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MessagesSection = ({ messages, isLoading, botIconName }) => {
  const parseMessageContent = (content, isBot) => {
    if (typeof content !== 'string') content = '';
    const lines = content.split('\n').filter((line) => line.trim());
    return lines.map((line, index) => {
      const boldMatch = line.match(/\*\*(.*?)\*\*/);
      if (boldMatch) {
        const boldText = boldMatch[1];
        const beforeText = line.slice(0, boldMatch.index);
        const afterText = line.slice(boldMatch.index + boldMatch[0].length);
        return (
          <Text key={index} style={[styles.messageText, !isBot && styles.userText]}>
            {beforeText}
            <Text style={[styles.boldText, !isBot && styles.userText]}>{boldText}</Text>
            {afterText}
          </Text>
        );
      }
      const trimmedLine = line.trimStart();
      const indentLevel = (line.length - trimmedLine.length) / 2;
      return (
        <Text
          key={index}
          style={[
            styles.messageText,
            !isBot && styles.userText,
            indentLevel > 0 && { marginLeft: indentLevel * 20 },
          ]}
        >
          {trimmedLine}
        </Text>
      );
    });
  };

  const renderLoadingIndicator = () => (
    <View style={[styles.message, styles.botMessage, styles.loadingMessage]}>
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color="#667eea" />
        <Text style={styles.loadingText}>Yanıt hazırlanıyor...</Text>
      </View>
    </View>
  );

  return (
    <ScrollView 
      contentContainerStyle={styles.messagesContainer}
      showsVerticalScrollIndicator={false}
    >
      {messages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="chatbubbles-outline" size={48} color="#ccc" />
          <Text style={styles.noMessagesText}>Sohbet başlamadan önce</Text>
          <Text style={styles.noMessagesSubtext}>Bir mesaj göndererek konuşmaya başlayın</Text>
        </View>
      ) : (
        <>
          {messages.map((message, index) => (
          <View
            key={index}
              style={[
                styles.messageWrapper,
                message.isBot ? styles.botMessageWrapper : styles.userMessageWrapper,
              ]}
            >
              {message.isBot && (
                <View style={styles.botAvatar}>
                  <Ionicons name={botIconName || 'chatbot'} size={20} color="#667eea" />
                </View>
              )}
              
              <View
            style={[
              styles.message,
              message.isBot ? styles.botMessage : styles.userMessage,
              message.type === 'text' ? styles.textMessage : styles.imageMessage,
            ]}
          >
            {message.type === 'text' ? (
              <View>{parseMessageContent(message.content, message.isBot)}</View>
            ) : (
              <Image source={{ uri: message.content }} style={styles.messageImage} />
            )}
          </View>
              
              {!message.isBot && (
                <View style={styles.userAvatar}>
                  <Ionicons name="person" size={20} color="#fff" />
                </View>
              )}
            </View>
          ))}
          
          {isLoading && renderLoadingIndicator()}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  noMessagesText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  noMessagesSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  messageWrapper: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  botMessageWrapper: {
    justifyContent: 'flex-start',
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  botAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 4,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    marginBottom: 4,
  },
  message: {
    borderRadius: 20,
    padding: 16,
    maxWidth: '75%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  botMessage: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
  },
  userMessage: {
    backgroundColor: '#667eea',
    borderBottomRightRadius: 4,
  },
  loadingMessage: {
    alignSelf: 'flex-start',
    marginLeft: 44, // Account for avatar space
  },
  textMessage: {},
  imageMessage: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  boldText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#333',
  },
  userText: {
    color: '#fff',
  },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 12,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 14,
    color: '#667eea',
    marginLeft: 8,
    fontStyle: 'italic',
  },
});

export default MessagesSection;