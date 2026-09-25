/**
 * APP CONTEXT — the app's single source of truth
 * ------------------------------------------------
 * This file holds ALL of the student's data (subjects + assignments) in one place,
 * using React's Context API, so every screen can read and update the same data
 * without passing props down manually through many components.
 *
 * How it works, step by step:
 * 1. On app start, `AppProvider` loads whatever was saved before from the phone's
 *    local storage (AsyncStorage) — see the first useEffect below.
 * 2. Every time subjects/assignments change, a second useEffect automatically
 *    re-saves everything to AsyncStorage, so data survives closing the app.
 * 3. Screens get access to the data and the update functions (addSubject,
 *    updateAssignment, toggleAssignmentDone, etc.) through the `useApp()` hook
 *    defined at the bottom of this file.
 *
 * This is the pattern to point to during the defense when asked "where is your
 * data stored?" or "how do screens share data?".
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Assignment, Priority, Subject, Subtask } from '../types';
import { uid } from '../utils/id';

// Re-exported so existing `import { Priority } from '../context/AppContext'` style keeps working.
export type { Assignment, Priority, Subject, Subtask };

interface PersistedState {
  subjects: Subject[];
  assignments: Assignment[];
}

interface AppContextType extends PersistedState {
  /** False until stored data has been read from disk. */
  ready: boolean;
  addSubject: (subject: Omit<Subject, 'id'>) => void;
  updateSubject: (id: string, subject: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  addAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  updateAssignment: (id: string, assignment: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  toggleSubtask: (assignmentId: string, subtaskId: string) => void;
  toggleAssignmentDone: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = 'study_tracker_data';

const isPriority = (v: unknown): v is Priority => v === 'High' || v === 'Medium' || v === 'Low';
const str = (v: unknown, fallback = '') => (typeof v === 'string' ? v : fallback);

/** Defensive read of whatever is in storage so bad/old data can't crash the app. */
function normalize(raw: unknown): PersistedState {
  const data = (raw ?? {}) as Partial<Record<keyof PersistedState, unknown>>;

  const subjects: Subject[] = (Array.isArray(data.subjects) ? data.subjects : [])
    .filter((s): s is Record<string, unknown> => !!s && typeof s === 'object')
    .map(s => ({
      id: str(s.id) || uid(),
      code: str(s.code),
      name: str(s.name),
      professor: str(s.professor),
      schedule: str(s.schedule),
      semester: str(s.semester, 'Current Semester'),
      color: str(s.color, '#4F46E5'),
    }));

  const assignments: Assignment[] = (Array.isArray(data.assignments) ? data.assignments : [])
    .filter((a): a is Record<string, unknown> => !!a && typeof a === 'object')
    .map(a => ({
      id: str(a.id) || uid(),
      subjectId: str(a.subjectId),
      title: str(a.title),
      priority: isPriority(a.priority) ? a.priority : 'Medium',
      studyTime: str(a.studyTime),
      gradeWeight: str(a.gradeWeight),
      dueDate: str(a.dueDate),
      notes: str(a.notes),
      subtasks: (Array.isArray(a.subtasks) ? a.subtasks : [])
        .filter((t): t is Record<string, unknown> => !!t && typeof t === 'object')
        .map(t => ({ id: str(t.id) || uid(), title: str(t.title), done: t.done === true })),
      done: a.done === true,
      completedAt: typeof a.completedAt === 'number' ? a.completedAt : undefined,
      attachment: typeof a.attachment === 'string' ? a.attachment : undefined,
    }));

  return { subjects, assignments };
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [ready, setReady] = useState(false);

  // Load once on mount.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && !cancelled) {
          const data = normalize(JSON.parse(raw));
          setSubjects(data.subjects);
          setAssignments(data.assignments);
        }
      } catch (e) {
        console.warn('Failed to load saved data', e);
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Save on change — but only AFTER the initial load has finished, otherwise the empty
  // initial state would overwrite whatever is stored on disk.
  useEffect(() => {
    if (!ready) return;
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ subjects, assignments })).catch(e =>
      console.warn('Failed to save data', e),
    );
  }, [ready, subjects, assignments]);

  // --- CRUD actions below ---------------------------------------------------
  // Every function follows the same React pattern: never mutate the old array
  // directly, instead build a brand-new array (with .map / .filter / spread
  // `...`) and hand it to the state setter. This is required so React knows
  // the data changed and re-renders the screens that use it.

  /** Add a brand-new subject. A unique id is generated here with uid(). */
  const addSubject = useCallback(
    (s: Omit<Subject, 'id'>) => setSubjects(prev => [...prev, { ...s, id: uid() }]),
    [],
  );

  /** Update one existing subject by id (used by the edit form). */
  const updateSubject = useCallback(
    (id: string, s: Partial<Subject>) =>
      setSubjects(prev => prev.map(x => (x.id === id ? { ...x, ...s } : x))),
    [],
  );

  /** Delete a subject AND every assignment that belonged to it, so nothing is left orphaned. */
  const deleteSubject = useCallback((id: string) => {
    setSubjects(prev => prev.filter(x => x.id !== id));
    setAssignments(prev => prev.filter(x => x.subjectId !== id));
  }, []);

  /** Add a brand-new assignment/task. */
  const addAssignment = useCallback(
    (a: Omit<Assignment, 'id'>) => setAssignments(prev => [...prev, { ...a, id: uid() }]),
    [],
  );

  /** Update one existing assignment by id (used by the edit form). */
  const updateAssignment = useCallback(
    (id: string, a: Partial<Assignment>) =>
      setAssignments(prev => prev.map(x => (x.id === id ? { ...x, ...a } : x))),
    [],
  );

  /** Permanently remove one assignment. */
  const deleteAssignment = useCallback(
    (id: string) => setAssignments(prev => prev.filter(x => x.id !== id)),
    [],
  );

  /** Flip one subtask/checklist item between done and not-done, inside a specific assignment. */
  const toggleSubtask = useCallback(
    (assignmentId: string, subtaskId: string) =>
      setAssignments(prev =>
        prev.map(a =>
          a.id === assignmentId
            ? {
                ...a,
                subtasks: a.subtasks.map(st => (st.id === subtaskId ? { ...st, done: !st.done } : st)),
              }
            : a,
        ),
      ),
    [],
  );

  /**
   * Mark a whole assignment as done/not done. `completedAt` records the exact
   * timestamp it was finished (used elsewhere for things like "done today").
   */
  const toggleAssignmentDone = useCallback(
    (id: string) =>
      setAssignments(prev =>
        prev.map(a =>
          a.id === id
            ? { ...a, done: !a.done, completedAt: !a.done ? Date.now() : undefined }
            : a,
        ),
      ),
    [],
  );

  const value = useMemo<AppContextType>(
    () => ({
      subjects,
      assignments,
      ready,
      addSubject,
      updateSubject,
      deleteSubject,
      addAssignment,
      updateAssignment,
      deleteAssignment,
      toggleSubtask,
      toggleAssignmentDone,
    }),
    [
      subjects,
      assignments,
      ready,
      addSubject,
      updateSubject,
      deleteSubject,
      addAssignment,
      updateAssignment,
      deleteAssignment,
      toggleSubtask,
      toggleAssignmentDone,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
