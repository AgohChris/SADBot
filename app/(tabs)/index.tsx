import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [isListening, setIsListening] = useState(false);
  const [statusText, setStatusText] = useState('');

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.centerContent}>
          <TouchableOpacity
            style={[styles.micButton, isListening && styles.micButtonActive]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
          >
            <Ionicons name="mic" size={60} color="#fff" />
            <Text style={styles.micText}>Parler</Text>
          </TouchableOpacity>
          {statusText ? <Text style={styles.statusText}>{statusText}</Text> : null}
        </View>
        <View style={styles.bilanSection}>
          <View style={styles.bilanCard}>
            <Text style={styles.bilanTitle}>Aujourd'hui</Text>
            <Text style={styles.vente}>Ventes : <Text style={styles.venteMontant}>25 000 F</Text></Text>
            <Text style={styles.depense}>Dépenses : <Text style={styles.depenseMontant}>8 000 F</Text></Text>
            <Text style={styles.benefice}>Bénéfice : <Text style={styles.beneficeMontant}>17 000 F</Text></Text>
          </View>
          <View style={styles.bilanCard}>
            <Text style={styles.bilanTitle}>Cette Semaine</Text>
            <Text style={styles.vente}>Ventes : <Text style={styles.venteMontant}>120 000 F</Text></Text>
            <Text style={styles.depense}>Dépenses : <Text style={styles.depenseMontant}>40 000 F</Text></Text>
            <Text style={styles.benefice}>Bénéfice : <Text style={styles.beneficeMontant}>80 000 F</Text></Text>
          </View>
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
    padding: 24,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  micButton: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#1abc54',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  micButtonActive: {
    backgroundColor: '#e53935',
  },
  micText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 8,
  },
  statusText: {
    fontSize: 20,
    color: '#e53935',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  bilanSection: {
    width: '100%',
    marginTop: 24,
    marginBottom: 8,
  },
  bilanCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  bilanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
  },
  vente: {
    fontSize: 18,
    marginBottom: 4,
    color: '#222',
  },
  venteMontant: {
    color: '#1abc54',
    fontWeight: 'bold',
    fontSize: 18,
  },
  depense: {
    fontSize: 18,
    marginBottom: 4,
    color: '#222',
  },
  depenseMontant: {
    color: '#e53935',
    fontWeight: 'bold',
    fontSize: 18,
  },
  benefice: {
    fontSize: 18,
    marginTop: 6,
    color: '#222',
  },
  beneficeMontant: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#222',
  },
});
