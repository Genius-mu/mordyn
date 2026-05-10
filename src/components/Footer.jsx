import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Inline brand glyphs                                                       */
/*  lucide-react deprecated Instagram/Twitter/Linkedin (won't ship 3rd-party  */
/*  logos), so we inline minimal SVGs to keep zero new dependencies.          */
/* -------------------------------------------------------------------------- */
const InstagramGlyph = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={16}
    height={16}
    {...props}
  >
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const XGlyph = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    width={14}
    height={14}
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinGlyph = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    width={16}
    height={16}
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Static data                                                               */
/* -------------------------------------------------------------------------- */
const columns = [
  {
    heading: "Shop",
    links: [
      { label: "All products", to: "/shop" },
      { label: "Categories", to: "/categories" },
      { label: "New arrivals", to: "/shop?sort=newest" },
      { label: "Best sellers", to: "/shop?sort=popular" },
      { label: "Sale", to: "/shop?sort=discount" },
    ],
  },
  {
    heading: "Help",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Contact us", to: "/contact" },
      { label: "Shipping", to: "/shipping" },
      { label: "Returns", to: "/returns" },
      { label: "Size guide", to: "/size-guide" },
    ],
  },
  {
    heading: "Atelier",
    links: [
      { label: "About us", to: "/about" },
      { label: "Our story", to: "/about#story" },
      { label: "The team", to: "/about#team" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
    ],
  },
];

const socials = [
  { Icon: InstagramGlyph, label: "Instagram", href: "#" },
  { Icon: XGlyph, label: "X / Twitter", href: "#" },
  { Icon: LinkedinGlyph, label: "LinkedIn", href: "#" },
];

const paymentMethods = ["Visa", "Mastercard", "Amex", "Apple Pay", "Klarna"];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
const Footer = () => {
  const yr = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    // Wire to real endpoint here.
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-neutral-950 text-white relative overflow-hidden">
      {/* Decorative atmosphere */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-[#ff4500]/15 blur-3xl pointer-events-none" />
      <div className="absolute -left-32 bottom-0 w-72 h-72 rounded-full border border-white/5 hidden lg:block pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* ============================ TOP STRIP ============================ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-20 lg:pt-24 pb-16">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5 lg:pr-8">
            <Link to="/" className="inline-flex items-baseline gap-1 mb-6">
              <span className="font-serif text-3xl tracking-tight">Mordyn</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4500] mb-1" />
            </Link>
            <h3 className="font-serif text-3xl md:text-4xl leading-[1.05] tracking-tight mb-5 max-w-md">
              Join the{" "}
              <em className="italic font-light text-white/85">dispatch.</em>
            </h3>
            <p className="text-white/65 leading-relaxed mb-7 max-w-md">
              One thoughtful email a month — new drops, behind-the-scenes,
              occasional subscriber-only discounts. No spam, ever.
            </p>

            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-3 max-w-md"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={subscribed}
                className="flex-1 bg-white/5 border border-white/15 text-white placeholder:text-white/40 px-5 py-3.5 rounded-full outline-none focus:border-white/40 focus:bg-white/10 transition-colors disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={subscribed}
                className={`group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-medium transition-all duration-300 whitespace-nowrap ${
                  subscribed
                    ? "bg-emerald-600 text-white"
                    : "bg-[#ff4500] hover:bg-[#ff5a1f] text-white shadow-[0_10px_30px_-10px_rgba(255,69,0,0.6)]"
                }`}
              >
                {subscribed ? (
                  <>
                    <Check size={15} strokeWidth={2} />
                    Subscribed
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2}
                      className="group-hover:rotate-45 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>

            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/55">
              {[
                "No spam, ever",
                "Unsubscribe in one click",
                "GDPR compliant",
              ].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check
                    size={12}
                    strokeWidth={1.8}
                    className="text-[#ff4500]"
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-6">
            {columns.map((col) => (
              <div key={col.heading}>
                <h4 className="text-[10px] tracking-[0.3em] uppercase text-[#ff4500] font-semibold mb-5">
                  ⟢ {col.heading}
                </h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="group inline-flex items-center gap-1.5 text-white/75 hover:text-white text-sm transition-colors"
                      >
                        <span className="border-b border-transparent group-hover:border-[#ff4500] pb-0.5 transition-colors">
                          {l.label}
                        </span>
                        <ArrowUpRight
                          size={11}
                          strokeWidth={1.6}
                          className="opacity-0 group-hover:opacity-100 group-hover:rotate-45 -translate-x-1 group-hover:translate-x-0 text-[#ff4500] transition-all duration-300"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ============================ CONTACT STRIP ============================ */}
        <div className="border-t border-white/10 py-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
          {[
            {
              Icon: Mail,
              label: "Email us",
              value: "support@mordyn.com",
              href: "mailto:support@mordyn.com",
            },
            {
              Icon: Phone,
              label: "Call us",
              value: "+234 800 000 0000",
              href: "tel:+2348000000000",
            },
            {
              Icon: MapPin,
              label: "Visit us",
              value: "Victoria Island, Lagos",
              href: "#",
            },
          ].map(({ Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              className="group flex items-start gap-4 hover:text-white transition-colors"
            >
              <div className="shrink-0 w-10 h-10 rounded-full border border-white/15 group-hover:border-[#ff4500] group-hover:bg-[#ff4500] flex items-center justify-center transition-colors duration-300">
                <Icon
                  size={15}
                  strokeWidth={1.6}
                  className="text-white/70 group-hover:text-white transition-colors"
                />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.25em] uppercase text-white/45 font-semibold mb-0.5">
                  {label}
                </div>
                <div className="font-serif text-base text-white/90 group-hover:text-[#ff4500] transition-colors truncate">
                  {value}
                </div>
              </div>
              <ArrowUpRight
                size={14}
                strokeWidth={1.5}
                className="ml-auto text-white/30 group-hover:text-[#ff4500] group-hover:rotate-45 transition-all duration-300 shrink-0 mt-2"
              />
            </a>
          ))}
        </div>

        {/* ============================ BIG WORDMARK ============================ */}
        <div className="border-t border-white/10 py-12 lg:py-16">
          <Link
            to="/"
            className="block group select-none"
            aria-label="Mordyn home"
          >
            <div className="font-serif text-[20vw] lg:text-[16rem] leading-[0.85] tracking-tighter text-center text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.18)] group-hover:[-webkit-text-stroke:1px_#ff4500] transition-all duration-500">
              Mordyn
              <span className="text-[#ff4500] [-webkit-text-stroke:0]">.</span>
            </div>
          </Link>
        </div>

        {/* ============================ BOTTOM BAR ============================ */}
        <div className="border-t border-white/10 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Copyright + legal */}
          <div className="flex flex-col md:flex-row md:items-center gap-x-6 gap-y-3">
            <p className="text-xs text-white/45 tracking-wider tabular-nums">
              © {yr} Mordyn. All rights reserved.
            </p>
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {[
                { label: "Privacy", to: "/privacy" },
                { label: "Terms", to: "/terms" },
                { label: "Cookies", to: "/cookies" },
                { label: "Accessibility", to: "/accessibility" },
              ].map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className="text-xs text-white/45 hover:text-[#ff4500] transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Socials + payment */}
          <div className="flex items-center gap-5">
            {/* Socials */}
            <div className="flex items-center gap-2">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 hover:border-[#ff4500] hover:bg-[#ff4500] hover:text-white text-white/70 flex items-center justify-center transition-colors duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>

            {/* Payment chips */}
            <div className="hidden sm:flex items-center gap-1.5">
              {paymentMethods.map((p) => (
                <span
                  key={p}
                  className="text-[9px] tracking-[0.15em] uppercase text-white/50 px-2 py-1 rounded border border-white/10"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ============================ TINY SIGN-OFF ============================ */}
        <div className="border-t border-white/5 py-4 flex flex-wrap items-center justify-between gap-3 text-[10px] tracking-wider text-white/30">
          <span>Made with care in Lagos · Worldwide shipping</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="group inline-flex items-center gap-1.5 hover:text-[#ff4500] transition-colors"
          >
            Back to top
            <ArrowRight
              size={11}
              strokeWidth={1.6}
              className="-rotate-90 group-hover:-translate-y-0.5 transition-transform"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
