import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import AppButton from '../components/AppButton';
import FeatureCard from '../components/FeatureCard';
import ScreenShell from '../components/ScreenShell';
import { colors } from '../theme';

export default function CreateScreen() {
  const [draft, setDraft] = useState('');
  const [preview, setPreview] = useState('');
  return (
    <ScreenShell title="Create" subtitle="Compose a sample update. Publishing is not enabled in Week 2.">
      <FeatureCard title="Create a Post">
        <Text style={styles.label}>What's on your mind?</Text>
        <TextInput style={styles.input} placeholder="Share a thought with your Trust Connections..." placeholderTextColor="#8290A0"
          multiline value={draft} onChangeText={setDraft} maxLength={500} textAlignVertical="top" />
        <Text style={styles.count}>{draft.length}/500 characters</Text>
        <AppButton title="Preview Post (Not Published)" disabled={!draft.trim()} onPress={() => setPreview(draft.trim())} />
      </FeatureCard>
      {!!preview && (
        <FeatureCard title="Local Post Preview">
          <View style={styles.preview}><Text style={styles.previewTitle}>Sample post</Text><Text style={styles.previewText}>{preview}</Text></View>
          <Text style={styles.help}>This post exists only in your device's current UI state. It has not been saved or shared.</Text>
        </FeatureCard>
      )}
      <FeatureCard title="Coming Later">
        <Text style={styles.help}>Polls, photo uploads, publishing, editing and backend persistence will follow the application's foundation milestone.</Text>
      </FeatureCard>
    </ScreenShell>
  );
}
const styles = StyleSheet.create({
  label: { fontSize: 13, fontWeight: '700', color: colors.text, marginBottom: 9 },
  input: { minHeight: 140, borderWidth: 1, borderColor: colors.border, backgroundColor: colors.page, borderRadius: 13, padding: 13, color: colors.text, fontSize: 14 },
  count: { fontSize: 11, color: colors.muted, alignSelf: 'flex-end', marginTop: 7, marginBottom: 13 },
  preview: { backgroundColor: colors.navy2, borderRadius: 12, padding: 16 },
  previewTitle: { color: colors.gold, fontWeight: '700', fontSize: 12, marginBottom: 10 },
  previewText: { color: colors.white, fontSize: 15, lineHeight: 22 },
  help: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 6 },
});
