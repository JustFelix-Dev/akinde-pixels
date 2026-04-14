import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  admin: {
    livePreview: {
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
  },
  versions: {
    drafts: {
      autosave: false,
      schedulePublish: false,
    },
  },
  fields: [
    {
      name: "heroVideo",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "heroFallbackImage",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "heroPrefix",
      type: "text",
      required: true,
      defaultValue: "Want to create those",
    },
    {
      name: "heroPhrases",
      type: "array",
      required: true,
      fields: [
        {
          name: "text",
          type: "text",
          required: true,
        },
      ],
      defaultValue: [
        { text: "timeless memories?" },
        { text: "cinematic moments?" },
        { text: "beautiful stories?" },
      ],
    },
    {
      name: "heroSubtext",
      type: "textarea",
      defaultValue: "Reserve your spot today.",
    },
    {
      name: "welcomeTitle",
      type: "text",
      required: true,
      defaultValue: "Welcome!",
    },
    {
      name: "welcomeBody",
      type: "textarea",
      required: true,
      defaultValue:
        "At Akinde Pixels, every click captures emotion and every frame tells your unique story. We approach each session with a calm, intentional process so you can be fully present while we document the moments that matter most.\n\nFrom weddings and portraits to lifestyle and events, we focus on real interactions, authentic expressions, and thoughtful composition. Every image is crafted to feel natural, cinematic, and deeply personal.\n\nYour memories deserve more than simple pictures. They deserve visual storytelling that remains timeless, elegant, and alive each time you revisit your gallery.",
    },
    {
      name: "testimonialsTitle",
      type: "text",
      defaultValue: "Testimonials",
    },
    {
      name: "pricingEyebrow",
      type: "text",
      defaultValue: "Pricing",
    },
    {
      name: "pricingHeadline",
      type: "text",
      defaultValue: "Get memorable shots.",
    },
    {
      name: "pricingDescription",
      type: "textarea",
      defaultValue:
        "Let us capture your best moments with a relaxed experience and timeless visuals.",
    },
    {
      name: "pricingCtaLabel",
      type: "text",
      defaultValue: "Get memorable shots",
    },
  ],
};
