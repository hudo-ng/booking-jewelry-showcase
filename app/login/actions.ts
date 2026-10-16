"use server";

import { redirect } from "next/navigation";
import { API_URL } from "@/lib/api/client";
import { createSession, deleteSession } from "@/lib/session";

const ALLOWED_ROLES = ["admin", "employee"];

export type LoginState = { error: string; email: string } | undefined;

export async function login(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/");

  if (!email || !password) {
    return { error: "Enter your email and password.", email };
  }

  let response: Response;
  try {
    response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });
  } catch {
    return { error: "Can't reach the server. Please try again.", email };
  }

  if (response.status === 401) {
    return { error: "Wrong email or password.", email };
  }
  if (!response.ok) {
    return { error: "Login failed. Please try again in a moment.", email };
  }

  const user = (await response.json()) as { id: string; name: string; role: string };
  if (!ALLOWED_ROLES.includes(user.role)) {
    return { error: "This account doesn't have access.", email };
  }

  await createSession({ userId: user.id, name: user.name, role: user.role });
  redirect(isSafePath(from) ? from : "/");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

function isSafePath(path: string) {
  return /^\/(?![/\\])/.test(path);
}
