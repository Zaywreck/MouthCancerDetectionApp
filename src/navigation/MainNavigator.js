// navigation/MainNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/Common/HomeScreen';
import ModelSelectionScreen from '../screens/Common/ModelSelectionScreen';
import ModelTestScreen from '../screens/Common/ModelTestScreen';
import HistopathologyTestScreen from '../screens/Common/HistopatologyTestScreen';
import ResultsScreen from '../screens/User/ResultsScreen';
import DoctorApprovalScreen from '../screens/Doctor/DoctorApprovalScreen';
import ChatbotScreen from '../screens/Chatbot/ChatBotScreen';
import ChatbotSelectionScreen from '../screens/Chatbot/ChatBotSelectionScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen';  
import DetailsScreen from '../screens/Common/DetailsScreen';
import AboutScreen from '../screens/Common/AboutScreen';
import DoctorRequestsScreen from '../screens/Doctor/DoctorRequestsScreen';
import DoctorTestScreen from '../screens/Doctor/DoctorTestScreen';


const Stack = createStackNavigator();

// Common stack options
const stackOptions = {
  headerBackButtonDisplayMode: 'minimal',
  headerTitleAlign: 'center',
  headerStyle: { backgroundColor: '#fff' },
  headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#003087' },
};

// Navigator for unauthenticated users
function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Kayıt Ol' }} />
    </Stack.Navigator>
  );
}

// Navigator for authenticated users
function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={stackOptions}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      {/* ModelTestScreen is used for both AI model and histopathology tests */}
      <Stack.Screen name="ModelSelection" component={ModelSelectionScreen} options={{ title: 'Model Seçimi' }} />
      <Stack.Screen name="ModelTest" component={ModelTestScreen} options={{ title: 'Model Test' }} />
      <Stack.Screen name="HistopathologyTest" component={HistopathologyTestScreen} options={{ title: 'Histopatoloji Testi' }} />
      {/* related to results */}
      <Stack.Screen name="Results" component={ResultsScreen} options={{ title: 'Sonuçlarım' }} />
      <Stack.Screen name="DoctorRequests" component={DoctorRequestsScreen} options={{ title: 'Doktor İstekleri' }} />
      <Stack.Screen name="DoctorTest" component={DoctorTestScreen} options={{ title: 'Doktor Test' }} />
      <Stack.Screen name="DoctorApproval" component={DoctorApprovalScreen} options={{ title: 'Doktor Onay' }} />
      {/* rest of the screens */}
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detaylar' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'Biz Kimiz' }} />
      {/* Chatbot related screens */}
      <Stack.Screen name="ChatBotSelection" component={ChatbotSelectionScreen} options={{ title: 'ChatBotSelection' }} />
      <Stack.Screen name="ChatBot" component={ChatbotScreen} options={{ title: 'ChatBot' }} />
    </Stack.Navigator>
  );
}

function MainNavigator() {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default MainNavigator;