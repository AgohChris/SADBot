import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Speech from 'expo-speech';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BarreNavigation from '../../components/BarreNavigation';
// Préparation pour la vraie reconnaissance vocale
// import Voice from '@react-native-voice/voice';
export default function AccueilScreen() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [messages, setMessages] = useState([
    { from: 'ia', text: 'Bienvenue ! Dites-moi ce que vous voulez savoir.' },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [transcript, setTranscript] = useState('');

  // Préparation pour la vraie reconnaissance vocale
  // useEffect(() => {
  //   Voice.onSpeechResults = (event) => {
  //     if (event.value && event.value.length > 0) {
  //       setTranscript(event.value[0]);
  //     }
  //   };
  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // Simulation ou vraie reconnaissance vocale
  const handleMicPressIn = async () => {
    setIsListening(true);
    setStatusText('Je vous écoute...');
    setTranscript('');
    // Pour EAS Build :
    // try { await Voice.start('fr-FR'); } catch (e) {}
  };
  const handleMicPressOut = async () => {
    setIsListening(false);
    setStatusText('Traitement...');
    // Pour EAS Build :
    // try { await Voice.stop(); } catch (e) {}
    setTimeout(() => {
      // Simulation : texte fictif
      const userText = transcript || 'Ceci est une question simulée.';
      setStatusText('');
      setTranscript(userText);
      sendMessage(userText);
    }, 1200);
  };

  // Envoi à l'IA (API ou mock)
  const simulateSmartReply = (text: string) => {
    const t = text.toLowerCase();
    if (t.includes('bonjour') || t.includes('salut')) return 'Bonjour ! Comment puis-je vous aider aujourd’hui ?';
    if (t.includes('solde')) return 'Votre solde du jour est de 15 000 F.';
    if (t.includes('vente')) return 'Vous avez réalisé 3 ventes aujourd’hui.';
    if (t.includes('dépense') || t.includes('depense')) return 'Vous avez dépensé 2 500 F aujourd’hui.';
    if (t.includes('merci')) return 'Avec plaisir ! N’hésitez pas si vous avez d’autres questions.';
    if (t.includes('qui es-tu') || t.includes('qui es tu')) return 'Je suis SADBot, votre assistant de gestion.';
    return 'Je suis SADBot, votre assistant. Posez-moi une question sur vos ventes ou dépenses !';
  };

  const sendMessage = async (text: string) => {
    setLoading(true);
    setError('');
    setMessages((prev) => [...prev, { from: 'user', text }]);
    try {
      const API_URL = 'https://us-central1-sad-466423.cloudfunctions.net/api/sendMessage';
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      let iaText = '';
      if (res.ok) {
        const data = await res.json();
        iaText = data.reply;
      }
      if (!iaText || iaText.trim() === '') {
        iaText = simulateSmartReply(text);
        setError("Réponse IA simulée (API vide ou non disponible)");
      }
      setMessages((prev) => [...prev, { from: 'ia', text: iaText }]);
      Speech.speak(iaText, { language: 'fr' });
    } catch (e) {
      const iaText = simulateSmartReply(text);
      setMessages((prev) => [...prev, { from: 'ia', text: iaText }]);
      setError("Impossible de contacter l'IA. Réponse simulée.");
      Speech.speak(iaText, { language: 'fr' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenue !</Text>
        <Text style={styles.subtitle}>Voici le résumé de votre journée.</Text>
      </View>
      <View style={styles.body}>
        {/* Bloc résumé */}
        <View style={styles.resumeBox}>
          {/* Contenu dynamique à venir */}
        </View>
        {/* Conversation IA */}
        <View style={{ width: '90%', marginBottom: 10 }}>
          {messages.map((msg, idx) => (
            <View
              key={idx}
              style={
                msg.from === 'user'
                  ? [styles.bubble, styles.bubbleUser]
                  : [styles.bubble, styles.bubbleIA]
              }
            >
              <Text style={msg.from === 'user' ? styles.bubbleTextUser : styles.bubbleTextIA}>{msg.text}</Text>
            </View>
          ))}
          {loading && (
            <View style={[styles.bubble, styles.bubbleIA]}>
              <Text style={styles.bubbleTextIA}>...</Text>
            </View>
          )}
        </View>
        {/* Message écoute vocale */}
        {statusText ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Ionicons name="mic" size={18} color="#2E7D32" style={{ marginRight: 6 }} />
            <Text style={{ color: '#2E7D32', fontWeight: 'bold', fontSize: 15 }}>{statusText}</Text>
          </View>
        ) : null}
        {/* Bouton Parle-moi (micro) */}
        <TouchableOpacity
          style={isListening ? styles.talkButtonActive : styles.talkButton}
          activeOpacity={0.85}
          onPressIn={handleMicPressIn}
          onPressOut={handleMicPressOut}
          disabled={loading}
        >
          <View style={styles.talkButtonContent}>
            <Ionicons name="mic" size={20} color={isListening ? '#fff' : '#2E7D32'} style={{ marginRight: 8 }} />
            <Text style={[styles.talkButtonText, isListening && { color: '#fff' }]}>{isListening ? 'En écoute...' : 'Parle-moi'}</Text>
          </View>
        </TouchableOpacity>
        {/* Bouton principal Ajouter */}
        <TouchableOpacity style={styles.addButton} activeOpacity={0.85} onPress={() => router.push('./ajouter')}>
          <Text style={styles.addButtonText}>Ajouter une vente/dépense</Text>
        </TouchableOpacity>
      </View>
      <BarreNavigation active="accueil" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F9FB',
  },
  header: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#999',
    marginBottom: 0,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  resumeBox: {
    width: '90%',
    minHeight: 90,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 28,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  talkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#2E7D32',
    borderRadius: 8,
    backgroundColor: '#fff',
    height: 48,
    width: '90%',
    marginBottom: 18,
    marginTop: 8,
    justifyContent: 'center',
  },
  talkButtonActive: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#2E7D32',
    borderRadius: 8,
    backgroundColor: '#2E7D32',
    height: 48,
    width: '90%',
    marginBottom: 18,
    marginTop: 8,
    justifyContent: 'center',
  },
  talkButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  talkButtonText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#1C2C4C',
    borderRadius: 8,
    height: 52,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  // Ajout styles bulles de chat
  bubble: {
    maxWidth: '80%',
    borderRadius: 16,
    padding: 12,
    marginBottom: 8,
  },
  bubbleUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#1abc54',
  },
  bubbleIA: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  bubbleTextUser: {
    color: '#fff',
    fontSize: 15,
  },
  bubbleTextIA: {
    color: '#222',
    fontSize: 15,
  },
}); 