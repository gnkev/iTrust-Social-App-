import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import { colors } from '../theme';

type Props = {
  title: string;
  onPress: () => void;
  secondary?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

export default function AppButton({
  title, onPress, secondary = false, disabled = false, loading = false, style,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.secondary,
        (pressed || disabled || loading) && styles.dim,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={secondary ? colors.navy : colors.navy} />
      ) : (
        <Text style={[styles.text, secondary && styles.secondaryText]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: colors.gold, minHeight: 48, borderRadius: 25, paddingHorizontal: 18, paddingVertical: 12, alignItems: 'center', justifyContent: 'center' },
  secondary: { backgroundColor: '#E8EDF4' },
  dim: { opacity: 0.65 },
  text: { color: colors.navy, fontSize: 15, fontWeight: '800' },
  secondaryText: { color: colors.navy2 },
});
