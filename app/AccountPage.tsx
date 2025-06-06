import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomBar from './BottomBar';

export default function AccountPage() {
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={require('./BackgroundCover.jpg')}
        style={styles.background}
      >
        <View style={styles.container}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <Image
              source={require('./profilePic.jpg')}
              style={styles.profileImage}
            />
            <Text style={styles.profileName}>Naomi Scott</Text>
          </View>

          {/* Profile Menu Items */}
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Your Profile</Text>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Find Members</Text>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Notification</Text>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Settings</Text>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Invite Friends</Text>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Help Center</Text>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuText}>Share Feedback</Text>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <Text style={[styles.menuText, { color: 'red' }]}>Log Out</Text>
              <Ionicons name="chevron-forward" size={20} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 100,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuText: {
    fontSize: 16,
    color: '#000',
  },
});

