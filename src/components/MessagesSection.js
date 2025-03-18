// MessagesSection.js
import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const MessagesSection = ({ messages }) => {
  return (
    <ScrollView contentContainerStyle={styles.messagesContainer}>
      {messages.length === 0 ? (
        <Text style={styles.noMessagesText}>MAP</Text>
      ) : (
        messages.map((message, index) => (
          <View
            key={index}
            style={[styles.message, message.type === 'text' ? styles.textMessage : styles.imageMessage]}
          >
            {message.type === 'text' ? (
              <Text>{message.content}</Text>
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
    marginBottom: 20,
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
    padding: 10,
    backgroundColor: '#fff',
  },
  textMessage: {
    backgroundColor: '#e0f7fa',
  },
  imageMessage: {
    backgroundColor: '#ffe0b2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
});

export default MessagesSection;
