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

    if (journeyCards.length >= 7 && cropTabs.length >= 9) {
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
      gsap.set(".intro__mark", { autoAlpha: 0, scale: 0.72, rotate: -34 });
      gsap.set(".intro__name", { autoAlpha: 0, y: 18 });
      gsap.set(".intro__aperture", { autoAlpha: 1, scale: 1.015, yPercent: 0, borderRadius: 0 });
      gsap.set(".intro__grid", { autoAlpha: 0.55 });
      gsap.set(".intro__brand-block", { autoAlpha: 1, y: 0, scale: 1 });
      gsap.set("[data-header]", { autoAlpha: 0, y: -16 });

      const introTimeline = gsap.timeline({ paused: true });

      introTimeline
        // Phase 2: logo resolves first, then name lifts into place.
        .to(".intro__mark", {
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.78,
          ease: "power3.out",
          delay: 0.18,
        })
        .to(".intro__name", {
          autoAlpha: 1,
          y: 0,
          duration: 0.74,
          ease: "power2.out",
        }, "<0.22")
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

        // Canvas frame-by-frame scroll video — identical technique to Terminal Industries
        const videoSection = document.querySelector<HTMLElement>("[data-video-section]");
        const canvas = document.querySelector<HTMLCanvasElement>("[data-hero-canvas]");

        if (videoSection && canvas) {
          const ctx = canvas.getContext("2d");
          const introCtx = introCanvas?.getContext("2d") ?? null;
          const FIRST_FRAME = 44;
          const HOME_FRAME = 80;
          const LAST_FRAME = 999;
          const frames = new Map<number, HTMLImageElement>();
          const initialFrameCount = HOME_FRAME - FIRST_FRAME + 1;
          let loadedInitialFrames = 0;
          let initialFramesReady = false;
          let introLeadReady = false;
          let autoIntroStarted = false;
          let autoIntroComplete = false;
          let remainingFramesStarted = false;
          let currentFrame = FIRST_FRAME;

          const sizeCanvases = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
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
            frame: HTMLImageElement,
          ) => {
            const iw = frame.naturalWidth || 1920;
            const ih = frame.naturalHeight || 1080;
            const cw = targetCanvas.width;
            const ch = targetCanvas.height;
            const scale = Math.max(cw / iw, ch / ih);
            const x = (cw - iw * scale) / 2;
            const y = (ch - ih * scale) / 2;
            targetCtx.imageSmoothingEnabled = true;
            targetCtx.imageSmoothingQuality = "high";
            targetCtx.clearRect(0, 0, cw, ch);
            targetCtx.drawImage(frame, x, y, iw * scale, ih * scale);
          };

          const updateIntroPreview = (frameNumber: number) => {
            if (!introCanvas || !introCtx || autoIntroComplete) return;
            const frame = frames.get(frameNumber);
            if (!frame?.complete) return;
            drawImageToCanvas(introCanvas, introCtx, frame);
          };

          sizeCanvases();

          const drawFrame = (frameNumber: number) => {
            const frame = frames.get(frameNumber);
            if (!frame?.complete || !ctx) return;
            drawImageToCanvas(canvas, ctx, frame);
            currentFrame = frameNumber;
          };

          const loadFrame = (frameNumber: number, onLoad?: () => void) => {
            if (frames.has(frameNumber)) {
              onLoad?.();
              return;
            }

            const img = new Image();
            img.decoding = "async";
            img.src = `/frames/frame_${String(frameNumber).padStart(4, "0")}.jpg`;
            img.onload = () => onLoad?.();
            frames.set(frameNumber, img);
          };

          const loadRemainingFrames = () => {
            if (remainingFramesStarted) return;
            remainingFramesStarted = true;
            let nextFrame = HOME_FRAME + 1;

            const loadBatch = () => {
              const batchEnd = Math.min(nextFrame + 11, LAST_FRAME);
              for (; nextFrame <= batchEnd; nextFrame += 1) {
                loadFrame(nextFrame);
              }

              if (nextFrame <= LAST_FRAME) {
                if (typeof window.requestIdleCallback === "function") {
                  window.requestIdleCallback(loadBatch, { timeout: 180 });
                } else {
                  globalThis.setTimeout(loadBatch, 48);
                }
              }
            };

            loadBatch();
          };

          const startScrollFrameLoop = () => {
            let lastFrame = -1;
            const tick = () => {
              const frameNumber = HOME_FRAME + Math.round(captions.totalProgress() * (LAST_FRAME - HOME_FRAME));
              if (frameNumber !== lastFrame) {
                drawFrame(frameNumber);
                lastFrame = frameNumber;
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
            const introStart = performance.now();
            const introDuration = 2450;
            revealIntroPanels?.(() => {
              revealHeroText();
              startScrollFrameLoop();
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
              loadRemainingFrames();
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
                }
              }
            });
          }

          // Caption timeline — positions derived from per-frame analysis of Hero_vault.mp4
          // scroll progress maps frame 80–999, after the automatic homepage
          // lead-in plays frames 44–80.
          const progressForFrame = (frame: number) =>
            Math.max(0, Math.min(1, (frame - HOME_FRAME) / (LAST_FRAME - HOME_FRAME)));
          //
          // Frame map:
          //   001–050  : black fade-in
          //   050–200  : aerial exterior — multiple polyhouses at golden sunrise
          //   200–280  : entering / walking into the tunnel
          //   280–400  : lettuce beds
          //   400–550  : kale rows
          //   550–650  : tomatoes on stakes
          //   650–780  : bell peppers (red + yellow)
          //   780–870  : ginger / turmeric (broad flat leaves)
          //   870–950  : black pepper vines
          //   950–999  : vanilla vines → flower (final shot)
          const captions = gsap.timeline({ paused: true });
          gsap.set(".hero-caption", { autoAlpha: 0, y: 22 });

          // Hero content fades out as soon as scroll begins
          captions.to(".hero__content", { autoAlpha: 0, y: -40, duration: 0.04, ease: "power2.in" }, 0);

          // Caption 1 — Aerial exterior | frames 080–140
          captions
            .to(".hero-caption--1", { autoAlpha: 1, y: 0, duration: 0.03, ease: "power2.out" }, progressForFrame(80))
            .to(".hero-caption--1", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(140));

          // Caption 2 — Entering polyhouse | frames 170–245 | progress 0.17–0.245
          captions
            .to(".hero-caption--2", { autoAlpha: 1, y: 0, duration: 0.03, ease: "power2.out" }, progressForFrame(170))
            .to(".hero-caption--2", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(245));

          // Caption 3 — Lettuce beds | frames 285–390 | progress 0.285–0.39
          captions
            .to(".hero-caption--3", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, progressForFrame(285))
            .to(".hero-caption--3", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(390));

          // Caption 4 — Kale rows | frames 415–530 | progress 0.415–0.53
          captions
            .to(".hero-caption--4", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, progressForFrame(415))
            .to(".hero-caption--4", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(530));

          // Caption 5 — Tomatoes | frames 560–645 | progress 0.56–0.645
          captions
            .to(".hero-caption--5", { autoAlpha: 1, y: 0, duration: 0.03, ease: "power2.out" }, progressForFrame(560))
            .to(".hero-caption--5", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(645));

          // Caption 6 — Bell peppers | frames 665–775 | progress 0.665–0.775
          captions
            .to(".hero-caption--6", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, progressForFrame(665))
            .to(".hero-caption--6", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(775));

          // Caption 7 — Ginger, Turmeric, Black pepper | frames 795–935 | progress 0.795–0.935
          captions
            .to(".hero-caption--7", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, progressForFrame(795))
            .to(".hero-caption--7", { autoAlpha: 0, y: -14, duration: 0.03 }, progressForFrame(935));

          // Caption 8 — Vanilla | frames 955–999 | progress 0.955–1.00, stays visible
          captions
            .to(".hero-caption--8", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, progressForFrame(955));

          // CSS sticky handles layout — ScrollTrigger tracks progress through the 800vh section
          ScrollTrigger.create({
            trigger: videoSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            animation: captions,
          });

          window.addEventListener("resize", () => {
            sizeCanvases();
            drawFrame(currentFrame);
            updateIntroPreview(currentFrame);
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

          const cropTunnel = document.querySelector<HTMLElement>("[data-crop-tunnel]");
          const cropNodes = gsap.utils.toArray<HTMLElement>("[data-crop-node]");

          if (cropTunnel && cropNodes.length) {
            gsap.from(cropNodes, {
              autoAlpha: 0,
              y: 24,
              stagger: 0.05,
              duration: 0.65,
              scrollTrigger: {
                trigger: cropTunnel,
                start: "top 72%",
                once: true,
              },
            });
          }

          gsap.utils.toArray<HTMLElement>(".macro-card").forEach((card, index) => {
            gsap.from(card, {
              autoAlpha: 0,
              y: 44,
              duration: 0.75,
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              },
            });

            gsap.to(card, {
              y: index % 2 === 0 ? -34 : -18,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-flow-gallery]",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
              },
            });
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: "[data-flow-final]",
              start: "top bottom",
              end: "top top",
              scrub: 0.8,
            },
          })
            .fromTo(".final-cta__image", { scale: 1.12 }, { scale: 1, ease: "none" }, 0)
            .fromTo(".final-cta__content", { y: 72, opacity: 0.45 }, { y: 0, opacity: 1, ease: "none" }, 0);
        });

        matchMedia.add("(max-width: 980px)", () => {});

        ScrollTrigger.refresh();
      });
    });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      context?.revert();
      matchMedia.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
