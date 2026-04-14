import type { CollectionConfig } from "payload";

export const Pricing: CollectionConfig = {
  slug: "pricing",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "priceLabel", "updatedAt"],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "priceLabel",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "features",
      type: "array",
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "ctaLabel",
      type: "text",
      defaultValue: "Book now",
    },
  ],
};
