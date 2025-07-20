import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// active: 'accueil' | 'bilan' | 'ajouter' | 'historique' | 'assistant'
export default function BarreNavigation({ active = 'assistant' }) {
  const router = useRouter();
  const navItems = [
    {
      key: 'accueil',
      icon: <Ionicons name="home-outline" size={24} color={active === 'accueil' ? '#1abc54' : '#7D7D7D'} />,
      label: 'Accueil',
      onPress: () => router.push('./accueil'),
      active: active === 'accueil',
    },
    {
      key: 'bilan',
      icon: <MaterialIcons name="bar-chart" size={24} color={active === 'bilan' ? '#1abc54' : '#7D7D7D'} />,
      label: 'Bilan',
      onPress: () => router.push('./bilan'),
      active: active === 'bilan',
    },
    {
      key: 'ajouter',
      icon: <Ionicons name="add" size={32} color="#fff" />,
      label: '',
      onPress: active === 'ajouter' ? undefined : () => router.push('./ajouter'),
      isFab: true,
      active: active === 'ajouter',
    },
    {
      key: 'historique',
      icon: <MaterialCommunityIcons name="history" size={24} color={active === 'historique' ? '#1abc54' : '#7D7D7D'} />,
      label: 'Historique',
      onPress: () => router.push('./historique'),
      active: active === 'historique',
    },
    {
      key: 'assistant',
      icon: <MaterialCommunityIcons name="robot-outline" size={24} color={active === 'assistant' ? '#1abc54' : '#7D7D7D'} />,
      label: 'Assistant',
      onPress: () => router.push('./'),
      active: active === 'assistant',
    },
  ];

  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={navItems[0].active ? styles.navItemActive : styles.navItem} onPress={navItems[0].onPress}>
        {navItems[0].icon}
        <Text style={navItems[0].active ? styles.navLabelActive : styles.navLabel}>{navItems[0].label}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={navItems[1].active ? styles.navItemActive : styles.navItem} onPress={navItems[1].onPress}>
        {navItems[1].icon}
        <Text style={navItems[1].active ? styles.navLabelActive : styles.navLabel}>{navItems[1].label}</Text>
      </TouchableOpacity>
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={navItems[2].active ? styles.fabActive : styles.fab}
          onPress={navItems[2].onPress}
          activeOpacity={navItems[2].active ? 1 : 0.85}
          disabled={navItems[2].active}
        >
          {navItems[2].icon}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={navItems[3].active ? styles.navItemActive : styles.navItem} onPress={navItems[3].onPress}>
        {navItems[3].icon}
        <Text style={navItems[3].active ? styles.navLabelActive : styles.navLabel}>{navItems[3].label}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={navItems[4].active ? styles.navItemActive : styles.navItem} onPress={navItems[4].onPress}>
        {navItems[4].icon}
        <Text style={navItems[4].active ? styles.navLabelActive : styles.navLabel}>{navItems[4].label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  navItemActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    borderTopWidth: 2.5,
    borderTopColor: '#1abc54',
    backgroundColor: 'rgba(26,188,84,0.04)',
  },
  navLabel: {
    fontSize: 11,
    color: '#7D7D7D',
    marginTop: 2,
  },
  navLabelActive: {
    fontSize: 11,
    color: '#1abc54',
    marginTop: 2,
    fontWeight: 'bold',
  },
  fabContainer: {
    position: 'absolute',
    left: '53%',
    bottom: 45,
    transform: [{ translateX: -32 }],
    zIndex: 10,
    elevation: 10,
  },
  fab: {
    width: 46,
    height: 46,
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
  fabActive: {
    width: 46,
    height: 46,
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
    opacity: 1,
  },
}); 