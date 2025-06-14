import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MessageInput = ({ inputText, setInputText, handleSendMessage, isLoading }) => {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
      <TextInput
          style={[styles.input, isLoading && styles.disabledInput]}
        value={inputText}
        onChangeText={setInputText}
          placeholder="Mesajınızı yazın..."
          placeholderTextColor="#999"
          editable={!isLoading}
          returnKeyType="send"
          onSubmitEditing={handleSendMessage}
          multiline
          maxLength={500}
      />
      <TouchableOpacity
        onPress={handleSendMessage}
          style={[
            styles.sendButton,
            (isLoading || !inputText.trim()) && styles.disabledButton
          ]}
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? (
            <Ionicons name="hourglass" size={22} color="#fff" />
          ) : (
            <Ionicons name="send" size={22} color="#fff" />
          )}
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#f8f9fa',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 12,
    paddingHorizontal: 4,
    maxHeight: 100,
    minHeight: 20,
  },
  disabledInput: {
    opacity: 0.6,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#667eea',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
});

export default MessageInput;