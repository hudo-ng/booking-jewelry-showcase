"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Overlay shell. Closing = going back in history, so the URL returns to
// wherever the user was (e.g. the gallery) and the browser Back button
// closes it the same way.
export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") router.back();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [router]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={() => router.back()}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="max-h-full w-full max-w-lg overflow-y-auto rounded-xl bg-background p-4"
        onClick={(event) => event.stopPropagation()}
      >
        <button onClick={() => router.back()} className="mb-4 rounded border px-3 py-1">
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
