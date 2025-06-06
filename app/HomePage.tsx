import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomBar from './BottomBar';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

const icons = {
  Birthday: require('./EventIcons/cake.png'),
  Wedding: require('./EventIcons/wedding.png'),
  Graduation: require('./EventIcons/graduation.png'),
  Housewarming: require('./EventIcons/house.png'),
  'Baby Shower': require('./EventIcons/pacifier.png'),
  'For partner': require('./EventIcons/partner.png'),
  Christmas: require('./EventIcons/christmas.png'),
  Festivals: require('./EventIcons/festival.png'),
  Others: require('./EventIcons/flower.png'),
};

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      const loadEvents = async () => {
        try {
          const stored = await AsyncStorage.getItem('events');
          if (stored) {
            setEvents(JSON.parse(stored));
          } else {
            setEvents([]);
          }
        } catch (e) {
          console.error('Failed to load events:', e);
        }
      };

      loadEvents();
    }, [])
  );

  const getEventIcon = (category) => icons[category] || icons['Others'];

  return (
    <ImageBackground
      source={require('./BackgroundCover.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Text style={styles.logo}>SmartGifter</Text>
        </View>

        <Text style={styles.sectionTitle}>Events</Text>

        <ScrollView contentContainerStyle={styles.scroll}>
          {events.length === 0 ? (
            <Text style={styles.noEventText}>
              You haven’t created or joined any events yet.
            </Text>
          ) : (
            events.map((event, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  console.log('Navigating to Wishlist of:', event.name);
                  router.push({ pathname: '/wishlist', query: { name: event.name } });
                }}
                style={[
                  styles.eventCard,
                  event.isMine ? styles.userEvent : styles.friendEvent,
                ]}
              >
                <Image
                  source={getEventIcon(event.category)}
                  style={styles.eventIcon}
                />
                <View>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <Text>{event.date}</Text>
                  <Text>👥 {event.attendees}</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/CreateEventScreen')}
          >
            <Text style={styles.buttonText}>Create Event</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/Joinexisting')}
          >
            <Text style={styles.buttonText}>Join Event</Text>
          </TouchableOpacity>
        </View>

        <BottomBar />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  searchBar: {
    padding: 20,
    backgroundColor: '#14898D',
  },
  logo: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    color: '#2c3e50',
  },
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  eventCard: {
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    alignItems: 'center',
  },
  userEvent: {
    backgroundColor: '#FFF9DB',
  },
  friendEvent: {
    backgroundColor: '#EBDDFB',
  },
  eventIcon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  eventName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  noEventText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
  buttonGroup: {
    position: 'absolute',
    bottom: 70,
    width: '100%',
    paddingHorizontal: 30,
  },
  button: {
    backgroundColor: '#14898D',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});




