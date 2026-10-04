/**
 * TASKS SCREEN ("Tasks" tab / home screen)
 * ------------------------------------------
 * This is the first thing the user sees. It lists all tasks that are NOT done yet
 * (finished tasks live in the Completed tab; ticking a task's checkbox moves it there).
 * - Tasks always come out sorted by nearest deadline (see utils/deadlines.js -> sortByDeadline),
 *   so the closest-due task is always first.
 * - The search box filters the list by task title or subject text.
 * - Tapping a task opens its detail page (screens/TaskDetailsScreen.js).
 * - New tasks are added from the "Add Task" tab.
 *
 * Styles: styles/screens/TasksScreen.styles.js
 */
import React, { useState } from 'react';
import { FlatList, Text, TextInput, View } from 'react-native';
import { colors } from '@/constants/theme';
import { useApp } from '@/state/AppContext';
import { ClipboardEmptyIcon, SearchIcon } from '@/components/Icons';
import TaskCard from '@/components/TaskCard';
import EmptyState from '@/components/EmptyState';
import Screen from '@/components/Screen';
import { sortByDeadline } from '@/utils/deadlines';
import { styles } from '@/styles/screens/TasksScreen.styles';

export default function TasksScreen() {
  const { tasks } = useApp();
  const [search, setSearch] = useState('');

  // Today's date, shown as "FRIDAY, OCTOBER 2".
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase();

  // Keep only the open tasks that match the search text (title or subject),
  // then sort them so the nearest deadline comes first.
  const open = tasks.filter(a => !a.done);
  const text = search.trim().toLowerCase();
  const filtered = sortByDeadline(
    open.filter(
      a => a.title.toLowerCase().includes(text) || (a.subject ?? '').toLowerCase().includes(text),
    ),
  );

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
      </View>

      {/* FlatList = the scrollable list of task cards. It builds one TaskCard for each item in `data`. */}
      <FlatList
        style={styles.list}
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        // Shown above the cards: date and search box.
        ListHeaderComponent={
          <>
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
                  placeholder="Search tasks or subjects..."
                  placeholderTextColor={colors.faint}
                  value={search}
                  onChangeText={setSearch}
                  returnKeyType="search"
                />
              </View>
            </View>
          </>
        }
        // Shown when there are no cards to display.
        ListEmptyComponent={
          <EmptyState
            icon={<ClipboardEmptyIcon />}
            title={open.length === 0 ? 'No tasks yet' : 'No matching tasks'}
            body={
              open.length === 0
                ? 'Open the Add Task tab to add your first task.'
                : 'Try a different search.'
            }
          />
        }
        ListFooterComponent={<View style={styles.listFooter} />}
      />
    </Screen>
  );
}
