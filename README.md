# BiblioConecta - Ready Minimal MVP

This is a minimal ready-to-run MVP for BiblioConecta built with Next.js (App Router).
It includes a small backend using Next API Routes that persists data to JSON files (for demo/MVP).

## Quick start
1. Extract the ZIP and open the project folder.
2. Install dependencies:
   ```
   npm install
   ```
3. Run development server:
   ```
   npm run dev
   ```
4. Open http://localhost:3000

## Test credentials
- email: vitoria@example.com
- password: senha123

## Notes
- Data is stored in /data/*.json. For production, migrate to a proper DB (MySQL/Postgres).
- The auth is session-token stored server-side in sessions.json and sent by client as header 'x-session-token'.
