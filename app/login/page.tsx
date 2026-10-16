import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage({ searchParams }: PageProps<"/login">) {
  return (
    <main className="mx-auto w-full max-w-sm px-4 py-12">
      <h1 className="mb-1 text-2xl font-semibold">Staff login</h1>
      <p className="mb-8 text-sm text-muted">Sign in with your Hyper Inkers staff account.</p>

      <Suspense fallback={null}>
        {searchParams.then(({ from }) => (
          <LoginForm from={typeof from === "string" ? from : "/"} />
        ))}
      </Suspense>
    </main>
  );
}
