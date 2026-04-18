export type SpiceLevel = "mild" | "medium" | "hot" | "extra-hot";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price?: number;
  spiceLevel?: SpiceLevel;
  imageUrl?: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  openHours: string;
  rating: number;
  reviewCount: number;
  orderUrl: string;
  facebookUrl: string;
  googleMapsUrl: string;
}

export const MENU_CATEGORIES = [
  "All",
  "Karahi",
  "Fish",
  "BBQ",
  "Naan/Roti",
  "Drinks",
] as const;

export type MenuCategory = (typeof MENU_CATEGORIES)[number];
