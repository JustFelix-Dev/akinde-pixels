"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type FadeInSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function FadeInSection({ children, className, delay = 0 }: FadeInSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || !sectionRef.current) {
      return;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          delay,
          duration: 0.7,
          ease: "power2.out",
        },
      );
    });

    return () => context.revert();
  }, [delay]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}
