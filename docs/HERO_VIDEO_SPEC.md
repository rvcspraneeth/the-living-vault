# Hero scroll video — production brief

## Visual direction: cinematic CGI hero shot (Terminal Industries playbook)

This is a **3D-rendered architectural / product cinematic** in the exact
visual language of Terminal Industries' hero — but with a **polyhouse
as the hero subject** instead of a truck.

Reference moodboard: TI's hero treats the truck as a premium product,
shot close-medium at sunset with the operational yard staged behind
(loading docks, stacked containers, other trucks). Subtle white dotted
path-lights signal AI-managed flow. The whole image reads as **a
serious commercial operation made cinematic.**

Render quality: Octane / Blender Cycles / Unreal Engine 5.

For AI generation prompts that match this direction, see
[HERO_VIDEO_PROMPTS.md](./HERO_VIDEO_PROMPTS.md).

## Concept

A locked-off close-cinematic shot of **a single white polyhouse as the
hero**, with the **commercial operational yard staged behind it**:
packing warehouse with multiple loading-dock bays, refrigerated trucks
backed into the docks, stacked shipping containers, internal roads
with subtle dotted white LED path-lights, additional polyhouse rows
visible further back signaling scale.

The polyhouse fills the center of the frame in side-elevation, white
arched polythene roof catching the sky's light. The yard infrastructure
sits behind it in a slight silhouette.

**Time arc: sunrise → sunset** plays out across the 6.5-second scroll.
No camera movement, no cuts. The hero polyhouse stays locked in frame
position; only the sky, light, shadows, and path-light intensity change.

The viewer should read in one frame: *this is a serious commercial
polyhouse industry — premium, intelligent, operational at scale.*

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

- **Locked-off cinematic camera.** Slight elevation: **10–15 ft above
  ground**, angled **5–10° down**, nearly level. No movement across
  the clip — only sky and light change.
- **Lens**: 28–35mm full-frame equivalent. Wide enough to include the
  polyhouse + ops yard, tight enough to keep cinematic intimacy.
- **Composition**:
  - **Hero polyhouse fills the middle ~55% of the frame**, in
    side-elevation view (we see the long side and arched profile)
  - **Operational yard sits behind** the polyhouse: packing warehouse
    with dock bays, trucks at docks, stacked shipping containers, more
    polyhouse rows further back receding to the horizon
  - **Upper third / quarter of frame** is sky
  - **Foreground** is asphalt road, crop bed, or a sliver of staged
    containers for depth
  - Strong silhouettes for the background infrastructure (it tells the
    story without competing with the hero polyhouse)
- **Mild cinematic depth of field**: hero polyhouse sharp, background
  ops yard slightly softer, foreground slightly softer. Atmospheric
  particles drift through the air.

## Visual signature elements

- **Hero polyhouse**: white arched polythene roof, semi-translucent —
  faint hint of green crops visible through the polythene. Subsurface
  scattering on the polythene at golden hour.
- **Operational yard staging behind the hero polyhouse**:
  - Long packing warehouse with multiple loading-dock bays
  - 3–4 refrigerated trucks backed into docks (white trailers)
  - Stacked shipping containers in a yard near the docks (dark
    silhouettes)
  - Additional rows of polyhouses behind/beside the warehouse,
    receding to the horizon for scale
- **Dotted white LED path-lights** along the internal roads — subtle
  during day, glowing visibly at dawn/dusk. This is the TI signature
  touch — says *intelligent managed operation, not bare-bones farm.*

## Time arc (frame mapping)

| Frames | Moment | Light feel |
| --- | --- | --- |
| 1–40 | Pre-dawn / blue hour | Cold blue-purple sky. Polyhouse and yard in silhouette. Path-lights faintly visible glowing on the roads. |
| 40–100 | Sunrise breaking | Warm orange and magenta horizon. First light catches the polyhouse polythene roof, side of the warehouse, edges of trucks. Long cool shadows stretching from the hero polyhouse and infrastructure across the yard. |
| 100–180 | Mid-morning to midday | Cool clean whites. Operation reads at peak clarity. Designed clouds drift. Path-lights almost invisible. |
| 180–260 | Afternoon | Stable warm white. Shadows starting to lengthen. The yard is at work — visible truck silhouettes at docks. |
| 260–340 | **Golden hour — the brand beat** | Long warm amber shadows across the yard. Hero polyhouse polythene glowing rich amber with subsurface scatter, warehouse and trucks rim-lit with warm light. Path-lights starting to pulse visibly. The whole operation reads as a glowing vault landscape. |
| 340–390 | Sunset hold | Sun touching horizon, sky deepens to peach + magenta + violet edge. Hero polyhouse still warmly lit, polythene saturated with deep amber subsurface. Path-lights now clearly visible. Final cinematic hold. |

**The golden hour moment around frame 300** is the brand beat — where
the closing line *"Climate-controlled. Hand-tended. Year-round."*
appears in the scroll.

## After delivery — what happens on the code side

When the new frames land in `public/frames/`:

1. They overwrite the current placeholder files (`frame_0001.webp` →
   `frame_0390.webp`).
2. Update `FIRST_FRAME = 1` and `LAST_FRAME = 390` in
   `app/ScrollAnimations.tsx` (currently 54 and 444 — pointing at the
   placeholder mid-range).
3. Smoke-test the scroll, then ship.

## WebP encoding helper

The repo includes a Node script that converts JPGs to WebP at the right
quality with progress reporting:

```
node scripts/convert-frames-webp.mjs
```
