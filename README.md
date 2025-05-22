# Offline-First Notes App (TypeScript + Tailwind CSS)

A Markdown-based notes app with offline support and syncing, built with React, TypeScript, Dexie.js, json-server, and Tailwind CSS.

## Setup
1. Clone the repo: `git clone <repo-url>`
2. Install dependencies: `npm install`
3. Start mock backend: `npx json-server --watch db.json --port 3001`
4. Start app: `npm run dev`
5. Open `http://localhost:5173`

## Troubleshooting
- **Unknown at rule @tailwindc**: Ensure `src/index.css` uses `@tailwind`, not `@tailwindc`.
- **Dependency errors**: Run `npm install dexie axios react-markdown lodash uuid tailwindcss postcss autoprefixer @types/lodash @types/uuid`.
- **json-server port conflict**: Use `lsof -i :3001` and `kill -9 <PID>`, or change port in `src/api/api.ts`.
- **Offline testing**: Use Chrome DevTools (Network → Offline).

## Design Decisions
- **Tailwind CSS**: Utility-first styling for a responsive, modern UI.
- **TypeScript**: Ensures type safety for `Note` and `SyncQueueItem`.
- **Dexie.js**: Simplifies IndexedDB.
- **Last-Write-Wins**: Basic conflict resolution.
- **Debounce**: Autosaves after 500ms.

## Assumptions/Limitations
- Mock API on `localhost:3001`.
- Basic conflict resolution; no manual conflict UI.
- Search is case-insensitive string matching.

## Running Tests
```bash
npm test