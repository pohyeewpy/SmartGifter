import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function BottomBar() {
  const router = useRouter();

  return (
    <View style={styles.bottomBar}>
      <TouchableOpacity onPress={() => router.push('/HomePage')} style={styles.squareButton}>
        <Ionicons name="home" size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/ShoppingPage')} style={styles.squareButton}>
        <Ionicons name="cart" size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/RewardsPage')} style={styles.squareButton}>
        <Ionicons name="ribbon" size={22} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/AccountPage')} style={styles.squareButton}>
        <Ionicons name="person" size={22} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#14898D',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
  },
  squareButton: {
    backgroundColor: '#14898D',
    padding: 14,
    borderRadius: 8,
  },
});

