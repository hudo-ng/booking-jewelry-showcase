import Link from "next/link";
import { Suspense } from "react";
import { PhotoDetails } from "@/components/PhotoDetails";

// Full photo page: shown on a direct visit, a shared link, or a refresh.
export default function PhotoPage({ params }: PageProps<"/photos/[id]">) {
  return (
    <main className="mx-auto w-full max-w-lg p-4">
      <Link href="/" className="mb-4 inline-block underline">
        ← Gallery
      </Link>
      <Suspense fallback={<p>Loading photo…</p>}>
        {params.then(({ id }) => <PhotoDetails id={id} />)}
      </Suspense>
    </main>
  );
}
