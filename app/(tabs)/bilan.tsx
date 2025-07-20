import { Feather } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import React, { useRef, useState } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ViewShot from 'react-native-view-shot';
import BarreNavigation from '../../components/BarreNavigation';

const periods = [
  { key: 'today', label: "Aujourd'hui" },
  { key: 'week', label: 'Semaine' },
  { key: 'month', label: 'Mois' },
];

export default function BilanScreen() {
  const [activePeriod, setActivePeriod] = useState('today');
  const viewShotRef = useRef<any>(null);

  const ventes = 15000;
  const depenses = 2500;

  const handleExportPDF = async () => {
    try {
      const html = `
        <html>
          <body style="font-family: Arial; padding: 24px;">
            <h2>Bilan</h2>
            <p>Période : <b>${periods.find(p => p.key === activePeriod)?.label}</b></p>
            <hr />
            <p><b>Ventes :</b> <span style="color: #4CAF50;">${ventes} F</span></p>
            <p><b>Dépenses :</b> <span style="color: #F44336;">${depenses} F</span></p>
          </body>
        </html>
      `;
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Partager le PDF du bilan' });
    } catch (e) {
      const err = e as Error;
      Alert.alert('Erreur', "Impossible d'exporter le PDF : " + err.message);
    }
  };

  const handleShare = async () => {
    try {
      if (!viewShotRef.current) return;
      const uri = await viewShotRef.current.capture();
      await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: 'Partager le bilan en image' });
    } catch (e) {
      const err = e as Error;
      Alert.alert('Erreur', "Impossible de partager l'image : " + err.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ flex: 1 }}>
        {/* Header + contenu à capturer */}
        <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.95 }} style={{ flex: 1 }}>
          <View style={styles.header}>
            <Text style={styles.title}>Bilan</Text>
            <Text style={styles.subtitle}>Vos performances en détail.</Text>
          </View>
          {/* Sélecteur de période */}
          <View style={styles.periodSelector}>
            {periods.map((p) => (
              <TouchableOpacity
                key={p.key}
                style={[
                  styles.periodTab,
                  activePeriod === p.key ? styles.periodTabActive : styles.periodTabInactive,
                ]}
                onPress={() => setActivePeriod(p.key)}
                activeOpacity={0.85}
              >
                <Text style={activePeriod === p.key ? styles.periodTabTextActive : styles.periodTabTextInactive}>{p.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* Cartes de performance */}
          <View style={styles.cardsContainer}>
            {/* Carte Ventes */}
            <View style={styles.card}>
              <View style={styles.cardIconCircleGreen}>
                <Feather name="arrow-up-right" size={22} color="#fff" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>Ventes</Text>
                <Text style={styles.cardAmountGreen}>{ventes.toLocaleString()} F</Text>
              </View>
            </View>
            {/* Carte Dépenses */}
            <View style={styles.card}>
              <View style={styles.cardIconCircleRed}>
                <Feather name="arrow-down-right" size={22} color="#fff" />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>Dépenses</Text>
                <Text style={styles.cardAmountRed}>{depenses.toLocaleString()} F</Text>
              </View>
            </View>
            {/* Carte Placeholder */}
            <View style={styles.cardPlaceholder} />
          </View>
        </ViewShot>
        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.85} onPress={handleExportPDF}>
            <Feather name="download" size={18} color="#1C2C4C" style={{ marginRight: 6 }} />
            <Text style={styles.actionButtonText}>Exporter PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} activeOpacity={0.85} onPress={handleShare}>
            <Feather name="share-2" size={18} color="#1C2C4C" style={{ marginRight: 6 }} />
            <Text style={styles.actionButtonText}>Partager</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BarreNavigation active="bilan" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FB',
  },
  header: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 28,
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 15,
    color: '#999',
    marginBottom: 10,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    gap: 10,
  },
  periodTab: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  periodTabActive: {
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderColor: '#4CAF50',
  },
  periodTabInactive: {
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  periodTabTextActive: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 15,
  },
  periodTabTextInactive: {
    color: '#888',
    fontSize: 15,
  },
  cardsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '90%',
    minHeight: 80,
    marginBottom: 16,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  cardIconCircleGreen: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardIconCircleRed: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    color: '#444',
    fontSize: 15,
    marginBottom: 2,
  },
  cardAmountGreen: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardAmountRed: {
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardPlaceholder: {
    width: '90%',
    minHeight: 80,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginBottom: 18,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginHorizontal: 4,
    minWidth: 130,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  actionButtonText: {
    color: '#1C2C4C',
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 