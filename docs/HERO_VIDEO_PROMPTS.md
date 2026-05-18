# Hero time-lapse — generation prompts (CGI direction)

Copy-paste-ready prompts for AI image and video generators. Use these to
produce the 6.5-second hero animation described in
[HERO_VIDEO_SPEC.md](./HERO_VIDEO_SPEC.md).

**Subject: a large commercial polyhouse farm — dozens of arched
polyhouses in parallel rows stretching toward the horizon.**

**Time arc: sunrise → sunset.** Pure daylight cycle, ending in deepest
golden hour. No night, no interior lights.

**Visual direction: cinematic CGI.** High-end architectural
visualization, Apple product film, modern animated short. Photoreal
but *designed* — smooth materials, controlled lighting, perfect
geometry, dreamlike atmosphere. Rendered at Octane / Blender Cycles /
Unreal Engine 5 quality.

---

## Strategy — pick one

| Strategy | How | Pros | Cons |
| --- | --- | --- | --- |
| **A. Single video gen** | One 6-8s prompt to Sora / Veo / Kling / Luma | Fastest, one shot | AI tends to drift the camera; sunrise→sunset arc rarely lands fully |
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
Subject: a large commercial polyhouse farm — dozens of white arched
polyhouse greenhouses (15+ visible) arranged in long parallel rows
on a vast flat farm field, with strong perspective receding deep
into the mid-distance toward the horizon. Industrial-scale
operation. Wide-angle locked-off shot from a slightly elevated low
tripod (15-25 ft drone height) so the rows read clearly without
becoming a top-down view. The farm fills the middle of the frame.
Upper half is sky, lower half is the farm with crop rows in the
immediate foreground leading the eye into the polyhouse rows. No
other buildings, no people, no vehicles. No camera movement at
all — completely locked tripod.
```

---

## STRATEGY B — Keyframe image prompts (CGI, farm, sunrise→sunset)

Generate these 7 stills (Midjourney v6, Flux 1.1 pro, or Imagen 3). Use
the same `--seed N` across all 7 in Midjourney so the polyhouse
geometry is identical frame to frame — only the sky and light change.

### Keyframe 1 — Pre-dawn / blue hour (frame 1)
```
Cinematic CGI 3D render of a large commercial polyhouse farm —
dozens of white arched polyhouse greenhouses (15+ visible) in long
parallel rows on a vast flat farm field, strong perspective
receding deep toward the horizon. Pre-dawn blue hour. Photoreal
architectural-visualization quality. Upper half of frame is sky.
Deep indigo sky turning teal at the horizon. The polyhouses appear
as long parallel matte silhouettes against the gradient, the
furthest rows fading into mist. Soft volumetric mist drifting low
across the field between the rows. No interior light. Subtle
global illumination, smooth polythene material with faint
subsurface scattering, crop rows in foreground leading the eye
into the farm. Slightly elevated locked-off camera at 15-25 ft
drone height. Octane / Unreal 5 quality. 1920x1080 16:9.
```

### Keyframe 2 — Sunrise (frame 60)
```
Same cinematic CGI scene, identical large commercial polyhouse
farm position — dozens of polyhouse rows receding to the horizon.
Sun cresting the horizon, warm orange-magenta gradient sky, strong
volumetric god-rays cutting across the field between the long
polyhouse rows. The front-row polythene roofs catch first warm
light with believable subsurface scatter, glowing faint amber from
within the material; the warm light progresses row by row into the
distance. Mist still hugging the ground between the rows catching
the rays. Cinematic CGI render, Octane quality, designed photoreal.
1920x1080 16:9.
```

### Keyframe 3 — Mid-morning (frame 140)
```
Same cinematic CGI scene — large commercial polyhouse farm, dozens
of rows receding to the horizon. Bright clear morning sky, designed
cumulus clouds with rim-lit edges, cool clean daylight. Every
polythene roof gleaming with controlled highlight rolloff all the
way into the distance. Sharp crisp shadows on the ground between
the rows. Crop rows in foreground evenly lit. Premium architectural-
visualization look, Octane / Unreal 5 quality. 1920x1080 16:9.
```

### Keyframe 4 — Midday (frame 210)
```
Same cinematic CGI scene — commercial polyhouse farm with rows
receding to the horizon. High midday sun, neutral cool daylight,
designed sculpted clouds, polythene roofs catching clean white
highlights across the entire operation. Minimal shadows. The farm
reads at peak clarity — every polyhouse crisply rendered all the
way into the distance. Cinematic CGI render, Octane quality.
1920x1080 16:9.
```

### Keyframe 5 — Late afternoon (frame 260)
```
Same cinematic CGI scene — commercial polyhouse farm receding to
the horizon. Late afternoon sun lower in the sky, warm white key
light, sculpted clouds, slightly warmer tone. Long crop-row
shadows leading toward the polyhouses, polythene catching warm
reflections with growing subsurface glow. The amber warmth is just
beginning to spread across the front rows. Cinematic CGI render,
Octane quality. 1920x1080 16:9.
```

### Keyframe 6 — Golden hour (frame 310) ⭐ brand beat
```
Same cinematic CGI scene — large commercial polyhouse farm with
dozens of rows receding to the horizon. Deep golden hour, sun very
low casting long amber shadows across the field between the
polyhouse rows. Sky fading from gold near the horizon to peach
above. Every polyhouse in the operation glowing rich warm amber,
polythene roofs translucent with strong subsurface scattering all
the way into the distance — hundreds of meters of glowing polythene
reading as a vast field of warm vaults. Volumetric haze catching
the low sun between the rows. The brand-beat moment — an entire
commercial farm rendered as a glowing landscape of crops.
Cinematic CGI render, Octane / Unreal 5 quality. 1920x1080 16:9.
```

### Keyframe 7 — Sunset (frame 390)
```
Same cinematic CGI scene — commercial polyhouse farm with rows
receding to the horizon. Sunset — sun touching the horizon, sky
deepens to peach, magenta, and a violet edge at the top. The whole
operation still warmly lit, polythene glowing with deep amber
subsurface scatter into the distance. Long warm shadows from the
front-row polyhouses stretching across the foreground. Atmospheric
volumetric haze. Final cinematic hold — the farm bathed in the
last warm light of the day. Cinematic CGI render, Octane / Unreal
5 quality. 1920x1080 16:9.
```

**Critical tip for keyframes:** in Midjourney use
`--ar 16:9 --style raw --v 6.1 --seed N` where N is a fixed seed
across all 7. Re-roll keyframe 1 until you love the farm layout
and angle, then reuse the same seed for keyframes 2–7 — same
polyhouse geometry, only the sky and light change.

---

## STRATEGY B — Image-to-video transition prompts

Feed keyframe N as start image and keyframe N+1 as end image. Tools
that support start+end: **Runway Gen-4, Kling 2.0, Luma Ray 2.**

You need 6 transitions:

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
all — only sky and light change. Polyhouse farm stays anchored
in the exact same pixel position throughout. Smooth time-lapse
from blue-hour pre-dawn into sunrise breaking: the indigo sky
warms to teal, then to amber and magenta along the horizon as the
sun cresting begins, volumetric god-rays start to cut through the
mist between the polyhouse rows. Mist drifts slowly across the
ground catching the new light. No zoom, no pan, no parallax.
Cinematic CGI render, 60fps.
```

### T2 — Sunrise → Mid-morning *(~1.3s)*
```
Locked-off tripod CGI time-lapse, zero camera movement. Polyhouse
farm fixed in the same frame position. Smooth transition from
warm amber-magenta sunrise to bright clear morning daylight: sky
desaturates from amber into clean blue, designed cumulus clouds
form and drift across frame, mist burns off the ground between the
rows, polythene roofs shift from amber subsurface glow to crisp
white highlights. Cinematic CGI render, Octane quality, 60fps.
```

### T3 — Mid-morning → Midday *(~1.2s)*
```
Locked-off tripod CGI time-lapse. Camera absolutely static. Smooth
mid-morning-to-midday transition: cool morning light intensifies
to neutral high-sun, shadows shorten and rotate, designed clouds
drift, polythene roofs of the farm pull to peak clean white
highlights. Polyhouse farm stays anchored in the same pixel
position. Cinematic CGI render, 60fps.
```

### T4 — Midday → Late afternoon *(~0.8s)*
```
Locked-off tripod CGI time-lapse, no camera movement. Smooth
transition from midday to late afternoon: light cools then warms
into late-afternoon amber tones, shadows begin to lengthen across
the field, polythene roofs start to take on warm cream reflections
with early subsurface glow. Cinematic CGI render, 60fps.
```

### T5 — Late afternoon → Golden hour *(~0.9s)*
```
Locked-off tripod CGI time-lapse. Camera completely static. Smooth
transition into deep golden hour: sun drops lower, sky deepens to
amber and peach, shadows lengthen dramatically across the field
between the polyhouse rows. Every polyhouse in the farm begins
to glow rich warm amber with strong subsurface scattering through
the polythene, foreground crop rows turn bright lime-green where
golden light hits them, volumetric haze appears catching the low
sun between the rows. Cinematic CGI render, 60fps.
```

### T6 — Golden hour → Sunset *(~1.3s)*
```
Locked-off tripod CGI time-lapse, camera does not move. Smooth
transition from deep golden hour to sunset: sun drops to touch the
horizon, sky deepens from gold to peach to magenta with a violet
edge appearing at the top of frame. Shadows from the polyhouses
stretch dramatically long across the foreground. Polyhouse farm
holds its warm amber glow with deep subsurface scattering through
the polythene. Atmospheric volumetric haze intensifies. Final
cinematic settle. No zoom, no pan, no parallax. Cinematic CGI
render, Octane / Unreal 5 quality, 60fps.
```

### Universal camera-lock stub (paste if a transition drifts)
> Camera: completely static, locked tripod, fixed wide shot. The frame
> edges must not move at all. The polyhouse farm must stay anchored
> at the exact same pixel position from the first frame to the last
> frame. This is a CGI time-lapse — only the contents inside the static
> frame change (sky, light, clouds, shadows). Treat the polyhouse
> farm as bolted in place.

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
volumetric atmosphere, subsurface scattering on the polythene.

Subject: a large commercial polyhouse farm — dozens of white
arched polyhouse greenhouses (15+ visible) in long parallel rows
on a vast flat farm field, strong perspective receding deep toward
the horizon. Slightly elevated locked camera (15-25 ft drone
height). Upper half sky, lower half farm, with crop rows in the
foreground leading the eye into the polyhouse rows.

The shot is one continuous unbroken time-lapse from pre-dawn to
sunset in 6.5 seconds:

Pre-dawn blue hour with volumetric mist drifting between the
polyhouse rows → amber-magenta sunrise breaking with god-rays
through the mist → bright cool midday with designed clouds and
crisp shadows → warm afternoon with shadows lengthening → deep
golden hour with the entire farm bathed in amber light and
polythene glowing with subsurface scatter (this is the brand-beat
moment) → sunset hold with sun touching the horizon, sky deepening
to peach and magenta, polyhouses still warmly lit.

Absolutely no camera movement — no pan, no tilt, no zoom, no
parallax. Only the sky, light, and shadows change. Cinematic CGI
render, Octane / Unreal 5 quality, 60fps, 1920x1080. No text, no
logos, no people, no vehicles.
```

### Kling 2 / Luma Ray 2 (concise)
```
Locked-off cinematic CGI time-lapse, sunrise to sunset compressed
into 6.5 seconds. Cinematic 3D render, Octane / Unreal 5 quality,
photoreal but designed.

Wide shot of a large commercial polyhouse farm — dozens of white
arched polyhouses in long parallel rows on a flat farm field,
strong perspective receding toward the horizon. Slightly elevated
locked camera.

Time arc: pre-dawn blue hour → amber sunrise with god-rays through
mist → bright cool midday → warm afternoon → deep golden hour with
the whole farm glowing amber and polythene with subsurface
scatter → sunset hold with sky deepening to peach and magenta.

Static tripod camera, zero movement. Only sky and light animate.
CGI cinematic, warm earthy palette, no people, no text. 60fps,
1920x1080.
```

### Runway Gen-4 (most concise)
```
Cinematic CGI time-lapse, locked tripod, no camera movement. 3D-
rendered photoreal large commercial polyhouse farm — dozens of
arched polyhouses in long parallel rows receding to the horizon,
slightly elevated camera. Upper half sky. Sky cycles from pre-dawn
blue, to sunrise orange, to midday white, to deep golden hour
amber, to peach-magenta sunset. At golden hour the entire operation
glows amber with polythene subsurface scatter all the way into the
distance. Octane / Unreal 5 quality. 1920x1080, 60fps, 6.5 seconds.
No people, no text, no zoom.
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
