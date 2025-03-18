import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const teamMembers = [
  {
    name: 'Mert Gülle',
    role: 'Danışman Hoca',
    image: require('../../assets/images/ass.jpg'),
  },
  {
    name: 'Mert Gülle',
    role: 'Yapay Zeka Geliştiricisi',
    image: require('../../assets/images/ass.jpg'),
  },
  {
    name: 'Mert Gülle',
    role: 'Mobil Uygulama Geliştiricisi',
    image: require('../../assets/images/ass.jpg'),
  },
];

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.paragraph}>
        Bu proje, Samsun Üniversitesi öğrencileri tarafından geliştirilmiştir. Danışman hocamız
        <Text style={styles.bold}> Muammer Türkoğlu</Text> rehberliğinde yürütülen bu çalışma, TÜSEB tarafından desteklenmektedir.
      </Text>

      <Text style={styles.paragraph}>
        Yapay zeka destekli bu sistem, ağız kanseri gibi ciddi hastalıkların erken teşhis edilmesine yardımcı olmayı
        amaçlamaktadır. Sağlık kuruluşları, doktorlar ve araştırmacılar için faydalı bir araç olmayı hedefliyoruz.
      </Text>

      <Text style={styles.paragraph}>
        Amacımız, teknolojiyi sağlık alanında etkin bir şekilde kullanarak insanların yaşam kalitesini artırmaktır.
        Yenilikçi yapay zeka modelimiz, ağız içi görüntülerini analiz ederek kullanıcılara hızlı ve güvenilir bir ön
        değerlendirme sunmaktadır.
      </Text>

      <Text style={styles.subtitle}>İletişim Bilgileri</Text>
      <View style={styles.contactContainer}>
        <Text style={styles.contactItem}><Text style={styles.bold}>E-Posta:</Text> mgulle35@gmail.com</Text>
        <Text style={styles.contactItem}><Text style={styles.bold}>Üniversite:</Text> Samsun Üniversitesi</Text>
        <Text style={styles.contactItem}><Text style={styles.bold}>Adres:</Text> Ondokuz Mayıs / Samsun</Text>
        <Text style={styles.contactItem}><Text style={styles.bold}>Telefon:</Text> +90 552 269 05 31</Text>
      </View>

      {/* Team Members Slider */}
      <Text style={[styles.subtitle, { marginTop: 30 }]}>Projede Emeği Geçenler</Text>
      <Carousel
        data={teamMembers}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={item.image} style={styles.teamImage} />
            <Text style={styles.teamName}>{item.name}</Text>
            <Text style={styles.teamRole}>{item.role}</Text>
          </View>
        )}
        sliderWidth={350}
        itemWidth={300}
        activeSlideAlignment="start"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F8FA',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#007BFF',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 15,
    color: '#495057',
  },
  bold: {
    fontWeight: 'bold',
  },
  contactContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#F1F3F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  contactItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#343A40',
  },
  carouselItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    marginBottom: 20,
  },
  teamImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 5,
  },
  teamRole: {
    fontSize: 16,
    color: '#6C757D',
  },
});

export default AboutScreen;
