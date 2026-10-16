import Link from "next/link";
import { Suspense } from "react";
import { PhotoDetails } from "@/components/PhotoDetails";

export default function PhotoPage({ params }: PageProps<"/photos/[id]">) {
  return (
    <main className="mx-auto w-full max-w-4xl p-4">
      <Link href="/" className="mb-4 inline-block text-muted hover:text-cream">
        ← Gallery
      </Link>
      <Suspense fallback={<p>Loading photo…</p>}>
        {params.then(({ id }) => <PhotoDetails id={id} />)}
      </Suspense>
    </main>
  );
}
