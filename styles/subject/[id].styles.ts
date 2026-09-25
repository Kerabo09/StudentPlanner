import { StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';

export const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: { padding: 4 },
  notFoundBack: { padding: 4, alignSelf: 'flex-start', marginLeft: 16, marginTop: 12 },
  topBarCode: { fontSize: 16, fontWeight: '700', color: colors.text },
  notFound: { padding: 20, color: colors.muted },
  hero: { paddingHorizontal: 20, paddingBottom: 16 },
  heroName: { fontSize: 28, fontWeight: '700', color: colors.text, marginBottom: 4 },
  heroMeta: { fontSize: 13, color: colors.muted },
  progressCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
  },
  progressLabel: { fontSize: 13, color: colors.muted },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: colors.text },
  seeAll: { fontSize: 14, color: colors.primary, fontWeight: '600' },
  emptyCard: {
    marginHorizontal: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  emptyText: { fontSize: 14, color: colors.faint, marginBottom: 12 },
  emptyBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  emptyBtnText: { color: colors.white, fontWeight: '600' },
});
