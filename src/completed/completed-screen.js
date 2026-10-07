import React from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Checkbox, confirmDelete, PriorityBadge, sortByDeadline, useApp } from '@/tasks/tasks';
import { CheckEmptyIcon, TrashIcon } from '@/tasks/icon';
import { styles } from './completed.styles';

export function CompletedScreen() {
  const { tasks, deleteTask, clearCompletedTasks } = useApp();
  const completed = sortByDeadline(tasks.filter(t => t.done));

  const handleDeleteOne = t =>
    confirmDelete('Delete Task', `Delete "${t.title}"?`, 'Delete', () => deleteTask(t.id));

  const handleDeleteAll = () =>
    confirmDelete(
      'Delete All Completed',
      `Delete all ${completed.length} completed task${completed.length !== 1 ? 's' : ''}? This cannot be undone.`,
      'Delete All',
      clearCompletedTasks,
    );

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Completed Tasks</Text>
        {completed.length > 0 && (
          <Pressable onPress={handleDeleteAll} hitSlop={8} style={styles.deleteAllBtn} accessibilityRole="button">
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
            title="Nothing completed yet"
            body="Tasks you tick off on the Tasks tab will show up here."
          />
        }
        ListFooterComponent={<View style={styles.listFooter} />}
      />
    </SafeAreaView>
  );
}

function TaskCard({ task, onDelete }) {
  const router = useRouter();
  const { toggleTaskDone } = useApp();
  return (
    <Pressable
      onPress={() => router.push(`/task/${task.id}`)}
      accessibilityRole="button"
      style={({ pressed }) => [styles.card, styles.cardDone, pressed && styles.cardPressed]}
    >
      <View style={styles.cardRow}>
        <Checkbox checked={task.done} onPress={() => toggleTaskDone(task.id)} />
        <View style={styles.cardContent}>
          <Text style={[styles.cardTitle, styles.cardTitleDone]}>{task.title}</Text>
          <PriorityBadge priority={task.priority} />
          <Text style={styles.cardMeta}>{task.subject || 'No subject'}</Text>
          {task.dueDate ? <Text style={styles.cardMeta}>Due {task.dueDate}</Text> : null}
        </View>
        <Pressable
          onPress={onDelete}
          hitSlop={10}
          style={styles.deleteBtn}
          accessibilityRole="button"
          accessibilityLabel={`Delete ${task.title}`}
        >
          <TrashIcon />
        </Pressable>
      </View>
    </Pressable>
  );
}

function EmptyState({ title, body }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <CheckEmptyIcon />
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
    </View>
  );
}
