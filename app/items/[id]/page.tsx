import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getItem } from "@/lib/api/jewelry";
import { formatPrice } from "@/lib/format";

// Jewelry item page: always a full page (no overlay).
export default function ItemPage({ params }: PageProps<"/items/[id]">) {
  return (
    <main className="mx-auto w-full max-w-lg p-4">
      <Link href="/" className="mb-4 inline-block underline">
        ← Gallery
      </Link>
      <Suspense fallback={<p>Loading item…</p>}>
        {params.then(({ id }) => <ItemDetails id={id} />)}
      </Suspense>
    </main>
  );
}

async function ItemDetails({ id }: { id: string }) {
  const item = await getItem(id);
  if (!item) notFound();

  return (
    <>
      <h1 className="text-2xl font-semibold">{item.name}</h1>
      <p className="mb-4 text-lg">{formatPrice(item.price)}</p>
      {item.description && <p className="mb-4 whitespace-pre-line">{item.description}</p>}

      <h2 className="mb-2 font-semibold">Also seen in</h2>
      {item.demoPhotos.length === 0 ? (
        <p>Not in any photos yet.</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {item.demoPhotos.map((photo, index) => (
            <li key={photo.id}>
              <Link href={`/photos/${photo.id}`} className="rounded border px-3 py-1">
                Photo {index + 1}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
