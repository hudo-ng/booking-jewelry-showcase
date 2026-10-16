
export const API_URL = process.env.API_URL ?? "https://hk-booking-system-api.onrender.com";

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) {
    throw new Error(`API ${response.status} for GET ${path}`);
  }
  return response.json() as Promise<T>;
}

// Same, but an unknown id (404) gives null instead of an error.
export async function apiGetOrNull<T>(path: string): Promise<T | null> {
  const response = await fetch(`${API_URL}${path}`);
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`API ${response.status} for GET ${path}`);
  }
  return response.json() as Promise<T>;
}
