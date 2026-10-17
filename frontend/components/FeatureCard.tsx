import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = { title: string; children: React.ReactNode; accessory?: React.ReactNode };
export default function FeatureCard({ title, children, accessory }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.heading}>
        <Text style={styles.title}>{title}</Text>
        {accessory}
      </View>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 17, padding: 15, marginBottom: 14 },
  heading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  title: { fontSize: 17, fontWeight: '800', color: colors.text },
});
