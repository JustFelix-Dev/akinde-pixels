import type { CollectionConfig } from "payload";

export const GalleryItems: CollectionConfig = {
  slug: "gallery-items",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "updatedAt"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Wedding", value: "wedding" },
        { label: "Portrait", value: "portrait" },
        { label: "Event", value: "event" },
        { label: "Lifestyle", value: "lifestyle" },
      ],
    },
    {
      name: "media",
      type: "relationship",
      relationTo: "media",
      required: true,
    },
    {
      name: "caption",
      type: "text",
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 1,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
  ],
};
