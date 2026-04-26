# COMMIT.md

Last updated: 2026-04-25

Canonical commit standard for this repository.

## Intent
- Prefer many small, reviewable commits over one large commit.
- Default to micro-commits that isolate one intent at a time.
- Keep commit history understandable without reading the whole PR.

## Trigger Rule
When the user says `commit`, the agent must:
1. Read this file.
2. Generate a commit batching plan from `git status --short`.
3. Execute multiple commits unless the user explicitly asks for a single commit.

## Micro-Commit Policy
- Default granularity: one meaningful file change per commit.
- Allowed grouping: 2-3 tightly coupled files in one commit only when separation would break correctness or create noise.
- Target commit count:
  - For N changed files, target approximately N commits.
  - Never collapse unrelated files into one commit.

## Batching Order
1. Contracts/config (`AGENTS.md`, `CLAUDE.md`, workflows, scripts)
2. Backend code
3. Frontend code
4. Tests
5. Documentation

## Commit Message Standard
- Use Conventional Commit style:
  - `feat:`
  - `fix:`
  - `refactor:`
  - `test:`
  - `docs:`
  - `chore:`
  - `build:`
- Subject must be imperative and specific.
- Keep subject <= 72 characters.
- Include scope when useful, example: `docs(backend): clarify mcp server startup`.

## Execution Checklist
1. Inspect changes: `git status --short` and `git diff --name-only`.
2. Build batching plan with one intent per commit.
3. Stage by explicit file path, never `git add -A` for micro-commit workflows.
4. Commit each batch with a precise message.
5. After each commit, verify `git status --short` reflects only remaining batches.
6. At the end, summarize commit list for the user.

## Guardrails
- Do not include secrets, `.env`, generated caches, or virtualenv files.
- Do not mix refactor and behavior change in the same commit.
- Do not amend old commits unless user explicitly requests it.
- If batching is ambiguous, ask once, then proceed with smallest safe split.
