// navigation/MainNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import HomeScreen from '../screens/HomeScreen';
import ModelSelectionScreen from '../screens/ModelSelectionScreen';
import ModelTestScreen from '../screens/ModelTestScreen';
import DoctorRequestsScreen from '../screens/DoctorRequestsScreen';
import DoctorTestScreen from '../screens/DoctorTestScreen';
import DoctorApprovalScreen from '../screens/DoctorApprovalScreen';
import DetailsScreen from '../screens/DetailsScreen';
import AboutScreen from '../screens/AboutScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatbotSelectionScreen from '../screens/ChatBotSelectionScreen';
import ChatbotScreen from '../screens/ChatBotScreen';
import ResultsScreen from '../screens/ResultsScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HistopathologyTestScreen from '../screens/HistopatologyTestScreen';

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