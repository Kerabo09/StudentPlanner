import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../constants/theme';
import { useApp } from '../context/AppContext';
import type { Assignment } from '../types';
import { Checkbox, PriorityBadge } from './ui';
import { styles } from './TaskCard.styles';

/**
 * TASK CARD
 * ----------
 * One assignment shown as a card (used on the Tasks tab, Subject detail, and Search).
 * - Tapping the card navigates to the full assignment detail screen.
 * - Tapping the round checkbox marks the assignment done/not done without leaving this screen.
 */
export default function TaskCard({
  assignment: a,
  showSubject = true,
  accent = colors.primary,
}: {
  assignment: Assignment;
  showSubject?: boolean;
  accent?: string;
}) {
  const router = useRouter();
  const { subjects, toggleAssignmentDone } = useApp();

  const subject = subjects.find(s => s.id === a.subjectId);

  const meta = showSubject ? subject?.code || 'No subject' : null;

  return (
    <Pressable
      onPress={() => router.push(`/assignment/${a.id}`)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, a.done && styles.cardDone, pressed && { opacity: 0.85 }]}
    >
      <View style={styles.row}>
        <Checkbox checked={a.done} onPress={() => toggleAssignmentDone(a.id)} color={accent} />
        <View style={styles.content}>
          <Text style={[styles.title, a.done && styles.titleDone]}>{a.title}</Text>
          <PriorityBadge priority={a.priority} />
          {meta ? <Text style={styles.meta}>{meta}</Text> : null}
          {a.dueDate ? <Text style={styles.meta}>Due {a.dueDate}</Text> : null}
        </View>
      </View>
    </Pressable>
  );
}
