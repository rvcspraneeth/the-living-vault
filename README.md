# The Living Vault

Produce-forward single-page website for a protected polyhouse farming company.

This file is the working context and steering note for the project: what exists, what direction the site is taking, and what to preserve when making future changes.

## Project Intent

The site should feel like:

- warm protected agriculture
- fresh crops handled with discipline
- produce-forward, sensory, and practical
- cinematic enough to feel premium without obscuring the crop story

The site should not feel like:

- a rustic organic farm template
- a generic corporate sustainability site
- a glasshouse conservatory fantasy
- a motion-heavy demo that ignores clarity, performance, or crop credibility

## Current Stack

- Framework: Next.js App Router
- Language: TypeScript, React
- Styling: custom global CSS in `app/globals.css`
- Runtime interactions: vanilla browser script in `public/living-vault.js`
- Package manager: npm

## Commands

Install:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

## Current Site Structure

The landing page is in `app/page.tsx` and currently includes:

1. Intro / preload moment
2. Hero
3. Harvest quality / crop standard comparison
4. Growing journey
5. About us
6. Interactive crop worlds
7. Quality standards
8. Fresh harvest gallery
9. Vision section
10. Final CTA
11. Footer

There are no meaningful secondary pages right now. The landing page is the product.

## Files That Matter Most

- `app/page.tsx`
  Main page structure and all editorial content.

- `app/globals.css`
  Entire design system, layout, motion, hero grading, crop orb styling, and responsive behavior.

- `public/living-vault.js`
  Handles:
  - crop world tab interactions
  - journey card generation
  - simple reveal / nav behaviors

- `public/images/`
  Main image assets used by the landing page.

- `public/images/crops/`
  Crop art for the crop worlds section, including the current cartoon SVG set in `public/images/crops/cartoon/`.

## Current Asset Map

These are the images currently wired into the page:

- Intro first image: `public/images/polyhouse-loading-side-view-dark.png`
- Hero and intro reconstruction target: `public/images/polyhouse-tiltshift-hero.png`
- Macro gallery: `public/images/macro-gallery-v2.png`
- Final CTA: `public/images/dusk-polyhouse-v2.png`

Older non-`v2` files still exist in `public/images/`, but the page should keep using the currently wired assets unless a new direction is explicitly requested.

## Important Creative Decisions Already Made

### 1. Polyhouse, not glasshouse

The experience originally leaned too hard on "under glass" language and conservatory-style visuals.

That was corrected. The site now aims to feel like:

- translucent polyethylene or polycarbonate cover
- filtered daylight
- humidity and diffused enclosure
- steel framing and protected cultivation

Avoid reintroducing copy that suggests the company literally farms in a glasshouse unless the business actually does.

### 2. GOS section removed

A previous "Growing Operating System" / `GOS` section was removed. Do not restore it unless there is a specific reason.

### 3. Telemetry / live metrics removed

A previous mocked live polyhouse metrics section was removed because no real telemetry is connected yet.

Do not add fake sensor readings, live dashboards, AI-readiness claims, or consistency scores unless real operational data and an agreed measurement basis exist.

### 4. Inside the Polyhouse CTA is simple again

There were experiments with modal / portal / walkthrough transitions for `Inside the Polyhouse`.

Those were intentionally reverted.

Current behavior:

- `Explore the Growing World` links to `#crops`
- `Inside the Polyhouse` links to `#science`

Keep this simple unless the user explicitly asks for another transition experiment.

### 5. Crop worlds use cartoon SVG image elements now

Crop art in the orb used to be painted as CSS backgrounds, then moved through transparent PNGs, and now uses a consistent cartoon SVG set.

Current approach:

- crop art uses an image element in the orb
- per-crop scale, plate color, and shadow treatment are controlled from `public/living-vault.js`
- current crop graphics live in `public/images/crops/cartoon/`

If crop visuals are adjusted again, keep the set stylistically consistent and preserve simple transparent artwork.

### 6. Intro lockup and transformation

The intro text originally overlapped visually on load, and later experiments used a simple image fade.

Current intro uses a stacked `intro__copy` block and a CGI-style transformation:

- dark side-view polyhouse first
- greenhouse-shaped image mask
- warm glow / bloom
- camera push into the tilt-shift hero image

Do not add scan lines, rib overlays, or permanent guide-line grids back into the intro or hero unless the user specifically asks for that visual language.

### 7. Hero proof cards removed

The three hero proof cards (`9`, `Daily`, `Warm`) were removed because they cluttered the hero image and competed with the produce-forward headline. Keep the hero cleaner unless a new proof treatment is requested.

## Design / Motion Guidance

### Keep

- restrained motion
- depth through opacity, blur, and layered gradients
- premium editorial typography
- moody but readable contrast
- clean responsive layouts
- touch-friendly crop navigation

### Avoid

- popup-style hero interactions
- loud gimmick motion
- glossy glass reflection effects
- random decorative blobs
- overcomplicated navigation
- hover-only essential content

## Hero Guidance

The hero is currently tuned around the warm CGI tilt-shift polyhouse image with darker left-side text space and clean produce-forward positioning.

Relevant styles live around:

- `.hero__scene`
- `.hero__image`
- `.hero__mist`
- `.hero__light`
- `.hero::before`

The intended visual read is:

- warm cream translucent polyhouse covers
- darker readable space on the left
- restrained glassy navigation
- clean hero image without scan/rib line overlays
- fresh crops first, technology second

The JSX still contains decorative hero depth divs for animation compatibility, but `.hero__corridor`, `.hero__cover`, and `.hero__vines` are disabled so they do not draw visible line overlays.

## Content / Tone Guidance

Copy should stay:

- concise
- premium
- modern
- technically grounded
- sensory in a restrained way
- honest about what a polyhouse can and cannot guarantee

Avoid:

- cheesy eco language
- exaggerated futurism
- vague luxury fluff
- inaccurate greenhouse terminology
- fake telemetry, AI claims, invented scores, or guaranteed performance language

## Known Technical Notes

- `public/living-vault.js` is intentionally plain JS for now. It could be migrated into typed React client components later if needed.
- `Image` assets were versioned with `-v2` filenames because browsers were caching older `public` assets.
- The mocked live metrics / telemetry section was removed. Do not restore it without real data.
- Footer partnership / signup actions are placeholders.

## Recommended Next Steps

Good next improvements, in order:

1. Convert `public/living-vault.js` into typed React client components if the logic grows.
2. Replace placeholder endpoints with real partnership and newsletter flows.
3. Continue upgrading image assets with real company photography once available.
4. Add real operational data only if the farm has a reliable source and clear permission to publish it.

## Verification Standard

Before finishing meaningful UI changes, run:

```bash
npm run lint
npm run typecheck
npm run build
```

If a browser issue looks like stale images, assume caching first and prefer versioned filenames over reusing the same asset URL.
