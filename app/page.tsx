import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getCategories, getDemoPhotos } from "@/lib/api/jewelry";
import { photoAlt } from "@/lib/format";

export default function GalleryPage({ searchParams }: PageProps<"/">) {
  return (
    <main className="mx-auto w-full max-w-3xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">Gallery</h1>

      <Suspense fallback={<p>Loading photos…</p>}>
        {searchParams.then(({ category }) => (
          <Gallery categoryId={typeof category === "string" ? category : undefined} />
        ))}
      </Suspense>
    </main>
  );
}

async function Gallery({ categoryId }: { categoryId?: string }) {
  const [categories, { demoPhotos, total }] = await Promise.all([
    getCategories(),
    getDemoPhotos({ categoryId }),
  ]);

  return (
    <>
      {categories.length > 0 && (
        <nav className="mb-4 flex flex-wrap gap-2">
          <Link
            href="/"
            className={`rounded-full border px-3 py-1 ${!categoryId ? "bg-foreground text-background" : ""}`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/?category=${category.id}`}
              className={`rounded-full border px-3 py-1 ${category.id === categoryId ? "bg-foreground text-background" : ""}`}
            >
              {category.name}
            </Link>
          ))}
        </nav>
      )}

      {demoPhotos.length === 0 ? (
        <p>{categoryId ? "No photos in this category yet." : "No photos yet."}</p>
      ) : (
        <>
          <p className="mb-4 text-sm text-zinc-500">
            Showing {demoPhotos.length} of {total}
          </p>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {demoPhotos.map((photo) => (
              <li key={photo.id}>
                <Link href={`/photos/${photo.id}`} className="block">
                  <Image
                    src={photo.photoUrl}
                    alt={photoAlt(photo.items.map((item) => item.name))}
                    width={400}
                    height={400}
                    sizes="(min-width: 640px) 33vw, 50vw"
                    className="h-auto w-full rounded-lg bg-zinc-200 dark:bg-zinc-800"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
