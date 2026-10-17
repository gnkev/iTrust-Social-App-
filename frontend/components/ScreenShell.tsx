import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme';

type Props = { children: React.ReactNode; title: string; subtitle?: string };

export default function ScreenShell({ children, title, subtitle }: Props) {
  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.header}>
          <View style={styles.brandGroup}>
            <Image source={require('../assets/itrust-logo.png')} style={styles.logo} />
            <Text style={styles.brand}>iTrust</Text>
          </View>
          <View style={styles.demoBadge}>
            <Ionicons name="star" size={12} color={colors.navy} />
            <Text style={styles.demoBadgeText}>DEMO</Text>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <Text style={styles.heading}>{title}</Text>
        {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <View style={styles.notice}>
          <Ionicons name="flask-outline" size={15} color={colors.goldDark} />
          <Text style={styles.noticeText}>Week 2 UI preview • sample content, not live data</Text>
        </View>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.page },
  headerSafe: { backgroundColor: colors.navy },
  header: { height: 55, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 18 },
  brandGroup: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  logo: { height: 30, width: 30, borderRadius: 7 },
  brand: { color: colors.white, fontSize: 19, fontWeight: '900', letterSpacing: 0.2 },
  demoBadge: { backgroundColor: colors.gold, borderRadius: 20, paddingHorizontal: 11, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 4 },
  demoBadgeText: { color: colors.navy, fontWeight: '800', fontSize: 10 },
  content: { paddingHorizontal: 18, paddingTop: 20, paddingBottom: 36 },
  heading: { fontSize: 26, fontWeight: '800', color: colors.text, marginBottom: 5 },
  subtitle: { fontSize: 14, lineHeight: 20, color: colors.muted, marginBottom: 14 },
  notice: { backgroundColor: colors.paleGold, borderColor: '#EFDEA1', borderWidth: 1, borderRadius: 12, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 7, marginBottom: 16 },
  noticeText: { color: '#6B5215', fontSize: 11, flex: 1, fontWeight: '600' },
});
