# StudentPlannerV2

A React Native (Expo) study planner. Tasks have a subject, priority, deadline, notes, a steps checklist and a focus timer.

## What is new in V2

- Tasks tab: Overdue / Due today / Done this week tiles, overall progress bar, filter chips, sort by deadline or priority
- Smart deadline badges ("Overdue by 2 days", "Due today", "Due in 3 days")
- Task details: Mark as done, Steps checklist, Focus timer that logs study minutes to the task
- Add / Edit Task: one-tap subject chips and quick deadline buttons
- Completed tab: weekly summary, completion date and study time

## Get started

```bash
npm install
npm start
```

Scan the QR code with **Expo Go** (iOS / Android), or press `w` for a browser preview.

## Scripts

| Command | What it does |
| --- | --- |
| `npm start` | Start the Expo dev server |
| `npm run android` / `npm run ios` | Open on a device or emulator |
| `npm run web` | Run in the browser |
| `npm run typecheck` | Type-check the project |

## Building for the stores

Use [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npx eas-cli build --platform android   # or ios
```

See `AGENTS.md` for project structure and conventions.
