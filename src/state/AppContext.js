/**
 * APP CONTEXT — where the app's data lives
 * ------------------------------------------
 * This file holds ALL the data (the list of tasks) in one place and shares it with
 * every screen using React's Context API, so we don't have to pass props around.
 * (Reading/writing the phone's saved data lives in storage/tasksStorage.js.)
 *
 * How it works:
 * 1. When the app opens, we LOAD the saved data from the phone (AsyncStorage).
 * 2. Whenever the tasks change, we SAVE them again automatically.
 * 3. Screens get the data and the add/update/delete functions by calling `useApp()`.
 *
 * Defense answers:
 *  - "Where is the data stored?"   -> AsyncStorage (saved on the phone, works offline).
 *  - "How do screens share data?"  -> Context: AppProvider wraps the app, useApp() reads it.
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { createId } from '@/utils/createId';
import { loadTasks, saveTasks } from '@/storage/tasksStorage';

/**
 * The shape of our data:
 *
 *  Task = { id, title, subject, priority, dueDate, notes, done }
 *         - subject is plain text typed by the student (e.g. "Mobile Programming")
 *         - priority is 'High', 'Medium' or 'Low'
 *         - dueDate is free text like "2026-10-15" or "Thursday, Dec 5"
 *
 * What useApp() gives each screen:
 *   tasks, ready,
 *   addTask, updateTask, deleteTask, toggleTaskDone, clearCompletedTasks
 */
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [ready, setReady] = useState(false);

  // 1. LOAD once when the app starts.
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

  // 2. SAVE every time the data changes (but only after loading, so we never overwrite saved data with an empty list).
  useEffect(() => {
    if (!ready) return;
    saveTasks(tasks).catch(error => console.warn('Could not save data', error));
  }, [ready, tasks]);

  // 3. ACTIONS. React needs a NEW array each time (never edit the old one),
  //    so we use [...old, new] to add, .map() to update and .filter() to delete.

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

  // Used by the Completed tab's "Delete all" button.
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

// The hook every screen uses:  const { tasks, addTask } = useApp();
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used inside AppProvider');
  return context;
}
