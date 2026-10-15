import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getItem } from "@/lib/api/jewelry";
import { formatPrice } from "@/lib/format";

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
      <Image
        src={item.photoUrl}
        alt={item.name}
        width={512}
        height={512}
        sizes="(min-width: 512px) 512px, 100vw"
        className="mb-4 h-auto w-full rounded-lg bg-zinc-200 dark:bg-zinc-800"
      />
      <h1 className="text-2xl font-semibold">{item.name}</h1>
      <p className="mb-4 text-lg">{formatPrice(item.price)}</p>
      {item.description && <p className="mb-4 whitespace-pre-line">{item.description}</p>}

      <h2 className="mb-2 font-semibold">Also seen in</h2>
      {item.demoPhotos.length === 0 ? (
        <p>Not in any photos yet.</p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {item.demoPhotos.map((photo) => (
            <li key={photo.id}>
              <Link href={`/photos/${photo.id}`} className="block">
                <Image
                  src={photo.photoUrl}
                  alt={`Another look with ${item.name}`}
                  width={96}
                  height={96}
                  className="size-24 rounded object-cover"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
