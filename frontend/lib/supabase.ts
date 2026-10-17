import 'react-native-url-polyfill/auto';
import { AppState } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

// An empty/missing .env means the app runs in UI preview mode only.
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
export const authConfigured = Boolean(url && key);

const secureStorage = {
  getItem: (itemKey: string) => SecureStore.getItemAsync(itemKey),
  setItem: (itemKey: string, value: string) => SecureStore.setItemAsync(itemKey, value),
  removeItem: (itemKey: string) => SecureStore.deleteItemAsync(itemKey),
};

export const supabase = url && key
  ? createClient(url, key, {
      auth: {
        storage: secureStorage,
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    })
  : null;

if (supabase) {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') supabase.auth.startAutoRefresh();
    else supabase.auth.stopAutoRefresh();
  });
}
