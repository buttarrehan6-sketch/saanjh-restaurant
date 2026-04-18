import { useQuery } from "@tanstack/react-query";
import type { MenuItem, RestaurantInfo } from "../types/restaurant";

// Static restaurant data - Saanjh Restaurant, Lahore
const RESTAURANT_INFO: RestaurantInfo = {
  name: "Saanjh",
  tagline: "Authentic Flavors of Pakistan",
  address:
    "E-11 New Air Port Road, Near Gulshan Colony Morr, Bhatta Chowk, Cantt, Lahore 54000",
  phone: "+92 308 4000364",
  openHours: "Open 24 Hours",
  rating: 4.9,
  reviewCount: 10,
  orderUrl: "https://www.foodpanda.pk",
  facebookUrl: "https://web.facebook.com",
  googleMapsUrl: "https://maps.google.com/?q=Saanjh+Restaurant+Lahore",
};

const MENU_ITEMS: MenuItem[] = [
  // Karahi
  {
    id: "1",
    name: "Karahi Gosht",
    category: "Karahi",
    description:
      "Wok-cooked mutton with fresh tomatoes, ginger, and green chilies — a Saanjh specialty",
    price: 1800,
    spiceLevel: "hot",
    isPopular: true,
  },
  {
    id: "2",
    name: "Chicken Karahi",
    category: "Karahi",
    description:
      "Tender chicken cooked in our signature karahi style with aromatic spices and chilies",
    price: 1400,
    spiceLevel: "medium",
    isPopular: true,
  },
  {
    id: "3",
    name: "Mutton Karahi",
    category: "Karahi",
    description:
      "Rich, slow-cooked mutton karahi with whole spices and a smoky charcoal finish",
    price: 2200,
    spiceLevel: "hot",
  },
  // Fish
  {
    id: "4",
    name: "Fish Fry",
    category: "Fish",
    description:
      "Golden crispy fried fish fillets marinated in chaat masala and lemon, served with mint chutney",
    price: 1200,
    spiceLevel: "medium",
    isPopular: true,
  },
  {
    id: "5",
    name: "Fish Karahi",
    category: "Fish",
    description:
      "Fresh fish cooked in a spicy tomato-based karahi gravy with ginger and green chilies",
    price: 1400,
    spiceLevel: "hot",
  },
  // BBQ
  {
    id: "6",
    name: "Seekh Kabab",
    category: "BBQ",
    description:
      "Charcoal-grilled minced beef with herbs and spices on skewers, served with raita",
    price: 1000,
    spiceLevel: "hot",
    isPopular: true,
  },
  {
    id: "7",
    name: "Boti Kabab",
    category: "BBQ",
    description:
      "Succulent marinated beef chunks skewered and grilled over live charcoal",
    price: 1200,
    spiceLevel: "hot",
  },
  {
    id: "8",
    name: "Chicken Wings",
    category: "BBQ",
    description:
      "Spicy marinated chicken wings grilled to perfection with house special masala",
    price: 900,
    spiceLevel: "medium",
    isPopular: true,
  },
  {
    id: "9",
    name: "Chicken Tikka",
    category: "BBQ",
    description:
      "Yogurt-marinated chicken pieces cooked in the tandoor with smoky, charred edges",
    price: 1100,
    spiceLevel: "medium",
  },
  // Naan/Roti
  {
    id: "10",
    name: "Naan",
    category: "Naan/Roti",
    description:
      "Soft, fluffy leavened flatbread baked fresh in the tandoor — perfect with karahi",
    price: 40,
    isVegetarian: true,
    isPopular: true,
  },
  {
    id: "11",
    name: "Tandoori Roti",
    category: "Naan/Roti",
    description:
      "Whole-wheat flatbread baked directly on the tandoor walls for authentic smoky flavor",
    price: 30,
    isVegetarian: true,
  },
  {
    id: "12",
    name: "Paratha",
    category: "Naan/Roti",
    description:
      "Layered, flaky whole-wheat flatbread cooked with a generous drizzle of desi ghee",
    price: 60,
    isVegetarian: true,
  },
  // Drinks
  {
    id: "13",
    name: "Lassi",
    category: "Drinks",
    description:
      "Thick chilled yogurt drink blended sweet or salty, served ice cold in a tall glass",
    price: 250,
    isVegetarian: true,
    isPopular: true,
  },
  {
    id: "14",
    name: "Soft Drinks",
    category: "Drinks",
    description:
      "Chilled Pepsi, 7Up, Mirinda, or Mountain Dew — the perfect companion to your meal",
    price: 120,
    isVegetarian: true,
  },
  {
    id: "15",
    name: "Fresh Juice",
    category: "Drinks",
    description:
      "Seasonal fresh-squeezed juice: mango, sugarcane, orange, or pomegranate",
    price: 300,
    isVegetarian: true,
    isPopular: true,
  },
];

export function useRestaurantInfo() {
  return useQuery<RestaurantInfo>({
    queryKey: ["restaurantInfo"],
    queryFn: async () => RESTAURANT_INFO,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useMenuItems() {
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems"],
    queryFn: async () => MENU_ITEMS,
    staleTime: Number.POSITIVE_INFINITY,
  });
}

export function useMenuByCategory(category: string) {
  const { data: allItems, ...rest } = useMenuItems();
  const items =
    category === "All"
      ? allItems
      : allItems?.filter((item) => item.category === category);
  return { data: items, ...rest };
}
