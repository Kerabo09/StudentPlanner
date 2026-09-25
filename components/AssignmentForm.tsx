import React, { useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, Text, TextInput, View,  } from 'react-native';
import { colors, PRIORITIES, PRIORITY_STYLES } from '../constants/theme';
import { useApp } from '../context/AppContext';
import type { Assignment, AssignmentValues, Priority, Subtask } from '../types';
import { uid } from '../utils/id';
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
  const [studyTime, setStudyTime] = useState(initial?.studyTime ?? '');
  const [gradeWeight, setGradeWeight] = useState(initial?.gradeWeight ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  // Keep full subtask objects (not just titles) so ids and done-state survive edits/removals.
  const [subtasks, setSubtasks] = useState<Subtask[]>(initial?.subtasks ?? []);

  // Title is the only required field — Save stays disabled until something is typed.
  const canSave = title.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    onSubmit({
      subjectId,
      title: title.trim(),
      priority,
      dueDate: dueDate.trim(),
      studyTime: studyTime.trim(),
      gradeWeight: gradeWeight.trim(),
      notes,
      subtasks: subtasks
        .map(st => ({ ...st, title: st.title.trim() }))
        .filter(st => st.title.length > 0),
    });
  };

  /** Update the text of one subtask row while the student is typing. */
  const setSubtaskTitle = (id: string, text: string) =>
    setSubtasks(prev => prev.map(st => (st.id === id ? { ...st, title: text } : st)));

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
            label="Study time"
            placeholder="e.g. 2.5 hrs"
            value={studyTime}
            onChangeText={setStudyTime}
          />
          <Field
            label="Grade weight"
            placeholder="e.g. 15%"
            value={gradeWeight}
            onChangeText={setGradeWeight}
          />

          <View style={styles.subtasksHeader}>
            <Text style={styles.subtasksTitle}>Subtasks</Text>
            <Pressable
              onPress={() => setSubtasks(prev => [...prev, { id: uid(), title: '', done: false }])}
              hitSlop={8}
              accessibilityRole="button"
            >
              <Text style={styles.addSubtask}>+ Add</Text>
            </Pressable>
          </View>
          {subtasks.map((st, i) => (
            <View key={st.id} style={styles.subtaskRow}>
              <TextInput
                style={[styles.subtaskInput]}
                value={st.title}
                onChangeText={text => setSubtaskTitle(st.id, text)}
                placeholder={`Subtask ${i + 1}`}
                placeholderTextColor={colors.faint}
              />
              <Pressable
                onPress={() => setSubtasks(prev => prev.filter(x => x.id !== st.id))}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={`Remove subtask ${i + 1}`}
                style={styles.removeBtn}
              >
                <Text style={styles.removeText}>✕</Text>
              </Pressable>
            </View>
          ))}

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
