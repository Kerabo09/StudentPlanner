/**
 * BOTTOM TAB BAR LAYOUT
 * ----------------------
 * Defines the tabs at the bottom of the screen: Tasks, Subjects, and the
 * floating "+" Add button in the middle. Each <Tabs.Screen name="..."> below
 * corresponds to a file inside this same app/(tabs)/ folder (this is how
 * expo-router turns files into navigable screens automatically).
 *
 * NOTE: There used to be a 4th "Progress" tab here (app/(tabs)/progress.tsx).
 * It was removed on purpose to simplify the app. If it's ever needed again,
 * bring back that file and add a matching <Tabs.Screen name="progress" ... />.
 */
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Tabs } from 'expo-router/js-tabs';
import { colors } from '../../constants/theme';
import { PlusIcon, SubjectsIcon, TasksIcon } from '../../components/Icons';
import { styles } from '../../styles/(tabs)/_layout.styles';

/** Floating "+" in the middle of the tab bar. It opens the new-assignment modal instead of a tab. */
function AddTabButton() {
  const router = useRouter();
  return (
    <View style={styles.addWrap} pointerEvents="box-none">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add assignment"
        onPress={() => router.push('/assignment/new')}
        style={({ pressed }) => [styles.addButton, pressed && { opacity: 0.85 }]}
      >
        <PlusIcon size={22} color="#FFFFFF" strokeWidth={2.5} />
      </Pressable>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.faint,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          borderTopWidth: StyleSheet.hairlineWidth,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Tasks', tabBarIcon: ({ color }) => <TasksIcon color={color} /> }}
      />
      <Tabs.Screen
        name="subjects"
        options={{ title: 'Subjects', tabBarIcon: ({ color }) => <SubjectsIcon color={color} /> }}
      />
      <Tabs.Screen
        name="add-center"
        options={{ title: 'Add', tabBarButton: () => <AddTabButton /> }}
      />
    </Tabs>
  );
}
