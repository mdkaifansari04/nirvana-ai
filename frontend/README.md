## Nirvana AI Frontend

Next.js 15 app that now includes both UI and internal API routes (`/api/v1/*`) using Mongoose service logic in `lib/server`.

### 1) Install

```bash
bun install
```

### 2) Configure env

Create `frontend/.env` from `frontend/.env.example` and set:

- `MONGO_URL`
- `GROQ_API_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (or `CLERK_PUBLISHABLE_KEY`)
- `CLERK_SECRET_KEY`
- `SIGNING_SECRET`

### 3) Run locally

```bash
bun run dev
```

App: `http://localhost:3000`

### 4) Test/verify

```bash
# focused unit tests
bun test data-access/__tests__/client.test.ts lib/server/__tests__/foundation.test.ts

# production build validation
bun run build:next
```

### 5) Optional API parity smoke

Use this to compare old backend and new Next API quickly:

```bash
OLD_API_BASE=http://localhost:5000 NEW_API_BASE=http://localhost:3000 bun run scripts/api-parity-smoke.ts
```
