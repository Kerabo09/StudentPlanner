import React from 'react';
import { Pressable } from 'react-native';
import { colors } from '@/constants/theme';
import { CheckIcon } from '@/components/Icons';
import { styles } from '@/styles/components/Checkbox.styles';

/** Round checkbox used to mark a task as done. */
export default function Checkbox({ checked, onPress, color = colors.primary }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      style={[styles.checkbox, checked && { backgroundColor: color, borderColor: color }]}
    >
      {checked ? <CheckIcon size={12} /> : null}
    </Pressable>
  );
}
