import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import BottomBar from './BottomBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function JoinEvent() {
  const [accessCode, setAccessCode] = useState('');
  const router = useRouter();

  const handleJoin = async () => {
    if (!accessCode) {
      Alert.alert('Missing Info', 'Please enter the access code');
      return;
    }

    let newEvent = null;
    const inputCode = accessCode.trim(); 

    // Match access code to event
    if (inputCode === '45Ty7e*') {
      newEvent = {
        name: "Katniss's Wedding",
        date: '15/10/2025',
        category: 'Wedding',
        attendees: 42,
        isMine: false,
      };
    } else if (inputCode === 'Gr4dTimo!') {
      newEvent = {
        name: "Timothy's Graduation",
        date: '13/6/2025',
        category: 'Graduation',
        attendees: 4,
        isMine: false,
      };
    }

    if (newEvent) {
      try {
        const existing = await AsyncStorage.getItem('events');
        const events = existing ? JSON.parse(existing) : [];

        // Prevent duplicate
        const isDuplicate = events.some(event => event.name === newEvent.name);
        if (isDuplicate) {
          Alert.alert('Already Joined', 'You have already joined this event.');
          setAccessCode('');
          return;
        }

        events.push(newEvent);
        await AsyncStorage.setItem('events', JSON.stringify(events));
        Alert.alert('Success', `${newEvent.name} successfully added!`);
        setAccessCode('');
        router.push('/HomePage');
      } catch (e) {
        console.error('Failed to save event:', e);
        Alert.alert('Error', 'Could not join event. Try again.');
      }
    } else {
      Alert.alert('Invalid Code', 'The access code is incorrect.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Join an Existing Event</Text>

      <Text style={styles.label}>Access Code</Text>
      <TextInput
        style={styles.input}
        value={accessCode}
        onChangeText={setAccessCode}
        placeholder="Enter code here"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.joinButton} onPress={handleJoin}>
        <Text style={styles.joinButtonText}>Join</Text>
      </TouchableOpacity>

      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 12,
    marginBottom: 30,
    fontSize: 16,
  },
  joinButton: {
    backgroundColor: '#14898D',
    padding: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
