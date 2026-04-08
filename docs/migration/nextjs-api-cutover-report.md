# Next.js API Cutover Report

Date: 2026-04-08
Repo branch: `dev`

## Scope

This report summarizes migration from standalone Express backend APIs to Next.js internal APIs in `frontend/app/api/v1/*` while preserving Mongoose behavior and frontend contracts.

## Phase Status

- Phase 1 (Foundation + Contract Freeze): Completed
- Phase 2 (Route Handler Migration): Completed
- Phase 3 (Frontend Cutover + Regression Shield): Completed
- Phase 4 (Backend Decommission + Hardening): In progress, docs + hardening completed; backend archival/removal intentionally deferred

## Endpoint Matrix (Current Source of Truth)

All frontend runtime calls now target same-origin Next routes:

- `GET /api/v1/health`
- `POST /api/v1/transribe`
- `GET|POST /api/v1/chatbots`
- `PUT|DELETE /api/v1/chatbots/:id`
- `POST /api/v1/chatbots/upload/many`
- `GET|POST /api/v1/users`
- `GET|PUT|DELETE /api/v1/users/:id`
- `GET|POST /api/v1/micro-exercises`
- `POST /api/v1/micro-exercises/generate`
- `POST /api/v1/micro-exercises/feedback`
- `GET|DELETE /api/v1/micro-exercises/:microExerciseId`
- `GET /api/v1/micro-exercises/report/:reportId`
- `GET|POST /api/v1/journals`
- `GET|PUT|DELETE /api/v1/journals/:journalId`
- `GET|POST /api/v1/chat/:chatbotId` (POST streams text)
- `GET|POST /api/v1/wellness-cards`
- `POST /api/v1/wellness-cards/generate`
- `DELETE /api/v1/wellness-cards/:id`

## Cutover Notes

- Data-access layer is centralized via `frontend/data-access/client.ts` and uses `/api/v1` base path.
- Authorization behavior is backward-compatible:
  - same-origin cookie/session auth is primary
  - bearer token header fallback is retained
- Clerk webhook path (`/api/webhooks/clerk`) now creates users via internal service layer (no external backend call).
- Standalone `backend/` folder is still present for rollback/reference and has not been deleted.

## Operational Requirements

Required env vars in `frontend/.env`:

- `MONGO_URL`
- `GROQ_API_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (or `CLERK_PUBLISHABLE_KEY` fallback)
- `CLERK_SECRET_KEY`
- `SIGNING_SECRET`

## Rollback Plan

If rollback is needed:

1. Revert the data-access cutover commits for files under `frontend/data-access/*`.
2. Restore previous external backend base URL usage (`NEXT_PUBLIC_HOST_URL`) in data-access modules.
3. Restore webhook route to use external `/users` endpoint (if required).
4. Restart frontend and run parity smoke script before re-enabling production traffic.

## Verification Checklist

- Build: `bun run build:next`
- Focused tests: `bun test data-access/__tests__/client.test.ts lib/server/__tests__/foundation.test.ts`
- Manual regression: `docs/api-contracts/frontend-regression-checklist.md`
- Optional parity smoke: `OLD_API_BASE=http://localhost:5000 NEW_API_BASE=http://localhost:3000 bun run scripts/api-parity-smoke.ts`
