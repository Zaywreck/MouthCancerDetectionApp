// ChatbotScreen.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MessagesSection from '../components/MessagesSection';
import MessageInput from '../components/MessageInput';

const ChatbotScreen = () => {
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const handleSendMessage = () => {
        if (inputText.trim()) {
            setMessages([...messages, { type: 'text', content: inputText }]);
            setInputText('');
        }
    };

    return (
        <View style={styles.container}>
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
