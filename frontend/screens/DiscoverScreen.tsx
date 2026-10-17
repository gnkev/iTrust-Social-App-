import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenShell from '../components/ScreenShell';
import FeatureCard from '../components/FeatureCard';
import { colors } from '../theme';

const people = [
  { name: 'Alex Morgan', words: 'Loyal • Reliable • Calm', initials: 'AM' },
  { name: 'Jordan Rae', words: 'Honest • Supportive • Creative', initials: 'JR' },
  { name: 'Taylor Quinn', words: 'Insightful • Thoughtful', initials: 'TQ' },
];
const interests = ['Founders', 'Creators', 'Athletes', 'Music', 'Fashion', 'Tech', 'Wellness', 'Education'];

export default function DiscoverScreen() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = useMemo(() => people.filter(person => person.name.toLowerCase().includes(search.toLowerCase())), [search]);
  return (
    <ScreenShell title="Discover" subtitle="Find trusted people and explore interests.">
      <View style={styles.search}>
        <Ionicons name="search" size={19} color={colors.muted} />
        <TextInput value={search} onChangeText={setSearch} placeholder="Search sample profiles" placeholderTextColor="#8090A4" style={styles.searchInput} />
      </View>
      <FeatureCard title="Trusted Profiles" accessory={<Text style={styles.demo}>Sample data</Text>}>
        {filtered.length === 0 && <Text style={styles.empty}>No demo profiles match your search.</Text>}
        {filtered.map(person => (
          <View key={person.name} style={styles.personRow}>
            <View style={styles.avatar}><Text style={styles.initials}>{person.initials}</Text></View>
            <View style={{ flex: 1 }}><Text style={styles.personName}>{person.name}</Text><Text style={styles.words}>{person.words}</Text></View>
            <Pressable accessibilityRole="button" style={styles.trust} onPress={() => Alert.alert('Future feature', 'Trust requests require a real authenticated user and backend connection.') }>
              <Text style={styles.trustText}>Trust</Text>
            </Pressable>
          </View>
        ))}
      </FeatureCard>
      <FeatureCard title="Interest Categories">
        <View style={styles.chips}>
          {interests.map(interest => (
            <Pressable accessibilityRole="button" key={interest} onPress={() => setSelected(old => old === interest ? null : interest)} style={[styles.chip, selected === interest && styles.chipSelected]}>
              <Text style={[styles.chipText, selected === interest && styles.chipTextSelected]}>{interest}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.footer}>{selected ? `Selected demo interest: ${selected}` : 'Choose an interest to preview a selection state.'}</Text>
      </FeatureCard>
    </ScreenShell>
  );
}
const styles = StyleSheet.create({
  search: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 14, paddingHorizontal: 13, flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  searchInput: { flex: 1, height: 47, fontSize: 14, color: colors.text, marginLeft: 8 },
  demo: { fontSize: 10, color: colors.muted },
  personRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 13, borderBottomColor: colors.border, borderBottomWidth: 1 },
  avatar: { width: 42, height: 42, borderRadius: 23, justifyContent: 'center', alignItems: 'center', backgroundColor: '#E7EBFA' },
  initials: { color: colors.blue, fontWeight: '800', fontSize: 14 },
  personName: { fontWeight: '800', color: colors.text, fontSize: 14 },
  words: { fontSize: 11, color: colors.muted, marginTop: 4 },
  trust: { backgroundColor: colors.gold, paddingVertical: 8, paddingHorizontal: 13, borderRadius: 20 },
  trustText: { fontSize: 12, fontWeight: '800', color: colors.navy },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#EEF0F5', paddingVertical: 9, paddingHorizontal: 12, borderRadius: 20 },
  chipSelected: { backgroundColor: colors.gold },
  chipText: { fontSize: 12, color: '#445167', fontWeight: '600' },
  chipTextSelected: { color: colors.navy, fontWeight: '800' },
  footer: { color: colors.muted, fontSize: 12, marginTop: 14 },
  empty: { color: colors.muted, fontSize: 13, paddingVertical: 14 },
});
