import Link from "next/link";
import { notFound } from "next/navigation";
import { getDemoPhoto } from "@/lib/api/jewelry";
import { formatPrice } from "@/lib/format";

export async function PhotoDetails({ id }: { id: string }) {
  const photo = await getDemoPhoto(id);
  if (!photo) notFound();

  return (
    <div>
      <div className="mb-4 flex aspect-square items-center justify-center rounded-lg bg-zinc-200 p-4 text-center text-sm break-all dark:bg-zinc-800">
        {photo.photoUrl}
      </div>

      {photo.categories.length > 0 && (
        <p className="mb-4 text-sm text-zinc-500">
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
              <Link href={`/items/${item.id}`} className="flex justify-between rounded border px-3 py-2">
                <span>{item.name}</span>
                <span>{formatPrice(item.price)}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
