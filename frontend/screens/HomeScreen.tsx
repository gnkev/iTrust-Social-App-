import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import ScreenShell from '../components/ScreenShell';
import FeatureCard from '../components/FeatureCard';
import { colors } from '../theme';

const examples = [
  { author: 'Maya Chen', tag: 'Sample profile', title: 'What trait do you value most in a teammate?', body: 'Thoughtfulness, reliability, and direct communication make a difference.', initial: 'M' },
  { author: 'Alex Morgan', tag: 'Sample profile', title: 'A meaningful conversation today', body: 'The best professional connections start with meeting face to face.', initial: 'A' },
];

export default function HomeScreen() {
  const [liked, setLiked] = useState<number[]>([]);
  return (
    <ScreenShell title="Connected Feed" subtitle="A preview of the feed shared with Trust Connections.">
      {examples.map((post, index) => {
        const isLiked = liked.includes(index);
        return (
          <FeatureCard key={post.author} title={post.author} accessory={<Text style={styles.sample}>{post.tag}</Text>}>
            <View style={styles.info}><View style={styles.avatar}><Text style={styles.avatarText}>{post.initial}</Text></View><Text style={styles.postLabel}>TRUST-BASED CONVERSATION</Text></View>
            <View style={styles.question}><Text style={styles.questionText}>{post.title}</Text><Text style={styles.body}>{post.body}</Text></View>
            <View style={styles.actions}>
              <Pressable accessibilityRole="button" onPress={() => setLiked(old => isLiked ? old.filter(x => x !== index) : [...old, index])} style={styles.action}>
                <Ionicons name={isLiked ? 'heart' : 'heart-outline'} color={isLiked ? colors.red : colors.muted} size={20} />
                <Text style={styles.actionText}>{isLiked ? 'Liked locally' : 'Like'}</Text>
              </Pressable>
              <Pressable accessibilityRole="button" onPress={() => Alert.alert('Demo only', 'Replies will be connected to the backend in a future sprint.')} style={styles.action}>
                <Ionicons name="chatbubble-outline" color={colors.muted} size={19} /><Text style={styles.actionText}>Reply</Text>
              </Pressable>
            </View>
          </FeatureCard>
        );
      })}
    </ScreenShell>
  );
}

const styles = StyleSheet.create({
  sample: { color: colors.green, fontSize: 10, fontWeight: '700' },
  info: { flexDirection: 'row', alignItems: 'center', gap: 9, marginBottom: 12 },
  avatar: { width: 31, height: 31, backgroundColor: colors.paleGreen, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontWeight: '800', color: colors.green },
  postLabel: { fontSize: 10, fontWeight: '700', color: colors.goldDark },
  question: { backgroundColor: colors.navy2, padding: 17, borderRadius: 14 },
  questionText: { color: colors.white, fontSize: 18, fontWeight: '700', lineHeight: 24 },
  body: { color: '#CCD9E8', fontSize: 13, lineHeight: 19, marginTop: 9 },
  actions: { flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15 },
  action: { alignItems: 'center', flexDirection: 'row', gap: 7, padding: 6 },
  actionText: { color: colors.muted, fontWeight: '600', fontSize: 12 },
});
