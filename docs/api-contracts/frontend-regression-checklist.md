# Frontend Regression Checklist After `/api/v1` Cutover

Use this checklist to validate frontend behavior after switching data-access calls to Next.js internal APIs.

## Test Preconditions

- `frontend` app is running with valid environment variables (`MONGO_URL`, `GROQ_API_KEY`, Clerk keys).
- User is authenticated with Clerk.
- Browser devtools network tab is open.
- Confirm requests target same-origin paths under `/api/v1/*`.

## Auth + Session

- [ ] Sign in from the landing page.
- [ ] Verify no immediate `401` errors on dashboard bootstrap requests.
- [ ] Verify session-based requests succeed without requiring a manually injected bearer token.

## Dashboard

- [ ] Open `/dashboard`.
- [ ] Verify journals load.
- [ ] Verify micro-exercises load.
- [ ] Verify chats load for first chatbot when available.
- [ ] Verify no unhandled API errors in console.

## Chat Flow

- [ ] Open `/dashboard/chat`.
- [ ] Select a chatbot topic.
- [ ] Send a prompt.
- [ ] Verify streamed text appears progressively (not only final response).
- [ ] Reload page and verify chat history still loads for selected chatbot.

## Journal Flow

- [ ] Create a new journal entry.
- [ ] Open journal details page.
- [ ] Update title/content.
- [ ] Verify updated content persists after reload.

## Micro-Exercise Flow

- [ ] Generate a micro-exercise from `/dashboard/exercise`.
- [ ] Submit completed answers.
- [ ] Request feedback.
- [ ] Open generated report and verify it renders valid report fields.

## Wellness Flow

- [ ] Trigger wellness card generation from the UI path that uses `getWellnessCard`.
- [ ] Verify at least one generated card renders.

## Onboarding + User Updates

- [ ] Complete onboarding form.
- [ ] Verify user update request succeeds and onboarding state advances.

## Clerk Webhook Path

- [ ] Create a new Clerk user (or replay `user.created` event).
- [ ] Verify webhook writes user record via internal service.
- [ ] Verify Clerk public metadata includes `userId` and `onBoarded: false`.

## Acceptance Criteria

- [ ] Every request from frontend data-access modules resolves against `/api/v1/*`.
- [ ] No critical user flow regressions across dashboard, chat, journal, exercise, and onboarding.
- [ ] No blocking API contract mismatch errors in network responses.
