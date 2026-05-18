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
- Can render a believable commercial-scale polyhouse farm without
  shooting permits or aerial flight licences

For AI generation prompts that match this direction, see
[HERO_VIDEO_PROMPTS.md](./HERO_VIDEO_PROMPTS.md).

## Concept

A locked-off exterior of a **large commercial polyhouse farm** —
dozens of arched polyhouses arranged in parallel rows, stretching
deep into the mid-distance toward the horizon. **Sunrise → sunset**.
No camera movement, no cuts. The sky and light do the work. The
payoff is the deepest **golden hour** moment when the entire operation
is bathed in amber light, polythene roofs glowing in long perspective
all the way to the horizon, long warm shadows stretching across the
field.

The viewer should read in one frame: *this is a serious commercial
operation at scale.*

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
- **Wide lens**: 20–28mm full-frame equivalent. Wide enough to capture
  the scale of the operation — polyhouse rows extending toward the
  horizon.
- **Composition**: rows of polyhouses receding into the mid-distance
  with strong perspective lines. Foreground row dominates lower half,
  successive rows shrinking toward a vanishing point. Sky takes the
  upper half — it's where most of the visual story happens. Slight
  drone-height elevation (15–25 feet) so the rows read clearly without
  becoming a top-down map view.
- **Scale**: dozens of polyhouses (at least 15+ visible). The viewer
  should immediately read "industrial commercial farm operation at
  scale" — not a single shed, not a backyard cluster.
- **Foreground**: a sliver of green / soil with crop rows or service
  paths leading the eye into the polyhouse rows.
- **Manual focus, locked.** Manual white balance.

## Time arc (frame mapping)

| Frames | Moment | Light feel |
| --- | --- | --- |
| 1–40 | Pre-dawn / blue hour | Cold blue. Polyhouse farm in silhouette, rows fading into mist toward the horizon. |
| 40–100 | Sunrise breaking | Warm orange and magenta horizon. God-rays cutting between the polyhouse rows. Polythene catches first amber light along the front row. |
| 100–180 | Mid-morning to midday | Cool whites, designed clouds, polythene roofs gleaming bright across the entire operation. Sharp shadows. |
| 180–260 | Afternoon | Stable warm white. Slow drift in clouds. Shadows lengthen across the rows. |
| 260–340 | **Golden hour — the brand beat** | Long warm amber shadows. Every polythene roof glowing rich amber with subsurface scatter, all the way to the horizon. The farm reads as a glowing field of vaults. |
| 340–390 | Sunset hold | Sun touching the horizon, sky deepens to peach + magenta + violet edge. Polyhouses still warmly lit deep into the distance, final cinematic hold. |

**The deepest golden hour moment around frame 300 is the brand beat.**
That is where the closing line *"Climate-controlled. Hand-tended.
Year-round."* appears in the scroll. Hundreds of meters of polyhouse
roof glowing amber, all in subsurface light — it must say *commercial
vault of living crops at scale* in one frame.

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
