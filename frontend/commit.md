# Commit Instructions for OpenCode

This repository uses standardized, batched commits generated based on file changes.

## Trigger
When the user says **"commit"**, OpenCode should:
- Group changes into logical batches based on file types or purpose
- Generate appropriate commit messages for each batch
- Create commits sequentially

## Commit Message Standard
Use the following commit types:

- feat: adds a new feature
- fix: fixes a bug
- refactor: code changes that neither fix a bug nor add a feature
- chore: miscellaneous changes not affecting src/test (e.g., configs)
- perf: performance improvements
- ci: continuous integration changes
- ops: infrastructure, deployment, backups
- build: build system or dependency changes
- docs: documentation updates
- style: formatting, whitespace, lint fixes
- revert: reverts a previous commit
- test: adds or updates tests

## Message Format
<type>: short summary of why the change was made

Guidelines:
- Focus on **why**, not just what changed
- Keep it concise (1–2 sentences)
- Group related changes into a single commit
- Avoid mixing unrelated changes in one commit

## Batching Strategy
OpenCode should:
- Separate commits by intent (feature, fix, refactor, etc.)
- Avoid overly granular commits unless necessary
- Combine closely related file changes

## Reference
https://medium.com/@iambonitheuri/the-art-of-writing-meaningful-git-commit-messages-a56887a4cb49

---

This file defines how commit automation should behave in this repository.
