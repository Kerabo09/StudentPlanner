import { StyleSheet } from 'react-native';
import { colors } from '@/tasks/tasks.styles';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  list: {
    flex: 1,
  },
  listFooter: {
    height: 32,
  },

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
  deleteAllBtn: {
    paddingVertical: 6,
    paddingLeft: 12,
  },
  deleteAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.danger,
  },
  count: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 12,
    fontSize: 12,
    color: colors.muted,
  },

  card: {
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  cardDone: {
    opacity: 0.55,
  },
  cardPressed: {
    opacity: 0.85,
  },
  cardRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardContent: {
    flex: 1,
    gap: 5,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  cardTitleDone: {
    textDecorationLine: 'line-through',
    color: colors.faint,
  },
  cardMeta: {
    fontSize: 13,
    color: colors.muted,
  },
  deleteBtn: {
    padding: 4,
    alignSelf: 'flex-start',
  },

  empty: {
    marginHorizontal: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.lavenderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  emptyBody: {
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
});
