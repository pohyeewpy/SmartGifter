import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import BottomBar from './BottomBar';

export default function HomePage() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('./BackgroudNP.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.mainButton}
            onPress={() => router.push('/CreateEventScreen')} 
          >
            <Text style={styles.mainButtonText}>Create Event</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.mainButton}>
            <Text style={styles.mainButtonText}>Join Existing</Text>
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
    justifyContent: 'flex-end',
    paddingBottom: 70,
    alignItems: 'center',
  },
  buttonGroup: {
    width: '80%',
    marginBottom: 40,
  },
  mainButton: {
    backgroundColor: '#14898D',
    borderRadius: 25,
    paddingVertical: 14,
    marginVertical: 10,
    alignItems: 'center',
  },
  mainButtonText: {
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
