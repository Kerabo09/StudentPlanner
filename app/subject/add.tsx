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
 * A simple form: code and name are required, everything else is optional.
 * On save, it calls addSubject() from AppContext, which generates a unique id
 * and adds the new subject to shared state (and it gets auto-saved to disk).
 */
export default function AddSubjectScreen() {
  const goBack = useSafeBack();
  const { addSubject } = useApp();
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [professor, setProfessor] = useState('');
  const [schedule, setSchedule] = useState('');
  const [color, setColor] = useState(SUBJECT_COLORS[0]);

  // The Save button in the header is disabled until both required fields have text.
  const canSave = code.trim().length > 0 && name.trim().length > 0;

  const handleSave = () => {
    if (!canSave) return;
    addSubject({
      code: code.trim().toUpperCase(),
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
            label="Subject code *"
            placeholder="e.g. MATH 204"
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
          />
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
