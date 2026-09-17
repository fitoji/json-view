# Exam Session Isolation

## Objective

Prevent an exam session from being restored against the wrong questionnaire while sharing progress for identical questionnaire content across different filenames.

## Problem

Exam persistence currently uses one global `quiz-exam-v1` localStorage key. The selected filename is not passed into the quiz, and saved answers are keyed only by question ID. A different questionnaire can therefore resume another questionnaire's answers.

## Scope

- Create a deterministic identity from normalized questionnaire content.
- Propagate that identity from file selection to exam mode.
- Store and restore sessions under an identity-qualified v2 key.
- Validate session shape and reject incompatible, empty, or duplicate-ID questionnaires.
- Migrate the legacy v1 session only when its stored questions exactly match the active questionnaire.
- Add regression tests for isolation and migration behavior.

## Constraints

- Identical normalized content must share progress even when filenames differ.
- Changed questionnaire content must not restore the old session.
- Do not silently attach an unverified legacy session to the current questionnaire.
- Preserve existing practice mode behavior.
- Keep localStorage as the persistence mechanism.

## Tasks

- [x] EXAM-001 Define and test canonical questionnaire normalization and identity generation.
- [x] EXAM-002 Propagate questionnaire identity through file viewer and quiz routing.
- [x] EXAM-003 Implement v2 session loading, validation, saving, clearing, and exact-match v1 migration.
- [x] EXAM-004 Add tests for identical content, changed content, renamed files, malformed sessions, duplicate IDs, empty data, and legacy migration.
- [x] EXAM-005 Run `pnpm test`, `pnpm build`, and `git diff --check`; review the final candidate.

## Acceptance Criteria

- Two files with identical normalized questionnaire content share one exam session.
- A renamed file with identical content resumes the same session.
- Any content change prevents restoring the old session.
- Legacy `quiz-exam-v1` migrates only on exact questionnaire-content equality.
- Invalid session data cannot crash exam rendering or restore answers.
- Existing tests and production build pass.

## Verification

- `pnpm test`
- `pnpm build`
- `git diff --check`

## Progress

- Status: complete
- Evidence: `src/helpers/examSession.mjs` provides canonical normalization, deterministic identity, questionnaire/session validation, and conservative v1 migration checks. Identity is propagated through Landing, FileViewer, Test, and ExamScreen. Focused Vitest coverage passes for identity sharing/isolation, migration matching, malformed sessions, empty questionnaires, and duplicate IDs.
- Verification: `pnpm test`, `pnpm build`, and `git diff --check` completed successfully.
- Review: native RDD was unavailable because Gentle AI 3.0.2 exposed an external intended-untracked operation without an executable capture path. RDD was disabled at clone scope by explicit user decision; global RDD remains enabled.
