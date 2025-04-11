import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
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
    };

    const tabs = ["Genel Bilgi", "Belirtiler", "Tedavi", "Önleme"];

    return (
        <View style={styles.container}>
            {/* Başlık */}
            <View style={styles.header}>
                <Text style={styles.title}>{cancer.name}</Text>
                <Text style={styles.subtitle}>{cancer.subtitle}</Text>
            </View>

            {/* Tab Navigasyonu */}
            <View style={{ position: "relative" }}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={true} // Kaydırılabilir olduğunu göstermek için
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

            {/* İçerik Alanı */}
            <ScrollView style={styles.contentContainer}>
                <View>
                    {activeTab === "Genel Bilgi" && (
                        <View>
                            <InfoCard title="Hastalık Tanımı" icon="information-outline" content={cancer.generalInfo} />
                            {cancer.riskFactors.map((item, index) => (
                                <InfoCard key={index} title={item.title} icon="alert-circle-outline" content={item.content} category="risk" />
                            ))}
                        </View>
                    )}

                    {activeTab === "Belirtiler" && (
                        <View>
                            {cancer.symptoms.map((item, index) => (
                                <InfoCard key={index} title={item.title} icon="stethoscope" content={item.content} category="symptom" />
                            ))}
                        </View>
                    )}

                    {activeTab === "Tedavi" && (
                        <View>
                            {cancer.treatments.map((item, index) => (
                                <InfoCard key={index} title={item.title} icon="pill" content={item.content} category="treatment" />
                            ))}
                        </View>
                    )}

                    {activeTab === "Önleme" && (
                        <View>
                            {cancer.prevention.map((item, index) => (
                                <InfoCard key={index} title={item.title} icon="shield-check-outline" content={item.content} category="prevention" />
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
        risk: "#FFC107",
        symptom: "#DC3545",
        treatment: "#007BFF",
        prevention: "#28A745",
    };

    return (
        <View style={[styles.card, { borderLeftColor: categoryColors[category], borderColor: categoryColors[category] }]}>
            <Icon name={icon} size={24} color={categoryColors[category]} style={styles.cardIcon} />
            <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{title}</Text>
                <Text style={styles.cardContent}>{content}</Text>
            </View>
        </View>
    );
};



/* Stiller */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f5f5f5" },
    header: { padding: 20, backgroundColor: "#007bff", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
    title: { fontSize: 22, fontWeight: "bold", color: "#fff" },
    subtitle: { fontSize: 14, color: "#d9f1ff" },

    tabScrollContainer: {
        flexDirection: "row",
        backgroundColor: "#fff",
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: "center",
    },

    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 22,
        borderRadius: 20,
        backgroundColor: "#fff",
        marginHorizontal: 6,
        borderBottomWidth: 3,
        borderBottomColor: "transparent",
    },

    activeTabButton: {
        backgroundColor: "#007bff",
        borderBottomColor: "#0056b3",
    },

    tabText: {
        fontSize: 12,
        color: "black",
        fontWeight: "bold",
    },

    activeTabText: {
        color: "#fff",
    },

    contentContainer: { padding: 20 },
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
        elevation: 3,
        borderLeftWidth: 6,
        borderWidth: 1,
        alignItems: "flex-start", 
    },
    cardIcon: { marginRight: 10, alignSelf: "flex-start" },
    cardTitle: { fontSize: 16, fontWeight: "bold", flexShrink: 1, flexWrap: "wrap", width: "100%" },
    cardContent: { fontSize: 14, color: "#555", marginTop: 4, flexWrap: "wrap", width: "100%", textAlign: "justify" },
});


export default DetailScreen;
