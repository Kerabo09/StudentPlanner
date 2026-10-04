import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { styles } from '@/styles/components/FormHeader.styles';

/** Top bar for modal forms: Cancel · Title · Save. */
export default function FormHeader({ title, onCancel, onSave, saveDisabled }) {
  return (
    <View style={styles.formHeader}>
      <Pressable onPress={onCancel} hitSlop={8} accessibilityRole="button">
        <Text style={styles.cancelText}>Cancel</Text>
      </Pressable>
      <Text style={styles.formTitle}>{title}</Text>
      <Pressable
        onPress={onSave}
        disabled={saveDisabled}
        hitSlop={8}
        accessibilityRole="button"
        accessibilityState={{ disabled: !!saveDisabled }}
      >
        <Text style={[styles.saveText, saveDisabled && styles.saveTextDisabled]}>Save</Text>
      </Pressable>
    </View>
  );
}
