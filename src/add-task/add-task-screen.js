/**
 * ADD TASK FOLDER — ALL THE CODE IN ONE FILE
 * -------------------------------------------
 * src/add-task/add-task-screen.js  - this file (code)
 * src/add-task/add-task.styles.js  - the styles (external CSS)
 *
 * Order in this file: 1. AddTaskScreen  2. AddTaskForm (the fields)  3. Rules (deadline check)
 * (The Edit Task modal is in edit-task-screen.js.)
 *
 * ADD TASK rules
 * - Required: Title, Subject, Priority, Deadline. Description is optional.
 * - Priority: no button is highlighted until you tap one (High / Medium / Low).
 * - Deadline: must be a real date written as YYYY-MM-DD (e.g. 2026-10-5 or 2026-10-05).
 *   Something like 111234 shows a red error right away and the task cannot be added.
 * - After adding, the form is cleared (by changing its `key`) and you go back to the Tasks tab.
 */
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '@/tasks/tasks';
import { colors, PRIORITIES } from '@/tasks/tasks.styles';
import { DeadlineField } from './deadline-field';
import { styles } from './add-task.styles';

/* ======================================================================
   1. ADD TASK SCREEN (route "/add-task")
   ====================================================================== */

export function AddTaskScreen() {
  const router = useRouter();
  const { addTask } = useApp();
  const [formKey, setFormKey] = useState(0);

  return (
    <AddTaskForm
      key={formKey}
      onSubmit={values => {
        addTask({ ...values, done: false });
        setFormKey(k => k + 1); // clears the form for next time
        router.navigate('/');
      }}
    />
  );
}

/* ======================================================================
   2. ADD TASK FORM (the fields)
   ====================================================================== */

function AddTaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [notes, setNotes] = useState('');

  const deadline = checkDeadline(dueDate);
  const showDeadlineError = dueDate.trim().length > 0 && !deadline.ok;

  const canSave = canSaveTask({ title, subject, priority, deadline });

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

  return (
    <SafeAreaView edges={['top']} style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Add Task</Text>
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Text style={styles.label}>Title *</Text>
            <TextInput
              style={styles.input}
              placeholder="Task title"
              placeholderTextColor={colors.faint}
              value={title}
              onChangeText={setTitle}
              returnKeyType="next"
            />
          </View>

          <View>
            <Text style={styles.label}>Subject *</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Mobile Programming"
              placeholderTextColor={colors.faint}
              value={subject}
              onChangeText={setSubject}
              returnKeyType="next"
            />
          </View>

          <View>
            <Text style={styles.label}>Priority *</Text>
            <View style={styles.priorityRow}>
              {PRIORITIES.map(p => {
                const active = priority === p;
                return (
                  <Pressable
                    key={p}
                    onPress={() => setPriority(p)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    style={[styles.priorityBtn, active && styles.priorityBtnActive]}
                  >
                    <Text style={[styles.priorityText, active && styles.priorityTextActive]}>{p}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <DeadlineField
            label="Deadline *"
            value={dueDate}
            onChange={setDueDate}
            error={showDeadlineError ? deadline.message : ''}
          />

          <View>
            <Text style={styles.label}>Description (optional)</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Add notes or instructions..."
              placeholderTextColor={colors.faint}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />
          </View>

          {!canSave && <Text style={styles.hint}>Fill in the required fields (*) to add the task.</Text>}

          <Pressable
            style={[styles.submitBtn, !canSave && styles.submitBtnDisabled]}
            onPress={handleSave}
            disabled={!canSave}
            accessibilityRole="button"
            accessibilityState={{ disabled: !canSave }}
          >
            <Text style={styles.submitText}>Add Task</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ======================================================================
   3. RULES (deadline check, when the button is enabled)
   ====================================================================== */

/* ----------------------------- Deadline check ------------------------------ */

const pad = n => String(n).padStart(2, '0');

/**
 * Checks a deadline typed by the user.
 * Returns { ok, message, value }:
 *   ok      - true when it is a real date in YYYY-MM-DD form
 *   message - what to show under the field when it is not OK
 *   value   - the clean version to save (2026-10-5 -> 2026-10-05)
 */
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

/** The task can be added when Title, Subject, Priority and a real Deadline are filled in. Description is optional. */
function canSaveTask({ title, subject, priority, deadline }) {
  return (
    title.trim().length > 0 &&
    subject.trim().length > 0 &&
    priority !== '' &&
    deadline.ok
  );
}
