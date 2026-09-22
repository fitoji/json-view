# Port tweakcn Built-in Presets (25)

**Route**: delegated direct (1 writer + deterministic conversion script)
**Branch**: `themes` — RDD off → ordinary checks
**Reference**: /private/tmp/tweakcn-ref/utils/theme-presets.ts (main @ shallow clone, 25 presets)
**Delivery**: forecast ~830 authored lines (data-dominant) → split into 2 work-unit commits
(a) engine extensions + catalog additions + tests, (b) ported preset data (pure data, skimmable).
PR strategy for the whole branch to be asked at close (ask-on-risk).

## Memory correction

Roadmap said "~17 presets" — tweakcn main today has **25** (verified by key enumeration).
#1261-era count was stale.

## Mapping design (all decisions technical; no product fork)

- **id**: keep tweakcn kebab-case (`modern-minimal` …) — no collisions (ours are single words);
  validators gate stored presetId only via `isKnownThemePreset` code membership (writer must
  confirm no charset regex anywhere in the validation chain).
- **colors**: per-preset light/dark with the 23-token overlap (background…ring, kebab→camel),
  values verbatim (hex/hsl — the COLOR-001..006 flip made full-format storage possible).
  DROPPED: chart-1..5, sidebar-* (no consumers in our CSS/components). success/warning keep sharedTokens.
- **font**: presets gain OPTIONAL object form `font: { sans, serif, mono }` (existing 24 keep string).
  `getEffectiveStyleTokens` accepts both, every value validated via `isKnownThemeValue(THEME_FONTS,…)`.
  tweakcn stacks map first-name → our key: Georgia→editorial; Menlo/Courier New/ui-monospace/
  bare monospace→mono; ui-sans/system-ui/bare serif→system/editorial; "Signifier" (commercial font,
  tweakcn's own fallback is Georgia)→editorial.
- **catalog additions**: Antic (static 400), Quicksand (`wght@300..700`), Ubuntu Mono
  (`ital,wght@0,400;0,700;1,400;1,700`) — used by tweakcn presets, absent from our port.
- **letter-spacing**: presets may declare `letterSpacing` only when non-`0em`; resolution order
  `safe override ?? safe preset ?? default`; conversions: `normal`→`0em`, `0rem`→`0em`,
  `0.5px`→`0.03125em` (px/16, within bounded grammar). All 5 non-zero tweakcn values fit the bound.
- **spacing**: no tweakcn preset declares it → nothing ported.
- **shadow**: their 6-token shadow model approximated onto our 3-value allowlist:
  opacity 0 → `none`; opacity ≥ 0.9 → `crisp`; else → `soft`.
- **radius**: `light.radius` (rem strings fit `isSafeRadius`).

## Tasks

- [x] **T-001 — Engine**: font-object support in `getEffectiveStyleTokens` (back-compat for the
      24 string presets), preset-level `letterSpacing` resolution, +3 catalog families
      (THEME_FONTS + WEB_FONT_SPECS + THEME_FONT_CATEGORIES). Tests for each.
- [x] **T-002 — Data**: script-generated 25 preset entries appended to `THEME_PRESETS`
      (names = tweakcn labels; English descriptions "Ported from tweakcn …"). Script + evidence
      in /private/tmp (NOT in repo). Update any preset-count assertions (24 → 49).
- [x] **T-003 — Verify**: `pnpm test` all green, `pnpm build` clean, picker renders 49 entries,
      default theme render unchanged (existing presets untouched).

## Verification evidence

- Writer: `pnpm test` 61/61 (53 baseline + 8 new), build clean, script FAIL-LOUD empty.
- Parent spot check: `pnpm test` 61/61 re-run; node assertions — 49 presets/49 unique ids, all 25
  ported present, `modern-minimal.light.primary === '#3b82f6'` (verbatim), font object + string
  regression + preset letterSpacing + key-omission fallbacks (doom-64 radius, t3-chat font) all correct.
- Source truth discovered: tweakcn file carries **42 presets** = 25 quoted-key built-ins + 17 older
  unquoted ones; 5 of the latter collide by id with our handmade presets (catppuccin, nature,
  cyberpunk, claude, vercel). This reconciles the stale "17" and original "42" memory counts.
  Porting the 12 non-colliding extras is a candidate future unit.

## Close

- Committed as ONE work-unit commit (engine + data inseparable in one file's diff; the split was a
  size heuristic only, deferred to the PR-strategy decision).
- No push/PR (user-owned).