# Spacing + Letter-Spacing Tokens (Theme)

**Route**: delegated direct (1 writer via `general` agent — writer trigger: 5 files)
**Branch**: `themes` (2 commits ahead of `origin/themes`, unpushed: `00d8920`, `3b8b3056`)
**RDD**: off (clone_local) → ordinary checks only
**Delivery strategy**: `ask-on-risk` (default) — forecast ~150 authored lines, far under 400 → no chaining

## Objective

Add two OPTIONAL v3 theme style tokens, `spacing` and `letterSpacing`, both defaulting to no-ops
(`0.25rem` / `0em`) so every existing preset renders identically. Sliders in ThemeCustomizer with
bounded ranges. Decision source: Engram #1261 (own bounded range 0.22–0.28rem for spacing; letter-spacing yes).

## Scope / Constraints

- Schema: additive extension of the v3 overrides envelope **in place** — NO version bump to 4, NO
  storage key rename, NO new legacy chain (just built legacy pickup for -v1/-v2 in `3b8b3056`).
  Rationale: strict per-build validation retained (old v3 docs simply lack the new keys and normalize
  to `null`/default on read; new keys are optional).
- `spacing`: 0.22–0.28rem step 0.01; travels to setProperty as inline `--spacing` on `:root`
  (inline beats stylesheet) → all 173 `calc(var(--spacing)*N)` utilities respond, bounded ±12%.
- `letterSpacing`: -0.025em..0.05em step 0.005; additive offset over the tracking scale via
  `@theme inline` overrides `--tracking-tighter/-tight/-wide/-wider` → the ~10 `tracking-*` sites respond.
- Strict grammars (like `isSafeRadius`) because values travel verbatim to setProperty.
- UI copy Spanish professional (project convention). Code comments English.

## Tasks

- [x] **T-001 — Implement spacing + letterSpacing tokens** (delegated writer)
      Constants + grammars (`isSafeSpacing`, `isSafeLetterSpacing`, exported for tests),
      `isValidThemeObject` allowlist + checks (v3 only; v1/v2 untouched), `createThemeState`
      normalization to null, `getEffectiveStyleTokens` resolution with defaults; `applyTokens` +
      `syncModeTokens` set `--spacing` / `--theme-letter-spacing`; `@theme inline` additive tracking
      overrides; two sliders (Espaciado / Interletraje) after the radius slider; 4 new tests (46 total).
      **Evidence**: `pnpm test` 46/46 (incl. parent re-run); `pnpm build` clean; compiled CSS confirms
      `tracking-tight{--tw-tracking:calc(var(--theme-letter-spacing,0em) + -.025em)}` and 173
      `calc(var(--spacing)*N)` usages preserved.
- [x] **T-002 — Guard slider float precision** (parent inline, 2 lines)
      `event.target.value` from `<input type="range">` can emit float noise (e.g. `0.24000000000000002`)
      on drag; strict grammar would reject it → override silently normalizes to null. onChange now
      formats: spacing `toFixed(2)`, letterSpacing `toFixed(3)` before storing. Radius slider was safe
      only because its grammar is lax (`0\.\d+`) — documented so future strict grammars always pair
      with formatting on the UI side.
      **Evidence**: `pnpm test` 46/46 after fix.

## Verification Notes

- git status: only 5 allowed source files changed (+ pre-existing unrelated `todo.md`,
  `odd/tasks/color-format-hex-oklch.md` edits, and untracked dirs — untouched).
- Default render unchanged by construction (no-op defaults), confirmed by tests + compiled assertions.

## Close

- **Commit: PENDING user authorization** (user commits explicitly; never auto-commit). Suggested:
  `feat(themes): add bounded spacing and letter-spacing tokens`.
- No push, no PR (user decision under ordinary policy).