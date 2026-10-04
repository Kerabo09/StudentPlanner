import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '@/constants/theme';
import { AppProvider, useApp } from '@/state/AppContext';
import { styles } from '@/styles/navigation/RootNavigator.styles';

/**
 * ROOT NAVIGATOR (the root layout)
 * ---------------------------------
 * This is the very first component that renders when the app opens. It wraps
 * the whole app in <AppProvider> (see state/AppContext.js) so every screen
 * can read/update the shared task data, and defines the
 * overall screen "stack" (which screens exist and how they animate in/out).
 *
 * Opened through src/app/_layout.js (Expo Router needs the file to live there).
 */
function RootStack() {
  const { ready } = useApp();

  // Wait for stored data so screens never flash their empty state.
  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    // (tabs) is the bottom-tab-bar section (Tasks / Add Task / Completed).
    // Everything else is a screen you navigate INTO from a tab, either sliding in from the
    // right (a normal "detail" screen) or popping up as a "modal" (a form you fill in).
    <Stack screenOptions={{ headerShown: false, contentStyle: styles.stackContent }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="task/[taskId]" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="task/edit/[taskId]" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootNavigator() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <RootStack />
    </AppProvider>
  );
}
