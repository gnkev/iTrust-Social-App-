import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import type { Session } from '@supabase/supabase-js';
import AuthScreen from './screens/AuthScreen';
import MainTabs from './navigation/MainTabs';
import { supabase } from './lib/supabase';
import { colors } from './theme';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    let mounted = true;
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, current) => {
      if (mounted) setSession(current);
    });
    supabase.auth.getSession()
      .then(({ data, error }) => { if (mounted) setSession(error ? null : data.session); })
      .catch(() => { if (mounted) setSession(null); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  async function exit() {
    if (previewMode) { setPreviewMode(false); return; }
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) Alert.alert('Logout failed', error.message);
    }
  }

  return (
    <SafeAreaProvider>
      {loading ? (
        <View style={styles.loading}><ActivityIndicator size="large" color={colors.gold} /></View>
      ) : previewMode || session ? (
        <MainTabs previewMode={previewMode} email={session?.user.email ?? null} onExit={exit} />
      ) : (
        <AuthScreen onPreview={() => setPreviewMode(true)} />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({ loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.navy } });
