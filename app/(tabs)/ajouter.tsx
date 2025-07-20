import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import BarreNavigation from '../../components/BarreNavigation';

const TYPE_OPTIONS = [
  { label: 'Vente', value: 'vente' },
  { label: 'Dépense', value: 'depense' },
];

export default function AjouterScreen() {
  const [type, setType] = useState('vente');
  const [montant, setMontant] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validate = () => {
    if (!type) return setError('Le type est requis.');
    if (!montant || isNaN(Number(montant))) return setError('Le montant doit être un nombre.');
    if (!description.trim()) return setError('La description est requise.');
    setError('');
    // Ici, tu pourrais envoyer la transaction à l'API ou l'ajouter au state global
    // Pour l'instant, on reset le formulaire
    setType('vente');
    setMontant('');
    setDescription('');
    alert('Transaction enregistrée !');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Ajouter</Text>
          <Text style={styles.subtitle}>Enregistrez une nouvelle transaction.</Text>
        </View>
        <View style={styles.formContainer}>
          {/* Type (dropdown) */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Type</Text>
            <TouchableOpacity style={styles.select} activeOpacity={0.8} onPress={() => setType(type === 'vente' ? 'depense' : 'vente')}>
              <Text style={styles.selectText}>{TYPE_OPTIONS.find(opt => opt.value === type)?.label}</Text>
              <Ionicons name="chevron-down" size={20} color="#999" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
          {/* Montant */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Montant (F)</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 5000"
              placeholderTextColor="#999"
              keyboardType="numeric"
              value={montant}
              onChangeText={setMontant}
              maxLength={10}
            />
          </View>
          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Vente de pagne"
              placeholderTextColor="#999"
              value={description}
              onChangeText={setDescription}
              maxLength={60}
            />
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.submitButton} onPress={validate} activeOpacity={0.85}>
            <Text style={styles.submitButtonText}>Valider</Text>
          </TouchableOpacity>
        </View>
        <BarreNavigation active="ajouter" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FB',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 10,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 15,
    color: '#A0A0A0',
    marginBottom: 18,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    color: '#222',
    marginBottom: 6,
    fontWeight: '500',
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 46,
    minWidth: 120,
    justifyContent: 'space-between',
  },
  selectText: {
    fontSize: 15,
    color: '#222',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    height: 46,
    fontSize: 15,
    color: '#222',
  },
  error: {
    color: '#E53935',
    fontSize: 14,
    marginBottom: 10,
    marginTop: -8,
  },
  submitButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 8,
    marginTop: 18,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  navBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    height: 64,
    paddingHorizontal: 18,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    zIndex: 1,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
  },
  navLabel: {
    fontSize: 11,
    color: '#7D7D7D',
    marginTop: 2,
  },
  fabContainer: {
    position: 'absolute',
    left: '50%',
    bottom: 10,
    transform: [{ translateX: -32 }],
    zIndex: 10,
    elevation: 10,
  },
  fabActive: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#F7F9FB',
  },
}); 