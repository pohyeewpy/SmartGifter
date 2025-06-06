import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  // Step 1: State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Step 2: Fake users
  const users = [
    { email: '1', password: '2' },
    { email: 'jvpgnnull@gmail.com', password: 'p12345' },
  ];

  const handleContinue = () => {
    const matchedUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      router.push('/NewPage'); 
    } else {
      Alert.alert('Login Failed', 'Invalid email or password');
    }
  };

  return (
    <ImageBackground
      source={require('./BackgroundCover.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require('./Logo.png')}
          style={styles.logo}
        />
        <View style={styles.card}>
          <Text style={styles.header}>LOG IN OR SIGN UP</Text>

          <TextInput
            placeholder="EMAIL"
            placeholderTextColor="#666"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="PASSWORD"
            placeholderTextColor="#666"
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueText}>CONTINUE</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>────────── OR ──────────</Text>

          <TouchableOpacity style={styles.authButton}>
            <Image source={require('./google.png')} style={styles.icon} />
            <Text style={styles.authText}>CONTINUE WITH GOOGLE</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.authButton}>
            <Image source={require('./apple.png')} style={styles.icon} />
            <Text style={styles.authText}>CONTINUE WITH APPLE</Text>
          </TouchableOpacity>

          <View style={styles.footerText}>
            <Text style={{ color: '#fff' }}>DON'T HAVE AN ACCOUNT? </Text>
            <TouchableOpacity onPress={() => router.push('/CreateAccount')}>
              <Text style={styles.signupText}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    alignItems: 'center',
    marginTop: 50,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  card: {
    backgroundColor: '#2F8F8F',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  header: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: '#1A3C52',
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  continueText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
  },
  orText: {
    color: '#fff',
    textAlign: 'center',
    marginVertical: 15,
  },
  authButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  authText: {
    color: '#2F2F2F',
    fontWeight: '600',
  },
  footerText: {
    marginTop: 15,
    flexDirection: 'row',      
    justifyContent: 'center',  
    alignItems: 'center',     
  },
  signupText: {
    color: '#F9D342',
    fontWeight: 'bold',
  },
});
