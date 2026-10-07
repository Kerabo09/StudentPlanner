import React from 'react';
import { Tabs } from 'expo-router/js-tabs';
import { AddTaskIcon, CompletedIcon, TasksIcon } from './icon';
import { colors, tabStyles } from './tasks.styles';

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
