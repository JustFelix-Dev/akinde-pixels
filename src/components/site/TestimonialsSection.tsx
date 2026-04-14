import Image from "next/image";

import type { TestimonialView } from "@/src/lib/cms/types";

type TestimonialsSectionProps = {
  title: string;
  items: TestimonialView[];
};

export function TestimonialsSection({ title, items }: TestimonialsSectionProps) {
  return (
    <section id="testimonials" className="space-y-8 md:space-y-10">
      <div className="space-y-3">
        <h3 className="text-sm uppercase tracking-[0.24em] text-zinc-500 sm:text-base">{title}</h3>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        {items.map((item) => (
          <blockquote key={item.id} className="rounded-sm border border-zinc-200/80 bg-white/70 p-5 transition-colors hover:border-zinc-300 sm:p-7">
            <div className="mb-5 flex items-center gap-3">
              {item.portrait ? (
                <Image
                  src={item.portrait.url}
                  alt={item.portrait.alt}
                  width={48}
                  height={48}
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <span className="inline-block h-2 w-2 rounded-full bg-orange-500" aria-hidden />
              )}
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-800">{item.clientName}</p>
                {item.role ? <p className="text-xs text-zinc-500">{item.role}</p> : null}
              </div>
            </div>
            <p className="text-base leading-relaxed text-zinc-700 sm:text-lg">&ldquo;{item.quote}&rdquo;</p>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
