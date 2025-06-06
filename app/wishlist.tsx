import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, Feather } from '@expo/vector-icons';
import BottomBar from './BottomBar';

export default function WishlistScreen() {
  const { name } = useLocalSearchParams(); 
  const [items, setItems] = useState([]);

  useEffect(() => {
    const dummyData = [
      {
        title: 'Airpod Pro 4',
        time: '3 hours ago',
        suspicious: true,
        price: 299,
        image: require('./WishlistItems/airpods.jpg'),
      },
      {
        title: 'Muji Pen Set',
        time: '2 days ago',
        suspicious: false,
        price: 12.90,
        image: require('./WishlistItems/muji.jpg'),
      },
      {
        title: 'Adidas School Bag',
        time: '1 week ago',
        suspicious: false,
        price: 86.80,
        image: require('./WishlistItems/schoolbag.jpg'),
      },
      {
        title: 'Kunafa Chocolate',
        time: '6 days ago',
        suspicious: false,
        price: 32.80,
        image: require('./WishlistItems/kunafa.jpg'),
      },
    ];
    setItems(dummyData);
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <View style={styles.headerText}>
          <Text style={styles.title}>Katniss’s Wishlist</Text>
        </View>
      </View>

      <TextInput placeholder="Search Items ..." style={styles.search} />

      <ScrollView contentContainerStyle={styles.scroll}>
        {items.map((item, i) => (
          <View key={i} style={[styles.card, item.suspicious && styles.suspiciousCard]}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.time}>Added {item.time}</Text>
              {item.suspicious && <Text style={styles.warning}>⚠️ Suspicious Link</Text>}
              <TouchableOpacity style={styles.gotThisBtn}>
                <Text style={styles.gotThisText}>I got this</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>${item.price}</Text>
            <Feather name="more-vertical" size={20} color="#555" />
          </View>
        ))}
      </ScrollView>
      <BottomBar />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 50, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  headerText: { flex: 1, alignItems: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', color: '#5E35B1' },
  search: {
    backgroundColor: '#f2f2f2', borderRadius: 10, padding: 10, marginBottom: 15,
  },
  scroll: { paddingBottom: 100 },
  card: {
    backgroundColor: '#FFF7E5',
    borderRadius: 16,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  suspiciousCard: {
    backgroundColor: '#F8D7DA',
  },
  image: { width: 50, height: 50, borderRadius: 10, marginRight: 10 },
  info: { flex: 1 },
  itemTitle: { fontSize: 16, fontWeight: 'bold' },
  time: { fontSize: 12, color: '#666' },
  warning: { fontSize: 12, color: '#C62828', marginTop: 4 },
  gotThisBtn: {
    backgroundColor: '#eee', borderRadius: 10, padding: 6, marginTop: 5, alignSelf: 'flex-start',
  },
  gotThisText: { fontSize: 12, color: '#333' },
  price: { fontSize: 14, fontWeight: 'bold', marginRight: 10 },
});
