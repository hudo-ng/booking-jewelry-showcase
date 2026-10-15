import { Suspense } from "react";
import { Modal } from "@/components/Modal";
import { PhotoDetails } from "@/components/PhotoDetails";

// Intercepts in-app navigation to /photos/[id] and shows it as an overlay
// instead. "(.)" = intercept the `photos` segment at this same level.
export default function PhotoModal({ params }: PageProps<"/photos/[id]">) {
  return (
    <Modal>
      <Suspense fallback={<p>Loading photo…</p>}>
        {params.then(({ id }) => <PhotoDetails id={id} />)}
      </Suspense>
    </Modal>
  );
}
