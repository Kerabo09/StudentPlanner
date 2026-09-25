/**
 * THEME / DESIGN CONSTANTS
 * -------------------------
 * All colors and shared design values live in this one file. Screens import
 * `colors` (and the priority/subject color palettes) from here instead of
 * hardcoding hex codes, so the whole app's look can be changed in one place.
 */
import type { Priority } from '../types';

/** The app's color palette. Used by every screen's StyleSheet. */
export const colors = {
  primary: '#4F46E5',
  primarySoft: '#EEF2FF',
  lavender: '#C4B5FD',
  lavenderSoft: '#F5F3FF',
  bg: '#F4F5FA',
  card: '#FFFFFF',
  border: '#E5E7EB',
  checkBorder: '#D1D5DB',
  text: '#111827',
  textBody: '#374151',
  muted: '#6B7280',
  faint: '#9CA3AF',
  danger: '#EF4444',
  success: '#10B981',
  white: '#FFFFFF',
} as const;

/** Background + text color for each priority badge (High/Medium/Low). */
export const PRIORITY_STYLES: Record<Priority, { bg: string; text: string }> = {
  High: { bg: '#FDF2F8', text: '#DB2777' },
  Medium: { bg: '#FFF7ED', text: '#D97706' },
  Low: { bg: '#F0FDF4', text: '#16A34A' },
};

/** All valid priority values, in display order — used to render the priority picker. */
export const PRIORITIES: Priority[] = ['High', 'Medium', 'Low'];

/** Color choices offered when creating a subject; also cycled through automatically as a fallback. */
export const SUBJECT_COLORS = [
  '#4F46E5',
  '#7C3AED',
  '#DB2777',
  '#D97706',
  '#16A34A',
  '#2563EB',
  '#DC2626',
  '#0891B2',
];
