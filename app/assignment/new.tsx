import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AssignmentForm from '../../components/AssignmentForm';
import { useApp } from '../../context/AppContext';
import { useSafeBack } from '../../utils/useSafeBack';

/**
 * NEW ASSIGNMENT SCREEN (modal, opened from the "+" button anywhere in the app)
 * --------------------------------------------------------------------------------
 * Thin wrapper around the shared <AssignmentForm>. If it was opened from a
 * specific subject's page, `subjectId` is passed in the URL so that subject
 * is pre-selected in the form.
 */
export default function NewAssignmentScreen() {
  const router = useRouter();
  const goBack = useSafeBack();
  const { subjectId } = useLocalSearchParams<{ subjectId?: string }>();
  const { addAssignment } = useApp();

  return (
    <AssignmentForm
      heading="New Assignment"
      defaultSubjectId={subjectId}
      onCancel={goBack}
      onAddSubject={() => router.push('/subject/add')}
      onSubmit={values => {
        addAssignment({ ...values, done: false });
        goBack();
      }}
    />
  );
}
