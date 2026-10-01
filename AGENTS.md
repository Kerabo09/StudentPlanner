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

All source lives in `src/`. Imports use the `@/` alias (= `src/`). **UI code = `src/app`, `src/components`, `src/styles`.**

- `src/app/` - Screens and routes (Expo Router; every file here is a route, so keep non-screen code out).
  - `_layout.tsx` - Root layout. Wraps the app in `AppProvider`, waits for stored data, defines the root `Stack`.
  - `(tabs)/_layout.tsx` - Bottom tabs (Tasks, Subjects) plus the floating "+" button. `(tabs)/index.tsx` (Tasks, `/`), `subjects.tsx`, `add-center.tsx` (redirects to `/assignment/new`).
  - `search.tsx` - Search and filter assignments.
  - `subject/add.tsx`, `subject/[id].tsx` - Add subject (modal) and subject detail.
  - `assignment/new.tsx`, `assignment/[id].tsx`, `assignment/edit/[id].tsx` - New (modal), detail, edit (modal).
- `src/components/` - Reusable UI, each with its `.styles.ts` beside it.
  - `common/` - `ui` (Screen, Chip, Field, ProgressBar, etc.), `Icons` (react-native-svg).
  - `assignment/` - `AssignmentForm` (shared by new/edit), `TaskCard`.
- `src/styles/` - Screen styles, mirroring `src/app/` (e.g. `app/(tabs)/index.tsx` -> `styles/(tabs)/index.styles.ts`).
- `src/state/AppContext.tsx` - All app state and persistence. Exposes `useApp()`.
- `src/constants/theme.ts` - Colours, priority colours, subject colour palette.
- `src/utils/` - `dates.ts`, `confirm.ts`, `useSafeBack.ts`, `id.ts`.
- `src/types.ts` - `Subject`, `Assignment`, `Subtask`, `Priority`.
- `app.json` - Expo config. `assets/` - icon, adaptive icon, splash, favicon.

## Conventions and gotchas

- **Styling:** React Native `StyleSheet`. Shared colours come from `src/constants/theme.ts`; do not hard-code new hex values in screens.
- **Persistence:** `AppContext` loads from AsyncStorage first and only saves once `ready` is true. Do not add a save path that runs before the initial load, or stored data will be overwritten.
- **Hooks:** Never call hooks after an early return. When a screen depends on a record that may not exist (e.g. `/assignment/edit/[id]`), render a not-found view and mount the hook-using component only when the record exists.
- **Navigation back:** use `useSafeBack()` instead of `router.back()`, so modals opened directly (deep link, web refresh) still have somewhere to go.
- **Confirmations:** use `confirmDestructive()` from `src/utils/confirm.ts`. `Alert.alert` does nothing on web.
- **Due dates** are free text. `src/utils/dates.ts` parses common formats ("Dec 5", "12/5", "2026-12-05") for sorting; unparseable dates sort last.
- **Safe areas:** use `Screen` from `@/components/common/ui` (wraps `react-native-safe-area-context`). Do not use `SafeAreaView` from `react-native`.
- **Tabs import:** `Tabs` comes from `expo-router/js-tabs` (the `expo-router` export is deprecated in SDK 57).
- **Dependencies:** install native modules with `npx expo install <pkg>` so versions match the SDK.

## Dependencies

- Runtime: Expo SDK 57, React 19, React Native 0.86, Expo Router, react-native-svg, AsyncStorage, react-native-safe-area-context, react-native-screens.
- Web preview: react-native-web, react-dom.
- Dev: TypeScript 5.9.
