import AsyncStorage from '@react-native-async-storage/async-storage';

/* ======================================================================
   1. SAVED DATA (AsyncStorage)
   ====================================================================== */

const STORAGE_KEY = 'study_tracker_data';

/**
 * Read saved data, including data saved by older versions of the app:
 *  - Older saves used the key `assignments` instead of `tasks`.
 *  - Even older saves used { subjects, assignments } with `subjectId` on each item;
 *    the subject's name becomes plain subject text.
 */
function readTasks(data) {
  const list = Array.isArray(data?.tasks)
    ? data.tasks
    : Array.isArray(data?.assignments)
      ? data.assignments
      : [];
  const legacySubjects = Array.isArray(data?.subjects) ? data.subjects : [];
  return list.map(item => {
    const { subjectId, ...rest } = item;
    if (typeof rest.subject === 'string') return rest;
    const legacy = legacySubjects.find(s => s.id === subjectId);
    return { ...rest, subject: legacy?.name || legacy?.code || '' };
  });
}

/** Load the saved tasks. Returns [] when nothing is saved yet. */
export async function loadTasks() {
  const saved = await AsyncStorage.getItem(STORAGE_KEY);
  return saved ? readTasks(JSON.parse(saved)) : [];
}

/** Save the whole tasks list. */
export function saveTasks(tasks) {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks }));
}
