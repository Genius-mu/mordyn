import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Search,
  ChevronDown,
  X,
  Truck,
  RotateCcw,
  CreditCard,
  Package,
  Ruler,
  ShieldCheck,
  HelpCircle,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*  Reveal hook                                                               */
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
/*  FAQ data — grouped by topic                                               */
/* -------------------------------------------------------------------------- */
const TOPICS = [
  {
    id: "shipping",
    label: "Shipping",
    icon: <Truck size={18} strokeWidth={1.5} />,
  },
  {
    id: "returns",
    label: "Returns & refunds",
    icon: <RotateCcw size={18} strokeWidth={1.5} />,
  },
  {
    id: "orders",
    label: "Orders",
    icon: <Package size={18} strokeWidth={1.5} />,
  },
  {
    id: "payment",
    label: "Payment",
    icon: <CreditCard size={18} strokeWidth={1.5} />,
  },
  {
    id: "products",
    label: "Products & sizing",
    icon: <Ruler size={18} strokeWidth={1.5} />,
  },
  {
    id: "account",
    label: "Account & security",
    icon: <ShieldCheck size={18} strokeWidth={1.5} />,
  },
];

const FAQS = [
  // Shipping
  {
    topic: "shipping",
    q: "How long does delivery take?",
    a: "Standard delivery takes 3–7 business days within most countries. Express options (1–3 days) are available at checkout for most destinations. Once your order ships, you'll receive a tracking link by email so you can follow it from our warehouse to your door.",
  },
  {
    topic: "shipping",
    q: "Do you ship internationally?",
    a: "Yes — we ship to over 40 countries. Customs and import duties are calculated and shown at checkout, so there are no surprises on delivery. Some restricted destinations may have longer transit times; you'll see the estimate before you pay.",
  },
  {
    topic: "shipping",
    q: "Is shipping free?",
    a: "Standard shipping is free on orders over $50 within most countries. Below that threshold, a flat rate is calculated at checkout based on your destination. We use carbon-neutral carriers wherever they're available.",
  },
  {
    topic: "shipping",
    q: "Can I change my shipping address after ordering?",
    a: "Yes, as long as the order hasn't shipped yet. Email support@yourstore.com with your order number and the new address — we usually update it within a few hours during business days.",
  },

  // Returns
  {
    topic: "returns",
    q: "What's your return policy?",
    a: "30 days, no questions asked. If a piece doesn't work for you, email us within 30 days of delivery and we'll send a prepaid return label. Items must be unused, in original packaging, with tags attached where applicable.",
  },
  {
    topic: "returns",
    q: "How do refunds work?",
    a: "Once we receive and inspect your return, we issue a refund to your original payment method within 3–5 business days. Banks may take an additional few days to post the credit. You'll get an email confirmation when it's processed.",
  },
  {
    topic: "returns",
    q: "Can I exchange an item instead?",
    a: "Yes — start a return as usual and just let us know in the email what you'd like to swap to. We'll hold the new item for you and ship it as soon as the original arrives back at the warehouse.",
  },
  {
    topic: "returns",
    q: "Are there items that can't be returned?",
    a: "For hygiene reasons we can't accept returns on opened personal-care products, used earbuds, or pierced jewelry. Sale items can be returned but are refunded as store credit rather than to the original card.",
  },

  // Orders
  {
    topic: "orders",
    q: "How can I track my order?",
    a: "When your order ships, we send a tracking link by email. You can also log into your account and view live status under \"My Orders.\" If your tracking hasn't moved in 48+ hours, get in touch and we'll investigate with the carrier.",
  },
  {
    topic: "orders",
    q: "Can I cancel an order after placing it?",
    a: "Cancellations are possible until the order is packed — usually within a few hours of ordering during business days. Email support fast and we'll do our best. Once it's shipped, you'll need to refuse delivery or return it normally.",
  },
  {
    topic: "orders",
    q: "I received the wrong item. What now?",
    a: "Apologies — that shouldn't happen. Email support with your order number and a photo of what you received. We'll send the correct item with priority shipping at no cost and arrange a free pickup of the wrong one.",
  },

  // Payment
  {
    topic: "payment",
    q: "What payment methods do you accept?",
    a: "All major credit and debit cards (Visa, Mastercard, Amex), Apple Pay, Google Pay, and bank transfer for orders over $200. Buy-now-pay-later via Klarna is available in supported countries at checkout.",
  },
  {
    topic: "payment",
    q: "Is checkout secure?",
    a: "Yes. The entire site runs on TLS encryption and we never store full card details — payment is handled by Stripe, which is PCI-DSS Level 1 certified. We're also GDPR compliant for customers in the EU and UK.",
  },
  {
    topic: "payment",
    q: "Do you offer gift cards?",
    a: "Yes — digital gift cards in any denomination from $25 to $500. They never expire, can be used in part across multiple orders, and arrive instantly by email with a personal message if you'd like.",
  },

  // Products
  {
    topic: "products",
    q: "Are your products authentic and high quality?",
    a: "Every product is hand-selected by our curation team and tested in-house before going on the site. We work directly with brands and verified distributors — never grey-market resellers. If something falls short of standard, it doesn't make the shelf.",
  },
  {
    topic: "products",
    q: "How do I find the right size?",
    a: "Each product page has a detailed size guide with measurements in cm and inches. For apparel and bags we also include the model's height and the size they're wearing in the product photos. Still unsure? Email us with your usual size in another brand and we'll suggest a match.",
  },
  {
    topic: "products",
    q: "Will you restock a sold-out item?",
    a: 'Sometimes, but not always — we run small intentional batches. Click "Notify me" on the product page and you\'ll be the first to know if it returns. Following our newsletter is the surest way to catch restocks early.',
  },

  // Account
  {
    topic: "account",
    q: "Do I need an account to place an order?",
    a: "No — guest checkout is fully supported. An account just makes future orders faster, lets you track shipments, and saves your addresses and wishlists. You can create one at any time using the email from a past order.",
  },
  {
    topic: "account",
    q: "How do you protect my personal data?",
    a: "We collect only what's needed to fulfill your order and never sell your data. The site uses TLS encryption everywhere; we're GDPR-compliant; and you can request deletion of your account and data at any time by emailing privacy@yourstore.com.",
  },
  {
    topic: "account",
    q: "I forgot my password. How do I reset it?",
    a: "Click \"Forgot password\" on the login page and enter your email. You'll get a reset link within a minute. If it doesn't arrive, check your spam folder or get in touch and we'll trigger it manually.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Highlight matched query inside a string                                   */
/* -------------------------------------------------------------------------- */
const Highlight = ({ text, query }) => {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${escapeRegex(query)})`, "ig"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={i}
        className="bg-[#ff4500]/15 text-[#ff4500] px-0.5 rounded-sm"
      >
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
const FAQ = () => {
  const [activeTopic, setActiveTopic] = useState("all");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState(0);

  // Filter
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FAQS.filter((f) => {
      if (activeTopic !== "all" && f.topic !== activeTopic) return false;
      if (q) {
        return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      }
      return true;
    });
  }, [activeTopic, search]);

  // Reset open accordion when filters change
  useEffect(() => {
    setOpenIndex(filtered.length > 0 ? 0 : null);
  }, [activeTopic, search, filtered.length]);

  const totalPerTopic = useMemo(() => {
    const map = { all: FAQS.length };
    TOPICS.forEach((t) => {
      map[t.id] = FAQS.filter((f) => f.topic === t.id).length;
    });
    return map;
  }, []);

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
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full border border-white/10 hidden md:block" />
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

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-8">
              <Reveal delay={100}>
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-white/80" />
                  <span className="text-[11px] tracking-[0.35em] uppercase font-medium">
                    Help & answers
                  </span>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] tracking-tight">
                  Questions,{" "}
                  <em className="italic font-light text-white/90">answered.</em>
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={350}>
                <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-md">
                  Everything we hear most often, in one place. Search, browse by
                  topic, or reach out directly — we read every email.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Search */}
          <Reveal delay={450}>
            <div className="max-w-2xl">
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
                  placeholder="Search the FAQ — try “returns” or “shipping”…"
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
              {search && (
                <div className="mt-3 text-sm text-white/70">
                  {filtered.length}{" "}
                  {filtered.length === 1 ? "match" : "matches"} for{" "}
                  <span className="text-white">"{search}"</span>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================ MAIN ============================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* ---------------- SIDEBAR ---------------- */}
            <aside className="lg:col-span-3 lg:sticky lg:top-[7em] h-fit">
              <Reveal>
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-5">
                  ⟢ By topic
                </div>
                <ul className="space-y-1">
                  <li>
                    <button
                      onClick={() => setActiveTopic("all")}
                      className={`w-full group flex items-center justify-between py-3 px-1 text-left border-b transition-colors ${
                        activeTopic === "all"
                          ? "border-[#ff4500]"
                          : "border-neutral-200 hover:border-neutral-950"
                      }`}
                    >
                      <span
                        className={`flex items-center gap-3 font-serif text-lg transition-colors ${
                          activeTopic === "all"
                            ? "text-[#ff4500]"
                            : "text-neutral-950 group-hover:text-neutral-700"
                        }`}
                      >
                        {activeTopic === "all" && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ff4500]" />
                        )}
                        <HelpCircle size={16} strokeWidth={1.5} />
                        All questions
                      </span>
                      <span
                        className={`text-xs tabular-nums ${
                          activeTopic === "all"
                            ? "text-[#ff4500]"
                            : "text-neutral-400"
                        }`}
                      >
                        {String(totalPerTopic.all).padStart(2, "0")}
                      </span>
                    </button>
                  </li>
                  {TOPICS.map((t) => {
                    const active = activeTopic === t.id;
                    return (
                      <li key={t.id}>
                        <button
                          onClick={() => setActiveTopic(t.id)}
                          className={`w-full group flex items-center justify-between py-3 px-1 text-left border-b transition-colors ${
                            active
                              ? "border-[#ff4500]"
                              : "border-neutral-200 hover:border-neutral-950"
                          }`}
                        >
                          <span
                            className={`flex items-center gap-3 font-serif text-lg transition-colors ${
                              active
                                ? "text-[#ff4500]"
                                : "text-neutral-950 group-hover:text-neutral-700"
                            }`}
                          >
                            {active && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4500]" />
                            )}
                            {t.icon}
                            {t.label}
                          </span>
                          <span
                            className={`text-xs tabular-nums ${
                              active ? "text-[#ff4500]" : "text-neutral-400"
                            }`}
                          >
                            {String(totalPerTopic[t.id]).padStart(2, "0")}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>

              {/* Help card */}
              <Reveal delay={150}>
                <div className="mt-10 relative rounded-2xl bg-neutral-950 text-white p-6 overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#ff4500]/30 blur-2xl pointer-events-none" />
                  <div className="relative">
                    <div className="text-[10px] tracking-[0.3em] uppercase text-[#ff4500] font-semibold mb-3">
                      Still stuck?
                    </div>
                    <p className="font-serif text-xl leading-snug mb-4">
                      Our team is one email away — usually replies within 24
                      hours.
                    </p>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 text-sm border-b border-white/40 hover:border-[#ff4500] hover:text-[#ff4500] transition-colors pb-0.5"
                    >
                      Get in touch
                      <ArrowUpRight size={14} strokeWidth={1.8} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            </aside>

            {/* ---------------- ACCORDION ---------------- */}
            <div className="lg:col-span-9">
              {/* Active topic header */}
              <Reveal>
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-8 pb-6 border-b border-neutral-200">
                  <h2 className="font-serif text-3xl md:text-4xl text-neutral-950 tracking-tight">
                    {activeTopic === "all"
                      ? "All questions"
                      : TOPICS.find((t) => t.id === activeTopic)?.label}
                  </h2>
                  <div className="text-sm text-neutral-500">
                    {filtered.length}{" "}
                    {filtered.length === 1 ? "question" : "questions"}
                    {(search || activeTopic !== "all") && (
                      <>
                        {" · "}
                        <button
                          onClick={() => {
                            setSearch("");
                            setActiveTopic("all");
                          }}
                          className="text-[#ff4500] hover:underline underline-offset-4 font-medium"
                        >
                          Clear filters
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </Reveal>

              {/* Accordion list */}
              {filtered.length > 0 ? (
                <div className="space-y-3">
                  {filtered.map((faq, i) => {
                    const open = openIndex === i;
                    const topic = TOPICS.find((t) => t.id === faq.topic);
                    return (
                      <Reveal
                        key={`${faq.topic}-${faq.q}`}
                        delay={(i % 5) * 50}
                      >
                        <div
                          className={`bg-white border rounded-2xl overflow-hidden transition-colors duration-300 ${
                            open
                              ? "border-[#ff4500]"
                              : "border-neutral-200 hover:border-neutral-400"
                          }`}
                        >
                          <button
                            onClick={() => setOpenIndex(open ? null : i)}
                            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                            aria-expanded={open}
                          >
                            <span className="flex items-baseline gap-4 min-w-0">
                              <span className="font-serif text-neutral-300 tabular-nums text-sm shrink-0">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span className="min-w-0">
                                <span className="font-serif text-lg text-neutral-950 block">
                                  <Highlight text={faq.q} query={search} />
                                </span>
                                {activeTopic === "all" && topic && (
                                  <span className="inline-flex items-center gap-1.5 mt-1.5 text-[10px] tracking-[0.2em] uppercase text-neutral-500 font-semibold">
                                    {topic.icon}
                                    {topic.label}
                                  </span>
                                )}
                              </span>
                            </span>
                            <ChevronDown
                              size={18}
                              strokeWidth={1.6}
                              className={`shrink-0 transition-transform duration-300 ${
                                open
                                  ? "rotate-180 text-[#ff4500]"
                                  : "text-neutral-400"
                              }`}
                            />
                          </button>
                          <div
                            className={`grid transition-all duration-300 ease-out ${
                              open
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden">
                              <div className="px-6 pb-6 pl-[3.7rem] text-neutral-600 leading-relaxed">
                                <Highlight text={faq.a} query={search} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              ) : (
                /* Empty state */
                <div className="border border-dashed border-neutral-300 rounded-3xl py-20 px-8 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-[#ff4500]/10 flex items-center justify-center mb-6">
                    <Search
                      size={26}
                      strokeWidth={1.4}
                      className="text-[#ff4500]"
                    />
                  </div>
                  <h3 className="font-serif text-3xl text-neutral-950 mb-3">
                    No matching answers — yet.
                  </h3>
                  <p className="text-neutral-500 max-w-md mb-8">
                    Try a different keyword, switch topic, or send the question
                    straight to our team. We're happy to write a new answer for
                    the FAQ if it'd help others.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button
                      onClick={() => {
                        setSearch("");
                        setActiveTopic("all");
                      }}
                      className="border border-neutral-300 hover:border-neutral-950 text-neutral-950 px-6 py-3 rounded-full font-medium transition-colors"
                    >
                      Reset filters
                    </button>
                    <Link
                      to="/contact"
                      className="bg-[#ff4500] hover:bg-[#ff5a1f] text-white px-6 py-3 rounded-full font-medium inline-flex items-center gap-2 transition-colors shadow-[0_10px_30px_-10px_rgba(255,69,0,0.6)]"
                    >
                      Ask the team
                      <ArrowUpRight size={15} strokeWidth={1.8} />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ POPULAR TOPICS ============================ */}
      <section className="py-20 lg:py-24 bg-neutral-50 border-y border-neutral-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                ⟢ Popular topics
              </div>
              <h2 className="font-serif text-3xl md:text-4xl tracking-tight text-neutral-950">
                Jump straight to a category.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {TOPICS.map((t, i) => (
              <Reveal key={t.id} delay={i * 60}>
                <button
                  onClick={() => {
                    setActiveTopic(t.id);
                    setSearch("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="group w-full bg-white border border-neutral-200 hover:border-[#ff4500] rounded-2xl p-5 text-left transition-colors duration-300"
                >
                  <div className="w-10 h-10 rounded-full bg-neutral-950 group-hover:bg-[#ff4500] text-white flex items-center justify-center mb-4 transition-colors duration-300">
                    {t.icon}
                  </div>
                  <div className="font-serif text-base text-neutral-950 mb-1 leading-snug">
                    {t.label}
                  </div>
                  <div className="text-xs text-neutral-500 tabular-nums">
                    {totalPerTopic[t.id]}{" "}
                    {totalPerTopic[t.id] === 1 ? "question" : "questions"}
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ STILL STUCK CTA ============================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="relative bg-neutral-950 text-white rounded-[2rem] overflow-hidden p-10 md:p-16 lg:p-20">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
              <div className="absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#ff4500]/25 blur-3xl pointer-events-none" />
              <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full border border-white/10 hidden md:block" />

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7">
                  <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-5">
                    ⟢ Still need help?
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-6">
                    Couldn't find your{" "}
                    <em className="italic font-light text-white/90">answer?</em>
                  </h2>
                  <p className="text-white/75 text-lg leading-relaxed max-w-lg">
                    Our team reads every message. Whether it's a stuck order, a
                    sizing question, or just a hello — we usually reply within
                    24 hours, weekends included.
                  </p>
                </div>
                <div className="lg:col-span-5 flex flex-col gap-3">
                  <Link
                    to="/contact"
                    className="group bg-[#ff4500] hover:bg-[#ff5a1f] text-white px-7 py-5 rounded-2xl font-medium transition-colors duration-300 inline-flex items-center justify-between gap-4 shadow-[0_10px_40px_-10px_rgba(255,69,0,0.6)]"
                  >
                    <span className="flex items-center gap-3">
                      <MessageSquare size={18} strokeWidth={1.6} />
                      Send us a message
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      className="group-hover:rotate-45 transition-transform"
                    />
                  </Link>
                  <a
                    href="mailto:support@yourstore.com"
                    className="group bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white px-7 py-5 rounded-2xl font-medium transition-colors duration-300 inline-flex items-center justify-between gap-4"
                  >
                    <span className="flex items-center gap-3">
                      <Mail size={18} strokeWidth={1.6} />
                      support@yourstore.com
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      className="group-hover:rotate-45 transition-transform"
                    />
                  </a>
                  <Link
                    to="/shop"
                    className="group text-white/70 hover:text-white px-7 py-3 inline-flex items-center justify-between gap-4 text-sm transition-colors"
                  >
                    <span>Or keep browsing the shop</span>
                    <ArrowRight
                      size={15}
                      strokeWidth={1.6}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
