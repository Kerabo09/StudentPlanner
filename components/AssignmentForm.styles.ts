import { StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

export const styles = StyleSheet.create({
  content: { padding: 20, paddingBottom: 48 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  addSubjectBox: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  addSubjectText: { color: colors.primary, fontSize: 15, fontWeight: '500' },
  priorityChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  priorityText: { fontSize: 13, fontWeight: '600' },
  subtasksHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginBottom: 8,
  },
  subtasksTitle: { fontSize: 16, fontWeight: '700', color: colors.text },
  addSubtask: { fontSize: 14, color: colors.primary, fontWeight: '600' },
  subtaskRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  subtaskInput: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  removeBtn: { padding: 8 },
  removeText: { color: colors.danger, fontSize: 14 },
  textArea: { minHeight: 96, textAlignVertical: 'top' },
});
