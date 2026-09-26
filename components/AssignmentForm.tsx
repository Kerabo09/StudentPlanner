import React, { useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, Text, View } from 'react-native';
import { PRIORITIES, PRIORITY_STYLES } from '../constants/theme';
import { useApp } from '../context/AppContext';
import type { Assignment, AssignmentValues, Priority } from '../types';
import { Chip, Field, FormHeader, FormLabel, Screen } from './ui';
import { styles } from './AssignmentForm.styles';

/**
 * Shared form for creating and editing an assignment.
 * State is seeded once from `initial` / `defaultSubjectId`.
 */
export default function AssignmentForm({
  heading,
  initial,
  defaultSubjectId,
  onSubmit,
  onCancel,
  onAddSubject,
}: {
  heading: string;
  initial?: Assignment;
  defaultSubjectId?: string;
  onSubmit: (values: AssignmentValues) => void;
  onCancel: () => void;
  onAddSubject: () => void;
}) {
  const { subjects } = useApp();

  const [title, setTitle] = useState(initial?.title ?? '');
  const [subjectId, setSubjectId] = useState(
    initial?.subjectId ?? defaultSubjectId ?? subjects[0]?.id ?? '',
  );
  const [priority, setPriority] = useState<Priority>(initial?.priority ?? 'Medium');
  const [dueDate, setDueDate] = useState(initial?.dueDate ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');

  // Title is the only required field — Save stays disabled until something is typed.
  const canSave = title.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    onSubmit({
      subjectId,
      title: title.trim(),
      priority,
      dueDate: dueDate.trim(),
      studyTime: initial?.studyTime ?? '',
      gradeWeight: initial?.gradeWeight ?? '',
      notes,
      subtasks: initial?.subtasks ?? [],
    });
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <FormHeader title={heading} onCancel={onCancel} onSave={handleSave} saveDisabled={!canSave} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Field
            label="Title *"
            placeholder="Assignment title"
            value={title}
            onChangeText={setTitle}
            returnKeyType="next"
          />

          <FormLabel>Subject</FormLabel>
          {subjects.length === 0 ? (
            <Pressable style={styles.addSubjectBox} onPress={onAddSubject} accessibilityRole="button">
              <Text style={styles.addSubjectText}>+ Add a subject first</Text>
            </Pressable>
          ) : (
            <View style={styles.chipWrap}>
              {subjects.map(s => (
                <Chip
                  key={s.id}
                  label={s.code}
                  active={subjectId === s.id}
                  onPress={() => setSubjectId(s.id)}
                />
              ))}
            </View>
          )}

          <FormLabel>Priority</FormLabel>
          <View style={styles.chipWrap}>
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
                    styles.priorityChip,
                    { backgroundColor: c.bg },
                    active && { borderColor: c.text },
                  ]}
                >
                  <Text style={[styles.priorityText, { color: c.text }]}>{p}</Text>
                </Pressable>
              );
            })}
          </View>

          <Field
            label="Due date"
            placeholder="e.g. Thursday, Dec 5"
            value={dueDate}
            onChangeText={setDueDate}
          />

          <Field
            label="Notes"
            placeholder="Add notes or instructions..."
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
