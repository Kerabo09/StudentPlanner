/**
 * EDIT TASK SCREEN (modal, opened by tapping "Edit" on a task)
 * -----------------------------------------------------------------------------
 * Also a thin wrapper around <TaskForm>, but pre-fills it with the
 * task's current values (`initial={task}`) and calls
 * updateTask() instead of addTask() on save.
 *
 * Styles: styles/screens/EditTaskScreen.styles.js
 */
import React from 'react';
import { Pressable, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import TaskForm from '@/components/TaskForm';
import { BackIcon } from '@/components/Icons';
import Screen from '@/components/Screen';
import { useApp } from '@/state/AppContext';
import { useSafeBack } from '@/utils/useSafeBack';
import { styles } from '@/styles/screens/EditTaskScreen.styles';

export default function EditTaskScreen() {
  const { taskId } = useLocalSearchParams();
  const goBack = useSafeBack();
  const { tasks, updateTask } = useApp();

  const task = tasks.find(x => x.id === taskId);

  // The form (and all of its hooks) only mounts once we know the task exists,
  // so hook order is stable across renders.
  if (!task) {
    return (
      <Screen>
        <Pressable onPress={goBack} style={styles.back} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={styles.notFound}>Task not found.</Text>
      </Screen>
    );
  }

  return (
    <TaskForm
      heading="Edit Task"
      initial={task}
      onCancel={goBack}
      onSubmit={values => {
        updateTask(task.id, values);
        goBack();
      }}
    />
  );
}
