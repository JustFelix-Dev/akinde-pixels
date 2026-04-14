import type { HomePageView, MediaAsset } from "@/src/lib/cms/types";

const asString = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim().length > 0 ? value : undefined;

export const mapMedia = (media: unknown): MediaAsset | undefined => {
  if (!media || typeof media !== "object") {
    return undefined;
  }

  const mediaObject = media as Record<string, unknown>;
  const url = asString(mediaObject.url);

  if (!url) {
    return undefined;
  }

  return {
    url,
    alt: asString(mediaObject.alt) || "Akinde Pixels media",
    mimeType: asString(mediaObject.mimeType),
  };
};

export const defaultHomePageView = (): HomePageView => ({
  siteName: "AKINDE PIXELS",
  navItems: [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Pricing", href: "#pricing" },
    { label: "Gallery", href: "#gallery" },
    { label: "Book Now", href: "#book-now" },
  ],
  socialItems: [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "Pinterest", url: "https://pinterest.com" },
  ],
  contactEmail: "akindepixels@gmail.com",
  footerText: "All right reserved © 2026 Akinde Pixels",
  bookNowUrl: "#book-now",
  hero: {
    headline: "Want to create those timeless memories?",
    subtext: "Reserve your spot today.",
    video: {
      url: "/hero-video.mp4",
      alt: "Akinde Pixels hero video",
      mimeType: "video/mp4",
    },
  },
  welcomeTitle: "Welcome!",
  welcomeBody:
    "At Akinde Pixels, every click captures emotion and every frame tells your unique story. We approach each session with a calm, intentional process so you can be fully present while we document the moments that matter most.\n\nFrom weddings and portraits to lifestyle and events, we focus on real interactions, authentic expressions, and thoughtful composition. Every image is crafted to feel natural, cinematic, and deeply personal.\n\nYour memories deserve more than simple pictures. They deserve visual storytelling that remains timeless, elegant, and alive each time you revisit your gallery.",
  testimonialsTitle: "Testimonials",
  galleryItems: [],
  pricingItems: [],
  testimonials: [
    {
      id: "default-testimonial-1",
      clientName: "Ada & Tunde",
      role: "Wedding Couple",
      quote:
        "Akinde Pixels captured our day with so much care and emotion. Every frame feels timeless and full of life.",
    },
    {
      id: "default-testimonial-2",
      clientName: "Mariam A.",
      role: "Portrait Client",
      quote:
        "The whole session felt effortless and professional. The final gallery looked cinematic, natural, and truly personal.",
    },
    {
      id: "default-testimonial-3",
      clientName: "Kemi Events",
      role: "Event Planner",
      quote:
        "Reliable, calm, and incredibly creative. They documented the energy of the event beautifully from start to finish.",
    },
  ],
});
