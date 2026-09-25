# StudyTracker

React Native app built with Expo (SDK 57) and Expo Router. It lets students track subjects, assignments and weekly progress. Data is stored on-device with AsyncStorage.

## Running the app

```bash
npm install
npm start          # then scan the QR code with Expo Go, or press i / a / w
npm run typecheck  # tsc --noEmit
```

Requires Node 22 (see `.mise.toml`). Use the latest Expo Go from the App Store / Play Store, or press `w` to preview in a browser.

## Project structure

Start with the files relevant to the task. Only follow imports or inspect other files when needed, or when a documented path is missing.

- `app/_layout.tsx` - Root layout. Wraps the app in `AppProvider`, waits for stored data, defines the root `Stack`.
- `app/(tabs)/_layout.tsx` - Bottom tabs (Tasks, Subjects, Progress) plus the floating "+" button in the centre.
- `app/(tabs)/index.tsx` - Tasks screen (the `/` route).
- `app/(tabs)/subjects.tsx`, `app/(tabs)/progress.tsx` - Subjects list and Progress dashboard.
- `app/(tabs)/add-center.tsx` - Placeholder route for the centre "+" button. It only redirects to `/assignment/new`.
- `app/search.tsx` - Search and filter assignments.
- `app/subject/add.tsx`, `app/subject/[id].tsx` - Add subject (modal) and subject detail.
- `app/assignment/new.tsx`, `app/assignment/[id].tsx`, `app/assignment/edit/[id].tsx` - New (modal), detail, and edit (modal).
- `components/` - `AssignmentForm` (shared by new/edit), `TaskCard`, `Icons` (react-native-svg), `ui` (Screen, Chip, Field, ProgressBar, etc.).
- `context/AppContext.tsx` - All app state and persistence. Exposes `useApp()`.
- `constants/theme.ts` - Colours, priority colours, subject colour palette.
- `utils/` - `dates.ts` (due-date parsing/sorting, week helpers), `confirm.ts`, `useSafeBack.ts`, `id.ts`.
- `types.ts` - `Subject`, `Assignment`, `Subtask`, `Priority`.
- `app.json` - Expo config. `assets/` - icon, adaptive icon, splash, favicon.

## Conventions and gotchas

- **Styling:** React Native `StyleSheet`. Shared colours come from `constants/theme.ts`; do not hard-code new hex values in screens.
- **Persistence:** `AppContext` loads from AsyncStorage first and only saves once `ready` is true. Do not add a save path that runs before the initial load, or stored data will be overwritten.
- **Hooks:** Never call hooks after an early return. When a screen depends on a record that may not exist (e.g. `/assignment/edit/[id]`), render a not-found view and mount the hook-using component only when the record exists.
- **Navigation back:** use `useSafeBack()` instead of `router.back()`, so modals opened directly (deep link, web refresh) still have somewhere to go.
- **Confirmations:** use `confirmDestructive()` from `utils/confirm.ts`. `Alert.alert` does nothing on web.
- **Due dates** are free text. `utils/dates.ts` parses common formats ("Dec 5", "12/5", "2026-12-05") for sorting; unparseable dates sort last.
- **Safe areas:** use `Screen` from `components/ui` (wraps `react-native-safe-area-context`). Do not use `SafeAreaView` from `react-native`.
- **Tabs import:** `Tabs` comes from `expo-router/js-tabs` (the `expo-router` export is deprecated in SDK 57).
- **Dependencies:** install native modules with `npx expo install <pkg>` so versions match the SDK.

## Dependencies

- Runtime: Expo SDK 57, React 19, React Native 0.86, Expo Router, react-native-svg, AsyncStorage, react-native-safe-area-context, react-native-screens.
- Web preview: react-native-web, react-dom.
- Dev: TypeScript 5.9.
