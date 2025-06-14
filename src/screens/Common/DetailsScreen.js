import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Linking } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // İkonlar için

const DetailScreen = () => {
    const [activeTab, setActiveTab] = useState("Genel Bilgi");

    const cancer = {
        name: "Ağız Kanseri",
        subtitle: "Ağız boşluğunda oluşan anormal hücre büyümesi",
        generalInfo:
            "Ağız kanseri, ağız boşluğunda oluşan ve çene, dil, diş etleri, yanakların iç kısmı veya dudaklarda gelişebilen kötü huylu tümörleri ifade eder. Erken teşhis, ağız kanserinin başarılı bir şekilde tedavi edilmesi için çok önemlidir. Düzenli diş hekimi kontrolü ve ağız içi muayenesi, erken teşhiste hayati rol oynar.",
        riskFactors: [
            { title: "Tütün Kullanımı", content: "Sigara, puro, pipo veya çiğneme tütünü ağız kanseri riskini artırır." },
            { title: "Alkol Tüketimi", content: "Aşırı alkol tüketimi, özellikle tütünle birleştiğinde ağız kanseri riskini artırır." },
            { title: "HPV Enfeksiyonu", content: "İnsan papilloma virüsü (HPV) enfeksiyonu, özellikle HPV-16 suşu, bazı ağız kanseri türleriyle ilişkilendirilmiştir." },
            { title: "Güneş Işığı", content: "Uzun süreli güneş ışığına maruz kalma, özellikle dudak kanserlerinin gelişimi için bir risk faktörüdür." },
            { title: "Beslenme", content: "Yetersiz meyve ve sebze tüketimi ağız kanseri riskini artırabilir." },
        ],
        symptoms: [
            { title: "Ağızda İyileşmeyen Yaralar", content: "İki haftadan uzun süren ağız yaraları veya ülserler." },
            { title: "Beyaz veya Kırmızı Lekeler", content: "Ağız içinde, dilde veya dudaklarda gelişen beyaz veya kırmızı lekeler." },
            { title: "Şişlikler veya Kalınlaşmalar", content: "Ağız içinde, çenede veya boyunda şişlikler, kalınlaşmalar veya kitleler." },
            { title: "Yutma ve Çiğneme Zorlukları", content: "Yemek yerken veya içerken ağrı veya yutkunma zorluğu yaşama." },
            { title: "Diş Uyumu Problemleri", content: "Takma dişlerin artık uymaması veya rahatsızlık vermesi." },
            { title: "Sürekli Ağız veya Boğaz Ağrısı", content: "Geçmeyen boğaz ağrısı veya ağızda sürekli hissedilen bir rahatsızlık." },
            { title: "Konuşma Zorlukları", content: "Dil veya ağızda gelişen anormallikler nedeniyle konuşmada zorlanma." },
            { title: "Uyuşma veya Hissizlik", content: "Ağız içinde, dudaklarda veya çenede uyuşma veya his kaybı yaşama." },
            { title: "Kötü Ağız Kokusu", content: "Ağız hijyenine rağmen geçmeyen kötü ağız kokusu." }
        ],
        treatments: [
            { title: "Cerrahi Müdahale", content: "Tümörün ve etkilenmiş olabilecek çevre dokuların çıkarılması için cerrahi müdahale genellikle ilk tedavi seçeneğidir." },
            { title: "Radyasyon Tedavisi", content: "Yüksek enerjili ışınlar kullanılarak kanser hücrelerini hedef alan ve öldüren bir tedavi yöntemidir. Cerrahi sonrası tamamlayıcı tedavi olarak veya tek başına uygulanabilir." },
            { title: "Kemoterapi", content: "İlaçlarla kanser hücrelerinin büyümesini ve bölünmesini durdurmayı amaçlayan sistemik bir tedavidir. Genellikle diğer tedavi yöntemleriyle birlikte kullanılır." },
            { title: "Hedefe Yönelik Tedaviler", content: "Kanser hücrelerindeki belirli molekülleri hedefleyen ve normal hücrelere minimal zarar veren yeni tedavi yöntemleridir." },
            { title: "İmmünoterapi", content: "Vücudun bağışıklık sistemini güçlendirerek kanserle savaşmasına yardımcı olan tedavi yöntemidir." },
            { title: "Rekonstrüktif Cerrahi", content: "Kanser tedavisi sırasında çıkarılan dokuların yerine yenilerini koymak için yapılan cerrahi işlemler, görünüm ve işlevi iyileştirmeye yardımcı olur." }
        ],
        prevention: [
            { title: "Tütün Ürünlerinden Kaçının", content: "Sigara, puro, pipo veya çiğneme tütünü gibi tütün ürünlerini kullanmayın veya kullanıyorsanız bırakın." },
            { title: "Alkol Tüketimini Sınırlayın", content: "Alkol tüketimini azaltın veya tamamen bırakın. Alkol ve tütün kullanımı birlikte ağız kanseri riskini önemli ölçüde artırır." },
            { title: "Sağlıklı Beslenin", content: "Meyve ve sebzelerden zengin, dengeli bir diyet tüketin. Antioksidanlar ve diğer besinler kanser riskini azaltabilir." },
            { title: "Düzenli Diş Hekimi Kontrolü", content: "Yılda en az iki kez diş hekimine giderek ağız muayenesi yaptırın. Erken teşhis, başarılı tedavi şansını artırır." },
            { title: "Dudak Koruyucu Kullanın", content: "Güneşe maruz kaldığınızda, özellikle dudaklarınızı korumak için SPF içeren dudak koruyucuları kullanın." },
            { title: "HPV Aşısı", content: "HPV enfeksiyonunu önlemeye yardımcı olan aşılar, bazı ağız kanseri türlerine karşı koruma sağlayabilir." }
        ],
        resources: [
            {
                title: "T.C. Sağlık Bakanlığı Kanser Dairesi",
                type: "Resmi Kaynak",
                description: "Ağız kanseri hakkında güncel bilgiler ve istatistikler",
                url: "https://kanser.saglik.gov.tr",
                icon: "shield-checkmark"
            },
            {
                title: "Türk Kanser Araştırma ve Savaş Kurumu",
                type: "Araştırma Kurumu",
                description: "Kanser önleme, erken tanı ve tedavi programları",
                url: "https://www.turkkanser.org.tr",
                icon: "school"
            },
            {
                title: "American Cancer Society - Oral Cancer",
                type: "Uluslararası Kaynak",
                description: "Ağız kanseri hakkında kapsamlı tıbbi bilgiler",
                url: "https://www.cancer.org/cancer/oral-cavity-and-oropharyngeal-cancer.html",
                icon: "globe"
            },
            {
                title: "National Cancer Institute",
                type: "Araştırma Enstitüsü",
                description: "Ağız ve orofarinks kanseri tedavi rehberleri",
                url: "https://www.cancer.gov/types/head-and-neck/patient/adult/lip-mouth-treatment-pdq",
                icon: "library"
            },
            {
                title: "Oral Cancer Foundation",
                type: "Vakıf",
                description: "Ağız kanseri farkındalığı ve hasta desteği",
                url: "https://oralcancerfoundation.org",
                icon: "heart"
            },
            {
                title: "WHO Oral Health Programme",
                type: "Dünya Sağlık Örgütü",
                description: "Küresel ağız sağlığı politikaları ve rehberleri",
                url: "https://www.who.int/news-room/fact-sheets/detail/oral-health",
                icon: "earth"
            }
        ],
    };

    const tabs = ["Genel Bilgi", "Belirtiler", "Tedavi", "Önleme", "Kaynaklar"];

    const handleResourcePress = async (url) => {
        try {
            const canOpen = await Linking.canOpenURL(url);
            if (canOpen) {
                await Linking.openURL(url);
            }
        } catch (error) {
            console.error('Bağlantı açılamadı:', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Header with Gradient */}
            <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.header}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
            >
                <Text style={styles.title}>{cancer.name}</Text>
                <Text style={styles.subtitle}>{cancer.subtitle}</Text>
            </LinearGradient>

            {/* Tab Navigation */}
            <View style={styles.tabContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.tabScrollContainer}
                >
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            style={[
                                styles.tabButton,
                                activeTab === tab && styles.activeTabButton
                            ]}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Content Area */}
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.contentInner}>
                    {activeTab === "Genel Bilgi" && (
                        <View>
                            <InfoCard title="Hastalık Tanımı" icon="information-circle" content={cancer.generalInfo} />
                            {cancer.riskFactors.map((item, index) => (
                                <InfoCard key={index} title={item.title} icon="warning" content={item.content} category="risk" />
                            ))}
                        </View>
                    )}

                    {activeTab === "Belirtiler" && (
                        <View>
                            {cancer.symptoms.map((item, index) => (
                                <InfoCard key={index} title={item.title} icon="medical" content={item.content} category="symptom" />
                            ))}
                        </View>
                    )}

                    {activeTab === "Tedavi" && (
                        <View>
                            {cancer.treatments.map((item, index) => (
                                <InfoCard key={index} title={item.title} icon="fitness" content={item.content} category="treatment" />
                            ))}
                        </View>
                    )}

                    {activeTab === "Önleme" && (
                        <View>
                            {cancer.prevention.map((item, index) => (
                                <InfoCard key={index} title={item.title} icon="shield-checkmark" content={item.content} category="prevention" />
                            ))}
                        </View>
                    )}

                    {activeTab === "Kaynaklar" && (
                        <View>
                            {cancer.resources.map((resource, index) => (
                                <ResourceCard 
                                    key={index} 
                                    resource={resource} 
                                    onPress={() => handleResourcePress(resource.url)}
                                />
                            ))}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};

/* İçerik Kartı */
const InfoCard = ({ title, icon, content, category }) => {
    const categoryColors = {
        risk: ["#FF6B6B", "#EE5A24"],
        symptom: ["#FF3742", "#C44569"],
        treatment: ["#3742FA", "#2F3A8F"],
        prevention: ["#05C46B", "#0FB9B1"],
        default: ["#667eea", "#764ba2"]
    };

    const colors = categoryColors[category] || categoryColors.default;

    return (
        <View style={styles.card}>
            <LinearGradient
                colors={[colors[0] + '15', colors[1] + '10']}
                style={styles.cardGradient}
            >
                <View style={styles.cardHeader}>
                    <View style={[styles.iconContainer, { backgroundColor: colors[0] + '20' }]}>
                        <Ionicons name={icon} size={24} color={colors[0]} />
                    </View>
                <Text style={styles.cardTitle}>{title}</Text>
                </View>
                <Text style={styles.cardContent}>{content}</Text>
            </LinearGradient>
        </View>
    );
};

/* Resource Card Component */
const ResourceCard = ({ resource, onPress }) => {
    return (
        <TouchableOpacity style={styles.resourceCard} onPress={onPress}>
            <LinearGradient
                colors={['#f8f9fa', '#ffffff']}
                style={styles.resourceGradient}
            >
                <View style={styles.resourceHeader}>
                    <View style={styles.resourceIconContainer}>
                        <Ionicons name={resource.icon} size={24} color="#667eea" />
                    </View>
                    <View style={styles.resourceInfo}>
                        <Text style={styles.resourceTitle}>{resource.title}</Text>
                        <Text style={styles.resourceType}>{resource.type}</Text>
                    </View>
                    <Ionicons name="open-outline" size={20} color="#667eea" />
                </View>
                <Text style={styles.resourceDescription}>{resource.description}</Text>
            </LinearGradient>
        </TouchableOpacity>
    );
};

/* Stiller */
const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#f8f9fa" 
    },
    header: { 
        padding: 30, 
        paddingTop: 50,
        borderBottomLeftRadius: 25, 
        borderBottomRightRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    title: { 
        fontSize: 28, 
        fontWeight: "800", 
        color: "#fff",
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: { 
        fontSize: 16, 
        color: "rgba(255,255,255,0.9)",
        textAlign: 'center',
        fontWeight: '500',
    },
    tabContainer: {
        backgroundColor: '#fff',
        paddingVertical: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    tabScrollContainer: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: "center",
    },
    tabButton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        backgroundColor: "#f8f9fa",
        marginHorizontal: 6,
        borderWidth: 2,
        borderColor: "transparent",
        minWidth: 80,
        alignItems: 'center',
    },
    activeTabButton: {
        backgroundColor: "#667eea",
        borderColor: "#5a67d8",
        shadowColor: '#667eea',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    tabText: {
        fontSize: 14,
        color: "#6c757d",
        fontWeight: "600",
    },
    activeTabText: {
        color: "#fff",
        fontWeight: "700",
    },
    contentContainer: { 
        flex: 1,
        padding: 20 
    },
    contentInner: {
        paddingBottom: 20,
    },
    card: {
        marginBottom: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
    },
    cardGradient: {
        padding: 20,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardTitle: { 
        fontSize: 18, 
        fontWeight: "700", 
        color: "#2d3748",
        flex: 1,
        lineHeight: 24,
    },
    cardContent: { 
        fontSize: 15, 
        color: "#4a5568", 
        lineHeight: 22,
        textAlign: "justify",
    },
    resourceCard: {
        marginBottom: 16,
        borderRadius: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        overflow: 'hidden',
    },
    resourceGradient: {
        padding: 20,
    },
    resourceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    resourceIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#667eea15',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    resourceInfo: {
        flex: 1,
    },
    resourceTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2d3748',
        marginBottom: 4,
    },
    resourceType: {
        fontSize: 13,
        color: '#667eea',
        fontWeight: '600',
        backgroundColor: '#667eea15',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    resourceDescription: {
        fontSize: 14,
        color: '#4a5568',
        lineHeight: 20,
    },
});

export default DetailScreen;
