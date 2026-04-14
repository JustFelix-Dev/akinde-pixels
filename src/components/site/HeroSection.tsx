"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import type { HeroContent } from "@/src/lib/cms/types";

type HeroSectionProps = {
  hero: HeroContent;
};

export function HeroSection({ hero }: HeroSectionProps) {
  const animatedTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const animatedEl = animatedTextRef.current;
    const phrases = ["timeless memories?", "cinematic moments?", "beautiful stories?"];

    if (!animatedEl) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      animatedEl.textContent = phrases[0];
      return;
    }

    animatedEl.textContent = "";
    const context = gsap.context(() => {
      const state = { chars: 0, phraseIndex: 0 };
      const typeNext = () => {
        const currentPhrase = phrases[state.phraseIndex];
        gsap.to(state, {
          chars: currentPhrase.length,
          duration: 1.2,
          ease: "none",
          snap: { chars: 1 },
          onUpdate: () => {
            animatedEl.textContent = currentPhrase.slice(0, state.chars);
          },
          onComplete: () => {
            gsap.to({}, {
              duration: 0.9,
              onComplete: () => {
                gsap.to(state, {
                  chars: 0,
                  duration: 0.8,
                  ease: "none",
                  snap: { chars: 1 },
                  onUpdate: () => {
                    animatedEl.textContent = currentPhrase.slice(0, state.chars);
                  },
                  onComplete: () => {
                    state.phraseIndex = (state.phraseIndex + 1) % phrases.length;
                    typeNext();
                  },
                });
              },
            });
          },
        });
      };

      typeNext();

    });

    return () => context.revert();
  }, [hero.headline]);

  return (
    <section id="home" className="space-y-6">
      <h1 className="mb-8 max-w-3xl text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl md:mb-12 md:text-5xl">
        <span>Want to create those </span>
        <span
          ref={animatedTextRef}
          className="inline-block min-w-[12ch] text-orange-500 sm:min-w-[14ch]"
          aria-live="polite"
        />
      </h1>
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-zinc-100 sm:aspect-video">
        {hero.video ? (
          <video className="h-full w-full object-cover" autoPlay muted loop playsInline controls={false}>
            <source src={hero.video.url} type={hero.video.mimeType || "video/mp4"} />
          </video>
        ) : hero.fallbackImage ? (
          <Image
            src={hero.fallbackImage.url}
            alt={hero.fallbackImage.alt}
            width={1400}
            height={900}
            className="h-full w-full object-cover"
            priority
          />
        ) : (
          <div className="flex h-80 items-center justify-center text-zinc-500">Upload a hero video from Payload CMS.</div>
        )}
        <button
          type="button"
          onClick={() => window.alert("Booking screen coming soon")}
          className="absolute bottom-4 left-4 rounded-full border border-black bg-black px-4 py-2 text-sm uppercase tracking-[0.16em] text-white transition hover:bg-zinc-900 sm:bottom-6 sm:left-6 sm:px-5 sm:text-base"
        >
          {hero.subtext}
        </button>
      </div>
    </section>
  );
}
