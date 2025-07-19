import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function AuthScreen() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleContinue = () => {
    if (!phone) {
      setError('Veuillez entrer votre numéro.');
      return;
    }
    setError('');
    console.log('+225' + phone);
    router.push('/OTPScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue !</Text>
      <View style={styles.inputRow}>
        <View style={styles.prefixContainer}>
          <Text style={styles.prefix}>+225</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Votre numéro de téléphone"
          placeholderTextColor="#888"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
        />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 32,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  prefixContainer: {
    backgroundColor: '#f0f0f0',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRightWidth: 0,
  },
  prefix: {
    fontSize: 18,
    color: '#111',
  },
  input: {
    flex: 1,
    fontSize: 18,
    backgroundColor: '#f0f0f0',
    color: '#111',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderLeftWidth: 0,
  },
  button: {
    backgroundColor: '#1abc54',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 24,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
}); 