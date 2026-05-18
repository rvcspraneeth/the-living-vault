# Hero time-lapse — generation prompts

Copy-paste-ready prompts for AI image and video generators. Use these to
produce the 6.5-second hero time-lapse described in
[HERO_VIDEO_SPEC.md](./HERO_VIDEO_SPEC.md).

## Strategy — pick one

| Strategy | How | Pros | Cons |
| --- | --- | --- | --- |
| **A. Single video gen** | One 6-8s prompt to Sora / Veo / Kling / Luma | Fastest, one shot | AI tends to hold one lighting state; rare to get full sunrise→night arc |
| **B. Keyframes → image-to-video** | Generate 7 still keyframes in Midjourney / Flux, then animate between consecutive pairs in Runway or Kling | Most controllable look, locked-off framing easier to enforce | More steps, requires stitching 6 short clips |
| **C. 3D render** | Build the scene in Blender / C4D with a sun system | Total control | Slow, needs 3D skill |

**Recommended for AI: Strategy B.** It guarantees the locked-off camera
holds and the lighting hits the right beats. The video models drift the
camera too much for a single 6.5s prompt.

---

## Universal scene description (use as a header in any prompt)

```
A single white polyhouse (greenhouse with arched polythene roof) on a
flat farm field. Wide-angle locked-off shot from a low tripod. Polyhouse
sits in the right third of the frame. Two-thirds sky, one-third ground.
A thin strip of green crop rows in the foreground. No other buildings,
no people, no vehicles. No camera movement at all — completely locked
tripod. Cinematic, photoreal, 1920x1080, 16:9, golden-hour Indian
countryside, warm earthy palette, no text, no logos.
```

---

## STRATEGY B — Keyframe image prompts

Generate these 7 stills (Midjourney v6, Flux 1.1 pro, or Imagen 3). Each
locks the framing identical to the others — same polyhouse position,
same horizon line, same crop rows in foreground. Only the **sky and
light** change.

### Keyframe 1 — Pre-dawn / blue hour (maps to frame 1)
```
Cinematic photoreal wide shot of a single white arched polyhouse
greenhouse in an Indian countryside field, pre-dawn blue hour, deep
indigo sky just turning teal at the horizon, polyhouse appears as a
silhouette against the gradient sky, mist drifting low across the
field, no interior light yet, polyhouse in right third of the frame,
two-thirds sky one-third ground, locked-off low tripod composition,
strip of green crop rows in foreground, 24mm wide lens, 1920x1080
16:9, sharp, no people, no vehicles, no text.
```

### Keyframe 2 — Sunrise (frame 50)
```
Same locked-off framing as before — single white arched polyhouse in
the right third, two-thirds sky one-third ground. Sun cresting the
horizon left of the polyhouse, warm orange and magenta gradient sky,
long warm rays hitting the polythene roof making it glow amber, mist
still hugging the ground, polyhouse silhouette catching first light,
no interior light yet, cinematic photoreal, 1920x1080 16:9.
```

### Keyframe 3 — Mid-morning (frame 130)
```
Same locked-off framing — single white arched polyhouse in the right
third. Bright clear morning sky, soft cumulus clouds drifting, cool
white daylight, polythene roof gleaming bright, crisp shadows on the
ground, sharp green crop rows in foreground, photoreal landscape,
1920x1080 16:9.
```

### Keyframe 4 — Late afternoon (frame 230)
```
Same locked-off framing — single white arched polyhouse in the right
third. Late afternoon sun lower in the sky, warm white light, soft
clouds, slightly warmer tone than midday, crop rows casting long soft
shadows, polythene catching warm reflections, photoreal landscape,
1920x1080 16:9.
```

### Keyframe 5 — Golden hour (frame 285)
```
Same locked-off framing — single white arched polyhouse in the right
third. Deep golden hour, sun very low casting long amber shadows
across the field, sky fading from gold near the horizon to soft peach
above, polyhouse glowing warm amber, polythene roof reflecting golden
light, photoreal cinematic, 1920x1080 16:9.
```

### Keyframe 6 — Dusk, interior lights on (frame 330)
```
Same locked-off framing — single white arched polyhouse in the right
third. Deep dusk, sky gone from amber to deep teal and pink-violet,
horizon glowing dim coral, **interior LED grow-lights inside the
polyhouse are now ON**, polyhouse glowing warm white and faintly pink
from within, light spilling out through the polythene against the
darkening sky, the polyhouse looks like a lantern, photoreal
cinematic, 1920x1080 16:9.
```

### Keyframe 7 — Night (frame 390)
```
Same locked-off framing — single white arched polyhouse in the right
third. Full night, deep navy-black sky with faint stars, polyhouse
glowing brightly from within with warm white and pink LED grow-light,
the polyhouse reads as a warm lantern against pure dark, light spills
softly onto the surrounding ground showing the crop rows, photoreal
cinematic, 1920x1080 16:9.
```

**Critical tip for keyframes:** in Midjourney use `--ar 16:9 --style raw
--v 6.1 --seed N` where N is a fixed seed across all 7. Re-roll the
prompt parameters until keyframe 1 looks right, then reuse the same seed
for keyframes 2–7 to keep the polyhouse and ground geometry consistent.

---

## STRATEGY B — Image-to-video transition prompts

Feed keyframe N as the start image and keyframe N+1 as the end image.
Tools that support start+end frame: **Runway Gen-4 Aleph, Kling 2.0,
Luma Ray 2.**

You need 6 transitions:

| # | Start | End | Duration |
| --- | --- | --- | --- |
| T1 | Keyframe 1 (pre-dawn) | Keyframe 2 (sunrise) | ~0.8s |
| T2 | Keyframe 2 (sunrise) | Keyframe 3 (mid-morning) | ~1.3s |
| T3 | Keyframe 3 (mid-morning) | Keyframe 4 (late afternoon) | ~1.7s |
| T4 | Keyframe 4 (late afternoon) | Keyframe 5 (golden hour) | ~0.9s |
| T5 | Keyframe 5 (golden hour) | Keyframe 6 (dusk + lights on) | ~0.8s |
| T6 | Keyframe 6 (dusk) | Keyframe 7 (night) | ~1.0s |

**Universal transition prompt (use on each transition):**

```
Locked-off tripod time-lapse. No camera movement at all. The polyhouse
must stay in the exact same position in frame throughout — only the sky
and light change. Smooth time-lapse motion: clouds drift across the sky,
shadows lengthen, light shifts from start frame to end frame. No
zooming, no panning, no parallax. 60fps, cinematic photoreal.
```

After generating each clip, **trim to the durations above** and
concatenate in order:

```bash
ffmpeg -f concat -safe 0 -i clips.txt -c copy hero.mp4
```

where `clips.txt` is:
```
file 'T1.mp4'
file 'T2.mp4'
file 'T3.mp4'
file 'T4.mp4'
file 'T5.mp4'
file 'T6.mp4'
```

Then convert to 390 WebP frames:

```bash
ffmpeg -i hero.mp4 -vf "fps=60,scale=1920:1080" -q:v 82 public/frames/frame_%04d.webp
```

---

## STRATEGY A — Single-shot video prompts (if you want to try one clip)

Use these on Sora, Veo 3, Kling 2, Luma Ray 2. Lower success rate but
fastest. Generate at 1920x1080 16:9, 6–8 seconds.

### Sora 2 / Veo 3
```
A 6.5-second cinematic time-lapse from a completely locked-off tripod.
Subject: a single white arched polyhouse greenhouse on a flat Indian
farm field, positioned in the right third of the frame. Two-thirds sky,
one-third ground. A thin strip of green crop rows in the foreground.

The shot is one continuous unbroken time-lapse from pre-dawn to night
in 6.5 seconds:

Pre-dawn blue hour with mist on the ground → sunrise breaking with
warm orange sky and magenta horizon → bright cool midday with drifting
clouds → warm golden afternoon with long shadows → deep golden hour
with amber light glazing the polythene → dusk transitioning to deep
teal and pink sky, and at the dusk moment the polyhouse interior LED
grow-lights ignite and the polyhouse glows warm from within → full
night with deep navy sky and the polyhouse glowing like a warm lantern
against the dark.

Absolutely no camera movement — no pan, no tilt, no zoom, no parallax.
Only the sky, light, clouds, and the interior light igniting moment
change. Photoreal cinematic, 60fps, 1920x1080. No text, no logos, no
people, no vehicles.
```

### Kling 2 / Luma Ray 2
```
Locked-off cinematic time-lapse, 24 hours compressed to 6.5 seconds.
Wide shot of a single white arched polyhouse in an Indian field, right
third of frame, two-thirds sky.

Time arc: pre-dawn blue hour → warm orange sunrise → bright cool
midday → warm afternoon → deep golden hour → dusk with the polyhouse
interior lights snapping on around the 5-second mark → starlit night
with the polyhouse glowing warm from within like a lantern.

Static tripod camera, zero movement. Only sky and light animate.
Photoreal, 60fps, 1920x1080, cinematic color grading, no people, no
text.
```

### Runway Gen-4
```
Time-lapse, locked tripod, no camera movement. White polyhouse
greenhouse in the right third of a wide farm-field shot, two-thirds
sky. Sky cycles from pre-dawn blue, to sunrise orange, to midday
white, to golden hour amber, to dusk teal-pink, to navy night. Around
the dusk moment the polyhouse interior glows warm from within and
holds glowing into the night. Photoreal cinematic. 1920x1080, 60fps,
6.5 seconds. No people, no text, no zoom.
```

---

## Post-processing — get to 390 WebP frames

Whichever path you used, you end up with one `hero.mp4` (or similar). To
convert to the exact frame format the website expects:

```bash
# Resize / normalize to 1920x1080 60fps, then extract WebP frames
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

Then update `app/ScrollAnimations.tsx`:

```ts
const FIRST_FRAME = 1;
const LAST_FRAME = 390;
```

Commit, push, ship.
