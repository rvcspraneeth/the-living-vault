# Hero time-lapse — generation prompts (CGI direction)

Copy-paste-ready prompts for AI image and video generators. Use these to
produce the 6.5-second hero animation described in
[HERO_VIDEO_SPEC.md](./HERO_VIDEO_SPEC.md).

**Visual direction: cinematic CGI.** Think high-end architectural
visualization, Apple product film, modern animated short. Photoreal but
*designed* — smooth materials, controlled lighting, perfect geometry,
dreamlike atmosphere. Not raw documentary photography.

## Why CGI

- More controllable than photoreal time-lapse (no weather, no dust on
  lens, no shake)
- Premium "designed" aesthetic that matches the *quiet & precise* brand
  voice
- AI generators are very strong at "Octane / Blender / Unreal" prompts
- Keyframes hold a consistent look across the day-cycle

---

## Strategy — pick one

| Strategy | How | Pros | Cons |
| --- | --- | --- | --- |
| **A. Single video gen** | One 6-8s prompt to Sora / Veo / Kling / Luma | Fastest, one shot | AI tends to drift the camera; full sunrise→night arc rarely lands |
| **B. Keyframes → image-to-video** | Generate 7 still keyframes in Midjourney / Flux, then animate between consecutive pairs in Runway / Kling / Luma | Most controllable; locked-off framing easier to enforce | More steps, requires stitching 6 short clips |
| **C. Full 3D render** | Build the scene in Blender / Cinema 4D, animate the sun and lights | Total control, exact result | Slow, needs 3D artist |

**Recommended: Strategy B.** Best balance of control and speed for CGI.

---

## Universal style header (paste into every prompt)

```
Cinematic CGI 3D render. Like a high-end architectural visualization
or Apple product film. Photoreal but designed — perfect geometry,
smooth materials, controlled lighting. Volumetric lighting, global
illumination, subsurface scattering through the polyhouse polythene.
Rendered in the quality of Octane / Blender Cycles / Unreal Engine 5.
Premium, dreamlike, but grounded. Warm earthy palette. No text, no
logos. 1920x1080, 16:9.
```

---

## Universal scene description (paste below the style header)

```
Subject: a single white arched polyhouse greenhouse on a flat farm
field. Wide-angle locked-off shot from a low tripod. Polyhouse sits
in the right third of the frame. Two-thirds sky, one-third ground.
A thin strip of green crop rows in the foreground. No other buildings,
no people, no vehicles. No camera movement at all — completely locked
tripod.
```

---

## STRATEGY B — Keyframe image prompts (CGI)

Generate these 7 stills (Midjourney v6, Flux 1.1 pro, or Imagen 3). Use
the same `--seed N` across all 7 in Midjourney so the polyhouse
geometry is identical frame to frame.

### Keyframe 1 — Pre-dawn / blue hour (frame 1)
```
Cinematic CGI 3D render of a single white arched polyhouse greenhouse
on a flat farm field, pre-dawn blue hour. Photoreal architectural-
visualization quality. Polyhouse offset right third, two-thirds sky.
Deep indigo sky turning teal at the horizon, polyhouse appears as a
matte silhouette against the gradient. Soft volumetric mist drifting
low across the field. No interior light yet. Subtle global
illumination, smooth polythene material with faint subsurface
scattering, perfect crop rows in foreground. Octane / Unreal 5
quality render. 1920x1080 16:9, locked-off low tripod composition.
No text, no people.
```

### Keyframe 2 — Sunrise (frame 50)
```
Same cinematic CGI scene, identical polyhouse position. Sun cresting
the horizon left of the polyhouse, warm orange-magenta gradient sky,
strong volumetric god-rays cutting across the field. Polythene roof
catches first warm light with believable subsurface scatter, glowing
faint amber from within the material. Mist still hugging the ground
catching the rays. Cinematic CGI render, Octane quality, designed
photoreal. 1920x1080 16:9.
```

### Keyframe 3 — Mid-morning (frame 130)
```
Same cinematic CGI scene. Bright clear morning sky, designed cumulus
clouds with rim-lit edges, cool clean daylight. Polythene roof
gleaming with controlled highlight rolloff. Sharp crisp shadows on
the ground, perfect crop rows lit evenly. Premium architectural-
visualization look, Octane / Unreal 5 quality render. 1920x1080 16:9.
```

### Keyframe 4 — Late afternoon (frame 230)
```
Same cinematic CGI scene. Afternoon sun lower in the sky, warm white
key light, sculpted soft clouds, slightly warmer tone than midday.
Crop rows casting long soft shadows, polythene catching warm
reflections with subsurface glow. Cinematic CGI render, Octane
quality. 1920x1080 16:9.
```

### Keyframe 5 — Golden hour (frame 285)
```
Same cinematic CGI scene. Deep golden hour, sun very low casting
long amber shadows across the field. Sky fading from gold near the
horizon to peach above. Polyhouse glowing rich warm amber, polythene
roof translucent with strong subsurface scattering, the structure
reads as a glowing lantern bathed in golden light. Volumetric haze
catching the low sun. Cinematic CGI render, Octane / Unreal 5
quality. 1920x1080 16:9.
```

### Keyframe 6 — Dusk, interior lights on (frame 330)
```
Same cinematic CGI scene. Deep dusk, sky gone from amber to deep
teal and pink-violet, horizon glowing dim coral. The polyhouse
interior LED grow-lights are now ON — strong warm-white and faintly
pink light pours through the polythene from inside, the polyhouse
glows like a designed lantern against the cooling sky. Strong
subsurface scattering through the polythene, soft volumetric light
spill onto the surrounding ground showing the crop rows in warm
light. Cinematic CGI render, Octane / Unreal 5 quality, designed
photoreal. 1920x1080 16:9.
```

### Keyframe 7 — Night (frame 390)
```
Same cinematic CGI scene. Full night, deep navy-black sky with faint
stars. Polyhouse glowing brightly from within with warm white and
soft pink LED grow-light, reading as a perfect lantern against the
dark. Volumetric light spills softly onto the ground showing the
crop rows in warm radiance. Subsurface scatter through the polythene
is the dominant light source in the scene. Cinematic CGI render,
Octane / Unreal 5 quality, premium architectural-visualization
aesthetic. 1920x1080 16:9.
```

**Critical tip for keyframes:** in Midjourney use
`--ar 16:9 --style raw --v 6.1 --seed N` where N is a fixed seed across
all 7. Re-roll keyframe 1 until you love it, then reuse the same seed
for keyframes 2–7 — same polyhouse and ground geometry, only the sky
and light change.

---

## STRATEGY B — Image-to-video transition prompts

Feed keyframe N as start image and keyframe N+1 as end image.
Tools that support start+end: **Runway Gen-4, Kling 2.0, Luma Ray 2.**

You need 6 transitions:

| # | Start | End | Duration |
| --- | --- | --- | --- |
| T1 | Keyframe 1 | Keyframe 2 | ~0.8s |
| T2 | Keyframe 2 | Keyframe 3 | ~1.3s |
| T3 | Keyframe 3 | Keyframe 4 | ~1.7s |
| T4 | Keyframe 4 | Keyframe 5 | ~0.9s |
| T5 | Keyframe 5 | Keyframe 6 | ~0.8s |
| T6 | Keyframe 6 | Keyframe 7 | ~1.0s |

### T1 — Pre-dawn → Sunrise *(~0.8s)*
```
Locked-off tripod time-lapse, cinematic CGI 3D render quality. No
camera movement at all — only sky and light change. Polyhouse stays
anchored in the exact same pixel position throughout. Smooth time-
lapse from blue-hour pre-dawn into sunrise breaking: the indigo sky
warms to teal, then to amber and magenta along the horizon as the
volumetric sun cresting begins, god-rays start to cut through the
mist. Mist drifts slowly across the ground catching the new light.
No zoom, no pan, no parallax. CGI cinematic render, 60fps.
```

### T2 — Sunrise → Mid-morning *(~1.3s)*
```
Locked-off tripod CGI time-lapse, zero camera movement. Polyhouse
fixed in the same frame position. Smooth transition from warm
amber-magenta sunrise to bright clear morning daylight: sky
desaturates from amber into clean blue, designed cumulus clouds
form and drift across frame, mist burns off the ground, polythene
roof shifts from amber subsurface glow to crisp white highlight.
Cinematic CGI render, Octane quality, 60fps.
```

### T3 — Mid-morning → Late afternoon *(~1.7s)*
```
Locked-off tripod CGI time-lapse. Camera absolutely static. Smooth
mid-day-to-afternoon transition: cool white morning daylight
gradually warms into a softer afternoon tone, designed clouds drift
across the sky from left to right, shadows on the ground rotate and
lengthen, polythene roof shifts from bright white to warmer cream
subsurface reflections. Polyhouse stays anchored in the same pixel
position. Cinematic CGI render, 60fps.
```

### T4 — Late afternoon → Golden hour *(~0.9s)*
```
Locked-off tripod CGI time-lapse, no camera movement. Smooth
transition into golden hour: sun drops lower, sky deepens to amber
and peach, shadows lengthen dramatically across the field, polyhouse
glows warm amber with strong subsurface scattering through the
polythene, foreground crop rows turn bright lime-green where golden
light hits them, volumetric haze appears catching the low sun.
Cinematic CGI render, 60fps.
```

### T5 — Golden hour → Dusk + interior lights on *(~0.8s)* ⭐ brand beat
```
Locked-off tripod CGI time-lapse, camera completely static. Smooth
transition from golden hour to dusk: sky cools rapidly from amber
into deep teal and pink-violet, horizon glows faint coral. As the
sky darkens, the polyhouse interior LED grow-lights ignite — first
a soft warm-white glow growing through the polythene from inside,
then brightening so the polyhouse reads as a designed lantern
against the cooling sky. Strong subsurface scattering takes over,
warm volumetric light begins to spill onto the surrounding ground.
Polyhouse stays anchored in the same pixel position. Cinematic CGI
render, 60fps.
```

### T6 — Dusk → Night *(~1.0s)*
```
Locked-off tripod CGI time-lapse, camera does not move. Smooth
transition from dusk to full night: remaining pink and teal in the
sky drain to deep navy-black, faint stars emerge, the polyhouse's
interior glow becomes the dominant light source in the frame,
volumetric warm white and pink light spills onto the ground
revealing the crop rows in soft radiance. The polyhouse reads as
a glowing lantern against pure dark. No zoom, no pan, no parallax.
Cinematic CGI render, Octane / Unreal 5 quality, 60fps.
```

### Universal camera-lock stub (paste if a transition drifts)
> Camera: completely static, locked tripod, fixed wide shot. The frame
> edges must not move at all. The polyhouse must stay anchored at the
> exact same pixel position from the first frame to the last frame.
> This is a CGI time-lapse — only the contents inside the static frame
> change (sky, light, clouds, shadows, interior glow). Treat the
> polyhouse as bolted in place.

---

## STRATEGY A — Single-shot video prompts (if you want to try one clip)

Use these on Sora 2, Veo 3, Kling 2, Luma Ray 2. Lower success rate
but fastest. Generate at 1920x1080 16:9, 6–8 seconds.

### Sora 2 / Veo 3
```
A 6.5-second cinematic CGI time-lapse from a completely locked-off
tripod. Cinematic CGI 3D render quality — like a high-end
architectural visualization or Apple product film. Photoreal but
designed: perfect geometry, smooth materials, controlled lighting,
volumetric atmosphere, subsurface scattering on polythene.

Subject: a single white arched polyhouse greenhouse on a flat farm
field, positioned in the right third of the frame. Two-thirds sky,
one-third ground. A thin strip of green crop rows in the foreground.

The shot is one continuous unbroken time-lapse from pre-dawn to
night in 6.5 seconds:

Pre-dawn blue hour with volumetric mist on the ground →
amber-magenta sunrise breaking with god-rays through the mist →
bright cool midday with designed drifting clouds and crisp shadows →
warm golden afternoon with long shadows → deep golden hour with
amber subsurface scatter on the polythene → dusk transitioning to
deep teal and pink sky, and at the dusk moment the polyhouse
interior LED grow-lights ignite and the polyhouse glows warm from
within like a designed lantern → full night with deep navy sky and
the polyhouse glowing warm against the dark.

Absolutely no camera movement — no pan, no tilt, no zoom, no
parallax. Only the sky, light, clouds, and the interior light
igniting moment change. Cinematic CGI render, Octane / Unreal 5
quality, 60fps, 1920x1080. No text, no logos, no people, no
vehicles.
```

### Kling 2 / Luma Ray 2 (concise)
```
Locked-off cinematic CGI time-lapse, 24 hours compressed to 6.5
seconds. Cinematic 3D render, Octane / Unreal 5 quality, photoreal
but designed.

Wide shot of a single white arched polyhouse in an Indian field,
right third of frame, two-thirds sky.

Time arc: pre-dawn blue hour → amber sunrise with god-rays through
mist → bright cool midday → warm afternoon → deep golden hour with
amber subsurface scatter → dusk with interior lights snapping on
around the 5-second mark → starlit night with the polyhouse glowing
warm from within like a designed lantern.

Static tripod camera, zero movement. Only sky and light animate.
CGI cinematic, warm earthy palette, no people, no text. 60fps,
1920x1080.
```

### Runway Gen-4 (most concise)
```
Cinematic CGI time-lapse, locked tripod, no camera movement. 3D-
rendered photoreal polyhouse greenhouse in the right third of a
wide farm-field shot, two-thirds sky. Sky cycles from pre-dawn
blue, to sunrise orange, to midday white, to golden hour amber, to
dusk teal-pink, to navy night. Around the dusk moment the polyhouse
interior glows warm from within, holds glowing into the night.
Octane / Unreal 5 quality. 1920x1080, 60fps, 6.5 seconds. No
people, no text, no zoom.
```

---

## Post-processing — get to 390 WebP frames

Whichever path you used, you end up with one `hero.mp4`. Convert to
the exact frame format the website expects:

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
