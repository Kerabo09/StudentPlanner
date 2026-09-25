import { StyleSheet } from 'react-native';
import { colors } from '../../constants/theme';

export const styles = StyleSheet.create({
  content: { padding: 60, paddingBottom: 48 },
  colorRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 4 },
  colorDot: { width: 34, height: 34, borderRadius: 17, borderWidth: 3, borderColor: 'transparent' },
  colorDotActive: { borderColor: colors.text },
});
