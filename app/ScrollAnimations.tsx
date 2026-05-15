"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const waitForDynamicContent = (callback: () => void) => {
  let attempts = 0;
  const check = () => {
    const canvas = document.querySelector("[data-hero-canvas]");
    if (canvas) {
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
          duration: 2.45,
          ease: "power2.out",
        }, 0)
        .to(
          [introTop, introBottom],
          {
            yPercent: (i: number) => (i === 0 ? -100 : 100),
            duration: 2.45,
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
        gsap.set(".reveal", { autoAlpha: 0, y: 34 });

        const revealHeader = () => {
          gsap.to("[data-header]", { autoAlpha: 1, y: 0, duration: 0.62, ease: "power2.out" });
        };
        gsap.set("[data-header]", { autoAlpha: 0, y: -16 });

        ScrollTrigger.batch(".reveal", {
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

        // Scroll video — same architecture as terminal-industries.com:
        //   - Worker fetches blobs only
        //   - Main thread creates blob URL + HTMLImageElement per frame
        //   - rAF reads scrollY directly (no GSAP scrub)
        //   - Captions toggled via CSS class + transitions (no GSAP timeline)
        const videoSection = document.querySelector<HTMLElement>("[data-video-section]");
        const canvas = document.querySelector<HTMLCanvasElement>("[data-hero-canvas]");

        if (videoSection && canvas) {
          const ctx = canvas.getContext("2d");
          const introCtx = introCanvas?.getContext("2d") ?? null;

          // Frame range — placeholder until time-lapse footage is shot.
          // Final spec: ~400 frames at 60fps, locked-exterior sunrise→night.
          const FIRST_FRAME = 44;
          const HOME_FRAME = 120;
          const LAST_FRAME = 444;

          const frames = new Map<number, HTMLImageElement>();
          const blobUrls = new Map<number, string>();
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
            img: HTMLImageElement,
          ) => {
            const iw = img.naturalWidth || 1920;
            const ih = img.naturalHeight || 1080;
            const cw = targetCanvas.width;
            const ch = targetCanvas.height;
            const scale = Math.max(cw / iw, ch / ih);
            const x = (cw - iw * scale) / 2;
            const y = (ch - ih * scale) / 2;
            targetCtx.imageSmoothingEnabled = true;
            targetCtx.imageSmoothingQuality = isMobile ? "medium" : "high";
            targetCtx.clearRect(0, 0, cw, ch);
            targetCtx.drawImage(img, x, y, iw * scale, ih * scale);
          };

          const updateIntroPreview = (frameNumber: number) => {
            if (!introCanvas || !introCtx || autoIntroComplete) return;
            const img = frames.get(frameNumber);
            if (!img) return;
            drawImageToCanvas(introCanvas, introCtx, img);
          };

          sizeCanvases();

          const drawFrame = (frameNumber: number) => {
            const img = frames.get(frameNumber);
            if (!img || !ctx) return;
            drawImageToCanvas(canvas, ctx, img);
            currentFrame = frameNumber;
          };

          const frameSrc = (frameNumber: number) =>
            new URL(`/frames/frame_${String(frameNumber).padStart(4, "0")}.webp`, window.location.origin).href;

          const createFrameWorker = () => {
            if (typeof Worker === "undefined") return { worker: null, url: null };

            const workerSource = `
              const queue = [];
              const queued = new Map();
              const inFlight = new Set();
              const MAX_CONCURRENT = 6;
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
                  if (!response.ok) throw new Error("fetch failed");
                  const blob = await response.blob();
                  self.postMessage({ type: "blob", payload: { frameNumber, blob } });
                } catch {
                  self.postMessage({ type: "error", payload: { frameNumber } });
                }
              };

              self.addEventListener("message", (event) => {
                if (event.data?.type !== "load") return;
                const { frameNumber, src, priority = 0 } = event.data.payload;
                if (inFlight.has(frameNumber)) return;
                const existing = queued.get(frameNumber);
                if (existing) {
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

          // Create blob URL → HTMLImageElement → store when decoded. Same as TI's main thread.
          const storeBlob = (frameNumber: number, blob: Blob) => {
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => {
              pending.delete(frameNumber);
              boostedPending.delete(frameNumber);
              blobUrls.set(frameNumber, url);
              frames.set(frameNumber, img);
              runFrameCallbacks(frameNumber);
            };
            img.onerror = () => {
              URL.revokeObjectURL(url);
              pending.delete(frameNumber);
              boostedPending.delete(frameNumber);
              pendingCallbacks.delete(frameNumber);
            };
            img.src = url;
          };

          const failFrame = (frameNumber: number) => {
            pending.delete(frameNumber);
            boostedPending.delete(frameNumber);
            pendingCallbacks.delete(frameNumber);
          };

          frameWorkerState.worker?.addEventListener("message", (event: MessageEvent) => {
            const { type, payload } = event.data as
              | { type: "blob"; payload: { frameNumber: number; blob: Blob } }
              | { type: "error"; payload: { frameNumber: number } };

            if (type === "blob") {
              storeBlob(payload.frameNumber, payload.blob);
            } else {
              const fn = payload.frameNumber;
              fetch(frameSrc(fn))
                .then((r) => r.blob())
                .then((blob) => storeBlob(fn, blob))
                .catch(() => failFrame(fn));
            }
          });

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

            if (frameWorkerState.worker) {
              frameWorkerState.worker.postMessage({
                type: "load",
                payload: { frameNumber, src: frameSrc(frameNumber), priority },
              });
            } else {
              fetch(frameSrc(frameNumber))
                .then((r) => r.blob())
                .then((blob) => storeBlob(frameNumber, blob))
                .catch(() => failFrame(frameNumber));
            }
          };

          // Caption elements — toggled by class, CSS handles the fade.
          const taglineEl = document.querySelector<HTMLElement>(".hero-caption--tagline");
          const endlineEl = document.querySelector<HTMLElement>(".hero-caption--endline");

          const startScrollFrameLoop = () => {
            let lastFrame = -1;
            let lastEvictAt = HOME_FRAME;
            let taglineVisible = false;
            let endlineVisible = false;

            let scrollStart = videoSection.getBoundingClientRect().top + window.scrollY;
            let scrollEnd = scrollStart + videoSection.offsetHeight - window.innerHeight;
            const updateScrollBounds = () => {
              scrollStart = videoSection.getBoundingClientRect().top + window.scrollY;
              scrollEnd = scrollStart + videoSection.offsetHeight - window.innerHeight;
            };
            window.addEventListener("resize", updateScrollBounds, { passive: true });
            cleanupCallbacks.push(() => window.removeEventListener("resize", updateScrollBounds));

            const tick = () => {
              // Read scrollY directly — zero lag, same approach as TI.
              const rawProgress = Math.max(0, Math.min(1, (window.scrollY - scrollStart) / Math.max(1, scrollEnd - scrollStart)));
              const preciseFrame = HOME_FRAME + rawProgress * (LAST_FRAME - HOME_FRAME);
              const roundedFrame = Math.round(preciseFrame);

              // Tagline visible from scroll start through 85% — fades out so endline can land cleanly
              const showTagline = rawProgress > 0.02 && rawProgress < 0.85;
              if (showTagline !== taglineVisible && taglineEl) {
                taglineVisible = showTagline;
                taglineEl.classList.toggle("hero-caption--visible", showTagline);
              }
              // Endline appears at the very end (90%+) and stays
              const showEndline = rawProgress > 0.9;
              if (showEndline !== endlineVisible && endlineEl) {
                endlineVisible = showEndline;
                endlineEl.classList.toggle("hero-caption--visible", showEndline);
              }

              // Frame loading window
              if (isMobile) {
                const LOOKAHEAD = 24;
                const LOOKBEHIND = 10;
                const loadTo = Math.min(roundedFrame + LOOKAHEAD, LAST_FRAME);
                for (let f = roundedFrame; f <= loadTo; f++) {
                  loadFrame(f, undefined, f <= roundedFrame + 6 ? 10 : 4);
                }
                if (Math.abs(roundedFrame - lastEvictAt) >= 20) {
                  lastEvictAt = roundedFrame;
                  const keepFrom = Math.max(HOME_FRAME, roundedFrame - LOOKBEHIND);
                  for (const [key, url] of blobUrls) {
                    if (key > HOME_FRAME && key < keepFrom) {
                      URL.revokeObjectURL(url);
                      blobUrls.delete(key);
                      frames.delete(key);
                    }
                  }
                }
              } else {
                const loadTo = Math.min(roundedFrame + 28, LAST_FRAME);
                for (let f = Math.max(HOME_FRAME, roundedFrame - 2); f <= loadTo; f++) {
                  loadFrame(f, undefined, f <= roundedFrame + 8 ? 10 : 5);
                }
              }

              if (roundedFrame !== lastFrame) {
                drawFrame(roundedFrame);
                lastFrame = roundedFrame;
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
            const introDuration = 2450;

            const startHeroAfterIntro = () => {
              if (heroStarted || !panelRevealComplete || !frameIntroComplete) return;
              heroStarted = true;
              revealHeader();
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
              for (let f = FIRST_FRAME; f < HOME_FRAME; f++) {
                const url = blobUrls.get(f);
                if (url) URL.revokeObjectURL(url);
                blobUrls.delete(f);
                frames.delete(f);
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
            blobUrls.forEach((url) => URL.revokeObjectURL(url));
            blobUrls.clear();
            frames.clear();
            pending.clear();
            pendingCallbacks.clear();
          });
        }

        ScrollTrigger.refresh();
      });
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      cleanupCallbacks.forEach((cleanup) => cleanup());
      context?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
