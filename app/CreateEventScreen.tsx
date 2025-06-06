import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import BottomBar from './BottomBar';

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
} from 'react-native';


const categories = [
  { label: 'Birthday', image: require('./EventIcons/cake.png') },
  { label: 'Wedding', image: require('./EventIcons/wedding.png') },
  { label: 'Graduation', image: require('./EventIcons/graduation.png') },
  { label: 'Housewarming', image: require('./EventIcons/house.png') },
  { label: 'Baby Shower', image: require('./EventIcons/pacifier.png') },
  { label: 'For partner', image: require('./EventIcons/partner.png') },
  { label: 'Christmas', image: require('./EventIcons/christmas.png') },
  { label: 'Festivals', image: require('./EventIcons/festival.png') },
  { label: 'Others', image: require('./EventIcons/flower.png') },
];

export default function CreateEventScreen() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();



    const handleCreate = async () => {
      if (!eventName || !eventDate || !selectedCategory) {
        Alert.alert('Missing Info', 'Please fill all fields');
        return;
      }
    
      try {
        const stored = await AsyncStorage.getItem('events');
        const events = stored ? JSON.parse(stored) : [];
    
        const newEvent = {
          name: eventName,
          date: eventDate,
          category: selectedCategory,
          isMine: true,
          attendees: 0, 
        };
    
        events.push(newEvent);
    
        await AsyncStorage.setItem('events', JSON.stringify(events));
    
        router.replace('/HomePage'); 
      } catch (error) {
        console.error('Error saving event:', error);
        Alert.alert('Error', 'Could not save event.');
      }
    };
  

    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('./BackgroundCover.jpg')}
          style={{ flex: 1 }}
          resizeMode="cover"
        >
          <ScrollView contentContainerStyle={styles.scroll}>
            <Text style={styles.title}>Create Event</Text>
    
            <Text style={styles.label}>Event name</Text>
            <TextInput
              style={styles.input}
              value={eventName}
              onChangeText={setEventName}
            />
    
            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              value={eventDate}
              onChangeText={setEventDate}
              placeholder="MM/DD/YYYY"
            />
    
            <Text style={styles.label}>Category</Text>
            <View style={styles.categoryContainer}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.label}
                  style={[
                    styles.categoryBox,
                    selectedCategory === cat.label && styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(cat.label)}
                >
                  <Image source={cat.image} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>{cat.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
    
            <TouchableOpacity style={styles.createButton} onPress={handleCreate}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
    
        <BottomBar />
      </View>
    );    
}



const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scroll: {
    paddingTop: 60,
    paddingHorizontal: 30,
    paddingBottom: 130,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 30,
    color: '#2c3e50',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  categoryBox: {
    width: '30%',
    backgroundColor: '#eee',
    borderRadius: 12,
    padding: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  selectedCategory: {
    backgroundColor: '#b2dfdb',
    borderColor: '#14898D',
    borderWidth: 2,
  },
  categoryImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#14898D',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 30,
  },
  createButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
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


