import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppButton from '../components/AppButton';
import { authConfigured, supabase } from '../lib/supabase';
import { colors } from '../theme';

type Props = { onPreview: () => void };
export default function AuthScreen({ onPreview }: Props) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function submit() {
    setError(''); setMessage('');
    const normalized = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      setError('Enter a valid email address.'); return;
    }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return; }
    if (mode === 'signup' && confirm !== password) {
      setError('Passwords do not match.'); return;
    }
    if (!supabase) {
      setMessage('Validation passed. Supabase is not configured, so no account was created or signed in. Use UI Preview below.');
      return;
    }
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { data, error: authError } = await supabase.auth.signUp({ email: normalized, password });
        if (authError) throw authError;
        if (!data.session) setMessage('Sign-up submitted. Check your email for confirmation, then log in.');
      } else {
        const { error: authError } = await supabase.auth.signInWithPassword({ email: normalized, password });
        if (authError) throw authError;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Authentication could not complete.');
    } finally { setBusy(false); }
  }

  function switchMode() {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError(''); setMessage(''); setPassword(''); setConfirm('');
  }

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
          <View style={styles.brandRow}>
            <Image source={require('../assets/itrust-logo.png')} style={styles.logo} />
            <Text style={styles.brand}>iTrust</Text>
          </View>
          <Text style={styles.tagline}>Can I Trust You?</Text>
          <View style={styles.card}>
            <Text style={styles.title}>{mode === 'login' ? 'Welcome back' : 'Join iTrust'}</Text>
            <Text style={styles.subtitle}>Build real connections and a trusted reputation.</Text>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="you@example.com" placeholderTextColor="#8994A6"
              value={email} onChangeText={setEmail} autoCapitalize="none" autoCorrect={false}
              keyboardType="email-address" autoComplete="email" accessibilityLabel="Email" />
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="At least 8 characters" placeholderTextColor="#8994A6"
              value={password} onChangeText={setPassword} secureTextEntry autoCapitalize="none" accessibilityLabel="Password" />
            {mode === 'signup' && (
              <>
                <Text style={styles.label}>Confirm password</Text>
                <TextInput style={styles.input} placeholder="Enter password again" placeholderTextColor="#8994A6"
                  value={confirm} onChangeText={setConfirm} secureTextEntry autoCapitalize="none" accessibilityLabel="Confirm password" />
              </>
            )}
            {!!error && <Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
            {!!message && <Text style={styles.message}>{message}</Text>}
            <AppButton title={mode === 'login' ? 'Log In' : 'Sign Up'} onPress={submit} loading={busy} />
            <View style={{ height: 9 }} />
            <AppButton title={mode === 'login' ? 'Create an account' : 'Already have an account? Log In'} onPress={switchMode} secondary disabled={busy} />
          </View>
          <View style={styles.previewCard}>
            <Text style={styles.previewHeading}>FRONTEND PREVIEW</Text>
            <Text style={styles.previewCopy}>Explore mock screens without signing in. This is not authentication and contains no private user data.</Text>
            <AppButton title="Open UI Preview" onPress={onPreview} secondary />
            <Text style={styles.status}>{authConfigured ? 'Supabase configured — real auth available' : 'Supabase not configured — forms are preview-only'}</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.navy },
  content: { flexGrow: 1, justifyContent: 'center', padding: 22, paddingVertical: 40 },
  brandRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 11 },
  logo: { width: 57, height: 57, borderRadius: 13 },
  brand: { color: colors.white, fontSize: 39, fontWeight: '900' },
  tagline: { color: colors.gold, textAlign: 'center', fontSize: 15, marginTop: 6, marginBottom: 26 },
  card: { borderRadius: 20, backgroundColor: colors.white, padding: 22 },
  title: { color: colors.text, fontSize: 25, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 13, lineHeight: 19, marginTop: 5, marginBottom: 19 },
  label: { color: colors.text, fontSize: 13, fontWeight: '700', marginBottom: 7 },
  input: { backgroundColor: colors.page, borderColor: colors.border, borderWidth: 1, borderRadius: 11, minHeight: 48, paddingHorizontal: 13, color: colors.text, fontSize: 15, marginBottom: 15 },
  error: { color: colors.red, marginBottom: 12 },
  message: { color: colors.green, lineHeight: 19, marginBottom: 12 },
  previewCard: { marginTop: 17, padding: 16, backgroundColor: colors.navy2, borderRadius: 16, borderColor: '#284466', borderWidth: 1 },
  previewHeading: { color: colors.gold, fontWeight: '800', fontSize: 11, marginBottom: 6 },
  previewCopy: { color: '#DFE8F5', fontSize: 12, lineHeight: 18, marginBottom: 12 },
  status: { color: '#C7D5E8', fontSize: 11, marginTop: 9, textAlign: 'center' },
});
