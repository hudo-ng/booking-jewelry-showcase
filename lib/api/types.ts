// Shapes of the public jewelry API responses (booking-system-api,
// src/controllers/jewelry.controller.ts). Dates arrive as ISO strings.

export type Category = {
  id: string;
  name: string;
};

export type CategoryWithCount = Category & {
  createdAt: string;
  updatedAt: string;
  demoPhotoCount: number;
};

export type JewelryItem = {
  id: string;
  name: string;
  description: string | null;
  price: number; // USD
  photoUrl: string;
};

export type JewelryItemDetail = JewelryItem & {
  createdAt: string;
  demoPhotos: { id: string; photoUrl: string }[];
};

export type DemoPhoto = {
  id: string;
  photoUrl: string;
  photoFileId: string | null;
  createdAt: string;
  updatedAt: string;
  categories: Category[];
  items: JewelryItem[];
};

export type Paged = {
  page: number;
  limit: number;
  total: number;
};

export type CategoriesResponse = { categories: CategoryWithCount[] };
export type DemoPhotosResponse = Paged & { demoPhotos: DemoPhoto[] };
export type DemoPhotoResponse = { demoPhoto: DemoPhoto };
export type ItemResponse = { item: JewelryItemDetail };
