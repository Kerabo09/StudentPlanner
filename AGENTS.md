# StudyTracker

React Native app built with Expo (SDK 57) and Expo Router. It lets students track tasks (title, subject, priority, deadline, notes). Data is stored on-device with AsyncStorage.

## Running the app

```bash
npm install
npm start          # then scan the QR code with Expo Go, or press i / a / w
```

Requires Node 22 (see `.mise.toml`). Use the latest Expo Go from the App Store / Play Store, or press `w` to preview in a browser.

## Project structure

Imports use the `@/` alias (= `src/`), e.g. `@/tasks/tasks`.

- `src/tasks/tasks.js` - shared core: app state (`AppProvider` / `useApp`), `useSafeBack`, `confirmDelete`, `Screen`, `PriorityBadge`, `Checkbox`, deadline sorting (`parseDueDate`, `sortByDeadline`) and the `RootNavigator`.
- `src/tasks/tasks.styles.js` - every style of the Tasks folder + the app colours (`colors`).
- `src/tasks/icon.js` - all SVG icons.
- `src/tasks/search-tab.js` - Tasks tab (`TasksScreen`: list + search).
- `src/tasks/task-details.js` - Task Details screen.
- `src/tasks/tabs.js` - bottom tab bar (`TabNavigator`).
- `src/storage/strorage.js` - AsyncStorage `loadTasks` / `saveTasks` (the only file that touches AsyncStorage).
- `src/add-task/add-task.js` - Add Task tab. `src/add-task/edit-task.js` - Edit Task modal. Both use `add-task.styles.js`.
- `src/add-task/calendar.js` - `DeadlineField`: deadline text box + calendar icon + month calendar picker, used by both the Add Task and Edit Task forms (styles: `calendarStyles` in `add-task.styles.js`).
- `src/completed/completed.js` + `completed.styles.js` - Completed tab.
- `app/` (project root, **outside** `src`) - Expo Router route files. Each is a one-line re-export of a screen above. Every file in it becomes a route, so it is kept separate from `src`.

Import direction (keep it one-way to avoid circular imports): `tasks.styles.js` / `icon.js` / `strorage.js` <- `tasks.js` <- `search-tab.js` / `task-details.js` / `add-task.js` / `edit-task.js` / `completed.js`. Never import those screen files from `tasks.js`.

All styles live in the `*.styles.js` files; there is no `StyleSheet.create` inside the code files.

## Conventions and gotchas

- **Styling:** React Native `StyleSheet`, kept in the `*.styles.js` files. Shared colours come from `colors` in `src/tasks/tasks.styles.js`; do not hard-code new hex values in screens.
- **Persistence:** `AppContext` loads from AsyncStorage first and only saves once `ready` is true. Do not add a save path that runs before the initial load, or stored data will be overwritten.
- **Hooks:** Never call hooks after an early return. When a screen depends on a record that may not exist (e.g. `/task/edit/[taskId]`), render a not-found view and mount the hook-using component only when the record exists.
- **Navigation back:** use `useSafeBack()` instead of `router.back()`, so modals opened directly (deep link, web refresh) still have somewhere to go.
- **Confirmations:** use `confirmDelete()` from `src/tasks/tasks.js`. `Alert.alert` does nothing on web.
- **Deadlines:** the Add/Edit forms require `YYYY-MM-DD`. Priority has no default: no button is highlighted until one is tapped, and Add Task needs one chosen. `parseDueDate` in `src/tasks/tasks.js` also reads older free-text dates ("Dec 5", "12/5") for sorting; unreadable dates sort last.
- **Safe areas:** use `Screen` from `@/tasks/tasks` (wraps `react-native-safe-area-context`). Do not use `SafeAreaView` from `react-native`.
- **Tabs import:** `Tabs` comes from `expo-router/js-tabs` (the `expo-router` export is deprecated in SDK 57).
- **Dependencies:** install native modules with `npx expo install <pkg>` so versions match the SDK.

## Dependencies

- Runtime: Expo SDK 57, React 19, React Native 0.86, Expo Router, react-native-svg, AsyncStorage, react-native-safe-area-context, react-native-screens.
- Web preview: react-native-web, react-dom.
- Dev: TypeScript.
