/**
 * SUBJECT DETAIL SCREEN (opened by tapping a subject card)
 * ----------------------------------------------------------
 * Shows one subject's info (name, professor, schedule) and the list of assignments
 * that belong to it. The "Course progress" card (percent complete + progress bar)
 * that used to sit at the top of this screen was removed on purpose, matching the
 * rest of the app — we no longer surface completion percentages anywhere.
 */
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { BackIcon, MoreIcon } from '../../components/Icons';
import TaskCard from '../../components/TaskCard';
import { Screen } from '../../components/ui';
import { confirmDestructive } from '../../utils/confirm';
import { sortByDeadline } from '../../utils/dates';
import { useSafeBack } from '../../utils/useSafeBack';
import { styles } from '../../styles/subject/[id].styles';

export default function SubjectDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const goBack = useSafeBack();
  const { subjects, assignments, deleteSubject } = useApp();

  const subj = subjects.find(s => s.id === id);

  if (!subj) {
    return (
      <Screen>
        <Pressable onPress={goBack} style={styles.notFoundBack} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={styles.notFound}>Subject not found.</Text>
      </Screen>
    );
  }

  // All assignments for this subject, nearest deadline first.
  const list = sortByDeadline(assignments.filter(a => a.subjectId === subj.id));
  const active = list.filter(a => !a.done).length;
  const color = subj.color || colors.primary;

  const addAssignment = () =>
    router.push({ pathname: '/assignment/new', params: { subjectId: subj.id } });

  const handleDelete = () =>
    confirmDestructive(
      'Delete Subject',
      `Delete "${subj.code} – ${subj.name}" and all its tasks?`,
      'Delete',
      () => {
        goBack();
        deleteSubject(subj.id);
      },
    );

  return (
    <Screen>
      <View style={styles.topBar}>
        <Pressable onPress={goBack} style={styles.backBtn} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={styles.topBarCode}>{subj.code}</Text>
        <Pressable
          onPress={handleDelete}
          hitSlop={8}
          accessibilityRole="button"
          accessibilityLabel="Delete subject"
        >
          <MoreIcon />
        </Pressable>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heroName}>{subj.name}</Text>
          {[subj.professor, subj.schedule].filter(Boolean).length > 0 && (
            <Text style={styles.heroMeta}>
              {[subj.professor, subj.schedule].filter(Boolean).join(' · ')}
            </Text>
          )}
        </View>

        <View style={styles.progressCard}>
          <Text style={styles.progressLabel}>
            {active} active task{active !== 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Assignments</Text>
          <Pressable onPress={addAssignment} hitSlop={8} accessibilityRole="button">
            <Text style={styles.seeAll}>+ Add</Text>
          </Pressable>
        </View>

        {list.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No assignments yet.</Text>
            <Pressable style={styles.emptyBtn} onPress={addAssignment} accessibilityRole="button">
              <Text style={styles.emptyBtnText}>+ Add Assignment</Text>
            </Pressable>
          </View>
        ) : (
          list.map(a => <TaskCard key={a.id} assignment={a} showSubject={false} accent={color} />)
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </Screen>
  );
}
