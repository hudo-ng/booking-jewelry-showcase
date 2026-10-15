# Jewelry Showcase (web app)

Public, read-only web app that shows Hyperinkers' jewelry: a gallery of demo photos (customers wearing the jewelry), filterable by category, where each photo lists the jewelry items in it ("Get this look"). Inspired by an in-store jewelry kiosk video (Banter by Piercing Pagoda), but this is a normal website, not a kiosk. Must not copy that brand's name or assets.

## How to work with me (the developer)
- **I want to decide each step and learn.** Before writing code, explain the step, the options and your recommendation, then wait for my decision.
- Explain *why*, not just *what*: new concepts (Next.js App Router, server vs client components, caching, etc.) in plain language.
- Keep steps small so I can follow and review each one.

## Decisions already made
- New, separate app (not part of `booking-system-front`).
- Heavy touch use on phones/tablets: pinch-zoom, swiping, tapping. Must be responsive. Never disable browser zoom.
- Recommended stack (agreed in principle, confirm details per step):
  - Next.js (App Router) + TypeScript, hosted on Vercel
  - Tailwind CSS
  - TanStack Query + axios for data
  - PhotoSwipe (`react-photoswipe-gallery`) for pinch/double-tap zoom and swipe
  - Vaul bottom sheet for "Get this look" on phones
  - CSS-columns masonry grid
  - ImageKit URL transformations for image sizes (photos are already hosted on ImageKit)
  - Optional: Motion for animations
- Each opened photo / item should have its own URL (shareable, link previews, back button closes it).

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
Base URL (production): `https://hk-booking-system-api.onrender.com` — CORS is open.
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

Content is managed by staff in the mobile app (`../hkappointment`, Settings → Jewelry Showcase), which uses the `/jewelry/admin/*` endpoints.

## Status (as of 2026-10-14)
- Backend jewelry endpoints exist; the backend needs `npx prisma db push` (adds the 3 jewelry tables) and a deploy before the API returns data in production.
- Mobile admin portal is built but not yet tested on a device (needs an EAS development build; Expo Go can't run that app).
- This web app: nothing scaffolded yet. First step = decide how to create the Next.js project.

## Related projects (siblings in `Desktop/booking/`)
- `booking-system-api` — Express + Prisma + Postgres backend (Render).
- `booking-system-front` — existing booking website (Vite + React + Tailwind, Vercel).
- `hkappointment` — staff mobile app (Expo / React Native).
