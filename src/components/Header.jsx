import {
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  Home,
  ShoppingBag,
  Grid,
  Info,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "Shop", to: "/shop", icon: ShoppingBag },
  { label: "Categories", to: "/categories", icon: Grid },
  { label: "About", to: "/about", icon: Info },
  { label: "Contact", to: "/contact", icon: Phone },
];

const ANNOUNCEMENT_HEIGHT = 28; // px — matches h-7 (1.75rem at 16px root)

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cart, totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const close = () => setIsOpen(false);
  const itemCount = totalItems ?? cart.length;

  // Scroll detection — flips header to compact translucent mode past 12px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer or search is open
  useEffect(() => {
    const open = isOpen || searchOpen;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, searchOpen]);

  // Close overlays on route change
  useEffect(() => {
    setIsOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Escape closes overlays
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <>
      {/* ============================ ANNOUNCEMENT BAR ============================ */}
      {/* Slides up out of view when scrolled, taking its space with it.
          Header moves up to fill the gap via the wrapper transform below. */}
      <div
        className="fixed top-0 left-0 right-0 z-[51] bg-neutral-950 text-white text-[11px] tracking-[0.25em] uppercase overflow-hidden transition-[height] duration-300 ease-out"
        style={{ height: scrolled ? 0 : ANNOUNCEMENT_HEIGHT }}
        aria-hidden={scrolled}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 h-7 hidden md:flex items-center justify-center gap-2">
          <span className="text-[#ff4500]">✦</span>
          <span>Free worldwide shipping on orders over $50</span>
          <span className="text-[#ff4500]">✦</span>
        </div>
      </div>

      {/* ============================ HEADER ============================ */}
      {/* Header is always `top-0` — the announcement bar pushes it down by
          shrinking its own height. This avoids the previous jumpy "top-7 →
          top-0" transition and the issue where the bar still occupied space
          after scroll. */}
      <header
        className={`fixed left-0 right-0 z-50 transition-[background-color,border-color,backdrop-filter,top] duration-300 ease-out
          ${
            scrolled
              ? "bg-white/85 backdrop-blur-lg border-b border-neutral-200/80 shadow-[0_4px_20px_-12px_rgba(0,0,0,0.1)]"
              : "bg-white border-b border-transparent"
          }`}
        style={{
          // Sit below the announcement bar on desktop when not scrolled.
          // On mobile the bar is hidden so always top:0.
          top:
            scrolled || typeof window === "undefined"
              ? 0
              : window.matchMedia("(min-width: 768px)").matches
                ? ANNOUNCEMENT_HEIGHT
                : 0,
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            className={`flex justify-between items-center transition-[height] duration-300 ease-out ${
              scrolled ? "h-[4.25em]" : "h-[5em]"
            }`}
          >
            {/* Logo */}
            <Link to="/" className="group flex items-baseline gap-1 shrink-0">
              <span
                className={`font-serif tracking-tight text-neutral-950 group-hover:text-[#ff4500] transition-all duration-300 ${
                  scrolled
                    ? "text-2xl md:text-[1.625rem]"
                    : "text-2xl md:text-3xl"
                }`}
              >
                Mordyn
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4500] mb-1" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ label, to }) => {
                const active =
                  to === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(to);
                return (
                  <Link
                    key={label}
                    to={to}
                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? "text-[#ff4500]"
                        : "text-neutral-700 hover:text-neutral-950"
                    }`}
                  >
                    <span>{label}</span>
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-[1px] left-3 right-3 h-[2px] bg-[#ff4500] rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1 shrink-0">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full text-neutral-700 hover:text-[#ff4500] hover:bg-neutral-100 transition-colors"
              >
                <Search size={19} strokeWidth={1.6} />
              </button>

              {/* Account */}
              <button
                aria-label="Account"
                className="hidden sm:flex w-10 h-10 items-center justify-center rounded-full text-neutral-700 hover:text-[#ff4500] hover:bg-neutral-100 transition-colors"
              >
                <User size={19} strokeWidth={1.6} />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                aria-label={`Cart (${itemCount} items)`}
                className="relative w-10 h-10 flex items-center justify-center rounded-full text-neutral-700 hover:text-[#ff4500] hover:bg-neutral-100 transition-colors"
              >
                <ShoppingCart size={19} strokeWidth={1.6} />
                <AnimatePresence>
                  {itemCount > 0 && (
                    <motion.span
                      key={itemCount}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      transition={{
                        duration: 0.22,
                        ease: [0.34, 1.56, 0.64, 1],
                      }}
                      className="absolute top-0.5 right-0.5 bg-[#ff4500] text-white rounded-full min-w-[17px] h-[17px] flex items-center justify-center text-[10px] font-bold px-1 ring-2 ring-white tabular-nums"
                    >
                      {itemCount > 99 ? "99+" : itemCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>

              {/* Shop CTA — desktop only */}
              <Link
                to="/shop"
                className={`hidden lg:inline-flex ml-3 items-center gap-2 bg-neutral-950 hover:bg-[#ff4500] text-white rounded-full text-sm font-medium transition-all duration-300 group ${
                  scrolled ? "px-4 py-2" : "px-5 py-2.5"
                }`}
              >
                Shop now
                <ArrowUpRight
                  size={14}
                  strokeWidth={2}
                  className="group-hover:rotate-45 transition-transform"
                />
              </Link>

              {/* Hamburger */}
              <button
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                className="lg:hidden ml-1 w-10 h-10 flex items-center justify-center rounded-full text-neutral-900 hover:bg-neutral-100 transition-colors"
                onClick={() => setIsOpen((p) => !p)}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.span
                      key="x"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <X size={20} strokeWidth={1.8} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                    >
                      <Menu size={20} strokeWidth={1.8} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ============================ SEARCH OVERLAY ============================ */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div
              key="search-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-neutral-950/40 backdrop-blur-sm z-[60]"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              key="search-panel"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 left-0 right-0 z-[61] bg-white border-b border-neutral-200"
            >
              <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center gap-4"
                >
                  <Search
                    size={22}
                    strokeWidth={1.4}
                    className="text-[#ff4500] shrink-0"
                  />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search the catalogue…"
                    className="flex-1 bg-transparent text-xl md:text-2xl font-serif placeholder:text-neutral-400 outline-none py-2"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    aria-label="Close search"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors shrink-0"
                  >
                    <X size={16} strokeWidth={1.8} />
                  </button>
                </form>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold py-1.5 mr-1">
                    Try:
                  </span>
                  {[
                    "Leather bags",
                    "Headphones",
                    "Spring drop",
                    "Under $100",
                    "New in",
                  ].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSearchQuery(s)}
                      className="px-3 py-1.5 rounded-full border border-neutral-200 hover:border-[#ff4500] hover:text-[#ff4500] text-sm text-neutral-700 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ============================ MOBILE DRAWER ============================ */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 bg-neutral-950/40 backdrop-blur-sm z-40"
              onClick={close}
            />

            <motion.nav
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
              className="lg:hidden fixed top-0 left-0 h-full w-[80%] max-w-[340px] bg-white z-50 flex flex-col shadow-2xl"
            >
              <div className="relative bg-neutral-950 text-white px-6 py-7 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#ff4500]/30 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full border border-white/10 pointer-events-none" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <Link
                      to="/"
                      onClick={close}
                      className="flex items-baseline gap-1"
                    >
                      <span className="font-serif text-2xl tracking-tight">
                        Mordyn
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff4500] mb-0.5" />
                    </Link>
                    <p className="text-white/60 text-xs mt-2 tracking-wide">
                      Considered objects, since 2021.
                    </p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    onClick={close}
                    aria-label="Close menu"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <X size={16} strokeWidth={2} className="text-white" />
                  </motion.button>
                </div>
              </div>

              <div className="px-4 pt-5 pb-3">
                <button
                  onClick={() => {
                    close();
                    setTimeout(() => setSearchOpen(true), 150);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-neutral-100 text-neutral-500 text-sm hover:bg-neutral-200 transition-colors"
                >
                  <Search size={16} strokeWidth={1.6} />
                  Search the catalogue…
                </button>
              </div>

              <div className="px-6 pt-3 pb-2 text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold">
                ⟢ Browse
              </div>

              <ul className="flex flex-col px-3 gap-0.5 flex-1">
                {navLinks.map(({ label, to, icon: Icon }, i) => {
                  const active =
                    to === "/"
                      ? location.pathname === "/"
                      : location.pathname.startsWith(to);
                  return (
                    <motion.li
                      key={label}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.05 + 0.1,
                        duration: 0.28,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        to={to}
                        onClick={close}
                        className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-[15px] transition-colors duration-200 ${
                          active
                            ? "bg-[#ff4500] text-white"
                            : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950"
                        }`}
                      >
                        <Icon
                          size={17}
                          strokeWidth={1.6}
                          className={active ? "text-white" : "text-neutral-400"}
                        />
                        <span className="font-serif text-base">{label}</span>
                        {active && (
                          <motion.span
                            layoutId="active-dot"
                            className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                          />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="px-4 py-5 border-t border-neutral-100 space-y-2"
              >
                <Link
                  to="/cart"
                  onClick={close}
                  className="group flex items-center justify-between gap-2 w-full bg-[#ff4500] hover:bg-[#ff5a1f] transition-colors text-white font-medium py-3.5 px-5 rounded-xl text-sm shadow-[0_10px_30px_-10px_rgba(255,69,0,0.6)]"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingCart size={16} strokeWidth={1.8} />
                    View cart
                  </span>
                  <span className="flex items-center gap-2">
                    {itemCount > 0 && (
                      <span className="bg-white/20 text-white text-xs font-bold rounded-full px-2 py-0.5 tabular-nums">
                        {itemCount}
                      </span>
                    )}
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2}
                      className="group-hover:rotate-45 transition-transform"
                    />
                  </span>
                </Link>
                <Link
                  to="/contact"
                  onClick={close}
                  className="flex items-center justify-center gap-2 w-full border border-neutral-200 hover:border-neutral-950 text-neutral-700 hover:text-neutral-950 transition-colors py-3 px-5 rounded-xl text-sm font-medium"
                >
                  Need help? Contact us
                </Link>
              </motion.div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
