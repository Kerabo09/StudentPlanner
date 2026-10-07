import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, Pressable, Text, View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { loadTasks, saveTasks } from '@/storage/storage';
import { CheckIcon } from './icon';
import {
  badgeStyles,
  checkboxStyles,
  colors,
  PRIORITY_STYLES,
  rootStyles,
  screenStyles,
} from './tasks.styles';

function RootStack() {
  const { ready } = useApp();

  if (!ready) {
    return (
      <View style={rootStyles.loading}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: rootStyles.stackContent }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="task/[taskId]" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="task/edit/[taskId]" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export function RootNavigator() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <RootStack />
    </AppProvider>
  );
}

const AppContext = createContext(null);

const createId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setTasks(await loadTasks());
      } catch (error) {
        console.warn('Could not load saved data', error);
      }
      setReady(true);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (!ready) return;
    saveTasks(tasks).catch(error => console.warn('Could not save data', error));
  }, [ready, tasks]);

  function addTask(task) {
    setTasks(prev => [...prev, { ...task, id: createId() }]);
  }

  function updateTask(id, changes) {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...changes } : t)));
  }

  function deleteTask(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function toggleTaskDone(id) {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function clearCompletedTasks() {
    setTasks(prev => prev.filter(t => !t.done));
  }

  return (
    <AppContext.Provider
      value={{
        tasks,
        ready,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskDone,
        clearCompletedTasks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}

export function useSafeBack() {
  const router = useRouter();
  return useCallback(() => {
    if (router.canGoBack()) router.back();
    else router.replace('/');
  }, [router]);
}

export function confirmDelete(title, message, confirmLabel, onConfirm) {
  if (Platform.OS === 'web') {
    if (typeof window !== 'undefined' && window.confirm(`${title}\n\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: 'Cancel', style: 'cancel' },
    { text: confirmLabel, style: 'destructive', onPress: onConfirm },
  ]);
}

export function Screen({ children, edges = ['top'], style }) {
  return (
    <SafeAreaView edges={edges} style={[screenStyles.screen, style]}>
      {children}
    </SafeAreaView>
  );
}

export function PriorityBadge({ priority, label }) {
  const c = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.Medium;
  return (
    <View style={[badgeStyles.badge, { backgroundColor: c.bg }]}>
      <Text style={[badgeStyles.badgeText, { color: c.text }]}>{label ?? priority}</Text>
    </View>
  );
}

export function Checkbox({ checked, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: !!checked }}
      style={[checkboxStyles.checkbox, checked && checkboxStyles.checkboxChecked]}
    >
      {checked ? <CheckIcon size={12} /> : null}
    </Pressable>
  );
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const MONTH_RE = '(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\\.?';

function withImpliedYear(month, day, now) {
  const candidate = new Date(now.getFullYear(), month, day);
  const sixMonthsMs = 1000 * 60 * 60 * 24 * 183;
  if (now.getTime() - candidate.getTime() > sixMonthsMs) {
    candidate.setFullYear(candidate.getFullYear() + 1);
  }
  return candidate;
}

export function parseDueDate(text, now = new Date()) {
  const s = (text ?? '').trim().toLowerCase();
  if (!s) return null;

  let m = s.match(/\b(\d{4})-(\d{1,2})-(\d{1,2})\b/);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));

  m = s.match(new RegExp(`\\b${MONTH_RE}\\s+(\\d{1,2})(?:st|nd|rd|th)?(?:,?\\s+(\\d{4}))?`));
  if (m) {
    const month = MONTHS.indexOf(m[1]);
    const day = Number(m[2]);
    return m[3] ? new Date(Number(m[3]), month, day) : withImpliedYear(month, day, now);
  }

  m = s.match(new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?\\s+${MONTH_RE}(?:,?\\s+(\\d{4}))?`));
  if (m) {
    const month = MONTHS.indexOf(m[2]);
    const day = Number(m[1]);
    return m[3] ? new Date(Number(m[3]), month, day) : withImpliedYear(month, day, now);
  }

  m = s.match(/\b(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?\b/);
  if (m) {
    const month = Number(m[1]) - 1;
    const day = Number(m[2]);
    if (month < 0 || month > 11 || day < 1 || day > 31) return null;
    if (m[3]) {
      const year = Number(m[3]);
      return new Date(year < 100 ? 2000 + year : year, month, day);
    }
    return withImpliedYear(month, day, now);
  }

  return null;
}

export function sortByDeadline(list) {
  const now = new Date();
  const keyed = list.map((a, index) => ({
    a,
    index,
    t: parseDueDate(a.dueDate, now)?.getTime() ?? null,
  }));
  keyed.sort((x, y) => {
    if (!!x.a.done !== !!y.a.done) return x.a.done ? 1 : -1;
    if (x.t !== null && y.t !== null && x.t !== y.t) return x.t - y.t;
    if (x.t !== null && y.t === null) return -1;
    if (x.t === null && y.t !== null) return 1;
    return x.index - y.index;
  });
  return keyed.map(k => k.a);
}
