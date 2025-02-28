import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Hakkımızda</Text>
      
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  contactContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  contactItem: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AboutScreen;
