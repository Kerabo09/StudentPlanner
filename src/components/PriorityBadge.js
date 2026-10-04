import React from 'react';
import { Text, View } from 'react-native';
import { PRIORITY_STYLES } from '@/constants/theme';
import { styles } from '@/styles/components/PriorityBadge.styles';

/** Small colored pill showing a task's priority (e.g. "High"). */
export default function PriorityBadge({ priority, label }) {
  const c = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.Medium;
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.badgeText, { color: c.text }]}>{label ?? priority}</Text>
    </View>
  );
}
