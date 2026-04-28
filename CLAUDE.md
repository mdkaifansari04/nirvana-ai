# CLAUDE.md

This file gives coding assistants a fast, accurate map of the Nirvana AI codebase.

## Project Snapshot

- Product: AI-powered mental wellness web app.
- Runtime architecture: Next.js app with internal API routes under `/api/v1/*`.
- Current source of truth: `frontend/`.
- Legacy reference: `backend/` remains in repo for rollback/reference, not primary runtime.

## Implemented Feature Areas

1. Auth and onboarding
- Clerk-based auth (`sign-in`, `sign-up`).
- Protected routes via `frontend/middleware.ts`.
- Onboarding flow at `/onboard` captures age, weight, gender, and symptoms.

2. Dashboard and analytics
- Main dashboard summary cards and activity overview.
- Journal and exercise streaks.
- Recent chat/messages section.

3. Journaling
- Journal CRUD via `/api/v1/journals`.
- Journal analytics page: streak, monthly entries, word counts, sorting.
- Rich text editing components in `frontend/components/text-editor`.

4. AI chat
- Topic/chatbot selection and chat history.
- Streaming chat responses from `POST /api/v1/chat/:chatbotId` as plain text chunks.
- Chat sessions persisted in MongoDB.

5. Micro-exercises and reports
- AI-generated CBT micro-exercises.
- Per-step AI feedback.
- Report generation and storage linked to completed exercises.
- Exercise dashboard with streak/summary and details pages.

6. Self-care lab
- Daily Uplift wellness cards (AI-generated).
- Relaxation Music Deck.
- Mindful Breathing interactive page.
- Some cards are present but marked coming soon.

7. Voice transcription
- `POST /api/v1/transribe` accepts `.wav` upload and returns transcription text via Groq Whisper.

## Tech Stack

- Framework: Next.js 15 (App Router), React 19, TypeScript.
- Auth: Clerk.
- DB: MongoDB + Mongoose.
- AI: Groq (`llama-3.3-70b-versatile`, `whisper-large-v3-turbo`).
- Validation: Joi.
- State/data: Zustand + TanStack Query + Axios/fetch.
- Package manager/runtime: Bun.

## Directory Guide

- `frontend/app/*`: pages + API route handlers.
- `frontend/app/api/v1/*`: internal API surface.
- `frontend/lib/server/*`: server foundation (db, models, services, schemas, auth, error handling).
- `frontend/data-access/*`: typed client adapters for API consumption.
- `frontend/components/*`: UI and feature components.
- `frontend/store/*`: Zustand stores.
- `docs/api-contracts/*`: contract freeze + regression checklist.
- `docs/migration/*`: migration/cutover report.
- `backend/*`: legacy Express implementation kept for reference.

## Environment Variables

Defined in `frontend/.env.example`:

- `MONGO_URL` (preferred) or `MONGO_URI` (legacy fallback)
- `GROQ_API_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (preferred) or `CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `SIGNING_SECRET`
- `PORT` (optional)

## Local Development

From repo root:

```bash
cd frontend
bun install
bun run dev
```

Primary app URL: `http://localhost:3000`

## Core Commands

Run inside `frontend/`:

```bash
# dev server
bun run dev

# production build validation
bun run build:next

# lint/format/check
bun run lint
bun run format
bun run check

# focused tests present in repo
bun test data-access/__tests__/client.test.ts lib/server/__tests__/foundation.test.ts
```

Optional parity smoke (when old backend is running):

```bash
OLD_API_BASE=http://localhost:5000 NEW_API_BASE=http://localhost:3000 bun run scripts/api-parity-smoke.ts
```

## API Contract Notes

- API base is same-origin `/api/v1`.
- Standard success envelope is typically `{ success, message, data }`.
- Error envelope is `{ success: false, message }`.
- Auth is primarily session/cookie via Clerk, with selective bearer fallback behavior in client utilities.
- Chat POST is streaming text, not JSON.
- Compatibility quirk: path is `/api/v1/transribe` (typo preserved intentionally).

## Server Design Pattern

When adding/updating APIs:

1. Validate input using Joi schemas in `frontend/lib/server/schemas/*`.
2. Keep business logic in `frontend/lib/server/services/*`.
3. Keep handlers in `frontend/app/api/v1/*/route.ts` thin.
4. Use shared response/error helpers from `frontend/lib/server/response.ts` and `frontend/lib/server/errors.ts`.
5. Use `getAuthUserId()` for protected route identity.
6. Ensure Node runtime (`export const runtime = "nodejs"`) for routes using Mongoose/fs/Groq.

## Safe Change Map

- Chat behavior: `frontend/app/dashboard/chat/page.tsx`, `frontend/data-access/chat.ts`, `frontend/lib/server/services/chat.ts`.
- Journals: `frontend/app/dashboard/journal/*`, `frontend/data-access/journal.ts`, `frontend/lib/server/services/journal.ts`.
- Exercises/reports: `frontend/app/dashboard/exercise/*`, `frontend/data-access/micro-exercises.ts`, `frontend/lib/server/services/micro-exercise.ts`.
- Wellness cards: `frontend/app/dashboard/self-care/*`, `frontend/lib/server/services/wellness-card.ts`.
- User/onboarding: `frontend/app/onboard/page.tsx`, `frontend/lib/server/services/user.ts`, `frontend/app/api/webhooks/clerk/route.ts`.

## Quality and Verification Expectations

- Prefer preserving existing response shapes/status codes unless explicitly changing contract.
- Before finishing changes, run at least:
  - `bun run build:next`
  - relevant `bun test ...` targets for touched areas.
- For API or flow changes, use `docs/api-contracts/frontend-regression-checklist.md`.

