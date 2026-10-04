import { Alert, Platform } from 'react-native';

/**
 * Cross-platform destructive confirmation.
 * `Alert.alert` is a silent no-op on react-native-web, so use window.confirm there.
 */
export function confirmDelete(
  title,
  message,
  confirmLabel,
  onConfirm,
) {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && window.confirm(`${title}\n\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    { text: confirmLabel, style: 'destructive', onPress: onConfirm },
  ]);
}
