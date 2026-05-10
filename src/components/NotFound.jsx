import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Home,
  Mail,
  Search,
  ShoppingBag,
  Compass,
  X,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Quick links — where most "lost" visitors actually want to go              */
/* -------------------------------------------------------------------------- */
const quickLinks = [
  {
    label: "Home",
    desc: "The front page",
    to: "/",
    icon: <Home size={18} strokeWidth={1.5} />,
  },
  {
    label: "Shop",
    desc: "The full catalogue",
    to: "/shop",
    icon: <ShoppingBag size={18} strokeWidth={1.5} />,
  },
  {
    label: "Categories",
    desc: "Browse by department",
    to: "/categories",
    icon: <Compass size={18} strokeWidth={1.5} />,
  },
  {
    label: "Contact",
    desc: "Talk to a human",
    to: "/contact",
    icon: <Mail size={18} strokeWidth={1.5} />,
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [glitch, setGlitch] = useState(false);
  const inputRef = useRef(null);

  // Periodic glitch on the big "404" — a small touch of life
  useEffect(() => {
    const id = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 180);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      inputRef.current?.focus();
      return;
    }
    navigate(`/shop?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className="bg-white text-neutral-900 selection:bg-[#ff4500] selection:text-white min-h-screen">
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
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#ff4500]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full border border-white/10 hidden md:block pointer-events-none" />
        <div className="absolute inset-0 hidden lg:grid grid-cols-12 pointer-events-none">
          {[...Array(13)].map((_, i) => (
            <div key={i} className="border-l border-white/[0.06] h-full" />
          ))}
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-white/80" />
                <span className="text-[11px] tracking-[0.35em] uppercase font-medium text-white/90">
                  Error · 404
                </span>
              </div>

              <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight mb-6">
                We can't find{" "}
                <em className="italic font-light text-white/85">
                  what you're looking for.
                </em>
              </h1>

              <p className="text-white/80 text-lg leading-relaxed max-w-xl mb-8">
                The page may have moved, the link could be broken, or it might
                never have existed in the first place. Either way, no hard
                feelings — let's get you somewhere useful.
              </p>

              {/* Attempted URL */}
              {location.pathname && location.pathname !== "/" && (
                <div className="mb-8 inline-flex items-center gap-2 bg-white/10 border border-white/15 backdrop-blur-sm rounded-full pl-4 pr-2 py-2 text-sm">
                  <span className="text-white/60 text-xs tracking-wide">
                    Tried:
                  </span>
                  <code className="text-white/95 font-mono text-xs truncate max-w-[18rem]">
                    {location.pathname}
                  </code>
                  <button
                    onClick={() =>
                      navigator.clipboard?.writeText(window.location.href)
                    }
                    className="ml-1 text-[10px] tracking-[0.2em] uppercase text-[#ff4500] hover:text-white font-semibold px-2 py-1 rounded-full bg-white/5 hover:bg-[#ff4500] transition-colors"
                    aria-label="Copy URL"
                  >
                    Copy
                  </button>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap gap-3 items-center">
                <Link
                  to="/"
                  className="group inline-flex items-center gap-3 bg-white text-neutral-950 px-7 py-3.5 rounded-full font-medium hover:bg-[#ff4500] hover:text-white transition-colors duration-300"
                >
                  <Home size={15} strokeWidth={1.8} />
                  Take me home
                </Link>
                <button
                  onClick={() => navigate(-1)}
                  className="group inline-flex items-center gap-2 text-white/85 hover:text-white px-2 py-3.5 transition-colors"
                >
                  <ArrowLeft
                    size={16}
                    strokeWidth={1.6}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  Go back to where I came from
                </button>
              </div>
            </div>

            {/* Right: oversized 404 with glitch */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative select-none" aria-hidden="true">
                <div
                  className={`font-serif font-bold leading-none tracking-tighter text-[14rem] md:text-[18rem] lg:text-[20rem] text-transparent transition-all duration-150 ${
                    glitch
                      ? "[-webkit-text-stroke:2px_#ff4500] translate-x-[2px]"
                      : "[-webkit-text-stroke:1.5px_rgba(255,255,255,0.18)]"
                  }`}
                >
                  404
                </div>
                {/* Glitch echoes */}
                {glitch && (
                  <>
                    <div className="absolute inset-0 font-serif font-bold leading-none tracking-tighter text-[14rem] md:text-[18rem] lg:text-[20rem] text-[#ff4500]/40 -translate-x-1 mix-blend-screen pointer-events-none">
                      404
                    </div>
                    <div className="absolute inset-0 font-serif font-bold leading-none tracking-tighter text-[14rem] md:text-[18rem] lg:text-[20rem] text-white/30 translate-x-1 mix-blend-screen pointer-events-none">
                      404
                    </div>
                  </>
                )}
                {/* Floating tag */}
                <div className="absolute -top-2 -left-4 lg:-left-8 bg-[#ff4500] text-white rounded-full px-4 py-2 text-[10px] tracking-[0.25em] uppercase font-semibold rotate-[-6deg] shadow-2xl">
                  Page not found
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================== SEARCH ============================== */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
              ⟢ Try searching
            </div>
            <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-neutral-950 mb-6">
              Maybe it's just a typo.
            </h2>

            <form onSubmit={handleSearch} className="relative">
              <Search
                size={20}
                strokeWidth={1.4}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
              />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search the catalogue…"
                className="w-full bg-neutral-50 border border-neutral-200 focus:border-neutral-950 focus:bg-white text-neutral-900 placeholder:text-neutral-400 pl-14 pr-32 py-4 rounded-full outline-none transition-colors"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    inputRef.current?.focus();
                  }}
                  className="absolute right-[7.5rem] top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-neutral-700 transition-colors"
                  aria-label="Clear search"
                >
                  <X size={16} strokeWidth={1.6} />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-[#ff4500] hover:bg-[#ff5a1f] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors inline-flex items-center gap-1.5"
              >
                Search
                <ArrowRight size={13} strokeWidth={1.8} />
              </button>
            </form>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-sm">
              <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mr-1">
                Popular:
              </span>
              {["Leather bags", "Headphones", "Spring drop", "Under $100"].map(
                (s) => (
                  <button
                    key={s}
                    onClick={() => setSearch(s)}
                    className="px-3 py-1.5 rounded-full border border-neutral-200 hover:border-[#ff4500] hover:text-[#ff4500] text-sm text-neutral-700 transition-colors"
                  >
                    {s}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================== QUICK LINKS ============================== */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                ⟢ Or jump to
              </div>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-neutral-950">
                Where most lost visitors land.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((link, i) => (
              <Link
                key={link.label}
                to={link.to}
                className="group relative block bg-white border border-neutral-200 hover:border-[#ff4500] rounded-2xl p-6 transition-colors duration-300 overflow-hidden"
              >
                {/* Number */}
                <div className="absolute top-5 right-5 font-serif text-neutral-200 group-hover:text-[#ff4500] text-sm tabular-nums transition-colors">
                  0{i + 1}
                </div>

                <div className="w-11 h-11 rounded-full bg-neutral-950 group-hover:bg-[#ff4500] text-white flex items-center justify-center mb-6 transition-colors duration-300">
                  {link.icon}
                </div>

                <h3 className="font-serif text-2xl text-neutral-950 group-hover:text-[#ff4500] transition-colors leading-tight mb-1">
                  {link.label}
                </h3>
                <p className="text-sm text-neutral-500">{link.desc}</p>

                <ArrowUpRight
                  size={16}
                  strokeWidth={1.6}
                  className="mt-6 text-neutral-300 group-hover:text-[#ff4500] group-hover:rotate-45 transition-all duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== HELP CTA ============================== */}
      <section className="pb-24 lg:pb-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="relative bg-neutral-50 border border-neutral-200 rounded-3xl p-10 lg:p-14 overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-[#ff4500]/5 pointer-events-none" />
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-4">
                  ⟢ Still stuck
                </div>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight text-neutral-950 leading-[1.05] mb-4">
                  Think we{" "}
                  <em className="italic font-light text-neutral-400">
                    broke something?
                  </em>
                </h2>
                <p className="text-neutral-600 leading-relaxed max-w-lg">
                  If you got here by clicking a link on our site, it's our
                  fault. Drop us a note — we'll fix it and let you know once
                  it's done.
                </p>
              </div>
              <div className="lg:col-span-4 lg:text-right">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 bg-neutral-950 hover:bg-[#ff4500] text-white px-7 py-3.5 rounded-full font-medium transition-colors duration-300"
                >
                  Report a broken link
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.8}
                    className="group-hover:rotate-45 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;
