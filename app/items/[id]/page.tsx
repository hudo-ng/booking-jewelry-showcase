import Link from "next/link";
import { Suspense } from "react";

// Jewelry item page: always a full page (no overlay).
export default function ItemPage({ params }: PageProps<"/items/[id]">) {
  return (
    <main className="mx-auto w-full max-w-lg p-4">
      <Link href="/" className="mb-4 inline-block underline">
        ← Gallery
      </Link>
      <Suspense fallback={<p>Loading item…</p>}>
        {params.then(({ id }) => (
          <h1 className="mb-4 text-2xl font-semibold">Item {id}</h1>
        ))}
      </Suspense>
      <h2 className="mb-2 font-semibold">Also seen in</h2>
      <ul className="flex gap-2">
        {["3", "4"].map((photoId) => (
          <li key={photoId}>
            <Link href={`/photos/${photoId}`} className="rounded border px-3 py-1">
              Photo {photoId}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
