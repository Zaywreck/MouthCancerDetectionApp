// navigation/MainNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
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

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackButtonDisplayMode: 'minimal',
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: '#fff' },
        headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#003087' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ModelSelection" component={ModelSelectionScreen} />
      <Stack.Screen name="ModelTest" component={ModelTestScreen} />
      <Stack.Screen name="DoctorRequests" component={DoctorRequestsScreen} />
      <Stack.Screen name="DoctorTest" component={DoctorTestScreen} />
      <Stack.Screen name="DoctorApproval" component={DoctorApprovalScreen} />
      <Stack.Screen name="Detaylar" component={DetailsScreen} />
      <Stack.Screen name="Biz Kimiz" component={AboutScreen} />
      <Stack.Screen name="ChatBot" component={ChatbotSelectionScreen} />
      <Stack.Screen name="Merhaba" component={ChatbotScreen} />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
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