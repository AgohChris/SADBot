import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import BarreNavigation from '../../components/BarreNavigation';
// Préparation pour la vraie reconnaissance vocale
// import Voice from '@react-native-voice/voice';

export default function AssistantScreen() {
  // Préparation pour la vraie reconnaissance vocale
  // useEffect(() => {
  //   Voice.onSpeechResults = (event) => {
  //     if (event.value && event.value.length > 0) {
  //       setInput(event.value[0]);
  //     }
  //   };
  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'ia', text: 'Bonjour ! Comment puis-je vous aider ?' },
  ]);
  const [error, setError] = useState('');
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView | null>(null);
  // Pour Expo Go : simulation
  const handleMicPressIn = async () => {
    setIsListening(true);
    setStatusText('Je vous écoute...');
    // Pour EAS Build :
    // try {
    //   await Voice.start('fr-FR');
    // } catch (e) {}
  };
  const handleMicPressOut = async () => {
    setIsListening(false);
    setStatusText('Traitement...');
    // Pour EAS Build :
    // try {
    //   await Voice.stop();
    // } catch (e) {}
    setTimeout(() => {
      setStatusText('');
      setInput('Ceci est une transcription simulée.');
    }, 1200);
  };

  // Simule l'envoi de message à l'API Dialogflow (ou mock)
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
    setInput('');
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
    } catch (e) {
      setMessages((prev) => [...prev, { from: 'ia', text: simulateSmartReply(text) }]);
      setError("Impossible de contacter l'IA. Réponse simulée.");
    } finally {
      setLoading(false);
      setTimeout(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
      }, 100);
    }
  };

  // Simule l'écoute vocale
  const handleVoice = () => {
    setIsListening(true);
    setTimeout(() => setIsListening(false), 2000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>SADBot</Text>
          <Text style={styles.subtitle}>Posez vos questions ou donnez des ordres.</Text>
        </View>
        {/* Chat */}
        <ScrollView
          style={{ flex: 1, width: '100%' }}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
        >
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
        </ScrollView>
        {/* Input + micro + cadenas */}
        <View style={styles.inputZone}>
          {error ? <Text style={{ color: '#E53935', marginBottom: 4 }}>{error}</Text> : null}
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Ou saisissez votre commande ici…"
              placeholderTextColor="#B0B0B0"
              value={input}
              onChangeText={setInput}
              editable={!loading && !isListening}
              returnKeyType="send"
              onSubmitEditing={() => input.trim() && sendMessage(input.trim())}
            />
            {/* Bouton micro maintien */}
            <TouchableOpacity
              style={isListening ? styles.micButtonActive : styles.micButton}
              onPressIn={handleMicPressIn}
              onPressOut={handleMicPressOut}
              disabled={loading}
            >
              <Ionicons name={isListening ? 'mic' : 'mic-outline'} size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.sendButton}
              onPress={() => input.trim() && sendMessage(input.trim())}
              disabled={loading || !input.trim() || isListening}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-forward" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* Message écoute vocale */}
          {statusText ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6 }}>
              <Ionicons name="mic" size={18} color="#1abc54" style={{ marginRight: 6 }} />
              <Text style={{ color: '#1abc54', fontWeight: 'bold', fontSize: 15 }}>{statusText}</Text>
            </View>
          ) : null}
        </View>
        <BarreNavigation active="assistant" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#7D7D7D',
    marginTop: 6,
    fontWeight: '400',
  },
  assistantBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 22,
    marginBottom: 28,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  assistantText: {
    fontSize: 16,
    color: '#222',
    textAlign: 'center',
  },
  inputZone: {
    width: '100%',
    marginBottom: 18,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: '#222',
    marginRight: 8,
  },
  sendButton: {
    backgroundColor: '#5C85D6',
    borderRadius: 7,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAF0FB',
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 16,
    width: '100%',
    justifyContent: 'center',
  },
  voiceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceText: {
    color: '#5C85D6',
    fontWeight: 'bold',
    fontSize: 15,
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
    backgroundColor: '#1abc54',
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
  micButton: { backgroundColor: '#1abc54', borderRadius: 24, width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  micButtonActive: { backgroundColor: '#e53935', borderRadius: 24, width: 44, height: 44, alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  lockButton: { backgroundColor: '#fff', borderRadius: 20, width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#1abc54', marginRight: 8 },
});
