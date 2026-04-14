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
      name: "heroHeadline",
      type: "text",
      required: true,
      defaultValue: "Want to create those timeless memories?",
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
  ],
};
