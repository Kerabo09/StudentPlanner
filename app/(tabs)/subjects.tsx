/**
 * SUBJECTS SCREEN ("Subjects" tab)
 * ---------------------------------
 * Shows the list of subjects/courses the student created, each as a card.
 * - Data (subjects, assignments) comes from the shared AppContext (see context/AppContext.tsx),
 *   which is our single source of truth and is saved to the device automatically.
 * - Tapping a card opens that subject's detail page (app/subject/[id].tsx).
 * - Tapping "+ Add" opens the add-subject form (app/subject/add.tsx).
 */
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, SUBJECT_COLORS } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { BookEmptyIcon, ChevronRightIcon, PlusIcon } from '../../components/Icons';
import { EmptyState, Screen } from '../../components/ui';
import { sortByDeadline } from '../../utils/dates';
import { styles } from '../../styles/(tabs)/subjects.styles';
// NOTE: ProgressBar is no longer imported here — the "% complete" progress bar that used to
// show on every subject card was removed on purpose (simplified version of the app).

export default function SubjectsScreen() {
  const router = useRouter();
  const { subjects, assignments } = useApp();

  const totalActive = assignments.filter(a => !a.done).length;
  const subjectCount = subjects.length;
  const plural = (n: number, word: string) => `${n} ${word}${n !== 1 ? 's' : ''}`;

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Subjects</Text>
        <Pressable
          style={styles.addBtn}
          onPress={() => router.push('/subject/add')}
          accessibilityRole="button"
        >
          <PlusIcon />
          <Text style={styles.addBtnText}>Add</Text>
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Text style={styles.semesterLabel}>CURRENT SEMESTER</Text>
          <Text style={styles.introTitle}>Your courses</Text>
          <Text style={styles.introSub}>
            {subjectCount > 0
              ? `${plural(totalActive, 'active task')} across ${plural(subjectCount, 'subject')}`
              : 'Add your first course to get started'}
          </Text>
        </View>

        {subjectCount === 0 ? (
          <EmptyState
            icon={<BookEmptyIcon />}
            title="No subjects yet"
            body="Tap + Add above to create your first subject."
            actionLabel="+ Add Subject"
            onAction={() => router.push('/subject/add')}
          />
        ) : (
          <>
            {/*
              Each course is shown as a simple card: code, name and (if there is one) the
              next upcoming due date. The old version of this card also showed
              "active tasks / % complete" plus a progress bar — that was removed on
              purpose, so we no longer need each subject's assignment counts here.
            */}
            {subjects.map((subj, i) => {
              const subjAssignments = assignments.filter(a => a.subjectId === subj.id);
              const color = subj.color || SUBJECT_COLORS[i % SUBJECT_COLORS.length];
              // Find the closest not-yet-done assignment with a due date, to show as "Next: ...".
              const nearest = sortByDeadline(
                subjAssignments.filter(a => !a.done && a.dueDate),
              )[0];

              return (
                <Pressable
                  key={subj.id}
                  style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
                  onPress={() => router.push(`/subject/${subj.id}`)}
                  accessibilityRole="button"
                >
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardCode}>{subj.code}</Text>
                      <Text style={styles.cardName}>{subj.name}</Text>
                      <ChevronRightIcon size={14} />
                    </View>
                    <View style={[styles.colorDot, { backgroundColor: color }]} />
                  </View>
                  {nearest ? (
                    <Text style={[styles.cardNext, { color }]}>
                      Next: {nearest.title} · due {nearest.dueDate}
                    </Text>
                  ) : null}
                </Pressable>
              );
            })}
          </>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </Screen>
  );
}
