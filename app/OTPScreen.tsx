import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function OTPScreen() {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const router = useRouter();
  const params = useLocalSearchParams();
  const phone = params.phone || 'votre numéro';

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timer, isResendDisabled]);

  const handleVerify = () => {
    if (otp === '123456') {
      setError('');
      router.push('/UserDetailsScreen');
    } else {
      setError('Code incorrect');
    }
  };

  const handleResend = () => {
    if (!isResendDisabled) {
      // Ici tu pourrais déclencher l'envoi du code
      setTimer(60);
      setIsResendDisabled(true);
      setOtp('');
      setError('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrez le code reçu au {phone}</Text>
      <TextInput
        style={styles.input}
        placeholder="------"
        placeholderTextColor="#888"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        textAlign="center"
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Vérifier</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.resend, isResendDisabled && styles.resendDisabled]}
        onPress={handleResend}
        disabled={isResendDisabled}
      >
        <Text style={[styles.resendText, isResendDisabled && styles.resendTextDisabled]}>
          {isResendDisabled ? `Renvoyer le code (${timer}s)` : 'Renvoyer le code'}
        </Text>
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
    fontSize: 20,
    color: '#111',
    marginBottom: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    fontSize: 22, // réduit
    backgroundColor: '#f0f0f0',
    color: '#111',
    paddingVertical: 18, // augmenté
    paddingHorizontal: 36, // augmenté
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: 260, // augmenté
    letterSpacing: 18, // augmenté pour espacer les chiffres
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1abc54',
    paddingVertical: 16,
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
  resend: {
    marginTop: 18,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  resendDisabled: {
    backgroundColor: '#eee',
  },
  resendText: {
    color: '#007aff',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  resendTextDisabled: {
    color: '#aaa',
    textDecorationLine: 'none',
  },
}); 