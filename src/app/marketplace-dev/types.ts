export type Product = {
  id: number;
  nameBn: string;
  nameEn: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  farmer: string;
  location: string;
  rating: number;
  image: string;
  description?: string;
};

export type CategoryFilter = "সব" | "ধান" | "সবজি" | "ফল" | "শস্য" | "মসলা" | "অন্যান্য";

export type SortOption = "newest" | "price-asc" | "price-desc" | "popular";

export interface CartItem {
  product: Product;
  addedAt: Date;
}
