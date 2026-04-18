import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ExternalLink,
  Flame,
  Leaf,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Trash2,
  UtensilsCrossed,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useMenuItems } from "../hooks/useRestaurant";
import {
  MENU_CATEGORIES,
  type MenuCategory,
  type MenuItem,
} from "../types/restaurant";

interface CartItem {
  item: MenuItem;
  quantity: number;
}

const SPICE_COUNT: Record<string, number> = {
  mild: 1,
  medium: 2,
  hot: 3,
  "extra-hot": 4,
};

function SpiceIndicator({ level }: { level: string }) {
  const count = SPICE_COUNT[level] ?? 1;
  return (
    <div className="flex gap-0.5" aria-label={`Spice level: ${level}`}>
      {["l1", "l2", "l3", "l4"].map((k, i) => (
        <Flame
          key={k}
          className={`w-3 h-3 ${i < count ? "text-primary fill-primary/60" : "text-muted-foreground/30"}`}
        />
      ))}
    </div>
  );
}

function OrderMenuCard({
  item,
  index,
  quantity,
  onAdd,
  onRemove,
}: {
  item: MenuItem;
  index: number;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: (index % 8) * 0.05 }}
      className={`bg-card border rounded-2xl p-4 flex flex-col gap-3 transition-smooth ${
        quantity > 0
          ? "border-primary/60 shadow-warm"
          : "border-border hover:border-primary/30"
      }`}
      data-ocid={`order.menu_item.${index + 1}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-foreground text-sm leading-snug">
            {item.name}
          </h3>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          {item.isPopular && (
            <Badge className="text-xs gradient-warm text-primary-foreground border-0 px-1.5 py-0.5">
              <Star className="w-2.5 h-2.5 mr-0.5 fill-current" />
              Popular
            </Badge>
          )}
          {item.isVegetarian && (
            <div
              className="w-5 h-5 rounded border-2 border-green-500 flex items-center justify-center flex-shrink-0"
              title="Vegetarian"
            >
              <Leaf className="w-2.5 h-2.5 text-green-500" />
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-muted-foreground font-body leading-relaxed line-clamp-2 flex-1">
        {item.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-col gap-1">
          {item.price && (
            <span className="font-display font-bold text-base text-foreground">
              Rs.&nbsp;{item.price.toLocaleString()}
            </span>
          )}
          {item.spiceLevel && <SpiceIndicator level={item.spiceLevel} />}
        </div>

        {quantity === 0 ? (
          <Button
            size="sm"
            onClick={onAdd}
            className="gradient-warm text-primary-foreground hover:opacity-90 transition-smooth font-semibold text-xs px-3 py-2 rounded-lg"
            data-ocid={`order.add_button.${index + 1}`}
          >
            <Plus className="w-3 h-3 mr-1" />
            Add
          </Button>
        ) : (
          <div
            className="flex items-center gap-2"
            data-ocid={`order.qty_control.${index + 1}`}
          >
            <button
              type="button"
              onClick={onRemove}
              className="w-7 h-7 rounded-lg border border-border bg-muted/60 hover:bg-muted flex items-center justify-center transition-fast"
              aria-label="Remove one"
              data-ocid={`order.remove_button.${index + 1}`}
            >
              <Minus className="w-3 h-3 text-foreground" />
            </button>
            <span className="font-display font-bold text-foreground w-5 text-center text-sm">
              {quantity}
            </span>
            <button
              type="button"
              onClick={onAdd}
              className="w-7 h-7 rounded-lg gradient-warm flex items-center justify-center transition-fast hover:opacity-90"
              aria-label="Add one more"
              data-ocid={`order.plus_button.${index + 1}`}
            >
              <Plus className="w-3 h-3 text-primary-foreground" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CartPanel({
  cart,
  onClear,
}: { cart: CartItem[]; onClear: () => void }) {
  const total = cart.reduce(
    (sum, c) => sum + (c.item.price ?? 0) * c.quantity,
    0,
  );
  const itemCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-foreground text-lg">
          Your Order
        </h2>
        {cart.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-destructive transition-fast flex items-center gap-1"
            data-ocid="order.clear_cart_button"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div
          className="flex-1 flex flex-col items-center justify-center text-center py-8 gap-3"
          data-ocid="order.cart_empty_state"
        >
          <div className="w-14 h-14 rounded-full bg-muted/60 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground font-body leading-snug">
            Your cart is empty —<br />
            add items above
          </p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto space-y-2 max-h-64 lg:max-h-none pr-1">
            {cart.map((c) => (
              <div
                key={c.item.id}
                className="flex items-center justify-between gap-2 py-2 border-b border-border/50 last:border-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-medium text-foreground truncate">
                    {c.item.name}
                  </p>
                  {c.item.price && (
                    <p className="text-xs text-muted-foreground">
                      Rs. {(c.item.price * c.quantity).toLocaleString()}
                    </p>
                  )}
                </div>
                <span className="text-xs font-body text-muted-foreground font-medium bg-muted/60 px-2 py-0.5 rounded-full flex-shrink-0">
                  ×{c.quantity}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-3 space-y-1">
            <div className="flex justify-between text-sm font-body">
              <span className="text-muted-foreground">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </span>
              <span className="text-foreground font-bold font-display text-base">
                Rs. {total.toLocaleString()}
              </span>
            </div>
          </div>

          <Button
            asChild
            className="w-full gradient-warm text-primary-foreground hover:opacity-90 shadow-warm font-semibold transition-smooth"
            data-ocid="order.place_order_button"
          >
            <a
              href="https://www.foodpanda.pk"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Place Order via FoodPanda
            </a>
          </Button>
        </>
      )}
    </div>
  );
}

export default function OrderPage() {
  const { data: allItems, isLoading } = useMenuItems();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("All");
  const [cart, setCart] = useState<CartItem[]>([]);

  const displayItems =
    activeCategory === "All"
      ? allItems
      : allItems?.filter((item) => item.category === activeCategory);

  const cartCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing)
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        );
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (!existing) return prev;
      if (existing.quantity === 1)
        return prev.filter((c) => c.item.id !== item.id);
      return prev.map((c) =>
        c.item.id === item.id ? { ...c, quantity: c.quantity - 1 } : c,
      );
    });
  };

  const getQuantity = (id: string) =>
    cart.find((c) => c.item.id === id)?.quantity ?? 0;

  const navigateHome = () => {
    window.history.back();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen bg-background text-foreground"
      data-ocid="order.page"
    >
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-card/90 backdrop-blur-xl border-b border-border shadow-elevated">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              type="button"
              onClick={navigateHome}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-fast group"
              aria-label="Go back home"
              data-ocid="order.back_button"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-fast" />
              <span className="text-sm font-body font-medium hidden sm:inline">
                Back
              </span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-warm flex items-center justify-center shadow-warm">
                <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Saanjh Restaurant
              </span>
            </div>

            <div
              className="relative flex items-center gap-1 text-muted-foreground"
              data-ocid="order.cart_icon"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full gradient-warm text-primary-foreground text-xs font-bold flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-[1fr_340px] lg:gap-8">
          {/* Left: Menu */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6"
            >
              <h1 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-2">
                Order{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Online
                </span>
              </h1>
              <p className="text-muted-foreground font-body text-sm">
                Select your items, then place your order via FoodPanda.
              </p>
            </motion.div>

            {/* Category Tabs */}
            <div
              className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-hide"
              data-ocid="order.category_filter"
            >
              {MENU_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-body font-medium transition-smooth ${
                    activeCategory === cat
                      ? "gradient-warm text-primary-foreground shadow-warm"
                      : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-ocid={`order.filter.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Menu Grid */}
            {isLoading ? (
              <div
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                data-ocid="order.loading_state"
              >
                {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6"].map((k) => (
                  <div
                    key={k}
                    className="bg-card border border-border rounded-2xl p-4 h-44 animate-pulse"
                  >
                    <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                    <div className="h-3 bg-muted rounded w-full mb-2" />
                    <div className="h-3 bg-muted rounded w-2/3" />
                  </div>
                ))}
              </div>
            ) : displayItems && displayItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {displayItems.map((item, idx) => (
                  <OrderMenuCard
                    key={item.id}
                    item={item}
                    index={idx}
                    quantity={getQuantity(item.id)}
                    onAdd={() => addToCart(item)}
                    onRemove={() => removeFromCart(item)}
                  />
                ))}
              </div>
            ) : (
              <div
                className="text-center py-16 text-muted-foreground"
                data-ocid="order.empty_state"
              >
                No items in this category.
              </div>
            )}
          </div>

          {/* Desktop Sidebar Cart */}
          <div className="hidden lg:block">
            <div className="sticky top-24 bg-card border border-border rounded-2xl p-5 shadow-elevated">
              <CartPanel cart={cart} onClear={() => setCart([])} />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Cart Bar */}
      <div
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border p-4 shadow-elevated"
        data-ocid="order.mobile_cart_bar"
      >
        {cart.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground font-body py-1">
            Your cart is empty — add items above
          </p>
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground font-body">
                {cartCount} item{cartCount !== 1 ? "s" : ""}
              </p>
              <p className="font-display font-bold text-foreground text-base">
                Rs.{" "}
                {cart
                  .reduce((sum, c) => sum + (c.item.price ?? 0) * c.quantity, 0)
                  .toLocaleString()}
              </p>
            </div>
            <Button
              asChild
              className="gradient-warm text-primary-foreground hover:opacity-90 shadow-warm font-semibold transition-smooth"
              data-ocid="order.mobile_place_order_button"
            >
              <a
                href="https://www.foodpanda.pk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-1.5" />
                Place Order
              </a>
            </Button>
          </div>
        )}
      </div>

      {/* Spacer for mobile bottom bar */}
      <div className="lg:hidden h-24" />
    </motion.div>
  );
}
