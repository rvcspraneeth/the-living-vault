"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const waitForDynamicContent = (callback: () => void) => {
  let attempts = 0;

  const check = () => {
    const journeyCards = document.querySelectorAll(".journey-card");
    const cropTabs = document.querySelectorAll(".crop-tab");

    if (journeyCards.length >= 7 && cropTabs.length > 0) {
      callback();
      return;
    }

    attempts += 1;
    if (attempts < 90) window.requestAnimationFrame(check);
  };

  check();
};

export default function ScrollAnimations() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      document.querySelector<HTMLElement>("[data-intro]")?.remove();
      return;
    }

    let context: gsap.Context | undefined;
    let rafId: number | null = null;
    const matchMedia = gsap.matchMedia();
    let revealIntroPanels: ((onComplete?: () => void) => void) | undefined;
    const cleanupCallbacks: Array<() => void> = [];

    // Split-panel intro animation
    const introEl = document.querySelector<HTMLElement>("[data-intro]");
    const introTop = document.querySelector<HTMLElement>(".intro__panel--top");
    const introBottom = document.querySelector<HTMLElement>(".intro__panel--bottom");
    const introAperture = document.querySelector<HTMLElement>(".intro__aperture");
    const introCanvas = document.querySelector<HTMLCanvasElement>("[data-intro-canvas]");

    if (introEl && introTop && introBottom && introAperture) {
      document.body.style.overflow = "hidden";

      const finishIntro = () => {
        introEl.style.display = "none";
        document.body.style.overflow = "";
      };

      // Safety valve — if something stalls the animation, force-complete after 10s.
      const safetyTimer = window.setTimeout(finishIntro, 10000);

      // Phase 1: keep the farm film behind the panels while the brand resolves.
      gsap.set(".intro__mark", { autoAlpha: 0, scale: 0.76, rotate: -18 });
      gsap.set(".intro__mark-ring", { scale: 0.82, rotate: -28 });
      gsap.set(".intro__mark-leaf", { autoAlpha: 0, scale: 0.64, rotate: 12, transformOrigin: "50% 50%" });
      gsap.set(".intro__mark-cut", { scaleX: 0, transformOrigin: "50% 50%" });
      gsap.set(".intro__letter", { autoAlpha: 0, yPercent: 72, rotateX: -64, filter: "blur(8px)" });
      gsap.set(".intro__tagline", { autoAlpha: 0, y: 10, letterSpacing: "0.34em" });
      gsap.set(".intro__aperture", { autoAlpha: 1, scale: 1.015, yPercent: 0, borderRadius: 0 });
      gsap.set(".intro__grid", { autoAlpha: 0.55 });
      gsap.set(".intro__brand-block", { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set("[data-header]", { autoAlpha: 0, y: -16 });
      const introLetterCount = document.querySelectorAll(".intro__panel--top .intro__letter").length;

      const introTimeline = gsap.timeline({ paused: true });

      introTimeline
        // Phase 2: logo resolves first, then the name opens letter by letter.
        .to(".intro__mark", {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.74,
          ease: "back.out(1.35)",
          delay: 0.16,
        })
        .to(".intro__mark-ring", {
          scale: 1,
          rotate: 0,
          duration: 0.86,
          ease: "power3.out",
        }, "<")
        .to(".intro__mark-leaf", {
          autoAlpha: 1,
          scale: 1,
          rotate: 42,
          duration: 0.66,
          ease: "power3.out",
        }, "<0.14")
        .to(".intro__mark-cut", {
          scaleX: 1,
          duration: 0.58,
          ease: "power2.inOut",
        }, "<0.2");

      Array.from({ length: introLetterCount }).forEach((_, index) => {
        introTimeline.to(`[data-intro-letter="${index}"]`, {
            autoAlpha: 1,
            yPercent: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 0.68,
            ease: "power3.out",
          },
          index === 0 ? "<0.18" : "<0.035",
        );
      });

      introTimeline
        .to(".intro__tagline", {
          autoAlpha: 1,
          y: 0,
          letterSpacing: "0.22em",
          duration: 0.62,
          ease: "power2.out",
        })
        .to(".intro__brand-block", {
          y: -10,
          scale: 0.985,
          duration: 0.54,
          ease: "power2.inOut",
        }, "+=0.48");

      introTimeline.play();

      revealIntroPanels = (onComplete) => {
        const finishTimeline = gsap.timeline({
          onComplete: () => {
            window.clearTimeout(safetyTimer);
            finishIntro();
            onComplete?.();
          },
        });

        finishTimeline
        // Final phase: brand clears and the top/bottom panels reveal the farm film.
        .to(".intro__brand-block", {
          autoAlpha: 0,
          y: -32,
          scale: 0.94,
          duration: 0.44,
          ease: "power2.in",
        }, 0)
        .to(".intro__grid", { autoAlpha: 0, duration: 0.58, ease: "power2.out" }, 0)
        .to(".intro__aperture", {
          scale: 1,
          borderRadius: 0,
          duration: 2.567,
          ease: "power2.out",
        }, 0)
        .to(
          [introTop, introBottom],
          {
            yPercent: (i: number) => (i === 0 ? -100 : 100),
            duration: 2.567,
            ease: "power4.inOut",
          },
          0
        )
        .set(".intro__aperture", { autoAlpha: 1, scale: 1 });
      };
    }

    waitForDynamicContent(() => {
      context = gsap.context(() => {
        gsap.defaults({ ease: "power3.out" });
        gsap.set(".reveal:not(.hero__content):not([data-crop-stage])", { autoAlpha: 0, y: 34 });
        gsap.set(".journey-card", { autoAlpha: 1, y: 0 });

        const revealHeroText = () => {
          gsap.timeline({ defaults: { duration: 0.85 } })
            .to("[data-header]", { autoAlpha: 1, y: 0, duration: 0.62, ease: "power2.out" }, 0)
            .to(".hero .eyebrow", { autoAlpha: 1, y: 0 }, 0.08)
            .to(".hero h1", { autoAlpha: 1, y: 0 }, 0.2)
            .to(".hero__lede", { autoAlpha: 1, y: 0 }, 0.34)
            .to(".hero__actions", { autoAlpha: 1, y: 0 }, 0.48);
        };

        gsap.set("[data-header]", { autoAlpha: 0, y: -16 });
        gsap.set(".hero .eyebrow", { autoAlpha: 0, y: 18 });
        gsap.set(".hero h1", { autoAlpha: 0, y: 28 });
        gsap.set(".hero__lede", { autoAlpha: 0, y: 24 });
        gsap.set(".hero__actions", { autoAlpha: 0, y: 20 });

        ScrollTrigger.batch(".reveal:not(.hero__content):not(.journey-card):not([data-crop-stage])", {
          start: "top 78%",
          once: true,
          onEnter: (items) => {
            gsap.to(items, {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.08,
              clearProps: "transform,visibility,opacity",
            });
          },
        });

        // Canvas frame-by-frame scroll video with worker-backed frame fetch/decode.
        const videoSection = document.querySelector<HTMLElement>("[data-video-section]");
        const canvas = document.querySelector<HTMLCanvasElement>("[data-hero-canvas]");

        if (videoSection && canvas) {
          const ctx = canvas.getContext("2d");
          const introCtx = introCanvas?.getContext("2d") ?? null;
          const FIRST_FRAME = 44;
          const HOME_FRAME = 120;
          const LAST_FRAME = 1249;
          const MORPH_FROM_FRAME = 156;
          const MORPH_TO_FRAME = 157;
          const MORPH_WINDOW_START = 153;
          const MORPH_WINDOW_END = 160;
          const frames = new Map<number, ImageBitmap>();
          const pending = new Set<number>();
          const boostedPending = new Set<number>();
          const pendingCallbacks = new Map<number, Array<() => void>>();
          const initialFrameCount = HOME_FRAME - FIRST_FRAME + 1;
          let loadedInitialFrames = 0;
          let initialFramesReady = false;
          let introLeadReady = false;
          let autoIntroStarted = false;
          let autoIntroComplete = false;
          let currentFrame = FIRST_FRAME;

          const isMobile = window.innerWidth <= 768;

          const sizeCanvases = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
            const width = Math.round(window.innerWidth * dpr);
            const height = Math.round(window.innerHeight * dpr);
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;

            if (introCanvas) {
              introCanvas.width = width;
              introCanvas.height = height;
              introCanvas.style.width = `${window.innerWidth}px`;
              introCanvas.style.height = `${window.innerHeight}px`;
            }
          };

          const drawImageToCanvas = (
            targetCanvas: HTMLCanvasElement,
            targetCtx: CanvasRenderingContext2D,
            frame: ImageBitmap,
            clear = true,
          ) => {
            const iw = frame.width || 1920;
            const ih = frame.height || 1080;
            const cw = targetCanvas.width;
            const ch = targetCanvas.height;
            const scale = Math.max(cw / iw, ch / ih);
            const x = (cw - iw * scale) / 2;
            const y = (ch - ih * scale) / 2;
            targetCtx.imageSmoothingEnabled = true;
            targetCtx.imageSmoothingQuality = isMobile ? "medium" : "high";
            if (clear) targetCtx.clearRect(0, 0, cw, ch);
            targetCtx.drawImage(frame, x, y, iw * scale, ih * scale);
          };

          const updateIntroPreview = (frameNumber: number) => {
            if (!introCanvas || !introCtx || autoIntroComplete) return;
            const frame = frames.get(frameNumber);
            if (!frame) return;
            drawImageToCanvas(introCanvas, introCtx, frame);
          };

          sizeCanvases();

          const drawFrame = (frameNumber: number) => {
            const frame = frames.get(frameNumber);
            if (!frame || !ctx) return;
            drawImageToCanvas(canvas, ctx, frame);
            currentFrame = frameNumber;
          };

          const drawFrameBlend = (fromFrameNumber: number, toFrameNumber: number, progress: number) => {
            const fromFrame = frames.get(fromFrameNumber);
            const toFrame = frames.get(toFrameNumber);
            if (!fromFrame || !toFrame || !ctx) return false;

            drawImageToCanvas(canvas, ctx, fromFrame);
            ctx.save();
            ctx.globalAlpha = Math.max(0, Math.min(1, progress));
            drawImageToCanvas(canvas, ctx, toFrame, false);
            ctx.restore();
            currentFrame = progress < 0.5 ? fromFrameNumber : toFrameNumber;
            return true;
          };

          const frameSrc = (frameNumber: number) =>
            new URL(`/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`, window.location.origin).href;

          const createFrameWorker = () => {
            if (typeof Worker === "undefined") return { worker: null, url: null };

            const workerSource = `
              const queue = [];
              const queued = new Map();
              const inFlight = new Set();
              const MAX_CONCURRENT = 5;
              let active = 0;
              let sequence = 0;

              const sortQueue = () => {
                queue.sort((a, b) => {
                  if (a.priority !== b.priority) return b.priority - a.priority;
                  return a.sequence - b.sequence;
                });
              };

              const pump = () => {
                while (active < MAX_CONCURRENT && queue.length > 0) {
                  sortQueue();
                  const job = queue.shift();
                  if (!job) return;
                  queued.delete(job.frameNumber);
                  if (inFlight.has(job.frameNumber)) continue;

                  active += 1;
                  inFlight.add(job.frameNumber);
                  load(job).finally(() => {
                    active -= 1;
                    inFlight.delete(job.frameNumber);
                    pump();
                  });
                }
              };

              const load = async ({ frameNumber, src }) => {
                try {
                  const response = await fetch(src);
                  if (!response.ok) throw new Error("Frame fetch failed");

                  const blob = await response.blob();
                  if ("createImageBitmap" in self) {
                    const bitmap = await createImageBitmap(blob);
                    self.postMessage({ type: "frame", payload: { frameNumber, bitmap } }, [bitmap]);
                    return;
                  }

                  self.postMessage({ type: "blob", payload: { frameNumber, blob } });
                } catch (error) {
                  self.postMessage({
                    type: "error",
                    payload: {
                      frameNumber,
                      message: error instanceof Error ? error.message : String(error),
                    },
                  });
                }
              };

              self.addEventListener("message", (event) => {
                if (event.data?.type !== "load") return;
                const { frameNumber, src, priority = 0 } = event.data.payload;
                if (inFlight.has(frameNumber)) return;

                const existing = queued.get(frameNumber);
                if (existing) {
                  existing.src = src;
                  existing.priority = Math.max(existing.priority, priority);
                  return;
                }

                const job = { frameNumber, src, priority, sequence: sequence++ };
                queued.set(frameNumber, job);
                queue.push(job);
                pump();
              });
            `;

            const url = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
            try {
              return { worker: new Worker(url), url };
            } catch {
              URL.revokeObjectURL(url);
              return { worker: null, url: null };
            }
          };

          const frameWorkerState = createFrameWorker();

          const runFrameCallbacks = (frameNumber: number) => {
            const callbacks = pendingCallbacks.get(frameNumber);
            if (!callbacks) return;
            pendingCallbacks.delete(frameNumber);
            callbacks.forEach((callback) => callback());
          };

          const storeFrame = (frameNumber: number, bitmap: ImageBitmap) => {
            pending.delete(frameNumber);
            boostedPending.delete(frameNumber);
            frames.set(frameNumber, bitmap);
            runFrameCallbacks(frameNumber);
          };

          const failFrame = (frameNumber: number) => {
            pending.delete(frameNumber);
            boostedPending.delete(frameNumber);
            pendingCallbacks.delete(frameNumber);
          };

          frameWorkerState.worker?.addEventListener("message", (event: MessageEvent) => {
            const message = event.data as
              | { type: "frame"; payload: { frameNumber: number; bitmap: ImageBitmap } }
              | { type: "blob"; payload: { frameNumber: number; blob: Blob } }
              | { type: "error"; payload: { frameNumber: number; message?: string } };

            if (message.type === "frame") {
              storeFrame(message.payload.frameNumber, message.payload.bitmap);
              return;
            }

            if (message.type === "blob") {
              createImageBitmap(message.payload.blob)
                .then((bitmap) => storeFrame(message.payload.frameNumber, bitmap))
                .catch(() => failFrame(message.payload.frameNumber));
              return;
            }

            pending.delete(message.payload.frameNumber);
            boostedPending.delete(message.payload.frameNumber);
            fetchFrameOnMainThread(message.payload.frameNumber, frameSrc(message.payload.frameNumber));
          });

          const fetchFrameOnMainThread = (frameNumber: number, src: string) => {
            fetch(src)
              .then((r) => r.blob())
              .then((blob) => createImageBitmap(blob))
              .then((bitmap) => storeFrame(frameNumber, bitmap))
              .catch(() => failFrame(frameNumber));
          };

          const loadFrame = (frameNumber: number, onLoad?: () => void, priority = 0) => {
            if (frames.has(frameNumber)) {
              onLoad?.();
              return;
            }
            if (onLoad) {
              const callbacks = pendingCallbacks.get(frameNumber) ?? [];
              callbacks.push(onLoad);
              pendingCallbacks.set(frameNumber, callbacks);
            }
            if (pending.has(frameNumber)) {
              if (priority > 0 && frameWorkerState.worker && !boostedPending.has(frameNumber)) {
                boostedPending.add(frameNumber);
                frameWorkerState.worker.postMessage({
                  type: "load",
                  payload: { frameNumber, src: frameSrc(frameNumber), priority },
                });
              }
              return;
            }
            pending.add(frameNumber);
            if (priority > 0) boostedPending.add(frameNumber);
            const src = frameSrc(frameNumber);

            if (frameWorkerState.worker) {
              frameWorkerState.worker.postMessage({ type: "load", payload: { frameNumber, src, priority } });
              return;
            }

            fetchFrameOnMainThread(frameNumber, src);
          };

          const startScrollFrameLoop = () => {
            let lastFrame = -1;
            let lastBlend = -1;
            let lastEvictAt = HOME_FRAME;

            const tick = () => {
              const preciseFrame = HOME_FRAME + captions.totalProgress() * (LAST_FRAME - HOME_FRAME);
              const roundedFrame = Math.round(preciseFrame);

              if (isMobile) {
                // Mobile: sliding window — stream ahead and evict behind to cap memory
                const LOOKAHEAD = 24;
                const LOOKBEHIND = 10;
                const loadTo = Math.min(roundedFrame + LOOKAHEAD, LAST_FRAME);
                for (let f = roundedFrame; f <= loadTo; f++) {
                  loadFrame(f, undefined, f <= roundedFrame + 6 ? 10 : 4);
                }
                if (Math.abs(roundedFrame - lastEvictAt) >= 20) {
                  lastEvictAt = roundedFrame;
                  const keepFrom = Math.max(HOME_FRAME, roundedFrame - LOOKBEHIND);
                  for (const [key, bitmap] of frames) {
                    if (key > HOME_FRAME && key < keepFrom) {
                      bitmap.close();
                      frames.delete(key);
                    }
                  }
                }
              } else {
                // Desktop: keep the active scroll neighborhood ahead of background preloading.
                const loadTo = Math.min(roundedFrame + 28, LAST_FRAME);
                for (let f = Math.max(HOME_FRAME, roundedFrame - 2); f <= loadTo; f++) {
                  loadFrame(f, undefined, f <= roundedFrame + 8 ? 10 : 5);
                }
              }

              if (preciseFrame >= MORPH_WINDOW_START && preciseFrame < MORPH_WINDOW_END) {
                const rawProgress = (preciseFrame - MORPH_WINDOW_START) / (MORPH_WINDOW_END - MORPH_WINDOW_START);
                const blendProgress = rawProgress * rawProgress * (3 - 2 * rawProgress);
                const blendBucket = Math.round(blendProgress * 48);
                if (blendBucket !== lastBlend && drawFrameBlend(MORPH_FROM_FRAME, MORPH_TO_FRAME, blendProgress)) {
                  lastBlend = blendBucket;
                  lastFrame = -1;
                }
              } else {
                if (roundedFrame !== lastFrame) {
                  drawFrame(roundedFrame);
                  lastFrame = roundedFrame;
                  lastBlend = -1;
                }
              }
              rafId = requestAnimationFrame(tick);
            };
            rafId = requestAnimationFrame(tick);
          };

          const startAutoIntro = () => {
            if (autoIntroStarted) return;
            if (!initialFramesReady || !introLeadReady) return;
            autoIntroStarted = true;

            let lastIntroFrame = -1;
            let panelRevealComplete = false;
            let frameIntroComplete = false;
            let heroStarted = false;
            const introStart = performance.now();
            const introDuration = (initialFrameCount / 30) * 1000;

            const startHeroAfterIntro = () => {
              if (heroStarted || !panelRevealComplete || !frameIntroComplete) return;
              heroStarted = true;
              revealHeroText();
              startScrollFrameLoop();
            };

            revealIntroPanels?.(() => {
              panelRevealComplete = true;
              startHeroAfterIntro();
            });

            const playIntroFrame = (now: number) => {
              const progress = Math.min(1, (now - introStart) / introDuration);
              const eased = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
              const frameNumber = Math.min(
                HOME_FRAME,
                FIRST_FRAME + Math.floor(eased * (initialFrameCount - 1)),
              );

              if (frameNumber !== lastIntroFrame) {
                drawFrame(frameNumber);
                updateIntroPreview(frameNumber);
                lastIntroFrame = frameNumber;
              }

              if (progress < 1) {
                requestAnimationFrame(playIntroFrame);
                return;
              }

              autoIntroComplete = true;
              drawFrame(HOME_FRAME);
              updateIntroPreview(HOME_FRAME);
              frameIntroComplete = true;
              // Free intro frames (44–79) — no longer needed once hero is visible
              for (let f = FIRST_FRAME; f < HOME_FRAME; f++) {
                const bmp = frames.get(f);
                if (bmp) { bmp.close(); frames.delete(f); }
              }
              startHeroAfterIntro();
            };

            requestAnimationFrame(playIntroFrame);
          };

          window.setTimeout(() => {
            introLeadReady = true;
            startAutoIntro();
          }, 1700);

          // Skip black lead-in frames 1–43. Load only the opening frames first
          // so the cinematic reveal is not competing with the full scroll film.
          for (let i = FIRST_FRAME; i <= HOME_FRAME; i++) {
            loadFrame(i, () => {
              if (i === FIRST_FRAME) {
                drawFrame(FIRST_FRAME);
                updateIntroPreview(FIRST_FRAME);
              }
              if (i >= FIRST_FRAME && i <= HOME_FRAME) {
                loadedInitialFrames += 1;
                if (loadedInitialFrames === initialFrameCount) {
                  initialFramesReady = true;
                  startAutoIntro();
                  // Initial frames are in — then enqueue the rest as low-priority
                  // background work so active scroll frames can jump the queue.
                  if (!isMobile) {
                    window.setTimeout(() => {
                      for (let f = HOME_FRAME + 1; f <= LAST_FRAME; f += 30) loadFrame(f, undefined, 1);
                      for (let f = HOME_FRAME + 1; f <= LAST_FRAME; f++) loadFrame(f);
                    }, 350);
                  }
                }
              }
            }, 20);
          }

          // Priority-load the targeted bitmap blend frames. They are used for
          // the widened frame 156→157 transition during the scroll film.
          loadFrame(MORPH_FROM_FRAME, undefined, 12);
          loadFrame(MORPH_TO_FRAME, undefined, 12);

          // Caption timeline — positions derived from per-frame analysis of Hero_vault.mp4
          // scroll progress maps frame 120–1249, after the automatic homepage
          // lead-in plays frames 44–120.
          const progressForFrame = (frame: number) =>
            Math.max(0, Math.min(1, (frame - HOME_FRAME) / (LAST_FRAME - HOME_FRAME)));
          const captionAnchors = [HOME_FRAME, 216, 410, 547, 680, 780, 895, 1140, 1249];
          const captionWindow = (anchorIndex: number) => {
            const anchor = captionAnchors[anchorIndex];
            const nextAnchor = captionAnchors[anchorIndex + 1];
            // Each caption is visible from 20 frames before its anchor until 45 frames before
            // the next anchor — guaranteeing a clean 45-frame blackout between captions
            // so two captions never share the screen even with scrub lag.
            return {
              start: Math.max(HOME_FRAME, anchor - 20),
              end: nextAnchor ? nextAnchor - 45 : LAST_FRAME,
            };
          };
          //
          // Frame map:
          //   001–050  : black fade-in
          //   050–200  : aerial exterior — multiple polyhouses at golden sunrise
          //   200–280  : entering / walking into the tunnel
          //   280–400  : lettuce beds
          //   400–470  : kale rows
          //   470–535  : cilantro rows
          //   550–650  : tomatoes on stakes
          //   650–780  : bell peppers (red + yellow)
          //   780–870  : ginger / turmeric (broad flat leaves)
          //   870–950  : black pepper vines
          //   950–999  : vanilla vines → flower (final shot)
          const captions = gsap.timeline({ paused: true });
          gsap.set(".hero-caption", { autoAlpha: 0, y: 22 });

          // Hero content fades out instantly as scroll begins — must be gone before first caption appears
          captions.to(".hero__content", { autoAlpha: 0, y: -28, duration: 0.015, ease: "power3.in" }, 0);

          const caption1 = captionWindow(0);
          const caption2 = captionWindow(1);
          const caption3 = captionWindow(2);
          const caption4 = captionWindow(3);
          const caption5 = captionWindow(4);
          const caption6 = captionWindow(5);
          const caption7 = captionWindow(6);
          const caption8 = captionWindow(7);
          const caption9 = captionWindow(8);

          // Caption 1 — Aerial exterior / polyhouse overview
          captions
            .to(".hero-caption--1", { autoAlpha: 1, y: 0, duration: 0.03, ease: "power2.out" }, progressForFrame(caption1.start))
            .to(".hero-caption--1", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(caption1.end));

          // Caption 2 — Entering polyhouse | anchor frame 216
          captions
            .to(".hero-caption--2", { autoAlpha: 1, y: 0, duration: 0.03, ease: "power2.out" }, progressForFrame(caption2.start))
            .to(".hero-caption--2", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(caption2.end));

          // Caption 3 — Lettuce beds | anchor frame 410
          captions
            .to(".hero-caption--3", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, progressForFrame(caption3.start))
            .to(".hero-caption--3", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(caption3.end));

          // Caption 4 — Kale rows | anchor frame 547
          captions
            .to(".hero-caption--4", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, progressForFrame(caption4.start))
            .to(".hero-caption--4", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(caption4.end));

          // Caption 5 — Cilantro rows | anchor frame 680
          captions
            .to(".hero-caption--5", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, progressForFrame(caption5.start))
            .to(".hero-caption--5", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(caption5.end));

          // Caption 6 — Tomatoes | anchor frame 780
          captions
            .to(".hero-caption--6", { autoAlpha: 1, y: 0, duration: 0.03, ease: "power2.out" }, progressForFrame(caption6.start))
            .to(".hero-caption--6", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(caption6.end));

          // Caption 7 — Bell peppers | anchor frame 895
          captions
            .to(".hero-caption--7", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, progressForFrame(caption7.start))
            .to(".hero-caption--7", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(caption7.end));

          // Caption 8 — Ginger, Turmeric, Black pepper | anchor frame 1140
          captions
            .to(".hero-caption--8", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, progressForFrame(caption8.start))
            .to(".hero-caption--8", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(caption8.end));

          // Caption 9 — Vanilla | anchor frame 1249, stays visible
          captions
            .to(".hero-caption--9", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, progressForFrame(caption9.start));

          const captionSnapPoints = captionAnchors.map(progressForFrame);

          // CSS sticky handles layout — ScrollTrigger tracks progress through the 1000vh section.
          // scrub: 0.15 keeps captions tightly coupled to scroll with just enough smoothing
          // to avoid jitter, while eliminating the lag that caused caption overlaps at 0.5.
          ScrollTrigger.create({
            trigger: videoSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.15,
            animation: captions,
            ...(!isMobile
              ? {
                  snap: {
                    snapTo: captionSnapPoints,
                    duration: { min: 0.4, max: 1.0 },
                    delay: 0.05,
                    ease: "power2.inOut",
                    inertia: false,
                  },
                }
              : {}),
          });

          let lastResizeWidth = window.innerWidth;
          const handleResize = () => {
            if (window.innerWidth === lastResizeWidth) return;
            lastResizeWidth = window.innerWidth;
            sizeCanvases();
            drawFrame(currentFrame);
            updateIntroPreview(currentFrame);
          };
          window.addEventListener("resize", handleResize);

          cleanupCallbacks.push(() => {
            window.removeEventListener("resize", handleResize);
            frameWorkerState.worker?.terminate();
            if (frameWorkerState.url) URL.revokeObjectURL(frameWorkerState.url);
            frames.forEach((bitmap) => bitmap.close());
            frames.clear();
            pending.clear();
            pendingCallbacks.clear();
          });
        }

        matchMedia.add("(min-width: 981px)", () => {

          gsap.utils.toArray<HTMLElement>("[data-flow-section]").forEach((section) => {
            const items = section.querySelectorAll(
              ".section-heading > *, .control-comparison__side, .system-panel article",
            );

            gsap.from(items, {
              autoAlpha: 0,
              y: 42,
              duration: 0.8,
              stagger: 0.1,
              scrollTrigger: {
                trigger: section,
                start: "top 74%",
                once: true,
              },
            });
          });

          gsap.from(".about__principles article", {
            autoAlpha: 0,
            y: 34,
            stagger: 0.14,
            duration: 0.8,
            scrollTrigger: {
              trigger: ".about",
              start: "top 62%",
              once: true,
            },
          });

          const journey = document.querySelector<HTMLElement>("[data-flow-journey]");

          if (journey) {
            gsap.from(".journey-card", {
              autoAlpha: 0,
              y: 26,
              stagger: 0.07,
              duration: 0.7,
              scrollTrigger: {
                trigger: journey,
                start: "top 68%",
                once: true,
              },
            });
          }

        });

        matchMedia.add("(max-width: 980px)", () => {});

        ScrollTrigger.refresh();
      });
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      cleanupCallbacks.forEach((cleanup) => cleanup());
      context?.revert();
      matchMedia.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
