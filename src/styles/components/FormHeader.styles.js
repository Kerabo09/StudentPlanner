import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const styles = StyleSheet.create({
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
  cancelText: { fontSize: 16, color: colors.muted },
  formTitle: { fontSize: 17, fontWeight: '600', color: colors.text },
  saveText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  saveTextDisabled: { opacity: 0.4 },
});
