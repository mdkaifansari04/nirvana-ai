# Current Backend API Contract Freeze

This document captures the current contract implemented by `backend/src/api/v1/*` and consumed by `frontend/data-access/*` as of 2026-04-07.

## Global conventions

- Base path: `/api/v1`
- Success envelope (most endpoints):
  - `{ success: true, message: string, data?: unknown }`
- Error envelope (middleware):
  - `{ success: false, message: string }`
- Auth:
  - Most protected endpoints rely on Clerk auth token (`Authorization: Bearer <token>`)
  - User identity is read from Clerk (`userId` / `clerkId`)

## Health

### GET `/health`
- Status: `200`
- Response:
  - `{ status: "OK", timestamp: string }`

## Users

### GET `/users`
- Status: `200`
- Response:
  - `{ success: true, message: "All User", data: User[] }`

### POST `/users`
- Validation:
  - `clerkId` string required
  - `email` string required
  - `name` string required
  - `weight` optional string
  - `gender` optional string
  - `symptom` optional string[]
  - `age` optional number
- Status: `201`
- Response:
  - `{ success: true, message: "User created.", data: User }`

### GET `/users/:id`
- `:id` is Clerk user id
- Status: `200`
- Response:
  - `{ success: true, message: "User by clerk id", data: User }`

### PUT `/users/:id`
- `:id` is Clerk user id
- Status: `200`
- Response:
  - `{ success: true, message: "User updated", data: User }`

### DELETE `/users/:id`
- `:id` is Clerk user id
- Status: `200`
- Response:
  - `{ success: true, message: "User deleted successfully" }`

## Chatbots

### GET `/chatbots`
- Status: `200`
- Response:
  - `{ success: true, message: "Chatbots fetched successfully", data: Chatbot[] }`

### POST `/chatbots`
- Validation:
  - `name` required
  - `system_prompt` required
  - `slug` required
  - `image` required
- Status: `201`
- Response:
  - `{ success: true, message: "Chatbot created successfully", data: Chatbot }`

### PUT `/chatbots/:id`
- Status: `200`
- Response:
  - `{ success: true, message: "Chatbot updated successfully", data: Chatbot }`

### DELETE `/chatbots/:id`
- Status: `200`
- Response:
  - `{ success: true, message: "Chatbot deleted successfully", data: Chatbot }`

### POST `/chatbots/upload/many`
- Body:
  - `{ chatbots: unknown[] }`
- Status: `201`
- Response:
  - `{ message: "Chatbots created successfully.", data: Chatbot[] }`

## Chat

### POST `/chat/:chatbotId`
- Validation:
  - `{ prompt: string }`
- Behavior:
  - Streams plain text chunks (`text/plain; charset=utf-8`) for model output
  - Persists a chat session with user prompt + model response
- Status: `200` stream

### GET `/chat/:chatbotId`
- Status: `200`
- Response:
  - `{ success: true, message: "Chats fetched successfully", data: Chat[] }`

## Journals

### GET `/journals`
- Status: `200`
- Response:
  - `{ success: true, message: "User Journal", data: Journal[] }`

### POST `/journals`
- Validation:
  - `title` required
  - `content` required
- Status: `200`
- Response:
  - `{ success: true, message: "Journal created", data: Journal }`

### GET `/journals/:journalId`
- Status: `200`
- Response:
  - `{ success: true, message: "Journal by id", data: Journal }`

### PUT `/journals/:journalId`
- Status: `201`
- Response:
  - `{ success: true, message: "Journal updated", data: Journal }`

### DELETE `/journals/:journalId`
- Status: `200`
- Response:
  - `{ success: true, message: "Journal deleted" }`

## Micro-exercises

### GET `/micro-exercises`
- Status: `200`
- Response:
  - `{ success: true, data: MicroExercise[] }`

### POST `/micro-exercises/generate`
- Validation:
  - `sessionGoal` required string
  - `primaryEmotion` required string
  - `mentalHealthRate` required number (1-10)
- Status: `200`
- Response:
  - `{ success: true, data: GeneratedExercise }`

### POST `/micro-exercises/feedback`
- Validation:
  - `userContext` required string
- Status: `200`
- Response:
  - `{ success: true, data: { emoji: string, message: string } }`

### POST `/micro-exercises`
- Validation:
  - full filled exercise payload (session_goal / quick_check_in / exercise_content / user_reflection)
- Status: `200`
- Response:
  - `{ success: true, data: MicroExerciseWithPopulatedReport }`

### GET `/micro-exercises/:microExerciseId`
- Status: `200`
- Response:
  - `{ success: true, data: MicroExerciseWithPopulatedReport }`

### DELETE `/micro-exercises/:microExerciseId`
- Status: `200`
- Response:
  - `{ success: true, message: "Micro exercise deleted" }`

### GET `/micro-exercises/report/:reportId`
- Status: `200`
- Response:
  - `{ success: true, message: "Report", data: Report }`

## Wellness cards

### POST `/wellness-cards`
- Body:
  - `{ category, quote, action, emoji }`
- Status: `200`
- Response:
  - `{ success: true, data: WellnessCard }`

### GET `/wellness-cards`
- Status: `200`
- Response:
  - `{ success: true, data: WellnessCard[] }`

### DELETE `/wellness-cards/:id`
- Status: `200`
- Response:
  - `{ success: true, data: "Wellness card deleted" }`

### POST `/wellness-cards/generate`
- Status: `200`
- Response:
  - `{ success: true, data: WellnessCard[] }`

## Transcribe

### POST `/transribe`
- Note: path contains typo (`transribe`) and must be preserved for compatibility.
- Content type:
  - `multipart/form-data`
- Field:
  - `voice` `.wav` file only
- Status: `200`
- Response:
  - `{ success: true, message: "Transcribed successfully", data: string }`

## Known quirks preserved intentionally

- `/transribe` typo in route path.
- Mixed status patterns (`POST /journals` returns `200`, `PUT /journals/:id` returns `201`).
- Some endpoints include `message`, some only include `data`.
- Backend middleware normalizes duplicate-key/validation/cast errors into `{ success: false, message }`.
