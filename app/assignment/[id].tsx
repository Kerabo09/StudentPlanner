import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApp } from '../../context/AppContext';
import { BackIcon, PaperclipIcon } from '../../components/Icons';
import { PriorityBadge, Screen } from '../../components/ui';
import { confirmDestructive } from '../../utils/confirm';
import { useSafeBack } from '../../utils/useSafeBack';
import { styles } from '../../styles/assignment/[id].styles';

/**
 * ASSIGNMENT DETAIL SCREEN (opened by tapping any task card)
 * ---------------------------------------------------------------
 * Shows everything about one assignment: priority, due date, notes, and an
 * attachment if any.
 * - The assignment can still be marked done/undone from its checkbox on the
 *   task list (TaskCard) — there's no separate complete button on this screen.
 * - "Edit" opens app/assignment/edit/[id].tsx pre-filled with this assignment's data.
 */
export default function AssignmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const goBack = useSafeBack();
  const { assignments, subjects, deleteAssignment } = useApp();

  const a = assignments.find(x => x.id === id);

  if (!a) {
    return (
      <Screen>
        <Pressable onPress={goBack} style={styles.notFoundBack} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={styles.notFound}>Assignment not found.</Text>
      </Screen>
    );
  }

  const subj = subjects.find(s => s.id === a.subjectId);

  const handleDelete = () =>
    confirmDestructive('Delete Assignment', `Delete "${a.title}"?`, 'Delete', () => {
      goBack();
      deleteAssignment(a.id);
    });

  return (
    <Screen>
      <View style={styles.topBar}>
        <Pressable onPress={goBack} style={styles.backBtn} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={styles.topBarTitle}>Assignment</Text>
        <Pressable
          onPress={() => router.push(`/assignment/edit/${a.id}`)}
          hitSlop={8}
          accessibilityRole="button"
        >
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroMeta}>
            {subj && (
              <View style={styles.subjBadge}>
                <Text style={styles.subjBadgeText}>{subj.code}</Text>
              </View>
            )}
            <PriorityBadge priority={a.priority} label={`${a.priority} priority`} />
          </View>
          <Text style={styles.heroTitle}>{a.title}</Text>
          {a.dueDate ? <Text style={styles.heroSub}>Due {a.dueDate}</Text> : null}
        </View>

        {a.notes ? (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Notes</Text>
            <Text style={styles.notesText}>{a.notes}</Text>
          </View>
        ) : null}

        {a.attachment ? (
          <View style={styles.attachRow}>
            <PaperclipIcon />
            <Text style={styles.attachText}>{a.attachment}</Text>
          </View>
        ) : null}

        <Pressable style={styles.deleteBtn} onPress={handleDelete} accessibilityRole="button">
          <Text style={styles.deleteBtnText}>Delete assignment</Text>
        </Pressable>

        <View style={{ height: 32 }} />
      </ScrollView>
    </Screen>
  );
}
