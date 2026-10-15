import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { getCategories, getDemoPhotos } from "@/lib/api/jewelry";
import { photoAlt } from "@/lib/format";

export default function GalleryPage({ searchParams }: PageProps<"/">) {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 pb-8">
      <h1 className="pt-6 pb-4 text-2xl font-semibold tracking-wide sm:text-3xl">Get the look</h1>

      <Suspense fallback={<p className="text-muted">Loading photos…</p>}>
        {searchParams.then(({ category }) => (
          <Gallery categoryId={typeof category === "string" ? category : undefined} />
        ))}
      </Suspense>
    </main>
  );
}

async function Gallery({ categoryId }: { categoryId?: string }) {
  const [categories, { demoPhotos }] = await Promise.all([
    getCategories(),
    getDemoPhotos({ categoryId }),
  ]);

  return (
    <>
      {categories.length > 0 && (
        <nav className="-mx-4 mb-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
          <CategoryChip href="/" active={!categoryId}>
            All
          </CategoryChip>
          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              href={`/?category=${category.id}`}
              active={category.id === categoryId}
            >
              {category.name}
            </CategoryChip>
          ))}
        </nav>
      )}

      {demoPhotos.length === 0 ? (
        <p className="text-muted">
          {categoryId ? "No photos in this category yet." : "No photos yet."}
        </p>
      ) : (
        <ul className="columns-2 gap-2 sm:columns-3 sm:gap-3 lg:columns-4">
          {demoPhotos.map((photo) => (
            <li key={photo.id} className="mb-2 break-inside-avoid sm:mb-3">
              <Link href={`/photos/${photo.id}`} className="block">
                <Image
                  src={photo.photoUrl}
                  alt={photoAlt(photo.items.map((item) => item.name))}
                  width={400}
                  height={400}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="h-auto w-full rounded-md bg-surface transition-opacity hover:opacity-85"
                />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function CategoryChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`shrink-0 rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-colors ${
        active
          ? "border-brand bg-brand text-white"
          : "border-cream/25 text-cream hover:border-cream/60"
      }`}
    >
      {children}
    </Link>
  );
}
