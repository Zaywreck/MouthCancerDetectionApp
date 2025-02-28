import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import InformationCard from '../components/InformationCard';

const DetailsScreen = () => {
    // State to handle text expansion
    const [expandedText, setExpandedText] = useState({
        cancerDescription: false,
        symptoms: false,
        treatment: false,
    });

    // Toggle expanded text state
    const toggleTextExpansion = (section) => {
        setExpandedText((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <ScrollView style={styles.container}>
            {/* Ağız Kanseri Nedir? */}
            <InformationCard
                title="Ağız Kanseri Nedir?"
                content={expandedText.cancerDescription ?
                    "Ağız kanseri, ağız içinde oluşan kötü huylu bir tümördür. Erken teşhis, tedavi şansını arttırır. Ağız kanseri, genellikle diş etlerinde, dilde, dudaklarda veya ağız tabanında başlar. Ağız kanseri geliştiğinde, hastalar genellikle ağrı, kanama, şişlik ve yara gibi belirtiler yaşarlar. Erken teşhis, bu kanser türünün tedavi edilebilirliğini artırır, bu yüzden düzenli diş hekimi kontrolleri önemlidir."
                    : "Ağız kanseri, ağız içinde oluşan kötü huylu bir tümördür..."}
                imageSrc="a1"  // Pass the image identifier
                imagePosition="left"
            />
            <TouchableOpacity onPress={() => toggleTextExpansion('cancerDescription')}>
                <Text style={styles.readMore}>{expandedText.cancerDescription ? "Kapat" : "Devamını oku.."}</Text>
            </TouchableOpacity>

            {/* Belirtiler */}
            <InformationCard
                title="Belirtiler"
                content={expandedText.symptoms ?
                    "Ağız kanserinin erken belirtileri arasında ağızda beyaz veya kırmızı lekeler, ağız içinde yara ve şişlik bulunur. Yara veya leke birkaç hafta içinde iyileşmiyorsa, bu bir uyarı işareti olabilir. Diğer belirtiler arasında yutma zorluğu, ağızda kanama, dişlerde gevşeme, çene ağrısı ve ağızda sürekli kötü koku yer alır. Bu belirtiler, başka sağlık sorunlarının bir sonucu olabileceği gibi, ağız kanserinin başlangıç aşamalarına da işaret edebilir."
                    : "Ağız kanserinin erken belirtileri..."}
                imageSrc="a2"  // Pass the image identifier
                imagePosition="right"
            />
            <TouchableOpacity onPress={() => toggleTextExpansion('symptoms')}>
                <Text style={styles.readMore}>{expandedText.cancerDescription ? "Kapat" : "Devamını oku.."}</Text>
            </TouchableOpacity>

            {/* Tedavi Yöntemleri */}
            <InformationCard
                title="Tedavi Yöntemleri"
                content={expandedText.treatment ?
                    "Ağız kanseri tedavi yöntemleri arasında cerrahi müdahale, ışın tedavisi (radyoterapi) ve kemoterapi bulunmaktadır. Cerrahi müdahale, tümörün bulunduğu bölgenin çıkarılmasını içerir. Eğer kanser erken aşamada tespit edilirse, tedavi genellikle cerrahi yöntemlerle başarılı olabilir. Işın tedavisi ise kanser hücrelerini öldürmek için yüksek enerjili ışınlar kullanır ve kemoterapi, kanser hücrelerinin büyümesini engellemeyi hedefler. Tedavi seçeneği, kanserin yayılma seviyesine ve hastanın genel sağlık durumuna bağlıdır."
                    : "Ağız kanseri tedavi yöntemleri..."}
                imageSrc="a3"  // Pass the image identifier
                imagePosition="left"
            />
            <TouchableOpacity onPress={() => toggleTextExpansion('treatment')}>
                <Text style={styles.readMore}>{expandedText.cancerDescription ? "Kapat" : "Devamını oku.."}</Text>
            </TouchableOpacity>

            {/* Source Section */}
            <View style={styles.source}>
                <Text style={styles.sourceTitle}>Bkz.</Text>
                <View style={styles.sourceList}>
                    <Text>
                        <Text style={styles.sourceLink} onPress={() => openURL('https://www.cancer.org/cancer/oral-cavity-and-oropharyngeal-cancer.html')}>
                            American Cancer Society - Oral Cavity and Oropharyngeal Cancer
                        </Text>
                    </Text>
                    <Text>
                        <Text style={styles.sourceLink} onPress={() => openURL('https://www.who.int/news-room/fact-sheets/detail/oral-health')}>
                            World Health Organization - Oral Health
                        </Text>
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

// Helper function to open links in browser
const openURL = (url) => {
    Linking.openURL(url);
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    source: {
        marginTop: 20,
    },
    sourceTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    sourceList: {
        marginTop: 10,
    },
    sourceLink: {
        color: '#1e90ff',
    },
    readMore: {
        color: '#1e90ff',
        fontSize: 16,
        marginTop: 10,
        textAlign: 'center',
    },
});

export default DetailsScreen;
