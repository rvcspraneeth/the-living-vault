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
    const cleanupCallbacks: Array<() => void> = [];

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

          // Frame range — placeholder until time-lapse footage is shot.
          // Final spec: ~400 frames at 60fps, locked-exterior sunrise→night.
          const FIRST_FRAME = 120;
          const LAST_FRAME = 444;

          const frames = new Map<number, HTMLImageElement>();
          const blobUrls = new Map<number, string>();
          const pending = new Set<number>();
          const boostedPending = new Set<number>();
          const pendingCallbacks = new Map<number, Array<() => void>>();
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
            let lastEvictAt = FIRST_FRAME;
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
              const preciseFrame = FIRST_FRAME + rawProgress * (LAST_FRAME - FIRST_FRAME);
              const roundedFrame = Math.round(preciseFrame);

              // Tagline visible from scroll start through 85% — fades out so endline can land cleanly
              const showTagline = rawProgress < 0.85;
              if (showTagline !== taglineVisible && taglineEl) {
                taglineVisible = showTagline;
                taglineEl.classList.toggle("hero-caption--visible", showTagline);
              }
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
                  const keepFrom = Math.max(FIRST_FRAME, roundedFrame - LOOKBEHIND);
                  for (const [key, url] of blobUrls) {
                    if (key > FIRST_FRAME && key < keepFrom) {
                      URL.revokeObjectURL(url);
                      blobUrls.delete(key);
                      frames.delete(key);
                    }
                  }
                }
              } else {
                const loadTo = Math.min(roundedFrame + 28, LAST_FRAME);
                for (let f = Math.max(FIRST_FRAME, roundedFrame - 2); f <= loadTo; f++) {
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

          // Start the first frame as soon as it lands, then start the scroll loop.
          // Tagline fades in via CSS (mounted with --visible class once first frame is ready).
          let scrollLoopStarted = false;
          const startWhenReady = () => {
            if (scrollLoopStarted) return;
            scrollLoopStarted = true;
            revealHeader();
            // Reveal the tagline a beat after first paint — feels like TI's clean load
            window.setTimeout(() => {
              taglineEl?.classList.add("hero-caption--visible");
            }, 200);
            startScrollFrameLoop();
          };

          loadFrame(FIRST_FRAME, () => {
            drawFrame(FIRST_FRAME);
            startWhenReady();
          }, 20);

          // Eagerly prime the active scroll neighborhood
          for (let f = FIRST_FRAME + 1; f <= Math.min(FIRST_FRAME + 30, LAST_FRAME); f++) {
            loadFrame(f, undefined, 10);
          }
          if (!isMobile) {
            window.setTimeout(() => {
              for (let f = FIRST_FRAME + 31; f <= LAST_FRAME; f += 30) loadFrame(f, undefined, 1);
              for (let f = FIRST_FRAME + 31; f <= LAST_FRAME; f++) loadFrame(f);
            }, 350);
          }

          let lastResizeWidth = window.innerWidth;
          const handleResize = () => {
            if (window.innerWidth === lastResizeWidth) return;
            lastResizeWidth = window.innerWidth;
            sizeCanvases();
            drawFrame(currentFrame);
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
