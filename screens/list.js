import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Modal,
  ScrollView,
  Pressable,
} from "react-native";
import { useState } from "react";
import Separator from "../components/separator";

// Dummy Data (Array of Object)
const datas = [
  {
    id: 1,
    title:
      "Telkom Indonesia Gelar Acara Site Visit Implementasi Digital Culture di Telkom University Surabaya",
    image:
      "https://b3338070.smushcdn.com/3338070/wp-content/uploads/bfi_thumb/telkom-indonesia-7g41cvdgogl9rhsj4xajruxo4gwvtple82g3pv6nyhc.jpg?lossy=2&strip=1&webp=1",
    content:
      "Telkom Indonesia mengadakan acara site visit untuk melihat implementasi digital culture di Telkom University Surabaya. Kegiatan ini bertujuan untuk berbagi pengalaman dan best practice dalam transformasi digital di lingkungan pendidikan tinggi.",
    date: "15 Maret 2024",
  },
  {
    id: 2,
    title: "Tel-U Surabaya Gelar Sosialisasi Bandung Techno Park",
    image:
      "https://b3338070.smushcdn.com/3338070/wp-content/uploads/2024/08/kekayaan-intelektual-1200x600.jpg?lossy=2&strip=1&webp=1",
    content:
      "Telkom University Surabaya mengadakan sosialisasi tentang Bandung Techno Park kepada mahasiswa dan dosen. Acara ini membahas peluang kolaborasi riset dan pengembangan teknologi.",
    date: "20 Agustus 2024",
  },
  {
    id: 3,
    title:
      "Soft Launching dan Pengenalan Laboratorium Motion di Telkom University Surabaya",
    image:
      "https://b3338070.smushcdn.com/3338070/wp-content/uploads/2024/08/motion-capture-1200x600.jpg?lossy=2&strip=1&webp=1",
    content:
      "Telkom University Surabaya meresmikan Laboratorium Motion Capture yang dilengkapi dengan teknologi terkini. Laboratorium ini akan mendukung riset dan pembelajaran di bidang animasi, game development, dan teknologi immersive.",
    date: "25 Agustus 2024",
  },
  {
    id: 4,
    title:
      "Tingkatkan Kualitas Pengelolaan Jurnal Ilmiah: Telkom University Surabaya Gelar Workshop Migrasi Web Jurnal",
    image:
      "https://b3338070.smushcdn.com/3338070/wp-content/uploads/2024/05/workshop-migrasi-web-1200x600.jpg?lossy=2&strip=1&webp=1",
    content:
      "Workshop migrasi web jurnal dilaksanakan untuk meningkatkan kualitas pengelolaan jurnal ilmiah di Telkom University Surabaya. Kegiatan ini diikuti oleh para pengelola jurnal dari berbagai program studi.",
    date: "10 Mei 2024",
  },
  {
    id: 5,
    title:
      "Menggali Potensi Desa: Telkom University Surabaya Mendukung UMKM di Tambak Kalisogo",
    image:
      "https://b3338070.smushcdn.com/3338070/wp-content/uploads/2024/03/Telkom-University-Surabaya-2-1200x600.jpg?lossy=2&strip=1&webp=1",
    content:
      "Program pengabdian masyarakat Telkom University Surabaya membantu UMKM di Desa Tambak Kalisogo untuk mengembangkan potensi ekonomi lokal melalui pelatihan digital marketing dan manajemen usaha.",
    date: "5 Maret 2024",
  },
  {
    id: 6,
    title:
      "Telkom University Surabaya Hadirkan Inovasi Pengganti Bantalan Roda Semi Otonom Tank Leopard berbasis Electric Forklift Khusus untuk Penguatan Alutsista TNI",
    image:
      "https://b3338070.smushcdn.com/3338070/wp-content/uploads/bfi_thumb/tank-leopard-7dnkdoqfkgh7et7l6q0j1odu6ovt6cavmgnig3e1368.jpg?lossy=2&strip=1&webp=1",
    content:
      "Tim peneliti Telkom University Surabaya berhasil mengembangkan inovasi pengganti bantalan roda semi otonom untuk Tank Leopard. Inovasi ini merupakan kontribusi nyata untuk penguatan alutsista TNI.",
    date: "12 Februari 2024",
  },
  {
    id: 7,
    title: "Sosialisasi PKM 2024 Bersama Tim Pemenangan Tel-U Surabaya",
    image:
      "https://b3338070.smushcdn.com/3338070/wp-content/uploads/2024/02/pkm-2024-1-1200x600.jpeg?lossy=2&strip=1&webp=1",
    content:
      "Sosialisasi Program Kreativitas Mahasiswa (PKM) 2024 diselenggarakan untuk memberikan pemahaman kepada mahasiswa tentang skema pendanaan dan cara menyusun proposal yang baik.",
    date: "18 Februari 2024",
  },
  {
    id: 8,
    title:
      "Transformasi Digital Al-Barra Studio Melalui Pembuatan Website oleh Institut Teknologi Telkom Surabaya",
    image:
      "https://b3338070.smushcdn.com/3338070/wp-content/uploads/2023/11/transformasi-digital.jpg?lossy=2&strip=1&webp=1",
    content:
      "Mahasiswa Telkom University Surabaya membantu Al-Barra Studio dalam transformasi digital melalui pembuatan website profesional yang dapat meningkatkan jangkauan bisnis mereka.",
    date: "20 November 2023",
  },
  {
    id: 9,
    title:
      "Program Pengabdian Masyarakat Telkom University Surabaya Bantu UMKM Desa Panjunan Go Digital dan Raih Pasar Internasional",
    image:
      "https://b3338070.smushcdn.com/3338070/wp-content/uploads/2024/09/umkm-go-digital-1200x600.jpg?lossy=2&strip=1&webp=1",
    content:
      "UMKM di Desa Panjunan mendapat pendampingan dari Telkom University Surabaya untuk go digital dan menembus pasar internasional melalui platform e-commerce.",
    date: "5 September 2024",
  },
  {
    id: 10,
    title:
      "Workshop Social Media Marketing dari INDIBIZ Memberdayakan Pedagang Lokal",
    image:
      "https://b3338070.smushcdn.com/3338070/wp-content/uploads/2024/07/social-media-marketing-1-1200x600.jpg?lossy=2&strip=1&webp=1",
    content:
      "Workshop social media marketing diselenggarakan bekerja sama dengan INDIBIZ untuk memberdayakan pedagang lokal dalam memanfaatkan media sosial sebagai sarana promosi dan penjualan.",
    date: "15 Juli 2024",
  },
];

// Functional Component
const List = () => {
  // State untuk modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Handler ketika artikel diklik
  const handleArticlePress = (item) => {
    setSelectedArticle(item);
    setModalVisible(true);
  };

  // Handler untuk menutup modal
  const closeModal = () => {
    setModalVisible(false);
    setSelectedArticle(null);
  };

  // Arrow Function with destructured argument
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.view}
        onPress={() => handleArticlePress(item)}
      >
        <View>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <FlatList
        data={datas}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {selectedArticle && (
                <>
                  <Image
                    source={{ uri: selectedArticle.image }}
                    style={styles.modalImage}
                  />
                  <Separator height={15} />
                  <Text style={styles.modalTitle}>
                    {selectedArticle.title}
                  </Text>
                  <Separator height={10} />
                  <Text style={styles.modalDate}>{selectedArticle.date}</Text>
                  <Separator height={15} />
                  <View style={styles.divider} />
                  <Separator height={15} />
                  <Text style={styles.modalText}>
                    {selectedArticle.content}
                  </Text>
                  <Separator height={20} />
                </>
              )}
            </ScrollView>

            {/* Tombol Close */}
            <Pressable
              style={styles.closeButton}
              onPress={closeModal}
            >
              <Text style={styles.closeButtonText}>TUTUP</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  view: {
    padding: 15,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
  image: {
    height: 200,
    width: null,
  },
  text: {
    fontSize: 18,
    paddingTop: 10,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    height: 200,
    width: "100%",
    borderRadius: 10,
    resizeMode: "cover",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  modalDate: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  divider: {
    height: 1,
    backgroundColor: "#dddddd",
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    textAlign: "justify",
  },
  closeButton: {
    backgroundColor: "#AA0002",
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default List;