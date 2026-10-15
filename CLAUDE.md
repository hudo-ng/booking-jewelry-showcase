# Jewelry Showcase (web app)

Public, read-only web app that shows Hyperinkers' jewelry: a gallery of demo photos (customers wearing the jewelry), filterable by category, where each photo lists the jewelry items in it ("Get this look"). Inspired by an in-store jewelry kiosk video (Banter by Piercing Pagoda), but this is a normal website, not a kiosk. Must not copy that brand's name or assets.

## How to work with me (the developer)
- **I want to decide each step and learn.** Before writing code, explain the step, the options and your recommendation, then wait for my decision.
- Explain *why*, not just *what*: new concepts (Next.js App Router, server vs client components, caching, etc.) in plain language.
- Keep steps small so I can follow and review each one.
- I decide what to commit. Don't commit, and don't ask about committing.
- Keep code comments to a minimum; put explanations in the chat, not in the code.

## Decisions already made
- New, separate app (not part of `booking-system-front`).
- Heavy touch use on phones/tablets: pinch-zoom, swiping, tapping. Must be responsive. Never disable browser zoom.
- Stack:
  - Next.js 16 (App Router, Cache Components on) + TypeScript + React 19, hosted on Vercel. npm.
  - Tailwind CSS v4 (configured in `app/globals.css`, no `tailwind.config`).
  - **Data is fetched on the server** in server components, using plain `fetch` with `"use cache"`. No axios. TanStack Query is planned only for browser-side needs later (gallery infinite scroll, live search).
  - Plain TypeScript types for API responses (no runtime validation such as Zod).
  - Images: `next/image` with a custom ImageKit loader (`lib/imagekit-loader.ts`, `?tr=w-…,q-…`), so Vercel's image optimization isn't used.
  - Planned: CSS-columns masonry grid, PhotoSwipe (`react-photoswipe-gallery`) for pinch/double-tap zoom and swipe, Vaul bottom sheet for "Get this look" on phones. Optional: Motion for animations.
- Folder layout: no `src/`. `app/` holds routes only, `components/` holds shared UI, `lib/` holds API code and helpers. The `@/*` import alias points to the project root.
- Each opened photo / item has its own URL (shareable, link previews, back button closes it).

## Routes
- `/`: gallery. `/?category=<categoryId>` filters it (category ids for now, names maybe later).
- `/photos/[id]`: photo. When tapped inside the app, it opens as an **overlay** on top of the current page (intercepting + parallel routes: `app/@modal/(.)photos/[id]`). A direct visit, shared link or refresh shows the full page. Back closes the overlay. `components/PhotoDetails.tsx` is shared by both versions.
  - `app/@modal/default.tsx` and `app/@modal/[...catchAll]/page.tsx` return `null`, so the overlay is cleared on any other URL. Both are required.
- `/items/[id]`: jewelry item, always a full page.
- Later, optional: `/items` (All Jewelry, with search / price sort).

## Data layer (`lib/api/`)
- `types.ts`: response types (ids are UUID strings, `description` can be `null`).
- `client.ts`: `apiGet` (throws on error) and `apiGetOrNull` (returns `null` on 404). Base URL comes from env `API_URL`, falling back to production.
- `jewelry.ts`: `getCategories`, `getDemoPhotos({ categoryId, page })`, `getDemoPhoto(id)`, `getItem(id)`. Each has `"use cache"` + `cacheLife({ revalidate: 60 })`, and `expire` stays at the default (never), so visitors don't wait for Render's free plan to wake the API.
- Pages read `params` / `searchParams` inside `<Suspense>`, as Cache Components requires. An unknown id calls `notFound()`.

## Planned user flow
1. **Gallery** (landing): grid of demo photos, newest first, with category chips (All + categories).
2. Tap a **category chip** → gallery filtered to that category.
3. Tap a **photo** → large photo + categories + "Get this look": the attached jewelry items (photo, name, price).
4. Tap a **jewelry item** → item details (photo, name, description, price) + "Also seen in" other demo photos.
5. Optional **All Jewelry** page: item grid with search / price sort.

### Still undecided
- What the button on an item does (suggestion: "Book an appointment" → existing booking site `/book`).
- Whether jewelry items get their own categories (today only demo photos have categories).

## Backend API (already built, in `../booking-system-api`)
Base URL (production): `https://hk-booking-system-api.onrender.com`. CORS is open.
All public endpoints are read-only GETs, no auth. Lists are paged: `page` (default 1), `limit` (default 20, max 100).

- `GET /jewelry/categories`
  → `{ success, categories: [{ id, name, createdAt, updatedAt, demoPhotoCount }] }` (sorted by name)
- `GET /jewelry/items?search=&page=&limit=`
  → `{ success, items: [{ id, name, description, price, photoUrl, createdAt }], page, limit, total }` (newest first)
- `GET /jewelry/items/:id`
  → `{ success, item: { id, name, description, price, photoUrl, createdAt, demoPhotos: [{ id, photoUrl }] } }`
- `GET /jewelry/demo-photos?categoryId=&itemId=&page=&limit=`
  → `{ success, demoPhotos: [DemoPhoto], page, limit, total }` (newest first)
- `GET /jewelry/demo-photos/:id` → `{ success, demoPhoto: DemoPhoto }`

`DemoPhoto = { id, photoUrl, photoFileId, createdAt, updatedAt, categories: [{ id, name }], items: [{ id, name, description, price, photoUrl }] }`
Errors: `{ success: false, message }` with 404 for unknown ids. `price` is a number in USD.

Content is managed by staff in the mobile app (`../hkappointment`, Settings → Jewelry Showcase), which uses the `/jewelry/admin/*` endpoints. Photos are uploaded straight from the app to ImageKit (`components/jewelry/jewelryPhoto.ts`).

## Local development
- `npm run dev`, then open **http://127.0.0.1:3000**. Not `localhost:3000`: a "Solo Service" on this laptop occupies `localhost:3000` (IPv6).
- Phone/tablet testing: same Wi-Fi, open `http://10.0.0.199:3000`. Both hosts are listed in `allowedDevOrigins` in `next.config.ts`. Without that, Next.js blocks its dev scripts, links do full page reloads, and the overlay never appears. Update the IP if the laptop gets a new one (the `npm run dev` output shows it).
- Restart the dev server after changing `next.config.ts`, or if a page looks out of date after an edit (the file watcher once missed a change).
- Checks: `npx tsc --noEmit`, `npm run lint`, `npm run build`.
- Next.js 16 differs from older versions. Read the bundled docs in `node_modules/next/dist/docs/` before using an API (see `AGENTS.md`).

## Status (as of 2026-10-15)
- Backend jewelry endpoints are deployed and working in production.
- Mobile admin portal works on a device: test content (1 category, 1 demo photo, 1 item) was added through it.
- Web app, done:
  1. Project scaffolded (create-next-app, no `src/`).
  2. Routes + photo overlay.
  3. Data layer (server fetching + caching).
  4. Real images through ImageKit (5b).
- Next steps:
  - **5c**: masonry grid + gallery styling (columns per screen size, spacing, category chips on phones).
  - **5d**: PhotoSwipe zoom/swipe, then the Vaul bottom sheet. This requires storing image width/height first: add optional `photoWidth`/`photoHeight` to `DemoPhoto` and `JewelryItem` in the backend, and have the mobile app send `data.width`/`data.height` from the ImageKit upload response. Until then, images start as square placeholders and adjust to their real shape when loaded.
  - Later: link previews (`generateMetadata`), "load more"/infinite scroll (TanStack Query), All Jewelry page, deploy to Vercel.

## Related projects (siblings in `Desktop/booking/`)
- `booking-system-api`: Express + Prisma + Postgres backend (Render).
- `booking-system-front`: existing booking website (Vite + React + Tailwind, Vercel).
- `hkappointment`: staff mobile app (Expo / React Native).
