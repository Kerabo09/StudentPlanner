/**
 * TASK DETAILS SCREEN (opened by tapping any task card)
 * ---------------------------------------------------------------
 * Shows everything about one task: subject, priority, due date and notes.
 * - The task can still be marked done/undone from its checkbox on the
 *   task list (TaskCard) — there's no separate complete button on this screen.
 * - "Edit" opens screens/EditTaskScreen.js pre-filled with this task's data.
 *
 * Styles: styles/screens/TaskDetailsScreen.styles.js
 */
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useApp } from '@/state/AppContext';
import { BackIcon } from '@/components/Icons';
import PriorityBadge from '@/components/PriorityBadge';
import Screen from '@/components/Screen';
import { confirmDelete } from '@/utils/confirmDelete';
import { useSafeBack } from '@/utils/useSafeBack';
import { styles } from '@/styles/screens/TaskDetailsScreen.styles';

export default function TaskDetailsScreen() {
  const { taskId } = useLocalSearchParams();
  const router = useRouter();
  const goBack = useSafeBack();
  const { tasks, deleteTask } = useApp();

  const a = tasks.find(x => x.id === taskId);

  if (!a) {
    return (
      <Screen>
        <Pressable onPress={goBack} style={styles.notFoundBack} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={styles.notFound}>Task not found.</Text>
      </Screen>
    );
  }

  const handleDelete = () =>
    confirmDelete('Delete Task', `Delete "${a.title}"?`, 'Delete', () => {
      goBack();
      deleteTask(a.id);
    });

  return (
    <Screen>
      <View style={styles.topBar}>
        <Pressable onPress={goBack} style={styles.backBtn} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={styles.topBarTitle}>Task</Text>
        <Pressable
          onPress={() => router.push(`/task/edit/${a.id}`)}
          hitSlop={8}
          accessibilityRole="button"
        >
          <Text style={styles.editText}>Edit</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.heroMeta}>
            {a.subject ? (
              <View style={styles.subjBadge}>
                <Text style={styles.subjBadgeText}>Subject: {a.subject}</Text>
              </View>
            ) : null}
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

        <Pressable style={styles.deleteBtn} onPress={handleDelete} accessibilityRole="button">
          <Text style={styles.deleteBtnText}>Delete task</Text>
        </Pressable>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </Screen>
  );
}
