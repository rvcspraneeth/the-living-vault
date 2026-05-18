# Hero time-lapse — production brief

## Concept

A locked-off exterior of one polyhouse, **sunrise → night**. No camera
movement, no cuts. The sky and light do the work. The payoff is the
interior glow turning on at dusk and burning warm through the polythene
against the deep-blue night sky.

This is the very first thing every visitor sees. It carries the brand line:

> A vault for living crops.
>
> Climate-controlled. Hand-tended. Year-round.

## Final output spec (must match exactly)

These values are wired into the website. Any deviation breaks the player.

| Property | Value |
| --- | --- |
| Frame count | **390 frames** (1 to 390) |
| Frame rate | **60 fps** → 6.5 seconds of content |
| Resolution | **1920 × 1080** (16:9) |
| Format | **WebP**, quality 82 |
| File names | `frame_0001.webp` to `frame_0390.webp` (4-digit zero-padded) |
| Output path | `public/frames/` (overwrites existing placeholder frames) |
| Color space | sRGB |
| Bit depth | 8-bit |

## Camera and framing

- **Locked tripod.** Heavy or sandbagged. Zero shake, zero movement across
  the full 24-hour shoot. If the shot drifts between frames, the canvas
  player will reveal it instantly.
- **Wide lens**: 24–35mm full-frame equivalent. Show the full polyhouse
  plus at least 40% sky.
- **Composition**: polyhouse offset slightly left or right (rule of
  thirds). Horizon on the lower third. Sky takes the upper two-thirds —
  it's where most of the visual story happens.
- **Hero polyhouse only.** Adjacent polyhouses can sit at the edges, but
  one polyhouse is the star.
- **Foreground**: a sliver of green or soil at the bottom for depth.
- **Manual focus, locked.** Manual white balance, locked for the daylight
  half of the shoot — let it ride through dusk into night.

## Time arc (frame mapping)

| Frames | Moment | Light feel |
| --- | --- | --- |
| 1–40 | Pre-dawn / blue hour | Cold blue. Polyhouse silhouette. No interior light yet. |
| 40–90 | Sunrise breaking | Warm orange and magenta horizon. Mist drifting if season allows. |
| 90–180 | Morning to midday | Cool whites. Sky brightens. Polythene gleams. |
| 180–260 | Afternoon | Stable warm white. Slow drift in clouds and shadow. |
| 260–310 | Golden hour | Long warm shadows. Polyhouse glows amber. |
| 310–355 | Dusk | Sky goes deep teal and pink. **Interior lights snap on around frame 330.** |
| 355–390 | Night | Black-blue sky. Polyhouse glowing warm from within — the vault. |

**The interior-light-on moment around frame 330 is the brand beat.** That is
where the closing line *"Climate-controlled. Hand-tended. Year-round."*
appears in the scroll. It must be unmistakable.

## How to capture — three paths

### Option A — Real time-lapse (recommended for authenticity)

- 24-hour continuous shoot. Single fixed DSLR or mirrorless body.
- Interval: **~221 seconds per frame** (24 × 3600 ÷ 390).
- Use an intervalometer.
- Lock focus and white balance manually. Aperture-priority for exposure
  works well; allow ISO to auto with a sensible cap so the sky and night
  range works.
- The interior polyhouse lights must be on a timer set to switch on at
  the right point in real time — roughly the time-of-day that maps to
  frame 330. Compute that based on the shoot date's sunset.
- Have a contingency for weather, lens dust, and condensation. Run a
  test at dusk before the real 24-hour shoot.

### Option B — 3D render (Blender, Cinema 4D, Octane, Redshift)

- Full control. Skydome animated through a 24-hour cycle.
- Build or source a polyhouse model with realistic polythene shader.
- Render 390 frames at 1920×1080, output WebP directly (or PNG then
  convert via the project's WebP script).
- Allow 1–2 weeks for a polished result.

### Option C — AI generation (Sora, Veo, Runway, Luma)

- Fastest path. Generate as a single 6.5-second clip then extract frames.
- Risk: AI generators may drift or wobble — the locked-off shot can
  shift between frames, which will read as jitter on the canvas player.
- Test with a 1-second sample before committing.

## After delivery — what happens on the code side

When the new frames land in `public/frames/`:

1. They overwrite the current placeholder files (`frame_0001.webp` →
   `frame_0390.webp`).
2. Update `FIRST_FRAME = 1` and `LAST_FRAME = 390` in
   `app/ScrollAnimations.tsx` (currently 54 and 444 — pointing at the
   placeholder mid-range).
3. Smoke-test the scroll, then ship.

## WebP encoding helper

The repo already includes a Node script that converts JPGs to WebP at
the right quality with progress reporting:

```
node scripts/convert-frames-webp.mjs
```

It reads JPGs from `public/frames/`, writes matching WebPs alongside,
then deletes the source JPGs. Use this if your render pipeline outputs
JPGs or PNGs and you need a quick conversion step.
