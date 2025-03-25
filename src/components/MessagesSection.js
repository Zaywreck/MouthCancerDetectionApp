import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const MessagesSection = ({ messages }) => {
  const parseMessageContent = (content, isBot) => {
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

  return (
    <ScrollView contentContainerStyle={styles.messagesContainer}>
      {messages.length === 0 ? (
        <Text style={styles.noMessagesText}>Henüz bir mesaj yok.</Text>
      ) : (
        messages.map((message, index) => (
          <View
            key={index}
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
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  messagesContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  noMessagesText: {
    fontSize: 24,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 100,
  },
  message: {
    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 12,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  botMessage: {
    backgroundColor: '#e0f7fa',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#00796b',
    alignSelf: 'flex-end',
  },
  textMessage: {},
  imageMessage: {
    backgroundColor: '#ffe0b2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  userText: {
    color: '#fff',
    textAlign: 'justify',
  },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
});

export default MessagesSection;