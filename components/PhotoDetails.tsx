import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDemoPhoto } from "@/lib/api/jewelry";
import { formatPrice, photoAlt } from "@/lib/format";

export async function PhotoDetails({ id }: { id: string }) {
  const photo = await getDemoPhoto(id);
  if (!photo) notFound();

  return (
    <div>
      <Image
        src={photo.photoUrl}
        alt={photoAlt(photo.items.map((item) => item.name))}
        width={512}
        height={512}
        sizes="(min-width: 512px) 512px, 100vw"
        className="mb-4 h-auto w-full rounded-lg bg-surface"
      />

      {photo.categories.length > 0 && (
        <p className="mb-4 text-sm text-muted">
          {photo.categories.map((c) => c.name).join(" · ")}
        </p>
      )}

      <h2 className="mb-2 font-semibold">Get this look</h2>
      {photo.items.length === 0 ? (
        <p>No jewelry linked to this photo yet.</p>
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
                  className="size-16 rounded object-cover"
                />
                <span className="flex-1">{item.name}</span>
                <span>{formatPrice(item.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
