import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { BackIcon, PaperclipIcon } from '../../components/Icons';
import { Checkbox, PriorityBadge, ProgressBar, Screen } from '../../components/ui';
import { confirmDestructive } from '../../utils/confirm';
import { useSafeBack } from '../../utils/useSafeBack';
import { styles } from '../../styles/assignment/[id].styles';

/**
 * ASSIGNMENT DETAIL SCREEN (opened by tapping any task card)
 * ---------------------------------------------------------------
 * Shows everything about one assignment: priority, due date, study time,
 * grade weight, its subtask checklist, notes, and an attachment if any.
 * - Tapping a checklist row toggles that one subtask (toggleSubtask).
 * - "Mark assignment complete" toggles the whole assignment (toggleAssignmentDone).
 * - "Edit" opens app/assignment/edit/[id].tsx pre-filled with this assignment's data.
 */
export default function AssignmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const goBack = useSafeBack();
  const { assignments, subjects, toggleSubtask, toggleAssignmentDone, deleteAssignment } = useApp();

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
  // Checklist progress for THIS assignment only (e.g. "2/5 done") — separate from
  // the app-wide progress feature, which was removed.
  const subtaskDone = a.subtasks.filter(st => st.done).length;
  const subtaskTotal = a.subtasks.length;
  const progress = subtaskTotal > 0 ? (subtaskDone / subtaskTotal) * 100 : 0;
  const accent = subj?.color || colors.primary; // Use the subject's color, or the app default.

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

        {(a.studyTime || a.gradeWeight || subtaskTotal > 0) && (
          <View style={styles.statsCard}>
            {a.studyTime ? <Text style={styles.statItem}>{a.studyTime} estimated study</Text> : null}
            {subtaskTotal > 0 && (
              <>
                <Text style={[styles.statProgress, { color: accent }]}>
                  {subtaskDone}/{subtaskTotal} done
                </Text>
                <ProgressBar value={progress} color={accent} height={6} />
              </>
            )}
            {a.gradeWeight ? <Text style={styles.statItem}>{a.gradeWeight} grade weight</Text> : null}
          </View>
        )}

        {subtaskTotal > 0 && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Checklist</Text>
            {a.subtasks.map(st => (
              <Pressable
                key={st.id}
                style={styles.checkRow}
                onPress={() => toggleSubtask(a.id, st.id)}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: st.done }}
              >
                <Checkbox checked={st.done} onPress={() => toggleSubtask(a.id, st.id)} color={accent} />
                <Text style={[styles.checkText, st.done && styles.checkTextDone]}>{st.title}</Text>
              </Pressable>
            ))}
          </View>
        )}

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

        <Pressable
          style={[styles.completeBtn, a.done && styles.completeBtnDone]}
          onPress={() => toggleAssignmentDone(a.id)}
          accessibilityRole="button"
        >
          <Text style={styles.completeBtnText}>
            {a.done ? 'Mark as incomplete' : 'Mark assignment complete'}
          </Text>
        </Pressable>

        <Pressable style={styles.deleteBtn} onPress={handleDelete} accessibilityRole="button">
          <Text style={styles.deleteBtnText}>Delete assignment</Text>
        </Pressable>

        <View style={{ height: 32 }} />
      </ScrollView>
    </Screen>
  );
}
