import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  list: { flex: 1 },
  listFooter: { height: 32 },

  // Page header: title on the left, "Delete all" on the right, on the same row.
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: colors.text,
  },
  // Normal (not absolute) so it can never overlap the title.
  deleteAllBtn: {
    paddingVertical: 6,
    paddingLeft: 12,
  },
  deleteAllText: { fontSize: 14, fontWeight: '600', color: colors.danger },
  count: { paddingHorizontal: 20, paddingTop: 4, paddingBottom: 12, fontSize: 12, color: colors.muted },
});
