// src/screens/Chatbot/chatbotApi.js
import axios from 'axios';

const url = process.env.EXPO_PUBLIC_CHAT_URL;
// const chat_port = process.env.EXPO_PUBLIC_CHAT_PORT;
const API_URL = `${url}/recommend`;

export const sendChatbotMessage = async (chatbotType, message) => {
  const body = {
    prompt: message,
    chatbotType,
  };
  const response = await axios.post(API_URL, body);
  return response.data;
};
