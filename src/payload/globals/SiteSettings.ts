import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
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
      name: "logo",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "navItems",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "socialItems",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "contactEmail",
      type: "email",
    },
    {
      name: "footerText",
      type: "textarea",
    },
    {
      name: "bookNowUrl",
      type: "text",
      defaultValue: "#book-now",
    },
  ],
};
