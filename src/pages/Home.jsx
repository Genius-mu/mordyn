import {
  ArrowRight,
  ArrowUpRight,
  Laptop,
  Luggage,
  Shirt,
  ShoppingCart,
  SoapDispenserDroplet,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Headphones,
  Quote,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { products } from "../lib/product";

/* -------------------------------------------------------------------------- */
/*  Reveal hook — fades elements in as they enter the viewport                */
/* -------------------------------------------------------------------------- */
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-[900ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Static data                                                               */
/* -------------------------------------------------------------------------- */
const categories = [
  {
    name: "Electronics",
    icon: <Laptop className="w-7 h-7" strokeWidth={1.4} />,
    link: "electronics",
    count: "248 items",
  },
  {
    name: "Accessories",
    icon: <SoapDispenserDroplet className="w-7 h-7" strokeWidth={1.4} />,
    link: "accessories",
    count: "164 items",
  },
  {
    name: "Bags",
    icon: <Luggage className="w-7 h-7" strokeWidth={1.4} />,
    link: "bags",
    count: "92 items",
  },
  {
    name: "Apparel",
    icon: <Shirt className="w-7 h-7" strokeWidth={1.4} />,
    link: "apparel",
    count: "317 items",
  },
];

const trustFeatures = [
  {
    icon: <Truck className="w-5 h-5" strokeWidth={1.5} />,
    title: "Free shipping",
    text: "On orders over $50",
  },
  {
    icon: <RotateCcw className="w-5 h-5" strokeWidth={1.5} />,
    title: "30-day returns",
    text: "No questions asked",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />,
    title: "Secure checkout",
    text: "256-bit encryption",
  },
  {
    icon: <Headphones className="w-5 h-5" strokeWidth={1.5} />,
    title: "24/7 support",
    text: "Real humans, always",
  },
];

const testimonials = [
  {
    quote:
      "Genuinely the most considered shopping experience I've had online in years. Packaging, product, follow-up — everything just feels right.",
    name: "Amara Okafor",
    role: "Designer, Lagos",
  },
  {
    quote:
      "I came for one thing and stayed for the curation. Quality is consistent, and shipping was faster than promised both times.",
    name: "Daniel Reyes",
    role: "Architect, Madrid",
  },
  {
    quote:
      "Customer service actually solved my problem in a single message. That alone earned them a permanent spot in my bookmarks.",
    name: "Priya Shah",
    role: "Photographer, Mumbai",
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/*  Palette: pure white background, near-black ink, #ff4500 orangered accent  */
/* -------------------------------------------------------------------------- */
const Home = () => {
  const { addToCart } = useCart();
  const firstFourProducts = products.slice(0, 4);

  return (
    <div className="bg-white text-neutral-900 selection:bg-[#ff4500] selection:text-white">
      {/* ============================== HERO ============================== */}
      <section className="relative mt-[5em] min-h-[90vh] overflow-hidden bg-white">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url(/images/img6.webp)" }}
        />
        {/* Strong orangered → ink wash so the hero reads as branded, not stocky */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff4500]/85 via-[#1a0a05]/80 to-black/95" />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Decorative grid lines */}
        <div className="absolute inset-0 hidden lg:grid grid-cols-12 pointer-events-none">
          {[...Array(13)].map((_, i) => (
            <div key={i} className="border-l border-white/[0.06] h-full" />
          ))}
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32 min-h-[90vh] flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-7 text-white">
              <Reveal>
                <div className="inline-flex items-center gap-3 mb-8">
                  <span className="h-px w-10 bg-white/80" />
                  <span className="text-[11px] tracking-[0.35em] uppercase text-white font-medium">
                    Spring · Edition Nº 04
                  </span>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-8">
                  Objects,{" "}
                  <em className="text-[#ff4500] italic">considered.</em>
                  <br />
                  Pieces, <span className="italic font-light">collected.</span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p className="text-white/80 text-lg max-w-xl leading-relaxed mb-10">
                  A small, opinionated catalogue of goods built to last —
                  electronics, leather, garments — chosen one season at a time.
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="flex flex-wrap gap-4 items-center">
                  <Link
                    to="/shop"
                    className="group inline-flex items-center gap-3 bg-[#ff4500] text-white px-8 py-4 rounded-full font-medium hover:bg-[#ff5a1f] transition-colors duration-300 shadow-[0_10px_40px_-10px_rgba(255,69,0,0.6)]"
                  >
                    Explore the catalogue
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-white/85 hover:text-white px-2 py-4 underline underline-offset-8 decoration-white/30 hover:decoration-[#ff4500] transition-colors"
                  >
                    Our story
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={500}>
                <div className="mt-16 flex items-center gap-8 text-white/65 text-sm">
                  <div>
                    <div className="font-serif text-3xl text-white">12k+</div>
                    <div className="tracking-wide">Happy customers</div>
                  </div>
                  <div className="h-12 w-px bg-white/15" />
                  <div>
                    <div className="font-serif text-3xl text-white">
                      4.9<span className="text-[#ff4500]">★</span>
                    </div>
                    <div className="tracking-wide">Average review</div>
                  </div>
                  <div className="h-12 w-px bg-white/15 hidden sm:block" />
                  <div className="hidden sm:block">
                    <div className="font-serif text-3xl text-white">48h</div>
                    <div className="tracking-wide">Avg. delivery</div>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: image card */}
            <div className="lg:col-span-5 relative">
              <Reveal delay={400}>
                <div className="relative">
                  <div className="absolute -inset-4 border border-[#ff4500]/40 rounded-3xl" />
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                    <img
                      src="/images/img5.webp"
                      alt="Featured product"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <div className="text-[11px] tracking-[0.3em] uppercase text-[#ff4500] font-semibold mb-1">
                        Editor's pick
                      </div>
                      <div className="font-serif text-2xl">
                        The Spring Collection
                      </div>
                    </div>
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -left-6 top-8 bg-[#ff4500] text-white rounded-full w-24 h-24 flex-col items-center justify-center text-center shadow-2xl rotate-[-8deg] hidden md:flex">
                    <span className="font-serif text-2xl leading-none">
                      New
                    </span>
                    <span className="text-[10px] tracking-[0.2em] uppercase mt-1">
                      Drop · 04
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ MARQUEE ============================ */}
      <section className="bg-[#ff4500] text-white overflow-hidden">
        <div className="flex animate-[marquee_40s_linear_infinite] py-5 whitespace-nowrap">
          {[...Array(2)].map((_, k) => (
            <div key={k} className="flex items-center gap-12 px-6">
              {[
                "Free worldwide shipping over $50",
                "Carbon-neutral delivery",
                "30-day no-questions returns",
                "Hand-picked, never algorithmic",
                "New drops every Friday",
                "Made by humans, for humans",
              ].map((t, i) => (
                <span
                  key={`${k}-${i}`}
                  className="flex items-center gap-12 text-sm tracking-widest uppercase font-medium"
                >
                  {t}
                  <span className="text-white/70">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* =========================== CATEGORIES =========================== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                  ⟢ Browse the shelves
                </div>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950">
                  Top categories
                </h2>
              </div>
              <Link
                to="/categories"
                className="group inline-flex items-center gap-2 text-neutral-700 hover:text-[#ff4500] self-start md:self-auto transition-colors"
              >
                <span className="border-b border-neutral-300 group-hover:border-[#ff4500] pb-1 transition-colors">
                  View all categories
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {categories.map((item, i) => (
              <Reveal key={item.name} delay={i * 100}>
                <Link
                  to={item.link}
                  className="group relative block aspect-square bg-white border border-neutral-200 rounded-2xl p-6 overflow-hidden hover:border-[#ff4500] transition-colors duration-500"
                >
                  {/* Number */}
                  <div className="absolute top-5 right-5 font-serif text-neutral-300 group-hover:text-white text-sm tabular-nums transition-colors duration-500 z-10">
                    0{i + 1}
                  </div>

                  {/* Icon */}
                  <div className="absolute top-5 left-5 text-neutral-700 group-hover:text-white group-hover:-translate-y-1 transition-all duration-500 z-10">
                    {item.icon}
                  </div>

                  {/* Reveal layer — fills with orangered on hover */}
                  <div className="absolute inset-x-0 bottom-0 h-0 bg-[#ff4500] group-hover:h-full transition-all duration-500 ease-out" />

                  {/* Text */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 transition-colors duration-500">
                    <h3 className="font-serif text-2xl md:text-3xl tracking-tight mb-1 text-neutral-950 group-hover:text-white transition-colors duration-500">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-neutral-500 group-hover:text-white/85 transition-colors duration-500">
                      <span>{item.count}</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== FEATURED ============================ */}
      <section className="bg-neutral-50 border-y border-neutral-200/80 py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                  ⟢ Featured arrivals
                </div>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight max-w-xl leading-[1.05] text-neutral-950">
                  Selected for you,
                  <br />
                  <em className="text-neutral-400">one piece at a time.</em>
                </h2>
              </div>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 text-neutral-700 hover:text-[#ff4500] self-start md:self-auto transition-colors"
              >
                <span className="border-b border-neutral-300 group-hover:border-[#ff4500] pb-1 transition-colors">
                  Browse the full shop
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {firstFourProducts.map((product, i) => (
              <Reveal key={product.id ?? i} delay={i * 80}>
                <article className="group">
                  <div className="relative aspect-[4/5] bg-white rounded-2xl overflow-hidden mb-5 border border-neutral-200">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Top badge — the orangered moment */}
                    <div className="absolute top-4 left-4 bg-[#ff4500] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full font-semibold">
                      −28%
                    </div>

                    {/* Hover quick-add */}
                    <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-neutral-950 text-white hover:bg-[#ff4500] active:scale-[0.98] py-3 rounded-full font-medium flex items-center justify-center gap-2 text-sm transition-all duration-300"
                      >
                        <ShoppingCart size={15} strokeWidth={1.8} />
                        Quick add
                      </button>
                    </div>
                  </div>

                  <div className="px-1">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-serif text-lg leading-snug line-clamp-2 group-hover:text-[#ff4500] transition-colors text-neutral-950">
                        {product.name}
                      </h3>
                      <span className="font-serif text-lg tabular-nums whitespace-nowrap text-neutral-950">
                        ${product.price}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, j) => (
                          <Star
                            key={j}
                            size={12}
                            strokeWidth={1.5}
                            className={
                              j < Math.floor(product.rating)
                                ? "fill-[#ff4500] text-[#ff4500]"
                                : "text-neutral-300"
                            }
                          />
                        ))}
                      </div>
                      <span className="text-xs text-neutral-500 tabular-nums">
                        {product.rating} · in stock
                      </span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== TRUST ROW =========================== */}
      <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {trustFeatures.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 w-11 h-11 rounded-full bg-neutral-950 group-hover:bg-[#ff4500] text-white flex items-center justify-center transition-colors duration-300">
                    {f.icon}
                  </div>
                  <div>
                    <div className="font-serif text-lg leading-tight text-neutral-950">
                      {f.title}
                    </div>
                    <div className="text-sm text-neutral-500 mt-1">
                      {f.text}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== EDITORIAL =========================== */}
      <section className="bg-neutral-950 text-white py-28 lg:py-36 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        {/* Orangered glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#ff4500]/15 blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-5">
                  ⟢ Our philosophy
                </div>
                <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight mb-8">
                  We believe in{" "}
                  <em className="text-[#ff4500]">fewer, better</em> things.
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
                  Every product on this store is chosen by a small team of
                  three. No drop-shipping, no marketplace clutter, no infinite
                  scroll. Just objects we'd put on our own shelves.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-3 text-white group"
                >
                  <span className="border-b border-white/40 group-hover:border-[#ff4500] pb-1 transition-colors">
                    Read the manifesto
                  </span>
                  <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 group-hover:text-[#ff4500] transition-all" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-800">
                  <img
                    src="/images/img5.webp"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-800 mt-12 ring-2 ring-[#ff4500]/40">
                  <img
                    src="/images/img6.webp"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================== TESTIMONIALS ========================= */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-16">
              <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                ⟢ Kind words
              </div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950">
                What people are saying
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 120}>
                <figure className="bg-white border border-neutral-200 rounded-2xl p-8 h-full flex flex-col hover:border-[#ff4500] transition-colors duration-300">
                  <Quote
                    className="w-7 h-7 text-[#ff4500] mb-5"
                    strokeWidth={1.2}
                  />
                  <blockquote className="font-serif text-lg leading-relaxed text-neutral-800 flex-1">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-6 pt-6 border-t border-neutral-200">
                    <div className="font-medium text-neutral-950">{t.name}</div>
                    <div className="text-sm text-neutral-500">{t.role}</div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ NEWSLETTER ========================== */}
      <section className="pb-24 lg:pb-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="relative bg-[#ff4500] text-white rounded-[2rem] overflow-hidden px-8 py-20 lg:px-20 lg:py-28">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
              {/* Decorative arcs */}
              <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full border border-white/15 hidden md:block" />
              <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full border border-white/15 hidden md:block" />
              <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full border border-white/10 hidden md:block" />

              <div className="relative max-w-2xl mx-auto text-center">
                <div className="text-[11px] tracking-[0.35em] uppercase text-white/90 font-semibold mb-5">
                  ⟢ The dispatch
                </div>
                <h2 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight mb-6">
                  Join the <em className="text-white/90">atelier</em>.
                </h2>
                <p className="text-white/85 text-lg max-w-lg mx-auto mb-10">
                  One thoughtful email a month. New drops, behind-the-scenes,
                  occasional subscriber-only discounts. No spam, ever.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-white/10 border border-white/30 text-white placeholder:text-white/60 px-5 py-4 rounded-full outline-none focus:border-white focus:bg-white/15 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-white text-[#ff4500] hover:bg-neutral-950 hover:text-white px-7 py-4 rounded-full font-semibold transition-colors duration-300 inline-flex items-center justify-center gap-2 group"
                  >
                    Subscribe
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </button>
                </form>
                <p className="text-xs text-white/60 mt-6">
                  By subscribing you agree to our privacy policy. Unsubscribe in
                  one click.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
