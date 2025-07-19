import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [isListening, setIsListening] = useState(false);
  const [statusText, setStatusText] = useState('');
  const router = useRouter();

  const handlePressIn = () => {
    setIsListening(true);
    setStatusText('Je vous écoute...');
    console.log('Écoute démarrée');
  };

  const handlePressOut = () => {
    setIsListening(false);
    setStatusText('Traitement...');
    console.log('Traitement en cours');
    setTimeout(() => setStatusText(''), 1500);
  };

  const handleBilan = () => {
    // Ici on intégrera la synthèse vocale plus tard
    console.log('Lecture vocale du bilan...');
  };

  const handleDashboard = () => {
    router.push('/DashboardScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          {statusText ? <Text style={styles.statusText}>{statusText}</Text> : null}
          <Text style={styles.welcomeText}>Bienvenue sur SADBot !</Text>
        </View>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.bilanButton} onPress={handleBilan}>
            <MaterialIcons name="campaign" size={32} color="#1abc54" />
            <Text style={styles.bottomText}>Bilan vocal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dashboardButton} onPress={handleDashboard}>
            <Ionicons name="grid" size={36} color="#fff" />
            <Text style={styles.dashboardText}>Voir Bilan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.micButton, isListening && styles.micButtonActive]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
          >
            <Ionicons name="mic" size={36} color="#fff" />
            <Text style={styles.bottomText}>Parler</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  statusText: {
    fontSize: 20,
    color: '#e53935',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 22,
    color: '#222',
    textAlign: 'center',
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 24,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: 'transparent',
    gap: 18,
  },
  bilanButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  dashboardButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1abc54',
    borderRadius: 32,
    width: 64,
    height: 64,
    marginHorizontal: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  dashboardText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
    marginTop: 2,
    textAlign: 'center',
  },
  micButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1abc54',
    borderRadius: 32,
    width: 64,
    height: 64,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  micButtonActive: {
    backgroundColor: '#e53935',
  },
  bottomText: {
    fontSize: 14,
    color: '#222',
    fontWeight: 'bold',
    marginTop: 2,
  },
});
