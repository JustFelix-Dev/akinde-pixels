This is a minimal photography website built with [Next.js](https://nextjs.org), [Payload CMS](https://payloadcms.com), Tailwind CSS, and GSAP.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment file:

```bash
cp .env.example .env
```

3. Set your database URL in `.env`:

```bash
# Neon (recommended) or any Postgres-compatible URL
DATABASE_URI=postgresql://<user>:<password>@<host>/<db>?sslmode=require
```

4. Run dev server:

```bash
npm run dev
```

Website: [http://localhost:3000](http://localhost:3000)  
Payload admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Architecture

- `src/payload/*`: Payload collections and globals (content model).
- `src/lib/cms/*`: server data access and mapping to UI-safe view models.
- `src/components/site/*`: presentational section components.
- `src/components/animations/*`: GSAP client-side animation wrappers.
- `app/(payload)/*`: Payload admin and API routes.

## CMS Content Coverage

Editable through Payload:
- Logo, nav items, footer/contact info
- Hero video/image and copy
- Welcome section
- Gallery items
- Pricing cards
- Testimonials

## Tests

```bash
npm run test
```

## Notes

- GSAP animations are subtle and skip animation when reduced-motion is enabled.
- If CMS data is missing, the page renders safe defaults so the site remains usable.
- Live preview flow: use Payload's side-by-side preview panel in Global edit view and click update/refresh there after saving drafts.
