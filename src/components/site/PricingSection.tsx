"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";

import type { PricingItemView } from "@/src/lib/cms/types";

type PricingSectionProps = {
  items: PricingItemView[];
  bookNowUrl: string;
};

export function PricingSection({ items, bookNowUrl }: PricingSectionProps) {
  const featuredPackage = items[0];
  const rippleRef = useRef<HTMLSpanElement>(null);
  const rippleRingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const rippleEl = rippleRef.current;
    const rippleRingEl = rippleRingRef.current;
    if (!rippleEl || !rippleRingEl) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const context = gsap.context(() => {
      gsap.to(rippleRingEl, {
        scale: 1.9,
        opacity: 0,
        duration: 1.8,
        repeat: -1,
        repeatDelay: 0.1,
        ease: "power1.inOut",
      });

      gsap.to(rippleEl, {
        scale: 1.06,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    });

    return () => context.revert();
  }, []);

  return (
    <section id="pricing" className="py-2 sm:py-4">
      <article className="relative mx-auto flex max-w-3xl flex-col items-center overflow-hidden rounded-sm border border-zinc-200 bg-white/70 px-5 py-8 text-center sm:px-8 sm:py-10">
        <span
          ref={rippleRef}
          className="absolute right-0 top-6 inline-flex h-20 w-20 -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full border border-orange-300/80 bg-orange-500/10 sm:top-12 sm:h-28 sm:w-28"
          aria-hidden
        >
          <span ref={rippleRingRef} className="absolute h-14 w-14 rounded-full border border-orange-400/70 sm:h-20 sm:w-20" />
          <span className="h-8 w-8 rounded-full bg-orange-500 sm:h-11 sm:w-11" />
        </span>
        <p className="text-[11px] uppercase tracking-[0.24em] text-zinc-500">Pricing</p>
        <h3 className="mt-3 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl">Get memorable shots.</h3>
        {featuredPackage?.description ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">{featuredPackage.description}</p>
        ) : (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            Let us capture your best moments with a relaxed experience and timeless visuals.
          </p>
        )}
        {featuredPackage?.priceLabel ? (
          <p className="mt-4 text-xl font-light text-zinc-900 sm:text-2xl">{featuredPackage.priceLabel}</p>
        ) : null}
        <Link
          href={bookNowUrl}
          className="mt-7 inline-flex rounded-full bg-zinc-900 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-zinc-800 sm:px-6 sm:text-sm"
        >
          Get memorable shots
        </Link>
      </article>
    </section>
  );
}
