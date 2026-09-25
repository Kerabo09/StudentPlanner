/**
 * TASKS SCREEN ("Tasks" tab / home screen)
 * ------------------------------------------
 * This is the first thing the user sees. It lists all assignments across every subject.
 * - Assignments always come out sorted by nearest deadline (see utils/dates.ts ->
 *   sortByDeadline), so the closest-due task is always first. There used to be a visible
 *   "Sorted by: Nearest Deadline" label and a "Show/Hide done" toggle here — both were
 *   removed on purpose to keep the screen simpler; the sorting itself still happens
 *   automatically in the background.
 * - The search box and subject chips (All / CS302 / ...) filter the list client-side.
 * - Tapping a task opens its detail page (app/assignment/[id].tsx).
 */
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { ClipboardEmptyIcon, SearchIcon } from '../../components/Icons';
import TaskCard from '../../components/TaskCard';
import { Chip, EmptyState, Screen } from '../../components/ui';
import { sortByDeadline } from '../../utils/dates';
import { styles } from '../../styles/(tabs)/index.styles';

export default function TasksScreen() {
  const router = useRouter();
  const { assignments, subjects } = useApp();
  const [search, setSearch] = useState('');
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  // Today's date, formatted for the "FRIDAY, SEPTEMBER 25" header line.
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase();

  // Unique subject codes, used to build the horizontal filter chips (All / CS302 / ...).
  const subjectCodes = useMemo(() => [...new Set(subjects.map(s => s.code))], [subjects]);

  // Apply the search text + subject filter, then always sort by nearest deadline.
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = assignments.filter(a => {
      if (activeSubject) {
        const subj = subjects.find(s => s.id === a.subjectId);
        if (subj?.code !== activeSubject) return false;
      }
      if (q) return a.title.toLowerCase().includes(q);
      return true;
    });
    return sortByDeadline(list);
  }, [assignments, subjects, activeSubject, search]);

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
        <Pressable
          style={styles.iconBtn}
          onPress={() => router.push('/search')}
          accessibilityRole="button"
          accessibilityLabel="Search assignments"
        >
          <SearchIcon />
        </Pressable>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.dateRow}>
          <View>
            <Text style={styles.dateLabel}>
              {dayName}, {dateStr}
            </Text>
            <Text style={styles.dateTitle}>Today's Schedule</Text>
          </View>
          <Text style={styles.taskCount}>
            {filtered.length} task{filtered.length !== 1 ? 's' : ''} planned
          </Text>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <SearchIcon size={15} color={colors.faint} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search assignments, labs, or readings..."
              placeholderTextColor={colors.faint}
              value={search}
              onChangeText={setSearch}
              returnKeyType="search"
            />
          </View>
        </View>

        {subjectCodes.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterScroll}
            contentContainerStyle={styles.filterContent}
          >
            <Chip label="All" active={!activeSubject} onPress={() => setActiveSubject(null)} />
            {subjectCodes.map(code => (
              <Chip
                key={code}
                label={code}
                active={activeSubject === code}
                onPress={() => setActiveSubject(activeSubject === code ? null : code)}
              />
            ))}
          </ScrollView>
        )}

        {filtered.length === 0 ? (
          <EmptyState
            icon={<ClipboardEmptyIcon />}
            title={assignments.length === 0 ? 'No tasks yet' : 'No matching tasks'}
            body={
              assignments.length === 0
                ? 'Tap + below to add your first assignment.'
                : 'Try a different search or filter.'
            }
            actionLabel="+ New Task"
            onAction={() => router.push('/assignment/new')}
          />
        ) : (
          <>
            {filtered.map(a => (
              <TaskCard key={a.id} assignment={a} />
            ))}
            <Pressable
              style={styles.newTaskBtn}
              onPress={() => router.push('/assignment/new')}
              accessibilityRole="button"
            >
              <Text style={styles.newTaskText}>+ New Task</Text>
            </Pressable>
          </>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </Screen>
  );
}
