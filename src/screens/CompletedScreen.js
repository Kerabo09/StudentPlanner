/**
 * COMPLETED SCREEN ("Completed" tab)
 * -----------------------------------
 * Shows ONLY the tasks that are marked done.
 * - The trash button on a card deletes that one completed task (after a confirmation).
 * - "Delete all" in the header deletes every completed task, after a confirmation.
 * - Unticking a task's checkbox sends it back to the Tasks tab.
 *
 * Styles: styles/screens/CompletedScreen.styles.js
 */
import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useApp } from '@/state/AppContext';
import { CheckEmptyIcon } from '@/components/Icons';
import TaskCard from '@/components/TaskCard';
import EmptyState from '@/components/EmptyState';
import Screen from '@/components/Screen';
import { confirmDelete } from '@/utils/confirmDelete';
import { sortByDeadline } from '@/utils/deadlines';
import { styles } from '@/styles/screens/CompletedScreen.styles';

export default function CompletedScreen() {
  const { tasks, deleteTask, clearCompletedTasks } = useApp();

  const completed = sortByDeadline(tasks.filter(a => a.done));

  const handleDeleteOne = a =>
    confirmDelete('Delete Task', `Delete "${a.title}"?`, 'Delete', () => deleteTask(a.id));

  const handleDeleteAll = () =>
    confirmDelete(
      'Delete All Completed',
      `Delete all ${completed.length} completed task${completed.length !== 1 ? 's' : ''}? This cannot be undone.`,
      'Delete All',
      clearCompletedTasks,
    );

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Completed Tasks</Text>
        {completed.length > 0 && (
          <Pressable
            onPress={handleDeleteAll}
            hitSlop={8}
            style={styles.deleteAllBtn}
            accessibilityRole="button"
          >
            <Text style={styles.deleteAllText}>Delete all</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        style={styles.list}
        data={completed}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <TaskCard task={item} onDelete={() => handleDeleteOne(item)} />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          completed.length > 0 ? (
            <Text style={styles.count}>
              {completed.length} completed task{completed.length !== 1 ? 's' : ''}
            </Text>
          ) : null
        }
        ListEmptyComponent={
          <EmptyState
            icon={<CheckEmptyIcon />}
            title="Nothing completed yet"
            body="Tasks you tick off on the Tasks tab will show up here."
          />
        }
        ListFooterComponent={<View style={styles.listFooter} />}
      />
    </Screen>
  );
}
