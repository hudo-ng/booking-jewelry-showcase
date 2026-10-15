import Link from "next/link";

// The photo content, shared by the full page (/photos/[id]) and the overlay.
export function PhotoDetails({ id }: { id: string }) {
  return (
    <div>
      <div className="mb-4 flex aspect-square items-center justify-center rounded-lg bg-zinc-200 text-xl dark:bg-zinc-800">
        Photo {id}
      </div>
      <h2 className="mb-2 font-semibold">Get this look</h2>
      <ul className="flex gap-2">
        {["1", "2"].map((itemId) => (
          <li key={itemId}>
            <Link href={`/items/${itemId}`} className="rounded border px-3 py-1">
              Item {itemId}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
