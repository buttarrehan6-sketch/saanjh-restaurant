import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import { Menu, Phone, ShoppingBag, UtensilsCrossed, X } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const goToOrder = () => {
    setMobileOpen(false);
    router.navigate({ to: "/order" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/90 backdrop-blur-xl border-b border-border shadow-elevated"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button
            type="button"
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 group"
            data-ocid="header.logo.link"
          >
            <div className="w-9 h-9 rounded-lg gradient-warm flex items-center justify-center shadow-warm transition-smooth group-hover:scale-105">
              <UtensilsCrossed className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-2xl text-foreground tracking-tight">
              Saanjh
            </span>
          </button>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Primary navigation"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-body font-medium text-muted-foreground hover:text-foreground transition-smooth rounded-md hover:bg-muted/60"
                data-ocid={`header.nav.${link.label.toLowerCase()}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="gap-2 text-accent hover:text-accent hover:bg-accent/10 border border-accent/30 hover:border-accent/60 transition-smooth"
              data-ocid="header.call_button"
            >
              <a href="tel:+923084000364">
                <Phone className="w-4 h-4" />
                +92 308 4000364
              </a>
            </Button>
            <Button
              size="sm"
              onClick={goToOrder}
              className="gap-2 gradient-warm text-primary-foreground hover:opacity-90 shadow-warm transition-smooth font-semibold"
              data-ocid="header.order_button"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Now
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-fast"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            data-ocid="header.mobile_menu_toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 bg-card/95 backdrop-blur-xl border-b border-border ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        data-ocid="header.mobile_menu"
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <button
              type="button"
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="w-full text-left px-4 py-3 text-sm font-body font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-md transition-fast"
              data-ocid={`header.mobile_nav.${link.label.toLowerCase()}`}
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
            <Button
              asChild
              variant="ghost"
              className="justify-start gap-2 text-accent hover:text-accent hover:bg-accent/10 border border-accent/30"
              data-ocid="header.mobile_call_button"
            >
              <a href="tel:+923084000364">
                <Phone className="w-4 h-4" />
                +92 308 4000364
              </a>
            </Button>
            <Button
              onClick={goToOrder}
              className="justify-start gap-2 gradient-warm text-primary-foreground hover:opacity-90 shadow-warm font-semibold"
              data-ocid="header.mobile_order_button"
            >
              <ShoppingBag className="w-4 h-4" />
              Order Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();

  const goToOrder = () => {
    router.navigate({ to: "/order" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>{children}</main>
      <footer className="bg-card border-t border-border py-8 mt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-warm flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg text-foreground">
                Saanjh
              </span>
            </div>
            <p className="text-sm text-muted-foreground font-body text-center">
              © {new Date().getFullYear()}. Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 transition-fast"
              >
                caffeine.ai
              </a>
            </p>
            <div className="flex items-center gap-3">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="gap-1.5 text-accent hover:text-accent hover:bg-accent/10"
              >
                <a href="tel:+923084000364">
                  <Phone className="w-3.5 h-3.5" />
                  Call Us
                </a>
              </Button>
              <Button
                size="sm"
                onClick={goToOrder}
                className="gradient-warm text-primary-foreground hover:opacity-90 shadow-warm font-semibold"
              >
                Order Now
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
