// components/InformationCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Import images statically
import imageA1 from '../../assets/images/a1.jpeg';
import imageA2 from '../../assets/images/a2.jpeg';
import imageA3 from '../../assets/images/a3.jpeg';

const InformationCard = ({ title, content, imageSrc, imagePosition }) => {
  // Use the passed image as the source
  let image;
  switch(imageSrc) {
    case 'a1':
      image = imageA1;
      break;
    case 'a2':
      image = imageA2;
      break;
    case 'a3':
      image = imageA3;
      break;
    default:
      image = null;
  }

  return (
    <View style={styles.cardContainer}>
      <View
        style={[
          styles.cardContent,
          imagePosition === 'left' ? styles.contentLeft : styles.contentRight,
        ]}
      >
        {imagePosition === 'left' && (
          <Image source={image} style={styles.cardImage} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardContentText}>{content}</Text>
        </View>
        {imagePosition === 'right' && (
          <Image source={image} style={styles.cardImage} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentLeft: {
    flexDirection: 'row',
  },
  contentRight: {
    flexDirection: 'row-reverse',
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContentText: {
    fontSize: 14,
    color: '#555',
  },
});

export default InformationCard;
