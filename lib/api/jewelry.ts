import { cacheLife } from "next/cache";
import { apiGet, apiGetOrNull } from "./client";
import type {
  CategoriesResponse,
  DemoPhotoResponse,
  DemoPhotosResponse,
  ItemResponse,
} from "./types";

// Every function below is cached per set of arguments ("use cache").
// After 60s the next visitor still gets the cached copy instantly while a
// fresh one is fetched in the background. `expire` is left at its default
// (never), so visitors don't wait for the Render API to wake up.
const REVALIDATE_SECONDS = 60;

export async function getCategories() {
  "use cache";
  cacheLife({ revalidate: REVALIDATE_SECONDS });
  const data = await apiGet<CategoriesResponse>("/jewelry/categories");
  return data.categories;
}

// Newest first. `categoryId` filters to one category.
export async function getDemoPhotos({
  categoryId,
  page = 1,
}: { categoryId?: string; page?: number } = {}) {
  "use cache";
  cacheLife({ revalidate: REVALIDATE_SECONDS });
  const query = new URLSearchParams({ page: String(page) });
  if (categoryId) query.set("categoryId", categoryId);
  const data = await apiGet<DemoPhotosResponse>(`/jewelry/demo-photos?${query}`);
  return { demoPhotos: data.demoPhotos, page: data.page, limit: data.limit, total: data.total };
}

// null = no photo with this id.
export async function getDemoPhoto(id: string) {
  "use cache";
  cacheLife({ revalidate: REVALIDATE_SECONDS });
  const data = await apiGetOrNull<DemoPhotoResponse>(
    `/jewelry/demo-photos/${encodeURIComponent(id)}`,
  );
  return data?.demoPhoto ?? null;
}

// null = no item with this id.
export async function getItem(id: string) {
  "use cache";
  cacheLife({ revalidate: REVALIDATE_SECONDS });
  const data = await apiGetOrNull<ItemResponse>(`/jewelry/items/${encodeURIComponent(id)}`);
  return data?.item ?? null;
}
