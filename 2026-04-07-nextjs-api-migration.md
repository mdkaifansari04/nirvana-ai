# Next.js API + Mongoose Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate all backend Express APIs into the Next.js app with equivalent Mongoose behavior, preserving current frontend behavior and response contracts.

**Architecture:** Build a server layer inside `frontend` (`db`, models, validators, services), then expose equivalent `app/api/v1/*` route handlers. Cut over frontend calls only after parity checks pass, then decommission the standalone backend.

**Tech Stack:** Next.js 15 route handlers, Mongoose 8, Clerk (`@clerk/nextjs/server`), Joi validation, Groq SDK, Bun.

---

## Current API Contract To Preserve

- `GET /health`
- `POST /api/v1/transribe` (existing typo in route path must be preserved for compatibility)
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
- `GET|POST /api/v1/chat/:chatbotId` (POST streams plain text chunks)
- `GET|POST /api/v1/wellness-cards`
- `POST /api/v1/wellness-cards/generate`
- `DELETE /api/v1/wellness-cards/:id`

---

## Phase 1: Foundation + Contract Freeze

**Objective:** Prepare Next.js server-side foundation and lock response contracts before any frontend cutover.

**Files:**
- Create: `frontend/lib/server/db.ts`
- Create: `frontend/lib/server/groq.ts`
- Create: `frontend/lib/server/errors.ts`
- Create: `frontend/lib/server/response.ts`
- Create: `frontend/lib/server/auth.ts`
- Create: `frontend/lib/server/validation.ts`
- Create: `frontend/lib/server/models/*.ts`
- Create: `frontend/lib/server/schemas/*.ts`
- Create: `frontend/lib/server/services/*.ts`
- Create: `docs/api-contracts/current-backend-contract.md`

**Execution steps:**
- [ ] Extract and document response shapes/status codes from current backend controllers and frontend consumers.
- [ ] Implement singleton Mongo connection helper (`globalThis` cached Mongoose connection) for Next Node runtime.
- [ ] Port all Mongoose schemas into `frontend/lib/server/models` unchanged in field names and constraints.
- [ ] Port Joi validators into `frontend/lib/server/schemas` and shared validate helper returning sanitized payload.
- [ ] Implement shared auth helper returning `userId` from Clerk server auth and standard unauthorized error object.
- [ ] Implement shared success/error response builders to keep payload format parity (`{ success, message, data }`).
- [ ] Define service-level functions mirroring backend controller logic without HTTP concerns.
- [ ] Write migration contract doc containing endpoint-level input/output examples used as acceptance criteria.

**Verification gate:**
- [ ] Run `bunx --bun @biomejs/biome check frontend/lib/server docs/api-contracts`.
- [ ] Manually verify model names/refs match old backend model refs.
- [ ] Confirm no frontend files changed in this phase.

---

## Phase 2: Route Handler Migration (Dual Run)

**Objective:** Implement all Next.js route handlers with behavior parity while old backend still available.

**Files:**
- Create: `frontend/app/api/v1/health/route.ts`
- Create: `frontend/app/api/v1/transribe/route.ts`
- Create: `frontend/app/api/v1/users/route.ts`
- Create: `frontend/app/api/v1/users/[id]/route.ts`
- Create: `frontend/app/api/v1/chatbots/route.ts`
- Create: `frontend/app/api/v1/chatbots/[id]/route.ts`
- Create: `frontend/app/api/v1/chatbots/upload/many/route.ts`
- Create: `frontend/app/api/v1/chat/[chatbotId]/route.ts`
- Create: `frontend/app/api/v1/journals/route.ts`
- Create: `frontend/app/api/v1/journals/[journalId]/route.ts`
- Create: `frontend/app/api/v1/micro-exercises/route.ts`
- Create: `frontend/app/api/v1/micro-exercises/generate/route.ts`
- Create: `frontend/app/api/v1/micro-exercises/feedback/route.ts`
- Create: `frontend/app/api/v1/micro-exercises/[microExerciseId]/route.ts`
- Create: `frontend/app/api/v1/micro-exercises/report/[reportId]/route.ts`
- Create: `frontend/app/api/v1/wellness-cards/route.ts`
- Create: `frontend/app/api/v1/wellness-cards/generate/route.ts`
- Create: `frontend/app/api/v1/wellness-cards/[id]/route.ts`
- Create: `frontend/app/api/v1/_internal/stream.ts` (if needed for chat streaming helper)

**Execution steps:**
- [ ] Create each route with `export const runtime = 'nodejs'` where Mongoose/fs/Groq is used.
- [ ] Wire handlers to shared services and validators; preserve existing status codes/messages.
- [ ] Implement streaming response for `POST /chat/:chatbotId` using `ReadableStream` and text chunks.
- [ ] Implement `transribe` multipart parsing with `.wav` validation and temporary file handling compatibility.
- [ ] Preserve compatibility route typo (`/transribe`) and add optional alias route (`/transcribe`) if desired.
- [ ] Ensure all auth-required paths derive `userId` exactly once from shared auth helper.
- [ ] Ensure error payload shape matches frontend expectations in mutation/query hooks.
- [ ] Add simple parity smoke script to call old backend and new Next endpoints and compare key fields.

**Verification gate:**
- [ ] Run `bun run check` in `frontend`.
- [ ] Run a local smoke sequence for core flows: chatbots list, chat stream, journal CRUD, exercise generate+submit, wellness generate.
- [ ] Confirm webhook user creation path still works (temporary old path allowed until Phase 3).

---

## Phase 3: Frontend Cutover + Regression Shield

**Objective:** Move frontend API consumption to Next internal API without UI breakage.

**Files:**
- Modify: `frontend/data-access/token-interceptor.ts`
- Modify: `frontend/data-access/chat.ts`
- Modify: `frontend/data-access/chatbot.ts`
- Modify: `frontend/data-access/dashboard.ts`
- Modify: `frontend/data-access/journal.ts`
- Modify: `frontend/data-access/micro-exercises.ts`
- Modify: `frontend/data-access/user.ts`
- Modify: `frontend/data-access/wellness-card.ts`
- Modify: `frontend/app/api/webhooks/clerk/route.ts`
- Create: `frontend/data-access/client.ts` (centralized axios/fetch base config)
- Create: `docs/api-contracts/frontend-regression-checklist.md`

**Execution steps:**
- [ ] Introduce a single frontend API base (`/api/v1`) so all calls are same-origin.
- [ ] Keep all exported data-access function signatures unchanged (no component-level changes required).
- [ ] Keep `Authorization` header fallback support, but prioritize cookie/session auth for same-origin requests.
- [ ] Update webhook route to call internal service or `/api/v1/users` consistently.
- [ ] Validate chat streaming UX remains identical in `dashboard/chat` page.
- [ ] Validate onboarding user update flow remains identical.
- [ ] Validate journal and micro-exercise flows from create to detail pages.
- [ ] Execute full manual regression checklist for dashboard, self-care, exercise, journal, and onboarding pages.

**Verification gate:**
- [ ] Run `bun run check` in `frontend`.
- [ ] Run `bun run build:next` in `frontend`.
- [ ] Confirm all critical pages complete with no API/network console errors.

---

## Phase 4: Backend Decommission + Production Hardening

**Objective:** Remove standalone backend runtime dependency and finalize deployment/operational docs.

**Files:**
- Modify: `README.md`
- Modify: `frontend/README.md`
- Modify: deployment config (`vercel.json` at repo root if needed)
- Modify or archive: `backend/*` (after explicit sign-off)
- Create: `docs/migration/nextjs-api-cutover-report.md`

**Execution steps:**
- [ ] Remove dependency on standalone backend service in local/prod env configs.
- [ ] Decide archival strategy for `backend` folder (keep as reference vs remove in follow-up PR).
- [ ] Document new environment variables and runtime requirements in root/frontend README.
- [ ] Add operational notes: Mongo connection behavior, Clerk auth expectations, Groq quota/failure handling.
- [ ] Capture final endpoint matrix proving parity after cutover.
- [ ] Create rollback plan (toggle frontend API base back to old backend endpoint).
- [ ] Run final end-to-end sanity sweep before release sign-off.

**Verification gate:**
- [ ] Clean `bun run build:next`.
- [ ] Manual smoke on all protected dashboard flows.
- [ ] Cutover report written and reviewed.

---

## Risk Controls (applies to all phases)

- Keep endpoint paths, response keys, and status semantics stable during migration.
- Preserve streaming chat behavior as plain text chunks.
- Keep compatibility route `/api/v1/transribe` to avoid accidental breakage.
- Use incremental rollout: implement first, verify parity, then cut frontend over.
- Do not delete `backend/` until Phase 4 sign-off.

## Done Definition

- Frontend runs entirely against Next.js internal `/api/v1/*` handlers.
- All existing user flows work without component-level API contract changes.
- Mongoose models and Groq-powered behavior remain functionally equivalent.
- Standalone backend is no longer required for day-to-day app operation.
