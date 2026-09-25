/**
 * SHARED TYPES
 * -------------
 * These interfaces describe the "shape" of our data and are used everywhere in
 * the app (screens, forms, AppContext) so TypeScript can catch mistakes like a
 * typo'd field name or a missing property at compile time, before the app even runs.
 */

/** The three priority levels a task can have. Shown as colored badges in the UI. */
export type Priority = 'High' | 'Medium' | 'Low';

/** One checklist item inside an assignment, e.g. "Write introduction". */
export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

/** One assignment/task belonging to a subject. */
export interface Assignment {
  id: string;
  subjectId: string;
  title: string;
  priority: Priority;
  studyTime: string;
  gradeWeight: string;
  /** Free text, e.g. "Thursday, Dec 5". Parsed best-effort for sorting. */
  dueDate: string;
  notes: string;
  subtasks: Subtask[];
  done: boolean;
  /** Epoch ms of when the assignment was last marked complete. */
  completedAt?: number;
  attachment?: string;
}

/** One subject/course the student is taking this semester. */
export interface Subject {
  id: string;
  code: string;
  name: string;
  professor: string;
  schedule: string;
  semester: string;
  color: string;
}

/** Fields the user edits in the assignment form. */
export type AssignmentValues = Pick<
  Assignment,
  'subjectId' | 'title' | 'priority' | 'studyTime' | 'gradeWeight' | 'dueDate' | 'notes' | 'subtasks'
>;
