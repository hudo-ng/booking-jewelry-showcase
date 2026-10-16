"use client";

import { usePathname } from "next/navigation";
import { logout } from "@/app/login/actions";

export function LogoutButton() {
  const pathname = usePathname();
  if (pathname === "/login") return null;

  return (
    <form action={logout}>
      <button type="submit" className="text-sm text-muted hover:text-cream">
        Log out
      </button>
    </form>
  );
}
