import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { PRIORITIES, PRIORITY_STYLES } from '@/constants/theme';
import Field from '@/components/Field';
import FormHeader from '@/components/FormHeader';
import Screen from '@/components/Screen';
import { styles } from '@/styles/components/TaskForm.styles';

/**
 * Shared form for creating and editing a task.
 * Fields: Title, Subject (plain text), Priority, Deadline, Description.
 *
 * It has two looks, picked by whether `onCancel` is passed:
 *  - Edit (modal):  pass `onCancel`  -> Cancel · Title · Save bar at the top.
 *  - Add Task (tab): no `onCancel`   -> left-aligned page title at the top and an "Add Task" button at the bottom.
 *
 * State is seeded once from `initial`. The Add Task tab re-mounts the form (via `key`) to clear it.
 */
export default function TaskForm({ heading, initial, onSubmit, onCancel, submitLabel = 'Save' }) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [subject, setSubject] = useState(initial?.subject ?? '');
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [priority, setPriority] = useState(initial?.priority ?? 'Medium');

  const isModal = typeof onCancel === 'function';

  // Title is the only required field — Save stays disabled until something is typed.
  const canSave = title.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    onSubmit({
      title: title.trim(),
      subject: subject.trim(),
      priority,
      dueDate: dueDate.trim(),
      notes: notes.trim(),
    });
  };

  return (
    <Screen edges={isModal ? ['top', 'bottom'] : ['top']}>
      {isModal ? (
        <FormHeader title={heading} onCancel={onCancel} onSave={handleSave} saveDisabled={!canSave} />
      ) : (
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>{heading}</Text>
        </View>
      )}

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.group}>
            <Text style={styles.label}>Title *</Text>
            <Field
              placeholder="Task title"
              value={title}
              onChangeText={setTitle}
              returnKeyType="next"
              style={styles.input}
            />
          </View>

          <View style={styles.group}>
            <Text style={styles.label}>Subject</Text>
            <Field
              placeholder="e.g. Mobile Programming"
              value={subject}
              onChangeText={setSubject}
              returnKeyType="next"
              style={styles.input}
            />
          </View>

          <View style={styles.group}>
            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityRow}>
              {PRIORITIES.map(p => {
                const c = PRIORITY_STYLES[p];
                const active = priority === p;
                return (
                  <Pressable
                    key={p}
                    onPress={() => setPriority(p)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: active }}
                    style={[
                      styles.priorityBtn,
                      { backgroundColor: c.bg },
                      active && { borderColor: c.text },
                    ]}
                  >
                    <Text style={[styles.priorityText, { color: c.text }]}>{p}</Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View style={styles.group}>
            <Text style={styles.label}>Deadline</Text>
            <Field
              placeholder="YYYY-MM-DD"
              value={dueDate}
              onChangeText={setDueDate}
              autoCapitalize="none"
              style={styles.input}
            />
          </View>

          <View style={styles.group}>
            <Text style={styles.label}>Description</Text>
            <Field
              placeholder="Add notes or instructions..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
              style={[styles.input, styles.textArea]}
            />
          </View>

          {!isModal && (
            <Pressable
              style={[styles.submitBtn, !canSave && styles.submitBtnDisabled]}
              onPress={handleSave}
              disabled={!canSave}
              accessibilityRole="button"
              accessibilityState={{ disabled: !canSave }}
            >
              <Text style={styles.submitText}>{submitLabel}</Text>
            </Pressable>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
