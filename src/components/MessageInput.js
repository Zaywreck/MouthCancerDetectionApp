import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MessageInput = ({ inputText, setInputText, handleSendMessage, isLoading }) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, isLoading && styles.disabledInput]} // Loading sırasında stil değişikliği
        value={inputText}
        onChangeText={setInputText}
        placeholder="Mesaj yazın..."
        placeholderTextColor="#888"
        editable={!isLoading} // Loading sırasında girişi devre dışı bırak
        returnKeyType="send" // Klavyede "Gönder" tuşu
        onSubmitEditing={handleSendMessage} // Enter tuşu ile gönderme
      />
      <TouchableOpacity
        onPress={handleSendMessage}
        style={[styles.sendButton, isLoading && styles.disabledButton]} // Loading sırasında buton stilini değiştir
        disabled={isLoading || !inputText.trim()} // Boş mesaj veya loading sırasında devre dışı
      >
        <Text style={styles.sendButtonText}>
          {isLoading ? 'Gönderiliyor...' : 'Gönder'}
        </Text>
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
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
    fontSize: 16,
    color: '#333',
  },
  disabledInput: {
    backgroundColor: '#e0e0e0', // Devre dışı bırakıldığında gri ton
    opacity: 0.7,
  },
  sendButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#00796b',
    borderRadius: 8,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#004d40', // Daha koyu bir ton loading sırasında
    opacity: 0.8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MessageInput;