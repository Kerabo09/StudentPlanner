/**
 * ADD TASK SCREEN ("Add Task" tab)
 * ---------------------------------
 * Thin wrapper around the shared <TaskForm> (the same form the Edit screen uses).
 * After saving, the task is added through the shared AppContext, the form is cleared
 * (by changing its `key`, which re-mounts it) and the user is taken back to the Tasks tab.
 *
 * The form's look lives in components/TaskForm.js + styles/components/TaskForm.styles.js
 */
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import TaskForm from '@/components/TaskForm';
import { useApp } from '@/state/AppContext';

export default function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useApp();
  const [formKey, setFormKey] = useState(0);

  return (
    <TaskForm
      key={formKey}
      heading="Add Task"
      submitLabel="Add Task"
      onSubmit={values => {
        addTask({ ...values, done: false });
        setFormKey(k => k + 1); // clear the form for next time
        router.navigate('/');
      }}
    />
  );
}
