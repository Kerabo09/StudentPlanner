/**
 * BOTTOM TAB BAR — Tasks / Add Task / Completed
 * ------------------------------------------------
 * Each <Tabs.Screen name="..."> matches a route file in app/(tabs)/.
 * Opened through app/(tabs)/_layout.js. Styles: tasks.styles.js ("tabStyles").
 */
import React from 'react';
import { Tabs } from 'expo-router/js-tabs';
import { AddTaskIcon, CompletedIcon, TasksIcon } from './icon';
import { colors, tabStyles } from './tasks.styles';

/** Bottom tab bar: Tasks / Add Task / Completed. Names match the files in app/(tabs)/. */
export function TabNavigator() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.faint,
        tabBarStyle: tabStyles.tabBar,
        tabBarLabelStyle: tabStyles.tabLabel,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Tasks', tabBarIcon: ({ color }) => <TasksIcon color={color} /> }} />
      <Tabs.Screen name="add-task" options={{ title: 'Add Task', tabBarIcon: ({ color }) => <AddTaskIcon color={color} /> }} />
      <Tabs.Screen name="completed" options={{ title: 'Completed', tabBarIcon: ({ color }) => <CompletedIcon color={color} /> }} />
    </Tabs>
  );
}
