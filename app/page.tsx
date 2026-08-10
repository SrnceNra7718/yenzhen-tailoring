"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Shield,
  Users,
  Palette,
  Printer,
  Layers,
  Scissors,
  MessageCircle,
  Star,
  TrendingUp,
  Clock,
  Award,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { products, categories } from "@/data/products";
import { galleryItems } from "@/data/gallery";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faqs";
import { services } from "@/data/services";
import { stats } from "@/data/stats";
import { ProductCard } from "@/components/sections/product-card";
import { GalleryGrid } from "@/components/sections/gallery-grid";
import { ProductModal } from "@/components/sections/product-modal";
import { FAQAccordion } from "@/components/sections/faq-accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  printer: <Printer className="h-6 w-6" />,
  users: <Users className="h-6 w-6" />,
  palette: <Palette className="h-6 w-6" />,
  layers: <Layers className="h-6 w-6" />,
  scissors: <Scissors className="h-6 w-6" />,
  "message-circle": <MessageCircle className="h-6 w-6" />,
};

function RevealSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function FloatingOrb({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className={cn(
        "absolute rounded-full blur-3xl pointer-events-none",
        className
      )}
    />
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: { value: string; label: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="font-display text-4xl md:text-5xl font-extrabold gradient-text-gold mb-2">
        {stat.value}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<
    (typeof products)[0] | null
  >(null);
  const [lightboxImage, setLightboxImage] = useState<
    (typeof galleryItems)[0] | null
  >(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const openLightbox = (item: (typeof galleryItems)[0], index: number) => {
    setLightboxImage(item);
    setLightboxIndex(index);
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!lightboxImage) return;
    const filtered = galleryItems;
    const current = filtered.findIndex((i) => i.id === lightboxImage.id);
    let newIndex = current;
    if (direction === "prev") {
      newIndex = current === 0 ? filtered.length - 1 : current - 1;
    } else {
      newIndex = current === filtered.length - 1 ? 0 : current + 1;
    }
    setLightboxImage(filtered[newIndex]);
    setLightboxIndex(newIndex);
  };

  return (
    <main>
      {/* Hero */}
      <RevealSection className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-dark-900 to-brand-950" />
        <div className="absolute inset-0 bg-hero-glow opacity-70" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03]" />

        <FloatingOrb
          className="w-[500px] h-[500px] bg-brand-500/10 -top-20 -left-20"
          delay={0}
        />
        <FloatingOrb
          className="w-[400px] h-[400px] bg-gold-500/10 -bottom-20 -right-20"
          delay={2}
        />
        <FloatingOrb
          className="w-[300px] h-[300px] bg-brand-400/5 top-1/2 left-1/2"
          delay={4}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16 lg:py-20 w-full">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full bg-brand-500/10 px-4 py-2 text-sm font-medium text-brand-300 ring-1 ring-brand-500/20 mb-8"
              >
                <Shield className="h-4 w-4" />
                Trusted by teams nationwide
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
              >
                Custom Basketball
                <span className="block gradient-text mt-3">
                  Uniforms & Sublimation
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                Premium sublimation sportswear for basketball teams — jerseys,
                warmers, full team packages, and warm-up jackets. Professional
                quality, unlimited designs, and fast turnaround.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-10 flex flex-col sm:flex-row gap-4"
              >
                <Link href="#products" className="btn-primary group">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 inline" />
                </Link>
                <Link href="#team-packages" className="btn-secondary">
                  Team Packages
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="mt-12 flex items-center gap-8"
              >
                <div className="flex -space-x-3">
                  {[
                    "bg-brand-500",
                    "bg-gold-500",
                    "bg-brand-600",
                    "bg-gold-600",
                  ].map((c, i) => (
                    <div
                      key={i}
                      className={`h-10 w-10 rounded-full border-2 border-brand-950 ${c} flex items-center justify-center text-xs font-bold text-white`}
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 text-gold-400 fill-gold-400"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Trusted by 500+ basketball teams
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square rounded-3xl border border-border/50 bg-gradient-to-br from-brand-900/30 to-dark-800 shadow-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-card-shine" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/5 via-transparent to-gold-500/5" />

                <img
                  src="/images/banner.png"
                  alt="Yenzhen Tailoring Banner"
                  className="relative w-full h-full object-cover"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute -bottom-6 -right-6 h-28 w-28 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center backdrop-blur-xl"
              >
                <div className="text-center">
                  <span className="text-3xl font-display font-bold gradient-text-gold block">
                    100%
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                    Sublimation
                  </span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
                className="absolute -top-6 -left-6 h-24 w-24 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center backdrop-blur-xl"
              >
                <div className="text-center">
                  <Award className="h-8 w-8 text-brand-400 mx-auto mb-1" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider block">
                    Pro Quality
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      </RevealSection>

      {/* Stats Bar */}
      <RevealSection className="py-16 border-y border-border/50 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Team Packages Highlight - Bento Grid */}
      <RevealSection id="team-packages" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/30 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            title="Complete Basketball Team Packages"
            subtitle="Everything your team needs in one coordinated set. From sublimated jerseys to warm-up jackets, we deliver a unified look that commands attention on the court."
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-8 glass-card rounded-3xl p-8 border-white/5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-6 text-brand-400 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-3 text-white">
                  Full Team Uniforms
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 max-w-lg">
                  Sublimated jerseys and matching shorts for your entire roster.
                  Player names, numbers, and logos included. One design system,
                  unlimited possibilities.
                </p>
                <div className="flex flex-wrap gap-3">
                  {[
                    "Unlimited Colors",
                    "Player Names & Numbers",
                    "Team Logo Placement",
                    "Size Management",
                  ].map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 rounded-full bg-brand-500/10 text-xs font-medium text-brand-300 border border-brand-500/20"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Side Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="md:col-span-4 glass-card rounded-3xl p-8 border-white/5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center mb-6 text-gold-400 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-white">
                  Warm-Up Sets
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Zip-up jackets and warmers with all-over sublimation. Keep
                  your team coordinated from warm-ups to game time.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-4 glass-card rounded-3xl p-8 border-white/5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-brand-500/10 flex items-center justify-center mb-6 text-brand-400 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-bold mb-3 text-white">
                  Custom Design
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our design team creates a complete visual identity for your
                  team — logo, colors, and full uniform concept.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="md:col-span-8 glass-card rounded-3xl p-8 border-white/5 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-400 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <TrendingUp className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold mb-2 text-white">
                    Bulk Order Management
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                    From 1 to 100+ players. We handle sizing, quantities, and
                    deadlines for your whole squad with dedicated support and
                    bulk pricing.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* Products */}
      <RevealSection id="products" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Products"
            subtitle="Premium sublimation sportswear designed for basketball teams, leagues, and organizations."
          />

          <div
            className="flex flex-wrap justify-center gap-3 mb-14"
            role="tablist"
            aria-label="Product categories"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === cat
                    ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25 scale-105"
                    : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border/50"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard
                  product={product}
                  onViewDetails={() => setSelectedProduct(product)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Gallery */}
      <RevealSection id="gallery" className="py-24 relative">
        <div className="absolute inset-0 bg-muted/10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            title="Finished Works"
            subtitle="A glimpse into our recent basketball sublimation projects and craftsmanship."
          />
          <GalleryGrid items={galleryItems} onImageClick={openLightbox} />
        </div>
      </RevealSection>

      {/* Services */}
      <RevealSection id="services" className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Services"
            subtitle="From sublimation printing to complete team packages, we handle every step of your custom sportswear journey."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="feature-card rounded-2xl p-7"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-5 text-brand-400">
                  {iconMap[service.icon] || <Sparkles className="h-6 w-6" />}
                </div>
                <h3 className="font-display text-lg font-semibold mb-3 text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  {service.description}
                </p>
                {service.features && (
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((f) => (
                      <span
                        key={f}
                        className="text-xs text-brand-300 bg-brand-500/10 px-2.5 py-1 rounded-full"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Process */}
      <RevealSection id="process" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-950/20 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            title="How It Works"
            subtitle="Four simple steps to your custom basketball sublimation uniforms."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Choose Your Design",
                desc: "Browse our catalog or share your own basketball jersey design ideas.",
              },
              {
                step: "02",
                title: "Send Requirements",
                desc: "Tell us your sizes, quantities, colors, and preferred materials for your team.",
              },
              {
                step: "03",
                title: "Confirm Order",
                desc: "Review the digital proof, approve, and we begin production immediately.",
              },
              {
                step: "04",
                title: "Receive Your Gear",
                desc: "Quality-checked custom apparel delivered to your door, ready for the court.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group"
              >
                <div className="text-6xl font-display font-extrabold text-brand-500/10 mb-4 group-hover:text-brand-500/20 transition-colors">
                  {item.step}
                </div>
                <h3 className="font-display text-lg font-semibold mb-2 text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-brand-500/20">
                    <ChevronRight className="h-6 w-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* Testimonials */}
      <RevealSection className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What Teams Say"
            subtitle="Real feedback from basketball teams and organizations we have had the pleasure to work with."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="feature-card rounded-2xl"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < testimonial.rating
                          ? "text-gold-400 fill-gold-400"
                          : "text-muted-foreground/30"
                      )}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm text-white">
                    {testimonial.name}
                  </p>
                  {testimonial.role && (
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* FAQ */}
      <RevealSection id="faq" className="py-24 relative">
        <div className="absolute inset-0 bg-muted/10" />
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative">
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Answers to common questions about our sublimation printing and basketball team packages."
          />
          <FAQAccordion items={faqs} />
        </div>
      </RevealSection>

      {/* Contact CTA */}
      <RevealSection id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/40 via-dark-800 to-brand-900/40" />
        <div className="absolute inset-0 bg-hero-glow opacity-40" />
        <FloatingOrb
          className="w-[500px] h-[500px] bg-brand-500/5 -top-20 left-1/4"
          delay={0}
        />
        <FloatingOrb
          className="w-[400px] h-[400px] bg-gold-500/5 -bottom-20 right-1/4"
          delay={3}
        />

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative">
          <SectionHeading
            title="Ready to Build Your Team Identity?"
            subtitle="Get in touch with us today. We will discuss your basketball team package and provide a detailed quote."
          />
          <div className="divider-gold mb-12 max-w-xs mx-auto" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="mailto:hello@yenzhen.com?subject=Custom Sportswear Inquiry"
              className="btn-primary group"
            >
              Request a Quote
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1 inline" />
            </Link>
            <Link
              href="https://m.me/yenzhentailoring"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Message on Messenger
            </Link>
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            Free design consultation • Pantone color matching • Unlimited
            revisions
          </p>
        </div>
      </RevealSection>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              className="w-full h-auto rounded-xl"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/30 rounded-full p-2 backdrop-blur-sm"
              aria-label="Close lightbox"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            {galleryItems.length > 1 && (
              <>
                <button
                  onClick={() => navigateLightbox("prev")}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 rounded-full p-2 backdrop-blur-sm"
                  aria-label="Previous"
                >
                  <ArrowRight className="h-5 w-5 rotate-180" />
                </button>
                <button
                  onClick={() => navigateLightbox("next")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-black/30 rounded-full p-2 backdrop-blur-sm"
                  aria-label="Next"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            )}
            <p className="mt-4 text-center text-white font-medium">
              {lightboxImage.title}
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
