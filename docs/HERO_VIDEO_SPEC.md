# Hero time-lapse — production brief

## Visual direction: cinematic CGI

This is **not** raw photoreal footage. Render as high-end **3D CGI** —
think architectural visualization, Apple product film, or modern
animated short. Photoreal but *designed*: smooth materials, controlled
lighting, volumetric atmosphere, subsurface scattering on the
polythene. Octane / Blender Cycles / Unreal Engine 5 quality.

Why CGI instead of real time-lapse footage:
- More controllable result (no weather, shake, or lens dust)
- Premium "designed" aesthetic matches the brand's quiet & precise voice
- Easier to nail the exact lighting beats
- Can render a believable polyhouse complex without filming permits

For AI generation prompts that match this direction, see
[HERO_VIDEO_PROMPTS.md](./HERO_VIDEO_PROMPTS.md).

## Concept

A locked-off exterior of a **polyhouse complex** (4–6 arched polyhouses
arranged in parallel rows), **sunrise → sunset**. No camera movement,
no cuts. The sky and light do the work. The payoff is the deepest
**golden hour** moment when the entire complex is bathed in amber
light, polythene glowing from sun penetration, long warm shadows
stretching across the field.

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

- **Locked tripod.** Heavy or sandbagged. Zero shake, zero movement
  across the full clip. If the shot drifts between frames, the canvas
  player will reveal it instantly.
- **Wide lens**: 24–35mm full-frame equivalent. Show the full complex
  plus at least 50% sky.
- **Composition**: the polyhouse complex spans the middle of the frame
  in slight perspective (rows receding into mid-distance). Horizon on
  the lower third. Sky takes the upper two-thirds — it's where most of
  the visual story happens.
- **4–6 polyhouses** in parallel rows. They can be identical, slightly
  varied in position. The viewer should immediately read "this is a
  whole operation, not one shed."
- **Foreground**: a sliver of green or soil at the bottom with crop
  rows leading into the polyhouses, for depth.
- **Manual focus, locked.** Manual white balance.

## Time arc (frame mapping)

| Frames | Moment | Light feel |
| --- | --- | --- |
| 1–40 | Pre-dawn / blue hour | Cold blue. Polyhouse complex in silhouette. Mist drifting low. |
| 40–100 | Sunrise breaking | Warm orange and magenta horizon. God-rays through mist. Polythene catches first amber light. |
| 100–180 | Mid-morning to midday | Cool whites, designed clouds, polythene gleams bright. Sharp shadows. |
| 180–260 | Afternoon | Stable warm white. Slow drift in clouds. Shadows lengthen. |
| 260–340 | **Golden hour — the brand beat** | Long warm amber shadows. Polythene roofs glow rich amber with strong subsurface scatter. The complex reads as a row of glowing vaults bathed in golden light. |
| 340–390 | Sunset hold | Sun touching the horizon, sky deepens to peach + magenta + violet edge. Polyhouses still warmly lit, final cinematic hold. |

**The deepest golden hour moment around frame 300 is the brand beat.**
That is where the closing line *"Climate-controlled. Hand-tended.
Year-round."* appears in the scroll. Every polyhouse glowing amber,
polythene translucent with subsurface light — it must say *vault* in
one frame.

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
