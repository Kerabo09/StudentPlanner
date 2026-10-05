/**
 * TASKS TAB (route "/") — task list with search box
 * ---------------------------------------------------
 * Lists every task that is NOT done, nearest deadline first. The search box
 * filters by title or subject. Tapping a card opens task-details.js.
 * Styles: tasks.styles.js ("styles").
 */
import React, { useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Checkbox, PriorityBadge, Screen, sortByDeadline, useApp } from './tasks';
import { ClipboardEmptyIcon, SearchIcon } from './icon';
import { colors, styles } from './tasks.styles';

function TaskCard({ task }) {
  const router = useRouter();
  const { toggleTaskDone } = useApp();
  return (
    <Pressable
      onPress={() => router.push(`/task/${task.id}`)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.cardRow}>
        <Checkbox checked={!!task.done} onPress={() => toggleTaskDone(task.id)} />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{task.title}</Text>
          <PriorityBadge priority={task.priority} />
          <Text style={styles.cardMeta}>{task.subject || 'No subject'}</Text>
          {task.dueDate ? <Text style={styles.cardMeta}>Due {task.dueDate}</Text> : null}
        </View>
      </View>
    </Pressable>
  );
}

function EmptyState({ title, body }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <ClipboardEmptyIcon />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
    </View>
  );
}

export function TasksScreen() {
  const { tasks } = useApp();
  const [search, setSearch] = useState('');

  // Today's date, shown as "FRIDAY, OCTOBER 2".
  const today = new Date();
  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
  const dateStr = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase();

  // Open tasks that match the search text (title or subject), nearest deadline first.
  const open = tasks.filter(t => !t.done);
  const text = search.trim().toLowerCase();
  const filtered = sortByDeadline(
    open.filter(
      t => (t.title ?? '').toLowerCase().includes(text) || (t.subject ?? '').toLowerCase().includes(text),
    ),
  );

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tasks</Text>
      </View>

      <FlatList
        style={styles.list}
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
        ListEmptyComponent={
          <EmptyState
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
