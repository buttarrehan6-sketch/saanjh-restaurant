import { Button } from "@/components/ui/button";
import { useRouter } from "@tanstack/react-router";
import {
  Clock,
  ExternalLink,
  Facebook,
  MapPin,
  Navigation,
  Phone,
  ShoppingBag,
} from "lucide-react";
import { motion } from "motion/react";

const CONTACT_ITEMS = [
  {
    icon: MapPin,
    label: "Address",
    value:
      "E-11 New Air Port Road, Near Gulshan Colony Morr, Bhatta Chowk, Cantt, Lahore 54000",
    action: {
      label: "Get Directions",
      href: "https://maps.google.com/?q=Saanjh+Restaurant+Lahore",
    },
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 308 4000364",
    action: { label: "Call Now", href: "tel:+923084000364" },
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Open 24 Hours — Every Day of the Week",
    action: null,
  },
];

export default function ContactSection() {
  const router = useRouter();
  return (
    <section
      id="contact"
      className="py-20 lg:py-28 bg-background"
      data-ocid="contact.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium mb-4">
            Visit Us
          </div>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-4">
            Find{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Saanjh
            </span>
          </h2>
          <p className="text-muted-foreground font-body max-w-md mx-auto">
            Located in the heart of Lahore, open around the clock to serve you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-4"
          >
            {CONTACT_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 flex items-start gap-4 hover:border-primary/40 hover:shadow-warm transition-smooth"
                data-ocid={`contact.info.${item.label.toLowerCase()}`}
              >
                <div className="w-11 h-11 rounded-xl gradient-warm flex items-center justify-center flex-shrink-0 shadow-warm">
                  <item.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">
                    {item.label}
                  </p>
                  <p className="text-foreground font-body font-medium leading-snug break-words">
                    {item.value}
                  </p>
                  {item.action && (
                    <a
                      href={item.action.href}
                      target={
                        item.action.href.startsWith("http")
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        item.action.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="inline-flex items-center gap-1.5 mt-2 text-sm text-accent hover:text-accent/80 font-body font-medium transition-fast"
                      data-ocid={`contact.${item.label.toLowerCase()}_action`}
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      {item.action.label}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Social + Order */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-4">
                Quick Actions
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={() => router.navigate({ to: "/order" })}
                  className="gradient-warm text-primary-foreground hover:opacity-90 shadow-warm font-semibold transition-smooth"
                  data-ocid="contact.order_button"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Order Now
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-accent/40 text-accent hover:bg-accent/10 hover:border-accent transition-smooth"
                  data-ocid="contact.facebook_button"
                >
                  <a
                    href="https://web.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-4 h-4 mr-2" />
                    Follow Us
                  </a>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground transition-smooth"
                  data-ocid="contact.call_button"
                >
                  <a href="tel:+923084000364">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>
            </motion.div>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-3xl overflow-hidden border border-border shadow-elevated aspect-[4/3] bg-card flex flex-col items-center justify-center gap-6 p-8">
              {/* Decorative map visual */}
              <div className="relative">
                <div className="w-24 h-24 rounded-full gradient-warm opacity-20 animate-pulse-glow" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full gradient-warm flex items-center justify-center shadow-warm animate-float">
                    <MapPin className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-display font-bold text-xl text-foreground mb-2">
                  Saanjh Restaurant
                </h3>
                <p className="text-sm text-muted-foreground font-body max-w-xs text-center leading-relaxed">
                  E-11 New Air Port Road, Bhatta Chowk, Cantt, Lahore
                </p>
                <p className="text-xs text-muted-foreground font-body mt-1">
                  Google Plus Code: FCR8+XJ Lahore
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary transition-smooth font-semibold"
                data-ocid="contact.get_directions_button"
              >
                <a
                  href="https://maps.google.com/?q=FCR8+XJ+Lahore+Pakistan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  Open in Google Maps
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
