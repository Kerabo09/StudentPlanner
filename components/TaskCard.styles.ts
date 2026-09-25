import { StyleSheet } from 'react-native';
import { colors } from '../constants/theme';

export const styles = StyleSheet.create({
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
  cardDone: { opacity: 0.55 },
  row: { flexDirection: 'row', gap: 12 },
  content: { flex: 1, gap: 5 },
  title: { fontSize: 15, fontWeight: '700', color: colors.text },
  titleDone: { textDecorationLine: 'line-through', color: colors.faint },
  meta: { fontSize: 13, color: colors.muted },
  subtaskRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  subtaskLabel: { fontSize: 12, color: colors.muted },
  subtaskCount: { fontSize: 12, fontWeight: '600' },
  small: { fontSize: 12, color: colors.muted },
});
