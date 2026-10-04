import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  flex: { flex: 1 },

  // Page title (Add Task tab): left-aligned, same style as the other tab headers.
  pageHeader: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  pageTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: colors.text,
  },

  content: { paddingHorizontal: 20, paddingTop: 12, paddingBottom: 40, gap: 14 },
  group: {},

  // Small uppercase label above each field (TITLE *, SUBJECT, PRIORITY, ...).
  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.muted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },

  // Compact inputs: extends the shared `Field` input style (white card, light border).
  input: {
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
  },
  // Description stays taller than the other fields, but shorter than before.
  textArea: { minHeight: 88, textAlignVertical: 'top' },

  // Priority pills: equal width, tinted background, selected one gets a colored border.
  priorityRow: { flexDirection: 'row', gap: 10 },
  priorityBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  priorityText: { fontSize: 14, fontWeight: '600' },

  submitBtn: {
    marginTop: 6,
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitBtnDisabled: { opacity: 0.45 },
  submitText: { color: colors.white, fontSize: 15, fontWeight: '600' },
});
