import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext'; // AuthContext
import HomeScreen from '../screens/HomeScreen';
import ModelScreen from '../screens/ModelScreen';
import DetailsScreen from '../screens/DetailsScreen';
import AboutScreen from '../screens/AboutScreen';
import LoginScreen from '../screens/LoginScreen';
import { TouchableOpacity, Text } from 'react-native';

// Stack ve Navigator Tanımlamaları
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{
      headerBackButtonDisplayMode: "minimal",
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: 'rgba(255, 255, 255,1)'
      },
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{
        headerShown: false,
      }} />
      <Stack.Screen name="Model" component={ModelScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="About" component={AboutScreen} />
    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{
        headerShown: false,
      }} />
      {/* Gerekirse kayıt olma veya şifre sıfırlama ekranları da eklenebilir */}
    </Stack.Navigator>
  );
}

function MainNavigator() {
  const { isLoggedIn, logout } = useAuth(); // Kullanıcı giriş durumu
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        // Giriş yaptıysa uygulama ekranlarına yönlendir
        <AppNavigator />
      ) : (
        // Giriş yapmamışsa giriş ekranına yönlendir
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
}

export default MainNavigator;
