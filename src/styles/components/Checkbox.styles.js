import { StyleSheet } from 'react-native';
import { colors } from '@/constants/theme';

export const styles = StyleSheet.create({
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
});
