import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '@/styles/components/EmptyState.styles';

/** Friendly placeholder shown when a list has nothing in it yet (e.g. "No tasks yet"). */
export default function EmptyState({ icon, title, body, actionLabel, onAction }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>{icon}</View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
      {actionLabel && onAction ? (
        <Pressable style={styles.primaryBtn} onPress={onAction} accessibilityRole="button">
          <Text style={styles.primaryBtnText}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}
