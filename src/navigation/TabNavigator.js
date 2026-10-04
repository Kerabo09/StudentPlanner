/**
 * BOTTOM TAB BAR (TAB NAVIGATOR)
 * -------------------------------
 * Defines the three tabs at the bottom of the screen: Tasks, Add Task and Completed.
 * Each <Tabs.Screen name="..."> below matches a route file inside src/app/(tabs)/
 * (this is how expo-router turns files into navigable screens automatically):
 *   index.js     -> screens/TasksScreen.js
 *   add-task.js  -> screens/AddTaskScreen.js
 *   completed.js -> screens/CompletedScreen.js
 *
 * Opened through src/app/(tabs)/_layout.js. Styles: styles/navigation/TabNavigator.styles.js
 */
import React from 'react';
import { Tabs } from 'expo-router/js-tabs';
import { colors } from '@/constants/theme';
import { AddTaskIcon, CompletedIcon, TasksIcon } from '@/components/Icons';
import { styles } from '@/styles/navigation/TabNavigator.styles';

export default function TabNavigator() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.faint,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Tasks', tabBarIcon: ({ color }) => <TasksIcon color={color} /> }}
      />
      <Tabs.Screen
        name="add-task"
        options={{ title: 'Add Task', tabBarIcon: ({ color }) => <AddTaskIcon color={color} /> }}
      />
      <Tabs.Screen
        name="completed"
        options={{ title: 'Completed', tabBarIcon: ({ color }) => <CompletedIcon color={color} /> }}
      />
    </Tabs>
  );
}
