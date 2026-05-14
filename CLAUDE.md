# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install          # install dependencies
npm run dev          # local dev server
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit (no build output)
npm run build        # production build
```

Run `npm run lint && npm run typecheck && npm run build` before finishing any meaningful UI change.

There are no automated tests. Browser verification is the check.

## Architecture

Single-page Next.js App Router site. The entire product is the landing page — there are no secondary routes.

### Rendering split

| File | Role |
|---|---|
| `app/page.tsx` | Server component. All HTML structure and editorial content. |
| `app/layout.tsx` | Root layout, metadata, global CSS import. |
| `app/globals.css` | Full design system — tokens, typography, layout, motion, component styles (1650 lines). |
| `app/ScrollAnimations.tsx` | `"use client"` component. GSAP + ScrollTrigger wired up in a `useEffect`. Returns `null` — purely behavioral. |
| `public/living-vault.js` | Vanilla JS loaded via `<Script strategy="afterInteractive">`. Handles crop world tabs, journey card DOM generation, nav toggle, and footer form. |

### Canvas scroll-video system (`ScrollAnimations.tsx`)

The hero section plays a 999-frame JPEG sequence on a `<canvas>` driven by scroll position. Key constants and frame ranges:

- Frames **1–43**: black lead-in (skipped on load)
- Frames **44–80** (`FIRST_FRAME`→`HOME_FRAME`): auto-played during the cinematic intro before scroll begins
- Frames **80–999** (`HOME_FRAME`→`LAST_FRAME`): driven by `ScrollTrigger` scrub over an 800 vh sticky section (`[data-video-section]`)
- Frames **156–157** (`MORPH_FROM_FRAME`/`MORPH_TO_FRAME`): cross-faded with `ctx.globalAlpha` during a blend window (frames 153–160)

Loading strategy: initial frames (44–80) load eagerly; remaining frames load in idle-callback batches after the intro completes.

The caption timeline (`gsap.timeline({ paused: true })`) maps frame ranges to `.hero-caption--N` elements. `progressForFrame(frame)` converts a frame number to a 0–1 scroll progress value.

### Intro animation (`ScrollAnimations.tsx`)

The split-panel intro (`[data-intro]`) runs on page load:
1. Brand mark and letter-by-letter name resolve (GSAP timeline, ~1.7 s)
2. After a 1700 ms lead and initial frames ready, `revealIntroPanels()` splits `.intro__panel--top` and `.intro__panel--bottom` apart over 2.45 s while the intro canvas plays frames 44–80
3. On complete: intro hidden, hero text revealed, scroll frame loop starts

A 10 s safety timer force-finishes the intro if anything stalls. `prefers-reduced-motion` skips the intro entirely.

### Crop worlds (`public/living-vault.js`)

The `crops` array (top of the file) is the single source of truth for all crop data: name, copy, image path, plate color, image scale, shadow filter, and four theme colors. `setCrop(index)` writes these to CSS custom properties on `[data-crop-stage]` and updates all `data-crop-*` slots in the DOM. `buildCrops()` generates the tab buttons dynamically; `ScrollAnimations.tsx` waits for those tabs to exist before initialising GSAP (via `waitForDynamicContent`).

### CSS design system (`app/globals.css`)

Design tokens live in `:root`. Important ones:

- `--bg`, `--ink`, `--muted`, `--subtle` — base palette (warm cream and brown)
- `--green` (#c65f3a), `--gold` (#b9792e) — accent colors (terracotta/amber, not literal green)
- `--serif` (Playfair Display), `--sans` (Inter)
- `--max` (1180 px) — max content width

The `.reveal` class is the scroll-reveal hook. GSAP sets opacity/transform on these elements and animates them in via `ScrollTrigger.batch`.

### Image assets

Active page assets (do not swap unless redirected):
- `public/images/polyhouse-loading-side-view-dark.png` — intro canvas first frame backdrop
- `public/images/polyhouse-tiltshift-hero.png` — hero image
- `public/images/macro-gallery-v2.png` — gallery section
- `public/images/dusk-polyhouse-v2.png` — final CTA

Older non-`-v2` files remain in `public/images/` but are not wired to the page. If browser caching causes stale images, prefer versioned filenames (e.g. `-v3`) over reusing the same URL.

Crop SVGs live in `public/images/crops/cartoon/`. Per-crop scale, plate color, and shadow are controlled from the `crops` array in `public/living-vault.js`, not in CSS.

The scroll video is 999 JPEG frames in `public/frames/frame_NNNN.jpg`.

## Important Constraints

**Do not restore removed sections**: GOS / Growing Operating System, mocked telemetry / live metrics, hero proof cards (`9 / Daily / Warm`), scan/rib/guide-line overlays, and portal/modal transitions for "Inside the Polyhouse" were all intentionally removed.

**Language**: use "polyhouse" / "cover" / "protected cultivation" — not "glasshouse", "greenhouse", or "conservatory" (unless the business actually uses glass structures).

**No invented data**: do not add fake sensor readings, AI claims, operating-system framing, consistency scores, or any live-dashboard language. No real telemetry is connected.

**Hero CTA links are intentionally simple**: `Explore Our Crops` → `#crops`, `Quality Standards` → `#science`. Do not reintroduce transition experiments.

**`public/living-vault.js` is intentionally plain JS** — it can be migrated to typed React client components later, but that is an explicit future step, not a cleanup opportunity.
