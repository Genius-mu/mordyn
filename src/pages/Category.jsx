import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Laptop,
  Luggage,
  Shirt,
  SoapDispenserDroplet,
  Sparkles,
  Compass,
  Tag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Reveal hook (matches Home / Shop)                                         */
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
      { threshold: 0.12 },
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
      className={`transition-all duration-[800ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
    >
      {children}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */
const categories = [
  {
    name: "Electronics",
    tagline: "Tools that hum.",
    icon: <Laptop size={28} strokeWidth={1.4} />,
    desc: "Latest gadgets, devices, and tech essentials — chosen for craft as much as spec.",
    link: "/shop?category=electronics",
    img: "/images/img1.webp",
    items: 120,
  },
  {
    name: "Accessories",
    tagline: "Small things, considered.",
    icon: <SoapDispenserDroplet size={28} strokeWidth={1.4} />,
    desc: "Premium accessories to complement a quietly intentional lifestyle.",
    link: "/shop?category=accessories",
    img: "/images/img2.webp",
    items: 80,
  },
  {
    name: "Bags",
    tagline: "Goes where you go.",
    icon: <Luggage size={28} strokeWidth={1.4} />,
    desc: "Stylish, durable bags for the daily commute and the long trip alike.",
    link: "/shop?category=bags",
    img: "/images/img3.webp",
    items: 65,
  },
  {
    name: "Clothes",
    tagline: "Wear, repeat.",
    icon: <Shirt size={28} strokeWidth={1.4} />,
    desc: "Modern fashion collections built for all seasons and most days.",
    link: "/shop?category=clothes",
    img: "/images/img4.webp",
    items: 150,
  },
];

const valueProps = [
  {
    icon: <Compass size={20} strokeWidth={1.5} />,
    title: "Easy navigation",
    desc: "Find what you need without endless scrolling. Categories are ruthlessly organized.",
  },
  {
    icon: <Sparkles size={20} strokeWidth={1.5} />,
    title: "Curated, not collected",
    desc: "Every item is hand-picked. If it's on the shelf, we'd own it ourselves.",
  },
  {
    icon: <Tag size={20} strokeWidth={1.5} />,
    title: "Better deals",
    desc: "Exclusive offers tailored to each category — and we'll never inflate to discount.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
const Categories = () => {
  const total = categories.reduce((acc, c) => acc + c.items, 0);

  return (
    <div className="bg-white text-neutral-900 selection:bg-[#ff4500] selection:text-white">
      {/* ============================== HERO ============================== */}
      <section className="relative mt-[5em] overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff4500] via-[#cc3700] to-neutral-950" />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#ff4500]/30 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 hidden lg:grid grid-cols-12 pointer-events-none">
          {[...Array(13)].map((_, i) => (
            <div key={i} className="border-l border-white/[0.06] h-full" />
          ))}
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-12 group"
            >
              <ArrowLeft
                size={16}
                strokeWidth={1.6}
                className="group-hover:-translate-x-1 transition-transform"
              />
              Back to home
            </Link>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <Reveal delay={100}>
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-white/80" />
                  <span className="text-[11px] tracking-[0.35em] uppercase font-medium">
                    Four Departments
                  </span>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] tracking-tight">
                  Browse by <em className="italic font-light">how you live.</em>
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={350}>
                <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-md">
                  Curated collections designed to match your style, your needs,
                  and your everyday. {total}+ pieces, organized so you don't
                  have to.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== INDEX BAR ====================== */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
          <span className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-semibold">
            Index
          </span>
          {categories.map((cat, i) => (
            <a
              key={cat.name}
              href={`#${cat.name.toLowerCase()}`}
              className="group inline-flex items-center gap-2 text-neutral-700 hover:text-[#ff4500] transition-colors"
            >
              <span className="font-serif text-neutral-300 group-hover:text-[#ff4500] tabular-nums transition-colors">
                0{i + 1}
              </span>
              <span className="font-medium">{cat.name}</span>
            </a>
          ))}
        </div>
      </section>

      {/* ====================== EDITORIAL CATEGORY LIST ====================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                  ⟢ The departments
                </div>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950">
                  Pick a shelf.
                </h2>
              </div>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 text-neutral-700 hover:text-[#ff4500] self-start md:self-auto transition-colors"
              >
                <span className="border-b border-neutral-300 group-hover:border-[#ff4500] pb-1 transition-colors">
                  Or see everything at once
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          {/* Editorial split layout: alternating image / copy rows */}
          <div className="space-y-20 lg:space-y-32">
            {categories.map((cat, i) => {
              const flipped = i % 2 === 1;
              return (
                <Reveal key={cat.name} delay={50}>
                  <Link
                    to={cat.link}
                    id={cat.name.toLowerCase()}
                    className={`group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center scroll-mt-32 ${
                      flipped ? "lg:[direction:rtl]" : ""
                    }`}
                  >
                    {/* Image */}
                    <div className="lg:col-span-7 [direction:ltr]">
                      <div className="relative aspect-[5/4] rounded-3xl overflow-hidden bg-neutral-100">
                        <img
                          src={cat.img}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Subtle wash that deepens on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent group-hover:from-black/60 transition-colors duration-500" />

                        {/* Number plate */}
                        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase text-neutral-950 font-semibold">
                          Department · 0{i + 1}
                        </div>

                        {/* Hover badge */}
                        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-[#ff4500] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl">
                            <ArrowUpRight
                              size={22}
                              strokeWidth={1.6}
                              className="group-hover:rotate-45 transition-transform duration-500"
                            />
                          </div>
                        </div>

                        {/* Items count chip */}
                        <div className="absolute bottom-6 left-6 bg-neutral-950/80 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-xs tracking-wide tabular-nums">
                          {cat.items}+ items
                        </div>
                      </div>
                    </div>

                    {/* Copy */}
                    <div className="lg:col-span-5 [direction:ltr]">
                      <div className="text-[#ff4500] mb-5 group-hover:rotate-[-6deg] origin-left transition-transform duration-500">
                        {cat.icon}
                      </div>
                      <div className="text-[11px] tracking-[0.35em] uppercase text-neutral-500 font-semibold mb-3">
                        {cat.tagline}
                      </div>
                      <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-neutral-950 mb-5 group-hover:text-[#ff4500] transition-colors duration-300">
                        {cat.name}
                      </h3>
                      <p className="text-neutral-600 text-lg leading-relaxed mb-7 max-w-md">
                        {cat.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-neutral-950 group-hover:text-[#ff4500] transition-colors">
                        <span className="border-b border-neutral-300 group-hover:border-[#ff4500] pb-0.5 font-medium transition-colors">
                          Browse {cat.name.toLowerCase()}
                        </span>
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.8}
                          className="group-hover:rotate-45 transition-transform duration-300"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================== WHY SHOP BY CATEGORY ====================== */}
      <section className="py-20 lg:py-28 bg-neutral-50 border-y border-neutral-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-16">
              <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                ⟢ Why this way
              </div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950 max-w-2xl mx-auto leading-[1.05]">
                Shopping{" "}
                <em className="text-neutral-400">that respects your time.</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valueProps.map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="group bg-white border border-neutral-200 rounded-2xl p-8 h-full hover:border-[#ff4500] transition-colors duration-300">
                  <div className="w-11 h-11 rounded-full bg-neutral-950 group-hover:bg-[#ff4500] text-white flex items-center justify-center mb-6 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="font-serif text-2xl text-neutral-950 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="mt-6 pt-6 border-t border-neutral-100 font-serif text-neutral-300 group-hover:text-[#ff4500] tabular-nums transition-colors">
                    0{i + 1}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== PROMO BANNER ====================== */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="relative bg-[#ff4500] text-white rounded-[2rem] overflow-hidden p-10 md:p-16 lg:p-20">
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
              {/* Decorative arcs */}
              <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full border border-white/20 hidden md:block" />
              <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full border border-white/15 hidden md:block" />
              <div className="absolute -left-24 top-10 w-52 h-52 rounded-full border border-white/10 hidden md:block" />

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="text-[11px] tracking-[0.35em] uppercase text-white/85 font-semibold mb-5">
                    ⟢ Limited time
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight">
                    Up to{" "}
                    <em className="italic font-light text-white/90">50% off</em>{" "}
                    selected categories.
                  </h2>
                  <p className="text-white/85 mt-6 max-w-lg text-base lg:text-lg">
                    Don't miss our seasonal markdowns. New pieces added every
                    Friday — and always while supplies last.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:text-right">
                  <Link
                    to="/shop"
                    className="group inline-flex items-center gap-3 bg-white text-[#ff4500] hover:bg-neutral-950 hover:text-white px-8 py-4 rounded-full font-semibold transition-colors duration-300"
                  >
                    Shop the deals
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      className="group-hover:rotate-45 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== FINAL CTA ====================== */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
              <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-5">
                ⟢ Still browsing
              </div>
              <h2 className="font-serif text-4xl md:text-6xl tracking-tight text-neutral-950 leading-[1.05] mb-6">
                Not sure what to pick?
              </h2>
              <p className="text-neutral-600 text-lg max-w-md mb-10">
                Skip the categories and see everything in one place — sorted,
                filterable, and built for the indecisive among us.
              </p>
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 bg-neutral-950 hover:bg-[#ff4500] text-white px-8 py-4 rounded-full font-medium transition-colors duration-300 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]"
              >
                Browse all products
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  className="group-hover:rotate-45 transition-transform"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Categories;
