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
    if (reduceMotion) return;

    let context: gsap.Context | undefined;
    let rafId: number | null = null;
    const matchMedia = gsap.matchMedia();

    // Split-panel intro animation
    const introEl = document.querySelector<HTMLElement>("[data-intro]");
    const introTop = document.querySelector<HTMLElement>(".intro__panel--top");
    const introBottom = document.querySelector<HTMLElement>(".intro__panel--bottom");

    if (introEl && introTop && introBottom) {
      document.body.style.overflow = "hidden";

      const finishIntro = () => {
        introEl.style.display = "none";
        document.body.style.overflow = "";
      };

      // Safety valve — if something stalls the animation, force-complete after 5s
      const safetyTimer = window.setTimeout(finishIntro, 5000);

      // Phase 1: mark is visible immediately, name starts hidden below it
      gsap.set(".intro__name", { autoAlpha: 0, y: 16 });

      gsap.timeline({
        onComplete: () => {
          window.clearTimeout(safetyTimer);
          finishIntro();
        },
      })
        // Phase 2: name lifts into view from below the mark (~T → Terminal reveal)
        .to(".intro__name", {
          autoAlpha: 1,
          y: 0,
          duration: 0.68,
          ease: "power2.out",
          delay: 0.28,
        })
        // Phase 3: brief hold, then panels split open revealing the hero
        .to(
          [introTop, introBottom],
          {
            yPercent: (i: number) => (i === 0 ? -100 : 100),
            duration: 1.1,
            ease: "power3.inOut",
          },
          "+=0.44"
        );
    }

    waitForDynamicContent(() => {
      context = gsap.context(() => {
        gsap.defaults({ ease: "power3.out" });
        gsap.set(".reveal:not(.hero__content):not([data-crop-stage])", { autoAlpha: 0, y: 34 });
        gsap.set(".journey-card", { autoAlpha: 1, y: 0 });

        // Hero text enters as panels are mid-split (~1.4s from load)
        gsap.timeline({ defaults: { duration: 0.85 }, delay: 1.38 })
          .from(".hero .eyebrow", { autoAlpha: 0, y: 18 }, 0)
          .from(".hero h1", { autoAlpha: 0, y: 28 }, 0.14)
          .from(".hero__lede", { autoAlpha: 0, y: 24 }, 0.28)
          .from(".hero__actions", { autoAlpha: 0, y: 20 }, 0.42)
          .from(".hero__proof > div", { autoAlpha: 0, y: 22, stagger: 0.08 }, 0.56);

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
          const FRAME_COUNT = 999;
          const frames: HTMLImageElement[] = [];

          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;

          const drawFrame = (index: number) => {
            const frame = frames[Math.min(index, frames.length - 1)];
            if (!frame?.complete || !ctx) return;
            const iw = frame.naturalWidth || 1920;
            const ih = frame.naturalHeight || 1080;
            const cw = canvas.width;
            const ch = canvas.height;
            const scale = Math.max(cw / iw, ch / ih);
            const x = (cw - iw * scale) / 2;
            const y = (ch - ih * scale) / 2;
            ctx.drawImage(frame, x, y, iw * scale, ih * scale);
          };

          // Preload all frames; draw first one immediately
          for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
            img.onload = () => { if (i === 1) drawFrame(0); };
            frames.push(img);
          }

          // Caption timeline — positions derived from per-frame analysis of Hero_vault.mp4
          // progress = frame / 998, section = 800vh, scrub = 0.5
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

          // Caption 1 — Aerial exterior | frames 065–140 | progress 0.065–0.14
          captions
            .to(".hero-caption--1", { autoAlpha: 1, y: 0, duration: 0.03, ease: "power2.out" }, 0.07)
            .to(".hero-caption--1", { autoAlpha: 0, y: -14, duration: 0.03 }, 0.13);

          // Caption 2 — Entering polyhouse | frames 170–245 | progress 0.17–0.245
          captions
            .to(".hero-caption--2", { autoAlpha: 1, y: 0, duration: 0.03, ease: "power2.out" }, 0.18)
            .to(".hero-caption--2", { autoAlpha: 0, y: -14, duration: 0.03 }, 0.245);

          // Caption 3 — Lettuce beds | frames 285–390 | progress 0.285–0.39
          captions
            .to(".hero-caption--3", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, 0.29)
            .to(".hero-caption--3", { autoAlpha: 0, y: -14, duration: 0.03 }, 0.39);

          // Caption 4 — Kale rows | frames 415–530 | progress 0.415–0.53
          captions
            .to(".hero-caption--4", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, 0.425)
            .to(".hero-caption--4", { autoAlpha: 0, y: -14, duration: 0.03 }, 0.53);

          // Caption 5 — Tomatoes | frames 560–645 | progress 0.56–0.645
          captions
            .to(".hero-caption--5", { autoAlpha: 1, y: 0, duration: 0.03, ease: "power2.out" }, 0.57)
            .to(".hero-caption--5", { autoAlpha: 0, y: -14, duration: 0.03 }, 0.645);

          // Caption 6 — Bell peppers | frames 665–775 | progress 0.665–0.775
          captions
            .to(".hero-caption--6", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, 0.675)
            .to(".hero-caption--6", { autoAlpha: 0, y: -14, duration: 0.03 }, 0.775);

          // Caption 7 — Ginger, Turmeric, Black pepper | frames 795–935 | progress 0.795–0.935
          captions
            .to(".hero-caption--7", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, 0.805)
            .to(".hero-caption--7", { autoAlpha: 0, y: -14, duration: 0.03 }, 0.935);

          // Caption 8 — Vanilla | frames 955–999 | progress 0.955–1.00, stays visible
          captions
            .to(".hero-caption--8", { autoAlpha: 1, y: 0, duration: 0.04, ease: "power2.out" }, 0.96);

          // CSS sticky handles layout — ScrollTrigger tracks progress through the 800vh section
          ScrollTrigger.create({
            trigger: videoSection,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
            animation: captions,
          });

          // Continuous rAF loop — reads lagged animation progress so frames stay
          // in sync with the scrub momentum rather than snapping to raw scroll
          let lastIndex = -1;
          const tick = () => {
            const index = Math.round(captions.totalProgress() * (FRAME_COUNT - 1));
            if (index !== lastIndex) {
              drawFrame(index);
              lastIndex = index;
            }
            rafId = requestAnimationFrame(tick);
          };
          rafId = requestAnimationFrame(tick);
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
