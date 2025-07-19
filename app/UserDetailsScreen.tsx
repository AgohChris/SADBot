import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserDetailsScreen() {
  const [name, setName] = useState('');
  const [activity, setActivity] = useState('');
  const [lang, setLang] = useState('fr');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleFinish = async () => {
    if (!name || !activity) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setError('');
    console.log({ name, activity, lang });
    await AsyncStorage.setItem('isAuthenticated', 'true');
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complétez votre profil</Text>
      <TextInput
        style={styles.input}
        placeholder="Votre nom ou nom de la boutique"
        placeholderTextColor="#888"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Ex: Vendeur de légumes, Coiffeuse..."
        placeholderTextColor="#888"
        value={activity}
        onChangeText={setActivity}
      />
      <View style={styles.langRow}>
        <TouchableOpacity
          style={[styles.langButton, lang === 'fr' && styles.langButtonSelected]}
          onPress={() => setLang('fr')}
        >
          <Text style={[styles.langText, lang === 'fr' && styles.langTextSelected]}>Français</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.langButton, lang === 'dioula' && styles.langButtonSelected]}
          onPress={() => setLang('dioula')}
        >
          <Text style={[styles.langText, lang === 'dioula' && styles.langTextSelected]}>Dioula</Text>
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleFinish}>
        <Text style={styles.buttonText}>Terminer</Text>
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
    fontSize: 22,
    color: '#111',
    marginBottom: 32,
    fontWeight: 'bold',
  },
  input: {
    fontSize: 18,
    backgroundColor: '#f0f0f0',
    color: '#111',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    marginBottom: 14,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 18,
  },
  langButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    paddingVertical: 18,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  langButtonSelected: {
    backgroundColor: '#1abc54',
  },
  langText: {
    fontSize: 18,
    color: '#111',
    fontWeight: 'bold',
  },
  langTextSelected: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#1abc54',
    paddingVertical: 18,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginTop: 12,
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
    alignSelf: 'center',
  },
}); 