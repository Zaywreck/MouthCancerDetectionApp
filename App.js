// App.js
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainNavigator from './src/navigation/MainNavigator';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <MainNavigator />
      </SafeAreaView>
    </AuthProvider>
  );
}
