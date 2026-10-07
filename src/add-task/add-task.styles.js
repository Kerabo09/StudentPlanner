import { StyleSheet } from 'react-native';
import { colors } from '@/tasks/tasks.styles';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  flex: {
    flex: 1,
  },

  header: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: colors.text,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    gap: 14,
  },

  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.muted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
    marginTop: 6,
  },
  textArea: {
    minHeight: 88,
    textAlignVertical: 'top',
  },

  priorityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  priorityBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.muted,
  },
  priorityTextActive: {
    color: colors.white,
  },

  hint: {
    fontSize: 12,
    color: colors.muted,
    textAlign: 'center',
    marginTop: 6,
  },
  submitBtn: {
    marginTop: 6,
    backgroundColor: colors.primary,
    paddingVertical: 13,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.45,
  },
  submitText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});

export const chipStyles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: '500',
  },
  chipTextActive: {
    color: colors.white,
  },
});

export const headerStyles = StyleSheet.create({
  formHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.card,
  },
  cancelText: {
    fontSize: 16,
    color: colors.muted,
  },
  formTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  saveText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  saveTextDisabled: {
    opacity: 0.4,
  },
});

export const formStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 40,
    gap: 14,
  },

  label: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.muted,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.danger,
  },
  errorText: {
    fontSize: 12,
    color: colors.danger,
    marginTop: 6,
  },
  textArea: {
    minHeight: 88,
    textAlignVertical: 'top',
  },

  priorityRow: {
    flexDirection: 'row',
    gap: 10,
  },
  priorityBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  priorityBtnActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.muted,
  },
  priorityTextActive: {
    color: colors.white,
  },
});

export const editStyles = StyleSheet.create({
  back: {
    padding: 4,
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginTop: 12,
  },
  notFound: {
    padding: 20,
    color: colors.muted,
  },
});

const DAY_WIDTH = '14.2857%';

export const calendarStyles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  inputFlex: {
    flex: 1,
  },
  iconBtn: {
    width: 46,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  iconBtnActive: {
    backgroundColor: colors.primarySoft,
    borderColor: colors.primary,
  },

  panel: {
    marginTop: 10,
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  monthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  navBtn: {
    padding: 8,
    borderRadius: 10,
  },
  monthTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },

  weekRow: {
    flexDirection: 'row',
  },
  weekday: {
    width: DAY_WIDTH,
    textAlign: 'center',
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: '600',
    color: colors.faint,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: DAY_WIDTH,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayToday: {
    borderWidth: 1,
    borderColor: colors.primary,
  },
  daySelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayText: {
    fontSize: 14,
    color: colors.text,
  },
  dayTextToday: {
    color: colors.primary,
    fontWeight: '600',
  },
  dayTextSelected: {
    color: colors.white,
    fontWeight: '600',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingHorizontal: 4,
  },
  footerText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primary,
  },
});
