import React, { useState } from 'react';
import { KeyboardAvoidingView, Pressable, ScrollView, View } from 'react-native';
import { colors, SUBJECT_COLORS } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { Field, FormHeader, FormLabel, Screen } from '../../components/ui';
import { useSafeBack } from '../../utils/useSafeBack';
import { styles } from '../../styles/subject/add.styles';

/**
 * ADD SUBJECT SCREEN (modal form opened from "+ Add" on the Subjects tab)
 * ----------------------------------------------------------------------
 * A simple form: only the name is required, everything else is optional.
 * A short "code" is auto-generated from the name (used elsewhere in the app
 * for badges/filters) so there's no separate code field to fill in.
 * On save, it calls addSubject() from AppContext, which generates a unique id
 * and adds the new subject to shared state (and it gets auto-saved to disk).
 */

// Turns "Linear Algebra" -> "LA", "Physics" -> "PHYS". Falls back to "GEN" if empty.
function codeFromName(rawName: string): string {
  const trimmed = rawName.trim();
  if (!trimmed) return 'GEN';
  const words = trimmed.split(/\s+/);
  if (words.length > 1) {
    return words.map(w => w[0]).join('').toUpperCase().slice(0, 6);
  }
  return trimmed.slice(0, 4).toUpperCase();
}

export default function AddSubjectScreen() {
  const goBack = useSafeBack();
  const { addSubject } = useApp();
  const [name, setName] = useState('');
  const [professor, setProfessor] = useState('');
  const [schedule, setSchedule] = useState('');
  const [color, setColor] = useState(SUBJECT_COLORS[0]);

  // The Save button in the header is disabled until the required field has text.
  const canSave = name.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    addSubject({
      code: codeFromName(name),
      name: name.trim(),
      professor: professor.trim(),
      schedule: schedule.trim(),
      semester: 'Current Semester',
      color,
    });
    goBack();
  };

  return (
    <Screen edges={['top', 'bottom']}>
      <FormHeader title="Add Subject" onCancel={goBack} onSave={handleSave} saveDisabled={!canSave} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Field
            label="Subject name *"
            placeholder="e.g. Linear Algebra"
            value={name}
            onChangeText={setName}
          />
          <Field
            label="Professor"
            placeholder="e.g. Prof. Elena Park"
            value={professor}
            onChangeText={setProfessor}
          />
          <Field
            label="Schedule"
            placeholder="e.g. M/W/F 10:00 AM"
            value={schedule}
            onChangeText={setSchedule}
          />

          <FormLabel>Color</FormLabel>
          <View style={styles.colorRow}>
            {SUBJECT_COLORS.map(c => (
              <Pressable
                key={c}
                onPress={() => setColor(c)}
                accessibilityRole="button"
                accessibilityLabel={`Color ${c}`}
                accessibilityState={{ selected: color === c }}
                style={[styles.colorDot, { backgroundColor: c }, color === c && styles.colorDotActive]}
              />
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}
