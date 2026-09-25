import React from 'react';
import { Pressable, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AssignmentForm from '../../../components/AssignmentForm';
import { BackIcon } from '../../../components/Icons';
import { Screen } from '../../../components/ui';
import { colors } from '../../../constants/theme';
import { useApp } from '../../../context/AppContext';
import { useSafeBack } from '../../../utils/useSafeBack';
import { styles } from '../../../styles/assignment/edit/[id].styles';

/**
 * EDIT ASSIGNMENT SCREEN (modal, opened by tapping "Edit" on an assignment)
 * -----------------------------------------------------------------------------
 * Also a thin wrapper around <AssignmentForm>, but pre-fills it with the
 * assignment's current values (`initial={assignment}`) and calls
 * updateAssignment() instead of addAssignment() on save.
 */
export default function EditAssignmentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const goBack = useSafeBack();
  const { assignments, updateAssignment } = useApp();

  const assignment = assignments.find(x => x.id === id);

  // The form (and all of its hooks) only mounts once we know the assignment exists,
  // so hook order is stable across renders.
  if (!assignment) {
    return (
      <Screen>
        <Pressable onPress={goBack} style={styles.back} accessibilityRole="button" accessibilityLabel="Back">
          <BackIcon />
        </Pressable>
        <Text style={styles.notFound}>Assignment not found.</Text>
      </Screen>
    );
  }

  return (
    <AssignmentForm
      heading="Edit Assignment"
      initial={assignment}
      onCancel={goBack}
      onAddSubject={() => router.push('/subject/add')}
      onSubmit={values => {
        updateAssignment(assignment.id, values);
        goBack();
      }}
    />
  );
}
