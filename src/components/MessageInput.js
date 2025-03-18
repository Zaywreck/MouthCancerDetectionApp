// MessageInput.js
import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MessageInput = ({ inputText, setInputText, handleSendMessage }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Mesaj yazın..."
        placeholderTextColor="#888"
      />
      <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
        <Text style={styles.sendButtonText}>Gönder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#00796b',
    borderRadius: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default MessageInput;
