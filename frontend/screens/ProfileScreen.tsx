import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AppButton from '../components/AppButton';
import ScreenShell from '../components/ScreenShell';
import FeatureCard from '../components/FeatureCard';
import { colors } from '../theme';

type Props = { onExit: () => void; previewMode: boolean; email: string | null };
export default function ProfileScreen({ onExit, previewMode, email }: Props) {
  const [lens, setLens] = useState<'self' | 'others'>('self');
  return (
    <ScreenShell title="Profile & Identity" subtitle="A visual foundation for your iTrust profile.">
      <View style={styles.hero}>
        <View style={styles.avatarHalo}><Ionicons name="person" size={74} color="#55BE93" /></View>
        <Text style={styles.heroName}>{previewMode ? 'You (Demo)' : (email || 'You')}</Text>
        <View style={styles.trusted}><Ionicons name="checkmark-circle" size={14} color="#16774B" /><Text style={styles.trustedText}>Trust presentation preview</Text></View>
        <Text style={styles.tagline}>Building something real, one interaction at a time.</Text>
      </View>
      <FeatureCard title="Connections Overview">
        <View style={styles.statRow}>
          {[['1.0K', 'Followers'], ['318', 'Following'], ['220', 'Trust Connections']].map(([value, label]) => (
            <View key={label} style={styles.stat}><Text style={styles.statValue}>{value}</Text><Text style={styles.statLabel}>{label}</Text></View>
          ))}
        </View>
        <Text style={styles.demoDisclaimer}>Illustrative numbers from the sponsor concept; not connected to any account.</Text>
      </FeatureCard>
      <FeatureCard title="Trust Score — Placeholder">
        <View style={styles.scoreRow}><View style={styles.scoreCircle}><Text style={styles.scoreNumber}>87</Text></View><View style={{ flex: 1 }}><Text style={styles.scoreTitle}>Trust & reputation</Text><Text style={styles.scoreText}>Placeholder only. The backend will supply an actual score and status.</Text></View></View>
      </FeatureCard>
      <FeatureCard title="Perception Alignment">
        <View style={styles.segment}>
          <Pressable accessibilityRole="button" style={[styles.segmentButton, lens === 'self' && styles.segmentActive]} onPress={() => setLens('self')}><Text style={[styles.segmentText, lens === 'self' && styles.segmentTextActive]}>Who I Am</Text></Pressable>
          <Pressable accessibilityRole="button" style={[styles.segmentButton, lens === 'others' && styles.segmentActive]} onPress={() => setLens('others')}><Text style={[styles.segmentText, lens === 'others' && styles.segmentTextActive]}>Who Do You Say I Am?</Text></Pressable>
        </View>
        <Text style={styles.alignmentTitle}>{lens === 'self' ? 'My self-perception' : 'Others’ perception'}</Text>
        <Text style={styles.alignmentText}>{lens === 'self' ? 'Honest • Curious • Reliable • Calm • Supportive' : 'This area will display anonymous character-word feedback after backend integration.'}</Text>
        <Text style={styles.demoDisclaimer}>These are example words, not assessed or calculated results.</Text>
      </FeatureCard>
      <View style={{ marginTop: 4, marginBottom: 22 }}><AppButton title={previewMode ? 'Exit UI Preview' : 'Log Out'} onPress={onExit} secondary /></View>
    </ScreenShell>
  );
}
const styles = StyleSheet.create({
  hero: { alignItems: 'center', backgroundColor: colors.white, paddingVertical: 21, borderRadius: 18, borderColor: colors.border, borderWidth: 1, marginBottom: 15 },
  avatarHalo: { width: 126, height: 126, borderRadius: 68, backgroundColor: '#E8F8EE', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#BDEBD0', marginBottom: 11 },
  heroName: { color: colors.text, fontSize: 22, fontWeight: '800' },
  trusted: { flexDirection: 'row', gap: 5, alignItems: 'center', backgroundColor: colors.paleGreen, paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20, marginTop: 7 },
  trustedText: { color: '#16774B', fontSize: 11, fontWeight: '700' },
  tagline: { textAlign: 'center', fontSize: 12, color: colors.muted, marginTop: 10, paddingHorizontal: 10 },
  statRow: { flexDirection: 'row' },
  stat: { flex: 1, alignItems: 'center', borderRightColor: colors.border, borderRightWidth: 1 },
  statValue: { color: colors.text, fontSize: 19, fontWeight: '800' },
  statLabel: { color: colors.muted, fontSize: 10, textAlign: 'center', marginTop: 4 },
  demoDisclaimer: { fontSize: 10, color: colors.muted, marginTop: 13, lineHeight: 15 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 17 },
  scoreCircle: { borderWidth: 5, borderColor: colors.gold, width: 78, height: 78, borderRadius: 42, alignItems: 'center', justifyContent: 'center' },
  scoreNumber: { fontSize: 25, fontWeight: '900', color: colors.blue },
  scoreTitle: { fontWeight: '800', fontSize: 15, color: colors.text },
  scoreText: { fontSize: 12, color: colors.muted, lineHeight: 18, marginTop: 4 },
  segment: { flexDirection: 'row', gap: 7, marginBottom: 17 },
  segmentButton: { flex: 1, paddingHorizontal: 7, paddingVertical: 12, backgroundColor: '#F0F2F7', borderRadius: 20 },
  segmentActive: { backgroundColor: colors.gold },
  segmentText: { textAlign: 'center', fontSize: 11, color: colors.text, fontWeight: '700' },
  segmentTextActive: { color: colors.navy, fontWeight: '900' },
  alignmentTitle: { fontSize: 15, color: colors.text, fontWeight: '700' },
  alignmentText: { color: colors.muted, fontSize: 13, lineHeight: 21, marginTop: 7 },
});
