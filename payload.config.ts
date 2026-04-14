import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { GalleryItems } from "@/src/payload/collections/GalleryItems";
import { Media } from "@/src/payload/collections/Media";
import { Pricing } from "@/src/payload/collections/Pricing";
import { Testimonials } from "@/src/payload/collections/Testimonials";
import { Users } from "@/src/payload/collections/Users";
import { Homepage } from "@/src/payload/globals/Homepage";
import { SiteSettings } from "@/src/payload/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Users, Media, GalleryItems, Pricing, Testimonials],
  db: postgresAdapter({
    pool: {
      connectionString:
        process.env.DATABASE_URI || "postgresql://postgres:postgres@localhost:5432/akinde_pixels",
    },
  }),
  editor: lexicalEditor(),
  globals: [SiteSettings, Homepage],
  sharp,
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
});
