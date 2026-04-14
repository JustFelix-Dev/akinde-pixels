import { defaultHomePageView, mapMedia } from "@/src/lib/cms/mappers";
import { getPayloadClient } from "@/src/lib/cms/payload";
import type { HomePageView } from "@/src/lib/cms/types";

const relationToObject = (value: unknown) =>
  value && typeof value === "object" ? (value as Record<string, unknown>) : null;

export const getHomePageData = async (isDraftMode = false): Promise<HomePageView> => {
  const fallback = defaultHomePageView();

  try {
    const payload = await getPayloadClient();

    const [siteSettings, homepage, galleryResult, pricingResult, testimonialResult] =
      await Promise.all([
        payload.findGlobal({ slug: "site-settings", depth: 1, draft: isDraftMode }),
        payload.findGlobal({ slug: "homepage", depth: 1, draft: isDraftMode }),
        payload.find({
          collection: "gallery-items",
          depth: 1,
          limit: 12,
          sort: "displayOrder",
          draft: isDraftMode,
        }),
        payload.find({
          collection: "pricing",
          limit: 6,
          draft: isDraftMode,
        }),
        payload.find({
          collection: "testimonials",
          depth: 1,
          limit: 8,
          draft: isDraftMode,
        }),
      ]);

    const navItems = Array.isArray(siteSettings.navItems)
      ? siteSettings.navItems
          .map((item) => ({
            label: item.label ?? "",
            href: item.href ?? "",
          }))
          .filter((item) => item.label && item.href)
      : fallback.navItems;
    const socialItems = Array.isArray(siteSettings.socialItems)
      ? siteSettings.socialItems
          .map((item) => ({
            label: item.label ?? "",
            url: item.url ?? "",
          }))
          .filter((item) => item.label && item.url)
      : fallback.socialItems;

    return {
      ...fallback,
      logo: mapMedia(relationToObject(siteSettings.logo)),
      navItems: navItems.length > 0 ? navItems : fallback.navItems,
      socialItems: socialItems.length > 0 ? socialItems : fallback.socialItems,
      contactEmail: siteSettings.contactEmail ?? fallback.contactEmail,
      footerText: siteSettings.footerText ?? fallback.footerText,
      bookNowUrl: siteSettings.bookNowUrl ?? fallback.bookNowUrl,
      hero: {
        headline: homepage.heroHeadline ?? fallback.hero.headline,
        subtext: homepage.heroSubtext ?? fallback.hero.subtext,
        video:
          mapMedia(relationToObject(homepage.heroVideo)) ??
          fallback.hero.video,
        fallbackImage: mapMedia(relationToObject(homepage.heroFallbackImage)),
      },
      welcomeTitle: homepage.welcomeTitle ?? fallback.welcomeTitle,
      welcomeBody: homepage.welcomeBody ?? fallback.welcomeBody,
      testimonialsTitle: homepage.testimonialsTitle ?? fallback.testimonialsTitle,
      galleryItems: galleryResult.docs.map((item) => ({
        id: String(item.id),
        title: item.title,
        category: item.category,
        caption: item.caption ?? undefined,
        media: mapMedia(relationToObject(item.media)),
      })),
      pricingItems: pricingResult.docs.map((item) => ({
        id: String(item.id),
        name: item.name,
        priceLabel: item.priceLabel,
        description: item.description,
        features: Array.isArray(item.features)
          ? item.features.map((feature) => feature.feature).filter(Boolean)
          : [],
        ctaLabel: item.ctaLabel ?? "Book now",
      })),
      testimonials: testimonialResult.docs.map((item) => ({
        id: String(item.id),
        clientName: item.clientName,
        role: item.role ?? undefined,
        quote: item.quote,
        portrait: mapMedia(relationToObject(item.portrait)),
      })),
    };
  } catch {
    return fallback;
  }
};
