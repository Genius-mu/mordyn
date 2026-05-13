import {
  ChevronDown,
  Star,
  ShoppingCart,
  SlidersHorizontal,
  X,
  Search,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../lib/product";
import { useEffect, useMemo, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Reveal hook (matches Home for consistency)                                */
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
/*  Static config                                                             */
/* -------------------------------------------------------------------------- */
const CATEGORIES = [
  { name: "Everything", value: "all" },
  { name: "Electronics", value: "electronics" },
  { name: "Accessories", value: "accessories" },
  { name: "Bags", value: "bags" },
  { name: "Clothes", value: "clothes" },
];

const SORT_OPTIONS = [
  { value: "popular", label: "Most popular" },
  { value: "price-low", label: "Price: low to high" },
  { value: "price-high", label: "Price: high to low" },
  { value: "newest", label: "Newest first" },
  { value: "rating", label: "Highest rated" },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
const Shop = () => {
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [priceMax, setPriceMax] = useState(500);
  const [search, setSearch] = useState("");
  const [sortOpen, setSortOpen] = useState(false);

  const sortRef = useRef(null);

  // Close sort dropdown on outside click / escape — fixes the original
  // hover-only menu that broke on touch devices.
  useEffect(() => {
    const onDown = (e) => {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setSortOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Filter + sort. The original Shop computed priceRange but never applied
  // it — fixed here so the slider actually narrows the grid.
  const visibleProducts = useMemo(() => {
    const filtered = products.filter((p) => {
      if (selectedCategory !== "all" && p.category !== selectedCategory)
        return false;
      if (p.price > priceMax) return false;
      if (
        search.trim() &&
        !p.name.toLowerCase().includes(search.trim().toLowerCase())
      )
        return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "popular" || sortBy === "rating")
        return b.rating - a.rating;
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "newest") return (b.id ?? 0) - (a.id ?? 0);
      return 0;
    });
  }, [selectedCategory, sortBy, priceMax, search]);

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (priceMax < 500 ? 1 : 0) +
    (search ? 1 : 0);

  const resetAll = () => {
    setSelectedCategory("all");
    setPriceMax(500);
    setSearch("");
    setSortBy("popular");
  };

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Sort";

  return (
    <div className="bg-white text-neutral-900 selection:bg-[#ff4500] selection:text-white">
      {/* ============================== HERO ============================== */}
      <section className="relative mt-[5em] overflow-hidden bg-neutral-950 text-white">
        {/* Layered orangered atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff4500] via-[#cc3700] to-neutral-950" />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#ff4500]/30 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 hidden lg:grid grid-cols-12 pointer-events-none">
          {[...Array(13)].map((_, i) => (
            <div key={i} className="border-l border-white/[0.06] h-full" />
          ))}
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-24 lg:py-32">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-white/80" />
              <span className="text-[11px] tracking-[0.35em] uppercase font-medium">
                The Catalogue
              </span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <Reveal delay={100}>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] tracking-tight">
                  Everything,
                  <br />
                  <em className="italic font-light">in one place.</em>
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={250}>
                <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-md">
                  The full collection — filterable by category, price, and
                  whatever else you can think of. {products.length} pieces, all
                  hand-picked.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Search bar tucked into the hero */}
          <Reveal delay={400}>
            <div className="mt-12 max-w-2xl">
              <div className="relative">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-white/60"
                  size={18}
                  strokeWidth={1.5}
                />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search the catalogue…"
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/25 text-white placeholder:text-white/50 pl-14 pr-14 py-4 rounded-full outline-none focus:border-white focus:bg-white/15 transition-colors"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={18} strokeWidth={1.5} />
                  </button>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== STICKY FILTER BAR ====================== */}
      <div className="sticky top-16 z-30 bg-white/85 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm">
            <SlidersHorizontal
              size={15}
              strokeWidth={1.6}
              className="text-[#ff4500]"
            />
            <span className="font-medium text-neutral-950">
              {visibleProducts.length}{" "}
              <span className="text-neutral-500 font-normal">
                {visibleProducts.length === 1 ? "piece" : "pieces"}
              </span>
            </span>
            {activeFilterCount > 0 && (
              <>
                <span className="text-neutral-300">·</span>
                <button
                  onClick={resetAll}
                  className="text-[#ff4500] hover:underline underline-offset-4 font-medium"
                >
                  Clear filters ({activeFilterCount})
                </button>
              </>
            )}
          </div>

          {/* Sort dropdown — click-driven, with outside-click + escape close */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortOpen((v) => !v)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-300 bg-white hover:border-neutral-950 transition-colors text-sm"
              aria-haspopup="listbox"
              aria-expanded={sortOpen}
            >
              <span className="text-neutral-500 hidden sm:inline">Sort:</span>
              <span className="font-medium text-neutral-950">
                {currentSortLabel}
              </span>
              <ChevronDown
                size={15}
                strokeWidth={1.8}
                className={`transition-transform duration-300 ${
                  sortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {sortOpen && (
              <div
                role="listbox"
                className="absolute right-0 top-full mt-2 w-64 bg-white border border-neutral-200 rounded-2xl shadow-2xl shadow-neutral-900/10 overflow-hidden z-50"
              >
                {SORT_OPTIONS.map((option) => {
                  const active = sortBy === option.value;
                  return (
                    <button
                      key={option.value}
                      role="option"
                      aria-selected={active}
                      onClick={() => {
                        setSortBy(option.value);
                        setSortOpen(false);
                      }}
                      className={`w-full px-5 py-3 text-left text-sm flex items-center justify-between transition-colors ${
                        active
                          ? "bg-[#ff4500] text-white"
                          : "text-neutral-800 hover:bg-neutral-50 hover:text-[#ff4500]"
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                      {active && <Check size={15} strokeWidth={2} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============================ MAIN ============================ */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ---------------- SIDEBAR ---------------- */}
          <aside className="lg:col-span-3 lg:sticky lg:top-[10em] h-fit space-y-10">
            {/* Categories */}
            <Reveal>
              <div>
                <h3 className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-5">
                  ⟢ Category
                </h3>
                <ul className="space-y-1">
                  {CATEGORIES.map((cat) => {
                    const active = selectedCategory === cat.value;
                    const count =
                      cat.value === "all"
                        ? products.length
                        : products.filter((p) => p.category === cat.value)
                            .length;
                    return (
                      <li key={cat.value}>
                        <button
                          onClick={() => setSelectedCategory(cat.value)}
                          className={`w-full group flex items-center justify-between py-2.5 text-left border-b transition-colors ${
                            active
                              ? "border-[#ff4500]"
                              : "border-neutral-200 hover:border-neutral-950"
                          }`}
                        >
                          <span
                            className={`font-serif text-lg flex items-center gap-3 transition-colors ${
                              active
                                ? "text-[#ff4500]"
                                : "text-neutral-950 group-hover:text-neutral-700"
                            }`}
                          >
                            {active && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4500]" />
                            )}
                            {cat.name}
                          </span>
                          <span
                            className={`text-xs tabular-nums ${
                              active ? "text-[#ff4500]" : "text-neutral-400"
                            }`}
                          >
                            {String(count).padStart(2, "0")}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Reveal>

            {/* Price */}
            <Reveal delay={120}>
              <div>
                <h3 className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-5">
                  ⟢ Price
                </h3>
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between font-serif">
                    <span className="text-2xl text-neutral-950">$0</span>
                    <span className="text-neutral-300">—</span>
                    <span className="text-2xl text-neutral-950 tabular-nums">
                      ${priceMax}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={priceMax}
                    onChange={(e) => setPriceMax(parseInt(e.target.value))}
                    className="w-full h-1 bg-neutral-200 rounded-full appearance-none cursor-pointer accent-[#ff4500]"
                  />
                  <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>Max budget</span>
                    {priceMax < 500 && (
                      <button
                        onClick={() => setPriceMax(500)}
                        className="text-[#ff4500] hover:underline underline-offset-4 font-medium"
                      >
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Promo card */}
            <Reveal delay={240}>
              <div className="relative rounded-2xl bg-neutral-950 text-white p-6 overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#ff4500]/30 blur-2xl pointer-events-none" />
                <div className="relative">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#ff4500] font-semibold mb-3">
                    Members only
                  </div>
                  <p className="font-serif text-xl leading-snug mb-4">
                    Get 10% off your first order when you join the dispatch.
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-sm border-b border-white/40 hover:border-[#ff4500] hover:text-[#ff4500] transition-colors pb-0.5"
                  >
                    Subscribe
                    <ArrowUpRight size={14} strokeWidth={1.8} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </aside>

          {/* ---------------- PRODUCT GRID ---------------- */}
          <div className="lg:col-span-9">
            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {visibleProducts.map((product, i) => (
                  <Reveal key={product.id ?? i} delay={(i % 6) * 60}>
                    <article className="group">
                      <div className="relative aspect-[4/5] bg-neutral-50 rounded-2xl overflow-hidden mb-5 border border-neutral-200">
                        <img
                          src={product.img}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Discount badge */}
                        <div className="absolute top-4 left-4 bg-[#ff4500] text-white text-[10px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full font-semibold">
                          −28%
                        </div>

                        {/* Quick add */}
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
                            {product.rating}
                          </span>
                          {product.category && (
                            <>
                              <span className="text-neutral-300">·</span>
                              <span className="text-xs text-neutral-500 capitalize">
                                {product.category}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="border border-dashed border-neutral-300 rounded-3xl py-24 px-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#ff4500]/10 flex items-center justify-center mb-6">
                  <ShoppingCart
                    size={26}
                    strokeWidth={1.4}
                    className="text-[#ff4500]"
                  />
                </div>
                <h3 className="font-serif text-3xl text-neutral-950 mb-3">
                  Nothing matches — yet.
                </h3>
                <p className="text-neutral-500 max-w-md mb-8">
                  Try widening the price range, switching category, or clearing
                  your search. We've got pieces for most budgets.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <button
                    onClick={resetAll}
                    className="bg-[#ff4500] hover:bg-[#ff5a1f] text-white px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 transition-colors shadow-[0_10px_30px_-10px_rgba(255,69,0,0.6)]"
                  >
                    Reset filters
                    <ArrowUpRight size={15} strokeWidth={1.8} />
                  </button>
                  <Link
                    to="/"
                    className="border border-neutral-300 hover:border-neutral-950 text-neutral-950 px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    Back to home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
