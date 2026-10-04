/**
 * THEME / DESIGN CONSTANTS
 * -------------------------
 * All colors and shared design values live in this one file. Screens import
 * `colors` (and the priority color palette) from here instead of
 * hardcoding hex codes, so the whole app's look can be changed in one place.
 */

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
};

/** Background + text color for each priority badge (High/Medium/Low). */
export const PRIORITY_STYLES = {
  High: { bg: '#FDF2F8', text: '#DB2777' },
  Medium: { bg: '#FFF7ED', text: '#D97706' },
  Low: { bg: '#F0FDF4', text: '#16A34A' },
};

/** All valid priority values, in display order — used to render the priority picker. */
export const PRIORITIES = ['High', 'Medium', 'Low'];
