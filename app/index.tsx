import React from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('./BackgroundCover.jpg')} // background image path
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require('./Logo.png')} // logo image path
          style={styles.logo}
        />
        <Text style={styles.tagline}>Gift with Heart</Text>
        <Text style={styles.subtitle}>Choose with ease</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push('/LoginPage')} // set your next screen here
        >
          <Text style={styles.buttonText}>Let’s Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',    
    paddingHorizontal: 20,
  },
  logo: {
    width: 320,
    height: 320,
    resizeMode: 'contain',
    marginBottom: -40, 
  },
  tagline: {
    fontSize: 18,
    color: '#555',
    marginBottom: 2, 
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20, 
    color: '#000',
  },
  button: {
    backgroundColor: '#00B8B8',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});