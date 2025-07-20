import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#1abc54" />
        </TouchableOpacity>
        <Text style={styles.title}>Bilan détaillé</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Résumé</Text>
          <Text style={styles.resumeText}>Aujourdhui : 17 000 F de bénéfice</Text>
          <Text style={styles.resumeText}>Cette semaine : 80 000 F de bénéfice</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ventes</Text>
          <Text style={styles.detailText}>Aujourdhui : 25 000 F</Text>
          <Text style={styles.detailText}>Cette semaine : 120 000 F</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dépenses</Text>
          <Text style={styles.detailText}>Aujourdhui : 8 000 F</Text>
          <Text style={styles.detailText}>Cette semaine : 40 000 F</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bénéfice</Text>
          <Text style={styles.beneficeText}>Aujourdhui : 17 000 F</Text>
          <Text style={styles.beneficeText}>Cette semaine : 80 000 F</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 36,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1abc54',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  resumeText: {
    fontSize: 16,
    color: '#222',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 2,
  },
  beneficeText: {
    fontSize: 16,
    color: '#1abc54',
    fontWeight: 'bold',
    marginBottom: 2,
  },
}); 