/**
 * EDIT TASK  (modal "/task/edit/<id>")
 * -------------------------------------
 * Pre-filled form for changing a task. Opened through app/task/edit/[taskId].js.
 */
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { BackIcon } from '@/tasks/icon';
import { Screen, useApp, useSafeBack } from '@/tasks/tasks';
import { colors, PRIORITIES } from '@/tasks/tasks.styles';
import { DeadlineField } from './calendar';
import { chipStyles, editStyles, formStyles, headerStyles } from './add-task.styles';

const pad = n => String(n).padStart(2, '0');

/** Selectable pill used for filters and pickers. */
export function Chip({ label, active, onPress, children }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      style={[chipStyles.chip, active && chipStyles.chipActive]}
    >
      <Text style={[chipStyles.chipText, active && chipStyles.chipTextActive]}>{label}</Text>
      {children}
    </Pressable>
  );
}

/** Top bar for modal forms: Cancel · Title · Save. */
function FormHeader({ title, onCancel, onSave, saveDisabled }) {
  return (
    <View style={headerStyles.formHeader}>
      <Pressable onPress={onCancel} hitSlop={8} accessibilityRole="button">
        <Text style={headerStyles.cancelText}>Cancel</Text>
      </Pressable>
      <Text style={headerStyles.formTitle}>{title}</Text>
      <Pressable
        onPress={onSave}
        disabled={saveDisabled}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityState={{ disabled: !!saveDisabled }}
      >
        <Text style={[headerStyles.saveText, saveDisabled && headerStyles.saveTextDisabled]}>Save</Text>
      </Pressable>
    </View>
  );
}

/* ======================================================================
   EDIT TASK — form
   ====================================================================== */

/**
 * Form used by the Edit Task modal (the Add Task tab has its own copy inside
 * AddTaskScreen.js). Cancel · Title · Save bar at the top.
 *
 * Same rules as Add Task: priority buttons are all neutral and only the selected
 * one is highlighted, and the deadline must be a real YYYY-MM-DD date.
 * (Here the deadline may be left empty, but if something is typed it must be valid.)
 */

function checkEditDeadline(text) {
  const v = text.trim();
  if (!v) return { ok: true, empty: true, message: '', value: '' };

  const m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!m) return { ok: false, message: 'Invalid date. Use YYYY-MM-DD, for example 2026-10-05.', value: v };

  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  const date = new Date(year, month - 1, day);
  const real = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;

  if (!real) return { ok: false, message: 'That date does not exist. Check the month and day.', value: v };
  return { ok: true, message: '', value: `${year}-${pad(month)}-${pad(day)}` };
}

function TaskForm({ heading, initial, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [subject, setSubject] = useState(initial?.subject ?? '');
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [priority, setPriority] = useState(initial?.priority ?? '');

  const deadline = checkEditDeadline(dueDate);
  const showDeadlineError = !deadline.ok;
  const canSave = title.trim().length > 0 && deadline.ok;

  const handleSave = () => {
    if (!canSave) return;
    onSubmit({
      title: title.trim(),
      subject: subject.trim(),
      priority: priority || 'Medium',
      dueDate: deadline.value,
      notes: notes.trim(),
    });
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <FormHeader title={heading} onCancel={onCancel} onSave={handleSave} saveDisabled={!canSave} />

      <KeyboardAvoidingView style={formStyles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={formStyles.flex}
          contentContainerStyle={formStyles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={formStyles.label}>Title *</Text>
            <TextInput
              style={formStyles.input}
              placeholder="Task title"
              placeholderTextColor={colors.faint}
              value={title}
              onChangeText={setTitle}
              returnKeyType="next"
            />
          </View>

          <View>
            <Text style={formStyles.label}>Subject</Text>
            <TextInput
              style={formStyles.input}
              placeholder="e.g. Mobile Programming"
              placeholderTextColor={colors.faint}
              value={subject}
              onChangeText={setSubject}
              returnKeyType="next"
            />
          </View>

          <View>
            <Text style={formStyles.label}>Priority</Text>
            <View style={formStyles.priorityRow}>
              {PRIORITIES.map(p => {
                const active = priority === p;
                return (
                  <Pressable
                    key={p}
                    onPress={() => setPriority(p)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    style={[formStyles.priorityBtn, active && formStyles.priorityBtnActive]}
                  >
                    <Text style={[formStyles.priorityText, active && formStyles.priorityTextActive]}>{p}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <DeadlineField
            label="Deadline"
            value={dueDate}
            onChange={setDueDate}
            error={showDeadlineError ? deadline.message : ''}
          />

          <View>
            <Text style={formStyles.label}>Description</Text>
            <TextInput
              style={[formStyles.input, formStyles.textArea]}
              placeholder="Add notes or instructions..."
              placeholderTextColor={colors.faint}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

/* ======================================================================
   EDIT TASK — screen
   ====================================================================== */

export function EditTaskScreen() {
  const { taskId } = useLocalSearchParams();
  const goBack = useSafeBack();
  const { tasks, updateTask } = useApp();

  const task = tasks.find(x => x.id === taskId);

  // The form (and all of its hooks) only mounts once we know the task exists,
  // so hook order is stable across renders.
  if (!task) {
    return (
      <Screen>
        <Pressable onPress={goBack} style={editStyles.back} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={editStyles.notFound}>Task not found.</Text>
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
