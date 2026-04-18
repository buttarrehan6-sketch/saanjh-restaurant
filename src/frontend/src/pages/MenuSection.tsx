import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import { Flame, Leaf, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useMenuItems } from "../hooks/useRestaurant";
import {
  MENU_CATEGORIES,
  type MenuCategory,
  type MenuItem,
} from "../types/restaurant";

const SPICE_ICONS: Record<string, number> = {
  mild: 1,
  medium: 2,
  hot: 3,
  "extra-hot": 4,
};

function SpiceIndicator({ level }: { level: string }) {
  const count = SPICE_ICONS[level] ?? 1;
  return (
    <div className="flex gap-0.5" aria-label={`Spice level: ${level}`}>
      {["l1", "l2", "l3", "l4"].map((k, i) => (
        <Flame
          key={k}
          className={`w-3 h-3 transition-fast ${
            i < count
              ? "text-primary fill-primary/60"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

function MenuCard({ item, index }: { item: MenuItem; index: number }) {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: (index % 6) * 0.08 }}
      className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-warm transition-smooth cursor-pointer"
      data-ocid={`menu.item.${index + 1}`}
    >
      <div className="p-5 flex flex-col gap-3 h-full">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display font-semibold text-foreground text-base leading-snug truncate group-hover:text-primary transition-fast">
              {item.name}
            </h3>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            {item.isPopular && (
              <Badge className="text-xs gradient-warm text-primary-foreground border-0 px-2 py-0.5">
                <Star className="w-2.5 h-2.5 mr-1 fill-current" />
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

        <p className="text-sm text-muted-foreground font-body leading-relaxed line-clamp-2 flex-1">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col gap-1">
            {item.price && (
              <span className="font-display font-bold text-lg text-foreground">
                Rs.&nbsp;{item.price}
              </span>
            )}
            {item.spiceLevel && <SpiceIndicator level={item.spiceLevel} />}
          </div>
          <Button
            size="sm"
            onClick={() => router.navigate({ to: "/order" })}
            className="gradient-warm text-primary-foreground hover:opacity-90 transition-smooth font-semibold text-xs px-3 py-2 rounded-lg"
            data-ocid={`menu.order_button.${index + 1}`}
          >
            <ShoppingBag className="w-3 h-3 mr-1" />
            Order
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("All");
  const { data: allItems, isLoading } = useMenuItems();
  const router = useRouter();

  const displayItems =
    activeCategory === "All"
      ? allItems
      : allItems?.filter((item) => item.category === activeCategory);

  return (
    <section
      id="menu"
      className="py-20 lg:py-28 bg-background"
      data-ocid="menu.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium mb-4">
            Our Menu
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Authentic Pakistani{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Cuisine
            </span>
          </h2>
          <p className="text-muted-foreground font-body max-w-xl mx-auto">
            From rich, slow-cooked curries to charcoal-grilled kebabs — every
            dish crafted with generations-old recipes.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <div
          className="flex gap-2 overflow-x-auto pb-2 mb-10 scrollbar-hide"
          data-ocid="menu.category_filter"
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
              data-ocid={`menu.filter.${cat.toLowerCase().replace(/[^a-z0-9]/g, "_")}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {isLoading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            data-ocid="menu.loading_state"
          >
            {["sk1", "sk2", "sk3", "sk4", "sk5", "sk6", "sk7", "sk8"].map(
              (k) => (
                <div
                  key={k}
                  className="bg-card border border-border rounded-2xl p-5 h-48 animate-pulse"
                >
                  <div className="h-4 bg-muted rounded w-3/4 mb-3" />
                  <div className="h-3 bg-muted rounded w-full mb-2" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              ),
            )}
          </div>
        ) : displayItems && displayItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {displayItems.map((item, idx) => (
              <MenuCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 text-muted-foreground"
            data-ocid="menu.empty_state"
          >
            No items in this category.
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-14"
        >
          <Button
            size="lg"
            onClick={() => router.navigate({ to: "/order" })}
            className="gradient-warm text-primary-foreground hover:opacity-90 shadow-warm font-semibold text-base px-10 py-6 rounded-xl transition-smooth hover:scale-105"
            data-ocid="menu.order_cta_button"
          >
            <ShoppingBag className="w-5 h-5 mr-2" />
            Order Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
