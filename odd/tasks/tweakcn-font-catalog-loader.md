# Tweakcn Font Catalog + Dynamic Loader

**Route**: delegated direct (1 writer — writer trigger: 5–6 files)
**Branch**: `themes` (4 commits ahead of `origin/themes`, unpushed)
**RDD**: off (clone_local) → ordinary checks
**Delivery**: ask-on-risk; forecast ~250 authored lines → single work unit, no chaining
**Reference**: tweakcn clone at /private/tmp/tweakcn-ref (main @ shallow, 2026-09-21) — `utils/fonts/index.ts`, `utils/fonts/google-fonts.ts`, `components/dynamic-font-loader.tsx`, `app/layout.tsx` static link

## Objective

Use fonts **like tweakcn** (user instruction): port tweakcn's font catalog (24 web families: 11+1 sans, 6 serif, 7 mono), grouped picker (sans/serif/mono), and runtime Google Fonts injector — under our hybrid decision #1260 (small static preload + dynamic loader for the rest) and our security invariant: **URLs are only ever built from the closed allowlist**, never free text.

## Key decisions

- **Keys = exact family names** (`"Inter"`, `"JetBrains Mono"`) added to `THEME_FONTS` alongside existing `system`/`editorial`/`mono` presets' stacks → exported theme JSON keeps font-name fidelity; existing 24 presets untouched (they keep using the 3 system keys).
- **Per-family css2 specs copied verbatim from tweakcn's static link** instead of replicating their `getDefaultWeights` quirk (they request 400-700 for everything; fails on static-only families like Space Mono / Architects Daughter / Libre Baskerville).
- **Fix tweakcn's dead name**: their catalog says "Source Serif Pro" but their link loads "Source Serif 4" (Pro no longer exists) — we use `Source Serif 4`. Documented deviation.
- **No schema bump**: `isKnownThemeValue(THEME_FONTS, …)` allowlists widen automatically for v1/v2/v3 validators (superset acceptance is harmless); no preset or storage-key changes.
- **Static preload = Inter only** (existing Roboto link is dead weight: no reference in src — writer verifies and removes; static Inter link carries `data-theme-font="Inter"` so the loader dedup sees it).

## Tasks

- [x] **T-001 — Font catalog + specs (themePresets.js)**: add 24 web-family entries to `THEME_FONTS` with category fallback stacks; export `THEME_FONT_CATEGORIES` (sans/serif/mono option lists incl. system key) and `WEB_FONT_SPECS` (family → css2 spec, verbatim from tweakcn link; IBM Plex Sans spec derived, absent there).
- [x] **T-002 — `src/theme/fontLoader.js` (new)**: `ensureWebFonts(keys)` — closed-allowlist only (`Object.hasOwn(WEB_FONT_SPECS, key)`; anything else no-ops), href = `…/css2?family=${spec}&display=swap`, dedup via `link[data-theme-font]` or exact href, `typeof document` guard. Port of tweakcn's `loadGoogleFont` + system-skip (ours: system keys simply have no spec).
- [x] **T-003 — ThemeProvider wiring**: `ensureWebFonts([styleTokens.sans, styleTokens.serif, styleTokens.mono])` in BOTH `applyTokens` and `syncModeTokens`.
- [x] **T-004 — Picker (ThemeCustomizer.jsx)**: each font select lists its category from `THEME_FONT_CATEGORIES` with `<optgroup>` "Sistema" (3 legacy keys, Spanish labels) / "Google" (family names verbatim — proper nouns).
- [x] **T-005 — index.html**: verify Roboto unused → remove its link; add Inter static link (same href the loader would produce, `data-theme-font="Inter"`). Preconnect already present.
- [x] **T-006 — Tests (new `fontLoader.test.jsx` + existing suite)**: injection correct+idempotent; system/unknown/hostile keys no-op (allowlist security); dedup vs static link; `createThemeState`/v3 validation preserve `'JetBrains Mono'`-style overrides; `getEffectiveStyleTokens('Inter')` → stack starts `"Inter"`; provider render injects. All prior 46 tests green.

## Acceptance

- `pnpm test` all green (46 + new); `pnpm build` clean.
- Default theme render unchanged (presets still system stacks; zero new network requests on load except Inter).
- Selecting a Google family in the picker injects exactly one css2 link and applies the stack.

## Verification evidence

- `pnpm test`: 53/53 (46 prev + 7 new), re-run by parent.
- `pnpm build`: clean (250ms).
- Deterministic cross-check (parent, node): all 25 WEB_FONT_SPECS substrings verified against tweakcn's own preload link; static Inter href === loader-built href (dedup holds); category keys ⊂ THEME_FONTS (28 keys).
- Writer deviation accepted: 25 web families (explicit lists ruled over the "24" header count); IBM Plex Sans IS in tweakcn link with the identical spec.

## Close

- Work-unit commit pending after verification: `feat(themes): port tweakcn font catalog with dynamic Google Fonts loader`
- No push/PR (ordinary policy, user-owned).