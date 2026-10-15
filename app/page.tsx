import Link from "next/link";
import { Suspense } from "react";

// Placeholder data until the API is wired up (step 4).
const FAKE_CATEGORIES = [
  { id: "1", name: "Ears" },
  { id: "2", name: "Nose" },
];
const FAKE_PHOTO_IDS = ["1", "2", "3", "4", "5", "6"];

// Gallery: `/` or `/?category=<id>`
export default function GalleryPage({ searchParams }: PageProps<"/">) {
  return (
    <main className="mx-auto w-full max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">Gallery</h1>

      <nav className="mb-4 flex gap-2">
        <Link href="/" className="rounded-full border px-3 py-1">
          All
        </Link>
        {FAKE_CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={`/?category=${category.id}`}
            className="rounded-full border px-3 py-1"
          >
            {category.name}
          </Link>
        ))}
      </nav>

      {/* Reading searchParams is request-time data, so it must sit inside <Suspense>. */}
      <Suspense fallback={<p className="mb-4">Loading filter…</p>}>
        {searchParams.then(({ category }) => (
          <p className="mb-4">Filter: {category ? `category ${category}` : "all"}</p>
        ))}
      </Suspense>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {FAKE_PHOTO_IDS.map((id) => (
          <li key={id}>
            <Link
              href={`/photos/${id}`}
              className="flex aspect-square items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800"
            >
              Photo {id}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
