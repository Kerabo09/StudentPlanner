import React from 'react';
import { Text, TextInput, View } from 'react-native';
import { colors } from '@/constants/theme';
import { styles } from '@/styles/components/Field.styles';

/** Text input used by the forms. The label is optional (the placeholder can do the job). */
export default function Field({ label, style, ...props }) {
  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <TextInput
        placeholderTextColor={colors.faint}
        accessibilityLabel={label ?? props.placeholder}
        {...props}
        style={[styles.input, style]}
      />
    </View>
  );
}

/** Stand-alone label that matches the Field label style. */
export function FormLabel({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}
