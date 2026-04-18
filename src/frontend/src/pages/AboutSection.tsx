import { Award, Clock, Star, Users } from "lucide-react";
import { motion } from "motion/react";

const REVIEWS = [
  {
    name: "Ahmad R.",
    rating: 5,
    text: "Absolutely incredible food! The Nihari was perfectly spiced and the Karahi Gosht melted in my mouth. Best restaurant in Lahore without a doubt.",
    date: "March 2025",
  },
  {
    name: "Sana K.",
    rating: 5,
    text: "Saanjh has redefined dining for me. The ambiance is impeccable, service top-notch, and every dish is crafted with love and expertise.",
    date: "February 2025",
  },
  {
    name: "Bilal M.",
    rating: 5,
    text: "Open 24 hours and never disappoints! Late-night cravings met with exceptional quality. The Biryani here is legendary.",
    date: "January 2025",
  },
];

const STATS = [
  { icon: Star, label: "Average Rating", value: "4.9/5" },
  { icon: Clock, label: "Operating Hours", value: "24 Hours" },
  { icon: Users, label: "Happy Customers", value: "10,000+" },
  { icon: Award, label: "Years of Excellence", value: "5+" },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 lg:py-28 bg-muted/20"
      data-ocid="about.section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image + Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-elevated">
              <img
                src="/assets/generated/food-spread.dim_800x600.jpg"
                alt="Saanjh Restaurant authentic Pakistani cuisine spread"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex gap-1 mb-1">
                  {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                    <Star key={k} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-foreground font-body font-medium">
                  "Best Pakistani cuisine in Lahore"
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <stat.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground font-body truncate">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Text + Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/30 bg-accent/10 text-accent text-sm font-medium mb-4">
                Our Story
              </div>
              <h2 className="font-display font-bold text-4xl sm:text-5xl text-foreground mb-6 leading-tight">
                A Legacy of{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Authentic Taste
                </span>
              </h2>
              <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
                <p>
                  Nestled in the heart of Lahore, Saanjh Restaurant brings you
                  the finest traditions of Pakistani cuisine reimagined for the
                  modern palate. Every recipe is rooted in generations of
                  culinary wisdom.
                </p>
                <p>
                  From our slow-cooked Nihari that simmers through the night to
                  the smoky perfection of our charcoal-grilled kebabs, every
                  dish tells a story of Lahore's rich culinary heritage.
                </p>
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-4" data-ocid="about.reviews_list">
              {REVIEWS.map((review, i) => (
                <motion.div
                  key={review.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-card border border-border rounded-xl p-5"
                  data-ocid={`about.review.${i + 1}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full gradient-warm flex items-center justify-center flex-shrink-0">
                      <span className="text-primary-foreground font-display font-bold text-sm">
                        {review.name[0]}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-body font-semibold text-foreground text-sm">
                        {review.name}
                      </p>
                      <div className="flex gap-0.5">
                        {Array.from({ length: review.rating }, (_, j) =>
                          String(j),
                        ).map((k) => (
                          <Star
                            key={k}
                            className="w-3 h-3 fill-accent text-accent"
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground font-body flex-shrink-0">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed italic">
                    "{review.text}"
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
