import Image from "next/image";

import type { GalleryItemView } from "@/src/lib/cms/types";

type GallerySectionProps = {
  items: GalleryItemView[];
};

export function GallerySection({ items }: GallerySectionProps) {
  return (
    <section id="gallery" className="space-y-6">
      <h3 className="text-2xl uppercase tracking-widest text-zinc-700">Gallery</h3>
      <div className="grid gap-6 sm:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="space-y-3">
            {item.media ? (
              <Image
                src={item.media.url}
                alt={item.media.alt}
                width={900}
                height={700}
                className="h-72 w-full rounded-sm object-cover"
              />
            ) : (
              <div className="h-72 w-full rounded-sm bg-zinc-100" />
            )}
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-widest text-zinc-500">{item.category}</p>
              <h4 className="text-lg text-zinc-900">{item.title}</h4>
              {item.caption ? <p className="text-sm text-zinc-600">{item.caption}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
