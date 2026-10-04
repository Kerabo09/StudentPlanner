import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/theme';
import { useApp } from '@/state/AppContext';
import Checkbox from '@/components/Checkbox';
import PriorityBadge from '@/components/PriorityBadge';
import { TrashIcon } from '@/components/Icons';
import { styles } from '@/styles/components/TaskCard.styles';

/**
 * TASK CARD
 * ----------
 * One task shown as a card (used on the Tasks and Completed tabs).
 * - Tapping the card navigates to the full task detail screen.
 * - Tapping the round checkbox marks the task done/not done without leaving this screen.
 * - If `onDelete` is passed (Completed tab), a trash button is shown on the right.
 */
export default function TaskCard({ task: a, showSubject = true, accent = colors.primary, onDelete }) {
  const router = useRouter();
  const { toggleTaskDone } = useApp();

  const meta = showSubject ? a.subject || 'No subject' : null;

  return (
    <Pressable
      onPress={() => router.push(`/task/${a.id}`)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, a.done && styles.cardDone, pressed && styles.cardPressed]}
    >
      <View style={styles.row}>
        <Checkbox checked={a.done} onPress={() => toggleTaskDone(a.id)} color={accent} />
        <View style={styles.content}>
          <Text style={[styles.title, a.done && styles.titleDone]}>{a.title}</Text>
          <PriorityBadge priority={a.priority} />
          {meta ? <Text style={styles.meta}>{meta}</Text> : null}
          {a.dueDate ? <Text style={styles.meta}>Due {a.dueDate}</Text> : null}
        </View>
        {onDelete ? (
          <Pressable
            onPress={onDelete}
            hitSlop={10}
            style={styles.deleteBtn}
            accessibilityRole="button"
            accessibilityLabel={`Delete ${a.title}`}
          >
            <TrashIcon />
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}
