import { StyleSheet } from 'react-native';

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

export const PRIORITY_STYLES = {
  High: {
    bg: '#FDF2F8',
    text: '#DB2777',
  },
  Medium: {
    bg: '#FFF7ED',
    text: '#D97706',
  },
  Low: {
    bg: '#F0FDF4',
    text: '#16A34A',
  },
};

export const PRIORITIES = ['High', 'Medium', 'Low'];

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

  dateRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 16,
  },
  dateLabel: {
    fontSize: 11,
    color: colors.muted,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  dateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginTop: 2,
  },
  taskCount: {
    fontSize: 12,
    color: colors.muted,
  },

  searchRow: {
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    padding: 0,
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
  cardMeta: {
    fontSize: 13,
    color: colors.muted,
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

export const checkboxStyles = StyleSheet.create({
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.checkBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});

export const screenStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});

export const badgeStyles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export const detailsStyles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  bottomSpacer: {
    height: 32,
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 4,
  },
  notFoundBack: {
    padding: 4,
    alignSelf: 'flex-start',
    marginLeft: 16,
    marginTop: 12,
  },
  topBarTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.text,
  },
  editText: {
    fontSize: 15,
    color: colors.primary,
    fontWeight: '600',
  },
  notFound: {
    padding: 20,
    color: colors.muted,
  },
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  heroMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  subjBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: colors.primarySoft,
  },
  subjBadgeText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 6,
  },
  heroSub: {
    fontSize: 13,
    color: colors.muted,
  },
  card: {
    marginHorizontal: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  notesText: {
    fontSize: 14,
    color: colors.textBody,
    lineHeight: 21,
  },
  deleteBtn: {
    marginHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteBtnText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: '500',
  },
});

export const rootStyles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bg,
  },
  stackContent: {
    backgroundColor: colors.bg,
  },
});

export const tabStyles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopColor: colors.border,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '500',
  },
});
