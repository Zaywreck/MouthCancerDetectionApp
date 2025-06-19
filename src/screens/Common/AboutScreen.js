import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Project Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.projectTitle}>Ağız Kanseri Erken Teşhis Projesi</Text>
        <Text style={styles.paragraph}>
          OralHealth-AI, Samsun, Fırat ve Mersin Üniversitesi
          öğrencisi ve öğretim üyesi tarafından geliştirilmiştir.
          Bu proje, ağız kanserini erken teşhis edebilmek ve ağız
          sağlığı konusunda toplumu bilinçlendirmek amacıyla hayata geçirilmiştir.
        </Text>
        <Text style={styles.paragraph}>
        Türkiye Sağlık Enstitüleri Başkanlığı (TÜSEB) tarafından desteklenen projemiz, yapay zeka teknolojilerini kullanarak ağız sağlığı alanında yenilikçi bir çözüm sunmaktadır.
        Sağlık kuruluşları, doktorlar ve araştırmacılar için faydalı bir araç olmayı hedefliyoruz.
        </Text>
        <Text style={styles.paragraph}>
          Amacımız, teknolojiyi sağlık alanında etkin bir şekilde kullanarak insanların yaşam kalitesini artırmaktır.
          Yenilikçi yapay zeka modelimiz, ağız içi görüntülerini analiz ederek kullanıcılara hızlı ve güvenilir bir ön
          değerlendirme sunmaktadır.
        </Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      <Text style={styles.subtitle}>İletişim Bilgileri</Text>
      <View style={styles.contactContainer}>
        <Text style={styles.contactItem}><Text style={styles.icon}>📧</Text> <Text style={styles.bold}>E-Posta:</Text> mgulle35@gmail.com</Text>
        <Text style={styles.contactItem}><Text style={styles.icon}>🏫</Text> <Text style={styles.bold}>Üniversite:</Text> Samsun Üniversitesi</Text>
        <Text style={styles.contactItem}><Text style={styles.icon}>📍</Text> <Text style={styles.bold}>Adres:</Text> Ondokuz Mayıs / Samsun</Text>
        <Text style={styles.contactItem}><Text style={styles.icon}>📞</Text> <Text style={styles.bold}>Telefon:</Text> +90 552 269 05 31</Text>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Proje Ekibi */}
      <Text style={[styles.subtitle, { marginTop: 30, marginBottom: 20 }]}>Proje Ekibi</Text>
      <View style={styles.teamGrid}>
        {/* Öğretim Üyeleri */}
        <View style={[styles.teamCard, { borderColor: '#2563eb' }]}>
          <Text style={[styles.teamCardTitle, { color: '#2563eb' }]}>Öğretim Üyeleri</Text>
          <View style={styles.memberList}>
            <View style={styles.memberItem}><Text style={styles.memberName}>Prof. Dr. Abdulkadir Şengür</Text></View>
            <View style={styles.memberItem}><Text style={styles.memberName}>Doç. Dr. Muammer Türkoğlu</Text></View>
            <View style={styles.memberItem}><Text style={styles.memberName}>Doç. Dr. Adalet Çelebi</Text></View>
            <View style={styles.memberItem}><Text style={styles.memberName}>Dt. Yağmur Ölmez</Text></View>
          </View>
        </View>
        {/* Araştırma Görevlisi */}
        <View style={[styles.teamCard, { borderColor: '#16a34a' }]}>
          <Text style={[styles.teamCardTitle, { color: '#16a34a' }]}>Araştırma Görevlisi</Text>
          <View style={styles.memberList}>
            <View style={styles.memberItem}><Text style={styles.memberName}>Arş. Gör. Deniz Bora Küçük</Text></View>
          </View>
        </View>
        {/* Öğrenci */}
        <View style={[styles.teamCard, { borderColor: '#7c3aed' }]}>
          <Text style={[styles.teamCardTitle, { color: '#7c3aed' }]}>Öğrenci</Text>
          <View style={styles.memberList}>
            <View style={styles.memberItem}><Text style={styles.memberName}>Mert Gülle</Text></View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F7F8FA',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 22,
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  projectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 1,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#007BFF',
    letterSpacing: 0.5,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 25,
    textAlign: 'justify',
    marginBottom: 13,
    color: '#495057',
  },
  bold: {
    fontWeight: 'bold',
    color: '#222',
  },
  contactContainer: {
    marginTop: 10,
    padding: 18,
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 10,
  },
  contactItem: {
    fontSize: 16,
    marginBottom: 8,
    color: '#343A40',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: 7,
  },
  // Team section styles
  teamGrid: {
    flexDirection: 'column',
    gap: 18,
    marginBottom: 30,
  },
  teamCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 18,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  teamCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  memberList: {
    gap: 8,
  },
  memberItem: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginBottom: 6,
    alignItems: 'center',
  },
  memberName: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
});

export default AboutScreen;
