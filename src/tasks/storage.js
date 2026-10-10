import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'study_tracker_data';

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

export async function loadTasks() {
  const saved = await AsyncStorage.getItem(STORAGE_KEY);
  return saved ? readTasks(JSON.parse(saved)) : [];
}

export function saveTasks(tasks) {
  return AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks }));
}
