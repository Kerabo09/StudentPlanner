import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/tasks/tasks';
import { colors, PRIORITIES } from '@/tasks/tasks.styles';
import { DeadlineField } from './deadline-field';
import { styles } from './add-task.styles';

export function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useApp();
  const [formKey, setFormKey] = useState(0);

  return (
    <AddTaskForm
      key={formKey}
      onSubmit={values => {
        addTask({ ...values, done: false });
        setFormKey(k => k + 1);
        router.navigate('/');
      }}
    />
  );
}

function AddTaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');
const handleSave = () => {
    if (!canSave) return;
    onSubmit({
      title: title.trim(),
      subject: subject.trim(),
      priority,
      dueDate: deadline.value,
      notes: notes.trim(),
    });
  };
  const deadline = checkDeadline(dueDate);
  const showDeadlineError = dueDate.trim().length > 0 && !deadline.ok;

  const canSave = canSaveTask({ title, subject, priority, deadline });

  



const pad = n => String(n).padStart(2, '0');

function checkDeadline(text) {
  const v = text.trim();
  if (!v) return { ok: false, message: '', value: '' };

  const m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!m) {
    return { ok: false, message: 'Invalid date. Use YYYY-MM-DD, for example 2026-10-05.', value: v };
  }

  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const date = new Date(year, month - 1, day);
  const real =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

  if (!real) {
    return { ok: false, message: 'That date does not exist. Check the month and day.', value: v };
  }
  return { ok: true, message: '', value: `${year}-${pad(month)}-${pad(day)}` };
}

function canSaveTask({ title, subject, priority, deadline }) {
  return (
    title.trim().length > 0 &&
    subject.trim().length > 0 &&
    priority !== '' &&
    deadline.ok
  );
}
