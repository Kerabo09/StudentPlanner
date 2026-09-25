import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { colors } from '../constants/theme';
import { AppProvider, useApp } from '../context/AppContext';

/**
 * ROOT LAYOUT
 * ------------
 * This is the very first component that renders when the app opens. It wraps
 * the whole app in <AppProvider> (see context/AppContext.tsx) so every screen
 * can read/update the shared subjects & assignments data, and defines the
 * overall screen "stack" (which screens exist and how they animate in/out).
 */
function RootNavigator() {
  const { ready } = useApp();

  // Wait for stored data so screens never flash their empty state.
  if (!ready) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.bg }}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    // (tabs) is the bottom-tab-bar section (Tasks / Subjects / Progress-was-here / Add).
    // Everything else is a screen you navigate INTO from a tab, either sliding in from the
    // right (a normal "detail" screen) or popping up as a "modal" (a form you fill in).
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="search" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="subject/[id]" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="subject/add" options={{ presentation: 'modal' }} />
      <Stack.Screen name="assignment/[id]" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="assignment/new" options={{ presentation: 'modal' }} />
      <Stack.Screen name="assignment/edit/[id]" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <RootNavigator />
    </AppProvider>
  );
}
