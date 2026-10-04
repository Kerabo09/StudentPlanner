import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  scroll: { flex: 1 },
  bottomSpacer: { height: 32 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: { padding: 4 },
  notFoundBack: { padding: 4, alignSelf: 'flex-start', marginLeft: 16, marginTop: 12 },
  topBarTitle: { fontSize: 17, fontWeight: '600', color: colors.text },
  editText: { fontSize: 15, color: colors.primary, fontWeight: '600' },
  notFound: { padding: 20, color: colors.muted },
  hero: { paddingHorizontal: 20, paddingBottom: 16 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  subjBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: colors.primarySoft,
  },
  subjBadgeText: { fontSize: 12, color: colors.primary, fontWeight: '600' },
  heroTitle: { fontSize: 24, fontWeight: '700', color: colors.text, marginBottom: 6 },
  heroSub: { fontSize: 13, color: colors.muted },
  card: {
    marginHorizontal: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 12 },
  notesText: { fontSize: 14, color: colors.textBody, lineHeight: 21 },
  deleteBtn: { marginHorizontal: 20, paddingVertical: 12, alignItems: 'center' },
  deleteBtnText: { color: colors.danger, fontSize: 14, fontWeight: '500' },
});
