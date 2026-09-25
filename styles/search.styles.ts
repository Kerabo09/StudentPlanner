import { StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: colors.text },
  clearText: { fontSize: 15, color: colors.primary, fontWeight: '600' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: { flex: 1, fontSize: 15, color: colors.text, padding: 0 },
  filterScroll: { flexGrow: 0, marginBottom: 12 },
  filterContent: { paddingHorizontal: 20, gap: 8 },
  resultsHeader: { paddingHorizontal: 20, paddingBottom: 12, gap: 2 },
  resultsCount: { fontSize: 17, fontWeight: '700', color: colors.text },
  resultsFor: { fontSize: 13, color: colors.muted },
  noResults: { padding: 40, alignItems: 'center' },
  noResultsText: { color: colors.faint, fontSize: 14 },
  promptState: { paddingTop: 60, paddingHorizontal: 40, alignItems: 'center' },
  promptText: { fontSize: 14, color: colors.faint, textAlign: 'center' },
});
