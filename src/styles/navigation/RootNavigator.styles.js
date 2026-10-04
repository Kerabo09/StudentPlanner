import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const styles = StyleSheet.create({
  // Shown while the saved tasks are being loaded.
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg },
  // Background behind every stack screen.
  stackContent: { backgroundColor: colors.bg },
});
