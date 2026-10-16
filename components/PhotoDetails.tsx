import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDemoPhoto } from "@/lib/api/jewelry";
import { formatPrice, photoAlt } from "@/lib/format";

export async function PhotoDetails({ id }: { id: string }) {
  const photo = await getDemoPhoto(id);
  if (!photo) notFound();

  const itemCount = photo.items.length;

  return (
    <div className="md:flex">
      <div className="flex items-center justify-center bg-black md:w-3/5">
        <Image
          src={photo.photoUrl}
          alt={photoAlt(photo.items.map((item) => item.name))}
          width={800}
          height={800}
          sizes="(min-width: 768px) 540px, 100vw"
          className="h-auto max-h-[85vh] w-full object-contain"
        />
      </div>

      <div className="p-4 md:w-2/5 md:p-6">
        {photo.categories.length > 0 && (
          <ul className="mb-5 flex flex-wrap gap-2">
            {photo.categories.map((category) => (
              <li
                key={category.id}
                className="rounded-full border border-cream/25 px-3 py-1 text-xs text-muted"
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}

        <h2 className="mb-3 text-lg font-semibold">
          Get this look
          {itemCount > 0 && (
            <span className="ml-2 font-normal text-muted">
              ({itemCount} {itemCount === 1 ? "item" : "items"})
            </span>
          )}
        </h2>

        {itemCount === 0 ? (
          <p className="text-muted">No jewelry linked to this photo yet.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {photo.items.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/items/${item.id}`}
                  className="flex items-center gap-3 rounded-lg border border-cream/15 p-2 hover:border-cream/40"
                >
                  <Image
                    src={item.photoUrl}
                    alt=""
                    width={64}
                    height={64}
                    className="size-16 shrink-0 rounded object-cover"
                  />
                  <span className="flex flex-col">
                    <span>{item.name}</span>
                    <span className="text-sm text-gold">{formatPrice(item.price)}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
