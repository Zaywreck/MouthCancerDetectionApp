// ImagePickerButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ImagePickerButton = ({ handleImageUpload }) => {
  return (
    <TouchableOpacity onPress={handleImageUpload} style={styles.addImageButton}>
      <Text style={styles.addImageButtonText}>🖼️</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addImageButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
  },
  addImageButtonText: {
    fontSize: 24,
  },
});

export default ImagePickerButton;
