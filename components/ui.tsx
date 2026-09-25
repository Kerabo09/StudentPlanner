import React from 'react';
import { Pressable, Text, TextInput, TextInputProps, View, ViewStyle, StyleProp,  } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { colors, PRIORITY_STYLES } from '../constants/theme';
import type { Priority } from '../types';
import { CheckIcon } from './Icons';
import { styles } from './ui.styles';

/**
 * SHARED UI COMPONENTS
 * ---------------------
 * Small, reusable pieces used across many screens (buttons, badges, form
 * fields, empty states, etc.) so we don't repeat the same styling everywhere.
 * Keeping them here means one visual fix updates every screen that uses it.
 */

/** Full-screen container that respects device safe areas. */
export function Screen({
  children,
  edges = ['top'],
  style,
}: {
  children: React.ReactNode;
  edges?: Edge[];
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <SafeAreaView edges={edges} style={[styles.screen, style]}>
      {children}
    </SafeAreaView>
  );
}

/** Small colored pill showing a task's priority (e.g. "High"). */
export function PriorityBadge({ priority, label }: { priority: Priority; label?: string }) {
  const c = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.Medium;
  return (
    <View style={[styles.badge, { backgroundColor: c.bg }]}>
      <Text style={[styles.badgeText, { color: c.text }]}>{label ?? priority}</Text>
    </View>
  );
}

/**
 * A simple horizontal bar that fills from 0% to `value`%.
 * NOTE: The app-wide "Progress" tab and the per-subject "% complete" stats were
 * removed on purpose. This component is only kept for the small subtask
 * checklist inside an individual assignment (e.g. "3/5 subtasks done").
 */
export function ProgressBar({
  value,
  color = colors.primary,
  height = 5,
}: {
  /** 0–100 */
  value: number;
  color?: string;
  height?: number;
}) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <View style={[styles.progressBg, { height, borderRadius: height / 2 }]}>
      <View
        style={{ width: `${pct}%`, height, borderRadius: height / 2, backgroundColor: color }}
      />
    </View>
  );
}

/** Round checkbox used to mark a task or subtask as done. */
export function Checkbox({
  checked,
  onPress,
  color = colors.primary,
}: {
  checked: boolean;
  onPress?: () => void;
  color?: string;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      style={[
        styles.checkbox,
        checked && { backgroundColor: color, borderColor: color },
      ]}
    >
      {checked ? <CheckIcon size={12} /> : null}
    </Pressable>
  );
}

/** Friendly placeholder shown when a list has nothing in it yet (e.g. "No subjects yet"). */
export function EmptyState({
  icon,
  title,
  body,
  actionLabel,
  onAction,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>{icon}</View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
      <Pressable style={styles.primaryBtn} onPress={onAction} accessibilityRole="button">
        <Text style={styles.primaryBtnText}>{actionLabel}</Text>
      </Pressable>
    </View>
  );
}

/** Labelled text input used by the forms. */
export function Field({ label, style, ...props }: { label: string } & TextInputProps) {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.faint}
        {...props}
        style={[styles.input, style]}
      />
    </View>
  );
}

export function FormLabel({ children }: { children: string }) {
  return <Text style={styles.label}>{children}</Text>;
}

/** Top bar for modal forms: Cancel · Title · Save. */
export function FormHeader({
  title,
  onCancel,
  onSave,
  saveDisabled,
}: {
  title: string;
  onCancel: () => void;
  onSave: () => void;
  saveDisabled?: boolean;
}) {
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
        <Text style={[styles.saveText, saveDisabled && { opacity: 0.4 }]}>Save</Text>
      </Pressable>
    </View>
  );
}

/** Selectable pill used for filters and pickers. */
export function Chip({
  label,
  active,
  onPress,
  children,
}: {
  label: string;
  active?: boolean;
  onPress: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: !!active }}
      style={[styles.chip, active && styles.chipActive]}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
      {children}
    </Pressable>
  );
}
