import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from '@/styles/components/Chip.styles';

/** Selectable pill used for filters and pickers. */
export default function Chip({ label, active, onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
      {children}
    </Pressable>
  );
}
