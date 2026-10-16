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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 sm:p-6"
      onClick={() => router.back()}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative h-full w-full overflow-y-auto bg-ink sm:h-auto sm:max-h-full sm:max-w-4xl sm:rounded-xl sm:ring-1 sm:ring-cream/10"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          onClick={() => router.back()}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-black/60 text-xl leading-none text-cream hover:bg-black/80"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
