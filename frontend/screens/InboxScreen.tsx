import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenShell from '../components/ScreenShell';
import FeatureCard from '../components/FeatureCard';
import { colors } from '../theme';

const items = [
  { icon: 'people-outline' as const, title: 'Trust requests', subtitle: 'Trust connection requests will appear here.' },
  { icon: 'notifications-outline' as const, title: 'Notifications', subtitle: 'Activity and important updates will appear here.' },
  { icon: 'chatbubble-ellipses-outline' as const, title: 'Messages', subtitle: 'Conversations with your connections will appear here.' },
];

export default function InboxScreen() {
  return (
    <ScreenShell title="Inbox" subtitle="Trust requests, notifications and messages in one place.">
      <FeatureCard title="Your Inbox">
        {items.map(item => (
          <Pressable accessibilityRole="button" key={item.title} style={styles.row} onPress={() => Alert.alert('Coming later', `${item.title} needs backend services and authenticated user data.`)}>
            <View style={styles.iconWrap}><Ionicons name={item.icon} size={21} color={colors.blue} /></View>
            <View style={{ flex: 1 }}><Text style={styles.title}>{item.title}</Text><Text style={styles.subtitle}>{item.subtitle}</Text></View>
            <Ionicons name="chevron-forward" size={17} color={colors.muted} />
          </Pressable>
        ))}
      </FeatureCard>
      <View style={styles.empty}><Ionicons name="mail-open-outline" size={35} color={colors.muted} /><Text style={styles.emptyTitle}>No live messages yet</Text><Text style={styles.emptyBody}>This Week 2 screen is a navigation placeholder, not a connected inbox.</Text></View>
    </ScreenShell>
  );
}
const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 12, alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  iconWrap: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EAF1FA' },
  title: { color: colors.text, fontSize: 14, fontWeight: '800' },
  subtitle: { color: colors.muted, fontSize: 11, lineHeight: 16, marginTop: 4 },
  empty: { padding: 27, alignItems: 'center' },
  emptyTitle: { color: colors.text, fontWeight: '800', fontSize: 15, marginTop: 10 },
  emptyBody: { color: colors.muted, fontSize: 12, lineHeight: 18, marginTop: 6, textAlign: 'center' },
});
