# Hero scroll video — generation prompts (CGI, TI-style)

Copy-paste-ready prompts for AI image and video generators. Produce
the 6.5-second hero animation described in
[HERO_VIDEO_SPEC.md](./HERO_VIDEO_SPEC.md).

**Subject: a single white arched polyhouse as the cinematic hero,
with the operational yard staged behind (packing warehouse with
loading docks, refrigerated trucks at docks, stacked shipping
containers, more polyhouse rows further back signaling scale).
Subtle white dotted LED path-lights on internal roads.**

**Visual direction: cinematic CGI 3D render in the exact language of
Terminal Industries' hero — premium architectural / product film,
sunset palette, strong silhouettes, atmospheric depth.**

**Time arc: sunrise → sunset.** Locked camera; only sky, light, and
path-light intensity change across the 6.5s scroll.

---

## Strategy — pick one

| Strategy | How | Pros | Cons |
| --- | --- | --- | --- |
| **A. Single video gen** | One 6-8s prompt to Sora / Veo / Kling / Luma | Fastest, one shot | AI tends to drift the camera and skip time-of-day beats |
| **B. Keyframes → image-to-video** | Generate 7 still keyframes (Midjourney / Flux), then animate between consecutive pairs (Runway / Kling / Luma) | Most controllable; locked-off framing easier to enforce | More steps, requires stitching 6 short clips |
| **C. Full 3D render** | Build the scene in Blender / Cinema 4D | Total control, exact result | Slow, needs 3D artist |

**Recommended: Strategy B.** Best balance of control and speed.

---

## Universal style header (paste into every prompt)

```
Cinematic CGI 3D render in the visual language of Terminal Industries'
hero — premium architectural / product film aesthetic. Photoreal but
designed: perfect geometry, smooth materials, controlled lighting,
volumetric atmosphere, subsurface scattering on the polythene,
atmospheric haze drifting through the scene. Rendered in the quality
of Octane / Blender Cycles / Unreal Engine 5. Strong cinematic
silhouettes for background infrastructure. Mild cinematic depth of
field. Warm earthy palette. No text, no logos. 1920x1080, 16:9.
```

---

## Universal scene description (paste below the style header)

```
Subject: a single white arched polyhouse greenhouse as the cinematic
hero, in side-elevation view, filling the middle ~55% of the frame.
The polyhouse has a white semi-translucent polythene roof with faint
green crops visible through it. Slight elevation locked camera (10-15
ft above ground, angled 5-10 degrees down, nearly level), 28-35mm
lens.

Staged behind the hero polyhouse: a long dark-roofed packing
warehouse with multiple loading-dock bays. 3-4 white refrigerated
trailers backed into the docks. Stacked dark shipping containers in
a yard near the docks. Additional rows of polyhouses receding into
the mid-distance behind the warehouse, signaling commercial scale.
Subtle white dotted LED path-lights along the internal roads —
visible glowing at dawn/dusk, almost invisible at midday.

Upper third of frame is sky. Foreground is asphalt internal road
with a sliver of planted greenery or staged container for depth.
Strong cinematic silhouettes for the warehouse and containers.
Atmospheric haze drifting through the scene.

No people, no vehicles other than the trucks at docks. No camera
movement at all — completely locked tripod.
```

---

## STRATEGY B — Keyframe image prompts

Generate 7 stills (Midjourney v6, Flux 1.1 pro, or Imagen 3). Use the
same `--seed N` across all 7 so the polyhouse and yard geometry stay
identical frame to frame — only the sky and light change.

### Keyframe 1 — Pre-dawn / blue hour (frame 1)
```
Cinematic CGI 3D render in the visual language of Terminal Industries'
hero. Premium architectural / product film aesthetic, photoreal but
designed, Octane / Unreal 5 quality.

Single white arched polyhouse greenhouse as the cinematic hero, side-
elevation view, filling the middle 55% of the frame. White semi-
translucent polythene roof with faint hint of green crops inside.
Staged behind: long dark packing warehouse with multiple loading-dock
bays, 3-4 white refrigerated trailers backed into the docks, stacked
dark shipping containers in a side yard, additional rows of
polyhouses receding to the horizon. Subtle white dotted LED path-
lights faintly glowing along the internal asphalt roads.

Pre-dawn blue hour: deep indigo sky turning teal at the horizon. The
whole scene in cinematic silhouette against the sky. Polyhouse and
warehouse read as dark shapes with faint rim-light. Path-lights are
the brightest visible elements in the dark scene. Soft volumetric
mist drifting low across the yard. Atmospheric haze. Mild cinematic
depth of field.

Locked camera at 10-15 ft elevation, angled 5-10 degrees down, 28-35mm
lens. 1920x1080 16:9. No people, no text, no logos.
```

### Keyframe 2 — Sunrise (frame 60)
```
Same cinematic CGI scene, identical hero polyhouse and yard staging
position. Sunrise breaking: warm orange and magenta gradient sky.
First warm light catches the top of the polyhouse polythene roof and
the upper edges of the warehouse and trucks. Long cool shadows
stretching from the hero polyhouse, warehouse, and containers across
the yard floor toward the camera. Polythene begins to glow faint
amber from within with subsurface scatter. Mist still hugging the
ground catching the rays. Path-lights still visibly glowing but
softening. Cinematic depth of field, atmospheric haze. Octane /
Unreal 5 quality. 1920x1080 16:9.
```

### Keyframe 3 — Mid-morning (frame 140)
```
Same cinematic CGI scene, identical hero polyhouse and yard staging.
Bright clear morning sky, designed cumulus clouds with rim-lit
edges, cool clean daylight. Polythene roof of the hero polyhouse
gleaming with controlled highlight rolloff, semi-translucent —
green crops faintly visible inside. Warehouse and trucks fully lit
in neutral white light, no silhouettes. Sharp crisp shadows. Path-
lights almost invisible. Mild cinematic depth of field. Premium
architectural-visualization look. 1920x1080 16:9.
```

### Keyframe 4 — Midday (frame 210)
```
Same cinematic CGI scene, identical hero polyhouse and yard staging.
High midday sun, neutral cool daylight, sculpted designed clouds,
polythene roof catching peak clean white highlight. The hero
polyhouse reads at peak clarity — crops faintly visible through the
polythene. Warehouse and trucks crisply rendered. Minimal shadows.
Cinematic depth of field. 1920x1080 16:9.
```

### Keyframe 5 — Late afternoon (frame 260)
```
Same cinematic CGI scene, identical hero polyhouse and yard staging.
Late afternoon sun lower, warm white key light, sculpted clouds,
slightly warmer tone. Long crop-row and polyhouse shadows leading
across the yard. Polythene catching warm reflections with early
subsurface glow. Side of the warehouse warming with golden tone.
Path-lights beginning to faintly register again. Cinematic depth of
field. 1920x1080 16:9.
```

### Keyframe 6 — Golden hour (frame 310) ⭐ brand beat
```
Same cinematic CGI scene, identical hero polyhouse and yard staging.
Deep golden hour: sun very low, sky fading from gold near the
horizon to peach above. Hero polyhouse glowing rich warm amber,
polythene roof translucent with strong subsurface scattering —
hundreds of square meters of polythene glowing like a warm vault.
Warehouse and trucks rim-lit with hot amber light, long warm shadows
stretching across the asphalt yard. Dotted white LED path-lights
clearly visible glowing along the internal roads. Atmospheric
volumetric haze catching the low sun. The brand-beat moment — the
entire commercial operation rendered as a glowing premium landscape.
Octane / Unreal 5 quality. 1920x1080 16:9.
```

### Keyframe 7 — Sunset (frame 390)
```
Same cinematic CGI scene, identical hero polyhouse and yard staging.
Sunset — sun touching the horizon, sky deepens to peach, magenta,
and a violet edge at the top of frame. Hero polyhouse still warmly
lit, polythene saturated with deep amber subsurface scatter, faint
hint of crops glowing inside. Warehouse and trucks silhouetted with
warm rim-light. Path-lights now clearly visible along the roads.
Atmospheric haze intensifies. Final cinematic hold — the whole
operation bathed in the last warm light of the day. Octane / Unreal
5 quality. 1920x1080 16:9.
```

**Critical tip for keyframes:** in Midjourney use
`--ar 16:9 --style raw --v 6.1 --seed N` where N is a fixed seed across
all 7. Iterate keyframe 1 until you love the composition (polyhouse
position, yard staging, perspective), then reuse the same seed for
keyframes 2–7 — same geometry, only sky and light change.

---

## STRATEGY B — Image-to-video transition prompts

Feed keyframe N as start image and keyframe N+1 as end image. Tools
that support start+end: **Runway Gen-4, Kling 2.0, Luma Ray 2.**

| # | Start | End | Duration |
| --- | --- | --- | --- |
| T1 | Keyframe 1 | Keyframe 2 | ~1.0s |
| T2 | Keyframe 2 | Keyframe 3 | ~1.3s |
| T3 | Keyframe 3 | Keyframe 4 | ~1.2s |
| T4 | Keyframe 4 | Keyframe 5 | ~0.8s |
| T5 | Keyframe 5 | Keyframe 6 | ~0.9s |
| T6 | Keyframe 6 | Keyframe 7 | ~1.3s |

### T1 — Pre-dawn → Sunrise *(~1.0s)*
```
Locked-off tripod cinematic CGI time-lapse. No camera movement at
all — only the sky and light change. The hero polyhouse, warehouse,
trucks at docks, and containers all stay anchored in the exact same
pixel position throughout. Smooth time-lapse from blue-hour pre-
dawn into sunrise breaking: indigo sky warms to teal, then to amber
and magenta along the horizon. First warm light catches the
polythene roof of the hero polyhouse and edges of the warehouse and
trucks. Long cool shadows stretch from the infrastructure across
the yard floor. Path-lights soften from glowing to faint. Mist
drifts slowly catching the new light. Cinematic CGI render, 60fps.
```

### T2 — Sunrise → Mid-morning *(~1.3s)*
```
Locked-off tripod CGI time-lapse, zero camera movement. Hero
polyhouse and yard staging fixed in the same frame position. Smooth
transition from warm amber-magenta sunrise to bright cool morning
daylight: sky desaturates from amber into clean blue, designed
clouds form and drift, mist burns off the yard, polythene roof
shifts from amber subsurface glow to crisp white highlight,
warehouse and trucks come into full neutral light. Path-lights fade
to nearly invisible. Cinematic CGI render, Octane quality, 60fps.
```

### T3 — Mid-morning → Midday *(~1.2s)*
```
Locked-off tripod CGI time-lapse. Camera absolutely static. Hero
polyhouse and yard fixed. Smooth mid-morning to midday transition:
cool morning light intensifies toward neutral high-sun, shadows
shorten and rotate, designed clouds drift, polythene roof pulls to
peak clean white highlight. The operation reads at peak clarity.
Cinematic CGI render, 60fps.
```

### T4 — Midday → Late afternoon *(~0.8s)*
```
Locked-off tripod CGI time-lapse, no camera movement. Hero polyhouse
and yard locked in frame. Smooth midday to late-afternoon transition:
light cools then warms into late-afternoon amber tones, shadows
begin to lengthen across the yard, polythene roof starts to take on
warm cream reflections with early subsurface glow, side of the
warehouse warming. Path-lights begin to register faintly again.
Cinematic CGI render, 60fps.
```

### T5 — Late afternoon → Golden hour *(~0.9s)*
```
Locked-off tripod CGI time-lapse. Camera completely static. Hero
polyhouse and yard fixed. Smooth transition into deep golden hour:
sun drops lower, sky deepens to amber and peach, shadows lengthen
dramatically across the yard. The hero polyhouse polythene glows
rich warm amber with strong subsurface scattering. Warehouse and
trucks rim-lit with hot amber. Path-lights become clearly visible
glowing along the roads. Volumetric haze appears catching the low
sun. Cinematic CGI render, 60fps.
```

### T6 — Golden hour → Sunset *(~1.3s)*
```
Locked-off tripod CGI time-lapse, camera does not move. Hero
polyhouse and yard staging stay anchored. Smooth transition from
deep golden hour to sunset: sun drops to touch the horizon, sky
deepens from gold to peach to magenta with a violet edge appearing
at the top. Shadows stretch dramatically long. Hero polyhouse
polythene saturates with deep amber subsurface scatter. Warehouse
and trucks silhouette with warm rim-light. Path-lights now clearly
glowing along the roads. Atmospheric haze intensifies. Final
cinematic settle. No zoom, no pan, no parallax. Cinematic CGI
render, Octane / Unreal 5 quality, 60fps.
```

### Universal camera-lock stub (paste if a transition drifts)
> Camera: completely static, locked tripod, fixed wide shot. The frame
> edges must not move at all. The hero polyhouse, warehouse, trucks at
> docks, and shipping containers all stay anchored at exact same pixel
> positions from the first frame to the last frame. Only sky, light,
> shadows, and path-light intensity change.

---

## STRATEGY A — Single-shot video prompts

For Sora 2, Veo 3, Kling 2, Luma Ray 2. Generate at 1920x1080 16:9,
6–8 seconds.

### Sora 2 / Veo 3
```
A 6.5-second cinematic CGI time-lapse from a completely locked-off
camera. Visual language of Terminal Industries' hero — premium
architectural / product film aesthetic. Photoreal but designed,
Octane / Unreal 5 quality.

Subject: a single white arched polyhouse greenhouse as the cinematic
hero, side-elevation view, filling the middle 55% of the frame.
White semi-translucent polythene roof with faint green crops inside.

Staged behind: long dark packing warehouse with multiple loading-
dock bays, 3-4 white refrigerated trailers backed into the docks,
stacked dark shipping containers in a side yard, additional rows of
polyhouses receding to the horizon for scale. Subtle white dotted
LED path-lights along the internal asphalt roads.

Upper third of frame is sky. Foreground is asphalt road with a
sliver of greenery or staged container. Strong cinematic
silhouettes for the background infrastructure. Atmospheric haze.
Mild cinematic depth of field. Locked camera at 10-15 ft elevation,
angled 5-10 degrees down, 28-35mm lens.

The shot is one continuous unbroken time-lapse from pre-dawn to
sunset in 6.5 seconds:

Pre-dawn blue hour with everything in silhouette and path-lights
glowing brightest → amber-magenta sunrise with first light catching
the polythene roof and long cool shadows stretching → bright cool
midday with the whole operation in peak neutral clarity → warm
afternoon with shadows lengthening → deep golden hour with the
polyhouse polythene glowing rich amber with subsurface scatter,
warehouse and trucks rim-lit, path-lights glowing visibly (brand-
beat moment) → sunset hold with sun touching horizon, sky peach-
magenta, polyhouse still warmly glowing, path-lights clearly
visible.

Absolutely no camera movement — no pan, no tilt, no zoom, no
parallax. Only sky, light, shadows, and path-light intensity change.
60fps, 1920x1080. No people other than implied truck drivers at the
docks. No text, no logos.
```

### Kling 2 / Luma Ray 2 (concise)
```
Locked-off cinematic CGI time-lapse, sunrise to sunset in 6.5
seconds. Octane / Unreal 5 quality, Terminal Industries' visual
language adapted to a polyhouse operation.

A single white arched polyhouse greenhouse as the hero, side-
elevation, middle of frame. Staged behind: packing warehouse with
loading-dock bays, refrigerated trucks at docks, stacked shipping
containers, more polyhouse rows receding to the horizon. Subtle
dotted LED path-lights on internal roads.

Time arc: pre-dawn blue hour with everything in silhouette and
path-lights glowing → amber sunrise with long cool shadows → bright
cool midday → warm afternoon → deep golden hour with polythene
glowing amber and warehouse rim-lit (brand-beat) → peach-magenta
sunset with path-lights visible.

Locked camera, zero movement. Mild cinematic depth of field. Warm
earthy palette. No people, no text. 60fps, 1920x1080.
```

### Runway Gen-4 (most concise)
```
Cinematic CGI time-lapse, locked camera, no movement. Terminal
Industries' hero language, polyhouse subject. A single white arched
polyhouse greenhouse as the hero in side-elevation, middle of frame,
with a packing warehouse + loading docks + trucks at docks + stacked
shipping containers + more polyhouse rows staged behind it. Dotted
LED path-lights on internal roads. Sky cycles from pre-dawn blue,
to amber sunrise, to bright midday, to deep golden hour with
polythene glowing amber (brand-beat), to peach-magenta sunset. 28-
35mm lens, slight elevation, 30 degrees down. Octane / Unreal 5
quality. 1920x1080, 60fps, 6.5 seconds. No text.
```

---

## Post-processing — get to 390 WebP frames

```bash
ffmpeg -i hero.mp4 \
  -vf "fps=60,scale=1920:1080:flags=lanczos" \
  -frames:v 390 \
  -compression_level 6 -quality 82 \
  public/frames/frame_%04d.webp
```

Verify:

```bash
ls public/frames/frame_*.webp | wc -l   # should print 390
```

Update `app/ScrollAnimations.tsx`:

```ts
const FIRST_FRAME = 1;
const LAST_FRAME = 390;
```

Commit, push, ship.
