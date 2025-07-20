import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import BarreNavigation from '../../components/BarreNavigation';

type TransactionCardProps = {
  title: string;
  date: string;
  amount: string;
  type: 'income' | 'expense';
};

function TransactionCard({ title, date, amount, type }: TransactionCardProps) {
  const isPositive = type === 'income';
  return (
    <View style={styles.cardShadow}>
      <View style={styles.card}>
        <View
          style={[styles.iconCircle, isPositive ? styles.iconCirclePositive : styles.iconCircleNegative]}
        >
          {isPositive ? (
            <Ionicons name="checkmark" size={18} color="#fff" />
          ) : (
            <Ionicons name="close" size={18} color="#fff" />
          )}
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDate}>{date}</Text>
        </View>
        <Text style={[styles.cardAmount, isPositive ? styles.amountPositive : styles.amountNegative]}>
          {isPositive ? '+ ' : '- '}{amount} F
        </Text>
      </View>
    </View>
  );
}

const transactions = [
  { title: 'Vente de 3 pagnes', date: '20 juil. 2025', amount: '15 000', type: 'income' },
  { title: 'Achat de crédit', date: '19 juil. 2025', amount: '2 500', type: 'expense' },
  { title: 'Vente accessoires', date: '18 juil. 2025', amount: '7 000', type: 'income' },
  { title: 'Paiement électricité', date: '17 juil. 2025', amount: '8 000', type: 'expense' },
  { title: 'Vente de tissus', date: '16 juil. 2025', amount: '12 000', type: 'income' },
];

export default function HistoriqueScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Historique</Text>
        <Text style={styles.subtitle}>Toutes vos transactions.</Text>
      </View>
      <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
        {transactions.map((t, i) => (
          <TransactionCard key={i} {...t} type={t.type as 'income' | 'expense'} />
        ))}
      </ScrollView>
      <BarreNavigation active="historique" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FB',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 10,
    borderBottomWidth: 0,
    flexDirection: 'row', // Pour aligner le bouton retour et le titre
    alignItems: 'center', // Pour aligner verticalement
  },
  backButton: {
    marginBottom: 10,
    marginRight: 12,
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
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 90,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 14,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 13,
    minHeight: 56,
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  iconCirclePositive: {
    backgroundColor: '#00B341',
  },
  iconCircleNegative: {
    backgroundColor: '#E53935',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  cardDate: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 2,
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    minWidth: 80,
    textAlign: 'right',
  },
  amountPositive: {
    color: '#00B341',
  },
  amountNegative: {
    color: '#E53935',
  },
  fabContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 54,
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  fab: {
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
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    borderTopWidth: 2.5,
    borderTopColor: '#1abc54',
    backgroundColor: 'rgba(26,188,84,0.04)',
  },
  navLabelActive: {
    fontSize: 11,
    color: '#1abc54',
    marginTop: 2,
    fontWeight: 'bold',
  },
}); 