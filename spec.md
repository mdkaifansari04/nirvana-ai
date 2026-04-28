# Nirvana AI Specification

Last updated: 2026-04-28

## 1. Purpose

Define the product and technical specification for Nirvana AI as currently implemented in this repository.

Nirvana AI is a mental wellness web application that combines guided self-reflection, AI chat support, journaling, micro-exercises, and self-care tools.

## 2. Scope

### In scope

- Web app user flows implemented in `frontend/app/*`.
- Internal API platform implemented in `frontend/app/api/v1/*`.
- Service, model, validation, and response layers in `frontend/lib/server/*`.
- Clerk-based authentication and webhook-driven user bootstrap.
- MongoDB persistence via Mongoose.
- Groq-powered chat, exercise/report generation, and speech-to-text transcription.

### Out of scope

- Native mobile applications.
- Clinical diagnosis, medical treatment planning, or emergency intervention workflows.
- Removal of the legacy `backend/` snapshot (still kept for reference/rollback support).

## 3. Product Goals

1. Provide a private, always-available emotional support and reflection experience.
2. Increase consistency of wellness practices via low-friction daily tools.
3. Give users longitudinal visibility into journaling and exercise activity.
4. Keep API contracts stable while running fully from the Next.js app.

## 4. Primary User Flows

1. Authenticate via Clerk (`/sign-in`, `/sign-up`).
2. Complete onboarding (`/onboard`) with age, weight, gender, symptoms.
3. Land on dashboard (`/dashboard`) with summary and recent activity.
4. Use one or more core features:
   - journal creation and review,
   - AI chat with topic selection,
   - micro-exercise generation and completion,
   - self-care activities (daily uplift, music deck, mindful breathing),
   - voice transcription API use cases.

## 5. Functional Requirements

### 5.1 Authentication and Access

- Protected routes include `/onboard`, `/dashboard`, and all nested dashboard pages.
- Protected access is enforced through Clerk middleware.
- User identity for API routes is derived from Clerk server auth (`userId`).

### 5.2 User Provisioning and Metadata

- Clerk `user.created` webhook must:
  - verify Svix signature,
  - create a user record in application storage,
  - write `publicMetadata` values:
    - `userId` (internal DB id),
    - `onBoarded: false`.

### 5.3 Onboarding

- Required fields:
  - age (1-120),
  - weight (>0),
  - gender.
- Optional field:
  - symptom list.
- Successful submission updates user data and routes user to dashboard.

### 5.4 Dashboard

- Provide aggregate and recent activity views sourced from journals, micro-exercises, and chats.
- Display user-specific data only.

### 5.5 Journaling

- Support journal CRUD:
  - list user journals,
  - create journal entry,
  - view journal by id,
  - update journal by id,
  - delete journal by id.
- Show analytics including streak and monthly/word-count trends.

### 5.6 AI Chat

- User selects chatbot topic/persona.
- `POST /api/v1/chat/:chatbotId` streams response as text chunks.
- Full prompt and model reply are persisted as a chat session.
- Chat history can be fetched by chatbot id.

### 5.7 Micro-Exercises and Reports

- Generate exercise content from:
  - session goal,
  - primary emotion,
  - mental health rating.
- Request per-step AI feedback.
- Submit completed exercise payload and generate an AI report.
- Fetch exercise and report by id.
- Delete exercise by id.

### 5.8 Wellness / Self-Care

- Generate and persist wellness cards.
- Fetch and delete wellness cards.
- Self-care UI experiences:
  - Daily Uplift,
  - Relaxation Music Deck,
  - Mindful Breathing.
- Additional cards can exist with "coming soon" status.

### 5.9 Voice Transcription

- Accept `multipart/form-data` with `voice` file.
- Allowed format: `.wav`.
- Maximum file size: 40 MB.
- Return transcribed text payload.

## 6. API Contract Requirements

### 6.1 Base Path and Envelope

- API base path: `/api/v1`.
- Common success shape: `{ success: true, message, data }`.
- Common error shape: `{ success: false, message }`.

### 6.2 Compatibility Requirements

- Preserve route typo: `/api/v1/transribe` (intentional backward compatibility).
- Preserve streaming behavior for chat POST endpoint.
- Preserve mixed status/message conventions unless explicit contract migration is planned.

### 6.3 Endpoint Surface (Current)

- `GET /api/v1/health`
- `POST /api/v1/transribe`
- `GET|POST /api/v1/users`
- `GET|PUT|DELETE /api/v1/users/:id`
- `GET|POST /api/v1/chatbots`
- `PUT|DELETE /api/v1/chatbots/:id`
- `POST /api/v1/chatbots/upload/many`
- `GET|POST /api/v1/chat/:chatbotId`
- `GET|POST /api/v1/journals`
- `GET|PUT|DELETE /api/v1/journals/:journalId`
- `GET|POST /api/v1/micro-exercises`
- `POST /api/v1/micro-exercises/generate`
- `POST /api/v1/micro-exercises/feedback`
- `GET|DELETE /api/v1/micro-exercises/:microExerciseId`
- `GET /api/v1/micro-exercises/report/:reportId`
- `GET|POST /api/v1/wellness-cards`
- `POST /api/v1/wellness-cards/generate`
- `DELETE /api/v1/wellness-cards/:id`

## 7. Data and Persistence

### 7.1 Storage

- Primary database: MongoDB.
- ORM/ODM: Mongoose.
- Connection strategy: global cached singleton to prevent duplicate connections in Next.js runtime.

### 7.2 Core Entities

- User
- Chatbot
- Chat
- Journal
- MicroExercise
- Report
- WellnessCard

## 8. Architecture and Internal Design

### 8.1 Runtime Architecture

- Frontend and API are served from the same Next.js app (`frontend`).
- Data-access clients call same-origin endpoints under `/api/v1`.
- Server concerns are separated into:
  - models,
  - Joi schemas,
  - services,
  - thin route handlers.

### 8.2 External Integrations

- Clerk for auth and webhooks.
- Groq for:
  - text generation,
  - structured JSON generation,
  - speech transcription.

## 9. Security and Privacy Requirements

- All user data endpoints must enforce authenticated user identity.
- Resource access must remain user-scoped.
- Webhook events must be signature-verified before processing.
- Do not log secrets or raw credentials.

## 10. Environment Requirements

Required variables:

- `MONGO_URL` (preferred) or `MONGO_URI` fallback
- `GROQ_API_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (or `CLERK_PUBLISHABLE_KEY`)
- `CLERK_SECRET_KEY`
- `SIGNING_SECRET`

## 11. Quality Requirements

### 11.1 Build and Checks

Run from `frontend/`:

- `bun run check`
- `bun run build:next`
- `bun test data-access/__tests__/client.test.ts lib/server/__tests__/foundation.test.ts`

### 11.2 Regression Validation

- Use `docs/api-contracts/frontend-regression-checklist.md` for manual flow validation.
- Use parity smoke script when comparing against legacy backend behavior.

## 12. Known Constraints and Risks

1. Route typo `/transribe` must be retained for compatibility.
2. Response/status patterns are not fully uniform across all endpoints.
3. Current automated tests focus on foundational utilities and client-path behavior; broad E2E coverage is limited.
4. Legacy `backend/` code can cause confusion if treated as active runtime source of truth.

## 13. Future Evolution (Non-Binding)

- Expand automated integration/E2E coverage for core user flows.
- Standardize status/message envelopes in a versioned API migration.
- Decide archival/removal timeline for `backend/` after explicit sign-off.
- Add production observability and error-budget style SLO tracking.

