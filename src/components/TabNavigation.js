import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

const TabNavigation = ({ tabs, activeTab, onChange }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab;
        return (
          <TouchableOpacity key={index} onPress={() => onChange(tab)} style={[styles.tab, isActive && styles.activeTab]}>
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f2f2f2',
    paddingVertical: 10,
    borderRadius: 10,
    margin: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    color: '#555',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TabNavigation;
