# Color Format Compatibility with tweakcn (hex / oklch / rgb / hsl)

Branch `themes`. Parent-owned tracker. Resume via Engram mirror `odd/color-format/tasks`.

## Why

The next work unit is the bulk port of tweakcn's 42 built-in presets. Their colour values are
**hex** for nearly all base/UI tokens, **`oklch(...)`** for the `vercel` preset, and **`hsl(...)` /
`rgba(...)` strings** for shadow tokens. json-view stores **bare HSL channel triples** (`210 40% 98%`)
and wraps them at consumption (`hsl(var(--background))`). Nothing in the current pipeline can accept a
tweakcn value: the validator rejects it at the door and the CSS wrapper would produce invalid CSS.

The user chose **option B — change the storage format** to full tweakcn parity, over option A
(normalise at the boundary and keep channels internally). Accepted input formats: hex, oklch/oklab,
rgb/rgba, hsl/hsla. CSS colour *keywords* are explicitly out of scope.

## What changes

Custom properties stop holding channel fragments and start holding **complete CSS colours**.
`--background: 0 0% 100%` becomes `--background: hsl(0 0% 100%)`, and every consumer drops its
`hsl()` wrapper. Existing presets are re-authored **mechanically** (wrap in `hsl()`), never redesigning
colours, so there is no visual change in this work unit — only the format becomes capable of hex/oklch.

## Consumer inventory (measured, not guessed)

| Surface | Sites | Change |
| --- | --- | --- |
| `src/index.css` `@theme inline` `--color-x: hsl(var(--x))` | 38 | `var(--x)` |
| `src/index.css` `:root` + `.dark` fallback blocks | ~68 values | wrap each in `hsl(...)` |
| `src/index.css` `color-mix(in srgb, hsl(var(--x)) N%, transparent)` | 3 | `color-mix(in srgb, var(--x) N%, transparent)` |
| `src/components/quiz/Test.css` `hsl(var(--x) / a)` alpha | 12 | `color-mix(in srgb, var(--x) <a*100>%, transparent)` |
| `src/components/quiz/Test.css` plain `hsl(var(--x))` | rest | `var(--x)` |
| `src/components/quiz/Test.jsx` + `src/components/FileDropZone.jsx` | 6 | `var(--x)` (or `color-mix` where alpha) |
| `contrastRatio` / `hslToRgb` / `foregroundFor` | 3 functions | rewrite over an RGB pivot |
| `isSafeThemeString` channel regex | 1 | colour grammar validator |
| `ThemeCustomizer.jsx` `<input type="color">` bridge | ~3 | parse any colour → hex for the input; store the picker's hex straight through |
| `src/theme/themePresets.js` preset token values | 168 | mechanical `hsl()` wrap |
| `ThemeProvider.jsx` | 0 | **no change** — `setProperty(name, value)` is format-agnostic |

Alpha semantics must be preserved: the old `hsl(var(--x) / 0.1)` composites in sRGB, so the
replacement is `color-mix(in srgb, ...)`, not `in oklab`.

## Persistence

- `THEME_SCHEMA_VERSION` 2 → 3. `THEME_STORAGE_KEY` `visortests-theme-v2` → `-v3`.
- Migration chain, applied in order: v1 → v2 (`overrides.font` → `overrides.sans`) → v3
  (channel triple → `hsl(<triple>)`).
- `validateThemeImport` keeps accepting v1 and v2 by running the chain; v3 is native.
- v3 must remain importable/exportable so a tweakcn value survives a round trip.

## Security posture

`validateThemeImport` consumes **user-uploaded JSON**. Storing complete colours widens the injected
string surface, so validation must be a strict grammar, not a blacklist:

- Accepted: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`, `rgb()`/`rgba()`, `hsl()`/`hsla()`, `oklch()`, `oklab()`,
  and a legacy bare channel triple (accepted **only** as a migration input, never stored).
- Numbers must be well-formed; percentages allowed where CSS allows them; alpha is a number or percentage.
- Reject anything containing `;`, `{`, `}`, `(`-nesting beyond one function call, `var(`, `url(`, `@`,
  or whitespace/control characters outside the grammar. Length cap stays `MAX_THEME_STRING_LENGTH` (128).
- The value that reaches `setProperty` must be the **normalised output** of the parser, never the raw input,
  so a stored colour string is always one we generated.

## oklch → sRGB reference math (implement exactly; do not paraphrase)

```text
h  = H * PI / 180
a  = C * cos(h) ;  b = C * sin(h)
l_ = L + 0.3963377774*a + 0.2158037573*b
m_ = L - 0.1055613458*a - 0.0638541728*b
s_ = L - 0.0894841775*a - 1.2914855480*b
l  = l_^3 ; m = m_^3 ; s = s_^3
r  =  4.0767416621*l - 3.3077115913*m + 0.2309699292*s
g  = -1.2684380046*l + 2.6097574011*m - 0.3413193965*s
b2 = -0.0041960863*l - 0.7034186147*m + 1.7076147010*s
then gamma-encode each linear channel and clamp to 0..255
```

L may arrive as a percentage (`oklch(59.1% 0.306 325.4)`); normalise to 0..1. Gamut-clipping is
acceptable — out-of-sRGB oklch colours are rare in these presets and a clipped result is intended.

## Tasks

- [ ] COLOR-001 Colour core in `src/theme/themePresets.js`: `parseThemeColor` → `{r,g,b,a}` covering
  hex / rgb / hsl / oklch / oklab, plus `normalizeThemeColor` → canonical string, `rgbToHex`,
  format-agnostic `contrastRatio`, and `foregroundFor` returning complete colours. Unit tests for every
  format and for the reject cases. Additive: nothing consumes the new path yet.
- [ ] COLOR-002 Schema v3 + migration chain + grammar validator in the same file: version bump, key bump,
  `migrateThemeState` extended to v3, `isValidThemeObject` using `isSafeThemeColor`, and stored values
  normalised on write.
- [ ] COLOR-003 Mechanical re-author of the 168 preset token values to `hsl(...)` and the `:root`/`.dark`
  fallback blocks in `src/index.css`. Appearance must not change.
- [ ] COLOR-004 Flip the consumers: 38 `@theme inline` mappings, 3 `color-mix` sites, 12 alpha sites in
  `Test.css`, remaining `hsl(var(--x))` in `Test.css`/`Test.jsx`/`FileDropZone.jsx`.
- [ ] COLOR-005 Picker bridge in `src/components/ui/ThemeCustomizer.jsx`: current colour → hex for
  `<input type="color">`, and store the picked hex without converting back to channels.
- [ ] COLOR-006 Test the guarantees that matter: v2 localStorage migrates to v3 `hsl(...)`; a v1/v2 JSON
  export still imports; an oklch override round-trips through export/import; injection cases rejected;
  `.font-mono`-style compiled-CSS check re-run to prove the font work still holds.
- [ ] COLOR-007 Independent verification (parent): `pnpm test`, `pnpm build`, compiled-CSS assertion that no
  `hsl(h s% l%)` double-wrap survives, and a visual spot check that no preset shifted appearance.

## Non-goals

- No chart / sidebar / letter-spacing / spacing tokens. The app consumes zero chart tokens today.
- No CSS colour keyword support.
- No porting of tweakcn presets — that is the next work unit and builds on this one.
- No attribution/NOTICE work yet; it belongs to the port that actually copies data.

## Acceptance

- Every existing preset renders pixel-identically to before this change (format flip only).
- `#ffffff`, `oklch(0.99 0 0)`, `rgb(255 0 0)`, `hsl(210 40% 98%)` are all storable and render.
- A tweakcn-style colour string passes validation and reaches the DOM unchanged in meaning.
- v1 and v2 persisted state and v1/v2 exports remain usable.
- No arbitrary string can reach `setProperty`.

## Evidence

Populate as tasks close. Writer self-reports are not evidence; the parent verifies.

## Evidence log (2026-09-21)

### Writer attempts
- `mub4nm0l-5-zbge` (gentle-ai-worker, COLOR-001..006): died at 60 turns with "assistant reported an error",
  but had already written index.css, the 168 preset wraps, and the consumer flips. Not trusted until read back.
- Second worker (strict-test task): replaced the stale rejection block, returned `status: partial` because it
  found a real defect in the parent-authored validator. Root cause was correct.

### Defects closed
1. **throw-null**: `parseThemeColor('hsl(210 40 98)')` threw a raw `null` via `(() => { throw null })()`.
   Now returns `null`; `contrastRatio` falls back to 1, `foregroundFor` to a default colour. No path throws.
2. **Injection passthrough**: `normalizeThemeColor` returned the raw input for any string starting with `#`
   or matching an oklch/oklab prefix, so `'#fff;} body{display:none'` reached `setProperty` verbatim.
   `normalizeThemeColor` is now the single strict gate: full parse + canonical re-emit, no passthrough branch.
3. **Lenient migration (regression introduced by the first worker)**: the v1/v2 branches of
   `validateThemeImport`/`parseThemeState` bypassed validation and sanitised invalid documents into
   acceptability, reversing HEAD's all-or-nothing guarantee. Replaced with one `resolveThemeSource` that
   validates against the document's own schema version (`isValidThemeObject` / `isValidV2ThemeObject` /
   `isValidV1ThemeObject`) and only then migrates. Removes the duplicated v2 block in the process.
4. **Dead guard (pre-existing at HEAD)**: `getThemePreset` falls back to `THEME_PRESETS[0]`, so
   `!getThemePreset(id)` never rejects an unknown `presetId`. Added `isKnownThemePreset` for validation
   only; the rendering fallback is untouched.

### Verification observed
- `pnpm test`: **36 passed (36)**, 5 files.
- `pnpm build`: clean, 241ms.
- `grep -rn "hsl(var(--" src --include=*.css --include=*.jsx --include=*.js`: **0**.
- compiled `dist/assets/index-*.css`: `--background:#fff` (minified from `hsl(0 0% 100%)`),
  `--color-background:var(--background)`, zero `hsl(hsl`.
- probes: injection -> null; unitless hsl -> null; v1 `{primary:'199 89% 40%',font:'editorial'}` ->
  `hsl(199 89% 40%)` + sans; v3 oklch preserved verbatim through import.

### Open
- COLOR-007 visual parity spot check in a browser (mechanical wrap must render identically to HEAD).
- Independent verifier running: background task `mub6cv2m-8-e1ky`.

### COLOR-004 reopened — the acceptance grep was the wrong instrument
The independent verifier (background task `mub6cv2m-8-e1ky`) returned green on 15 checks but flagged `ThemeCustomizer.jsx:124-125` as a *pre-existing,
zero-impact* latent issue. That judgement was wrong and the finding was ours:

- The lines render `` `hsl(${item.light.primary})` ``. Under HEAD, `primary` was a bare triple, so the
  wrapper was correct. After the COLOR-003 re-authoring the same field holds a complete colour, so the
  composition is now `hsl(hsl(160 84% 39%))` — invalid CSS, declaration dropped, swatch transparent.
  Unchanged code + flipped data = candidate-caused defect, not pre-existing.
- My acceptance criterion for COLOR-004 grepped `hsl(var(--`, which cannot match a JSX template-literal
  wrapper (`hsl(${`). A wrong instrument returns a false clean; the "0 consumer sites remain" claim was
  measuring the pattern I happened to search for, not the class of bug.
- Proved with jsdom: an invalid `backgroundColor` serialises to `""`, a valid one to `rgb(16, 183, 127)`,
  `oklch(...)` is preserved. That makes the regression assertable without a screenshot.

Fix: swatches use the stored colour directly. Full sweep for the remaining class found exactly these two
sites — no other `hsl(`/`rgb(`/`oklch(` template wrapper, no split/slice on colour values in components,
no `hsl(var(--` in CSS.

### Guarantee tests added (36 -> 38)
- `keeps every authored preset token a complete CSS colour` — walks all 24 presets x light/dark through
  `normalizeThemeColor`; any bare triple left in authored data fails with an `id.mode.key` listing.
- `renders preset swatches with a usable background colour` — renders ThemeCustomizer, opens the dialog,
  asserts 48 swatches and a non-empty serialised `backgroundColor` each.
- Mutation check performed: with the old wrapper the value is `""`, so the test fails on the bug. Not vacuous.

### Verification final
- `pnpm test`: 38 passed (38), 5 files. `pnpm build`: clean.
- Independent verifier verdict: no candidate-caused defect remaining other than the swatch issue above,
  which is now fixed and pinned.
- Sweep for every place the OLD format could be *constructed*:
  `grep -rE '(hsl|rgb|hsla|rgba|oklch|color-mix)\(\s*\$\{' src` excluding the parser -> 0 hits.
- Post-fix confidence rests on the parent's test run plus the mutation check; not independently re-verified.
