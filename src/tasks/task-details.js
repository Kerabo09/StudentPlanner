/**
 * TASK DETAILS SCREEN (route "/task/<id>") — opened by tapping a task card
 * -------------------------------------------------------------------------
 * Shows subject, priority, due date and notes. "Edit" opens the Edit Task
 * modal (src/add-task/edit-task.js). Styles: tasks.styles.js ("detailsStyles").
 */
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { confirmDelete, PriorityBadge, Screen, useApp, useSafeBack } from './tasks';
import { BackIcon } from './icon';
import { detailsStyles } from './tasks.styles';

export function TaskDetailsScreen() {
  // All hooks first — never after the early return below.
  const { taskId } = useLocalSearchParams();
  const router = useRouter();
  const goBack = useSafeBack();
  const { tasks, deleteTask } = useApp();

  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return (
      <Screen>
        <Pressable onPress={goBack} style={detailsStyles.notFoundBack} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={detailsStyles.notFound}>Task not found.</Text>
      </Screen>
    );
  }

  const handleDelete = () =>
    confirmDelete('Delete Task', `Delete "${task.title}"?`, 'Delete', () => {
      goBack();
      deleteTask(task.id);
    });

  return (
    <Screen>
      <View style={detailsStyles.topBar}>
        <Pressable onPress={goBack} style={detailsStyles.backBtn} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={detailsStyles.topBarTitle}>Task</Text>
        <Pressable onPress={() => router.push(`/task/edit/${task.id}`)} hitSlop={8} accessibilityRole="button">
          <Text style={detailsStyles.editText}>Edit</Text>
        </Pressable>
      </View>

      <ScrollView style={detailsStyles.scroll} showsVerticalScrollIndicator={false}>
        <View style={detailsStyles.hero}>
          <View style={detailsStyles.heroMeta}>
            {task.subject ? (
              <View style={detailsStyles.subjBadge}>
                <Text style={detailsStyles.subjBadgeText}>Subject: {task.subject}</Text>
              </View>
            ) : null}
            <PriorityBadge priority={task.priority} label={`${task.priority} priority`} />
          </View>
          <Text style={detailsStyles.heroTitle}>{task.title}</Text>
          {task.dueDate ? <Text style={detailsStyles.heroSub}>Due {task.dueDate}</Text> : null}
        </View>

        {task.notes ? (
          <View style={detailsStyles.card}>
            <Text style={detailsStyles.cardTitle}>Notes</Text>
            <Text style={detailsStyles.notesText}>{task.notes}</Text>
          </View>
        ) : null}

        <Pressable style={detailsStyles.deleteBtn} onPress={handleDelete} accessibilityRole="button">
          <Text style={detailsStyles.deleteBtnText}>Delete task</Text>
        </Pressable>

        <View style={detailsStyles.bottomSpacer} />
      </ScrollView>
    </Screen>
  );
}
