import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DetailSection = ({ isActive, title, children }) => {
  if (!isActive) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DetailSection;
