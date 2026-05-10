import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Star,
  Eye,
  Heart,
  Globe,
  Target,
  ChevronDown,
  Quote,
  Search,
  ShoppingBag,
  PackageCheck,
  Check,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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
/*  Static data                                                               */
/* -------------------------------------------------------------------------- */
const values = [
  {
    icon: <Heart size={20} strokeWidth={1.5} />,
    title: "Customer first",
    desc: "We answer every email, take every return, and treat your time like our own.",
  },
  {
    icon: <ShieldCheck size={20} strokeWidth={1.5} />,
    title: "Integrity",
    desc: "Honest pricing, no inflate-then-discount tricks, and full transparency on sourcing.",
  },
  {
    icon: <Globe size={20} strokeWidth={1.5} />,
    title: "Global reach",
    desc: "Customers in 40+ countries, with carbon-neutral shipping wherever we can.",
  },
];

const stats = [
  { number: "10k+", label: "Happy customers" },
  { number: "500+", label: "Products curated" },
  { number: "4.9★", label: "Average rating" },
  { number: "24/7", label: "Real-human support" },
];

const process = [
  {
    icon: <Search size={22} strokeWidth={1.4} />,
    title: "Browse",
    desc: "Explore the catalogue or pick a category. Everything is filterable, fast, and free of clutter.",
  },
  {
    icon: <ShoppingBag size={22} strokeWidth={1.4} />,
    title: "Select",
    desc: "Add to cart, checkout in under a minute. Apple Pay, card, or wire — your choice.",
  },
  {
    icon: <PackageCheck size={22} strokeWidth={1.4} />,
    title: "Delivered",
    desc: "Carbon-neutral shipping. Tracking from the moment we pack until it lands at your door.",
  },
];

const team = [
  { name: "Adaeze Mba", role: "Founder", img: "/images/img1.webp" },
  { name: "Daniel Reyes", role: "Head of Curation", img: "/images/img2.webp" },
  { name: "Priya Shah", role: "Customer Experience", img: "/images/img3.webp" },
  { name: "Tomás Costa", role: "Operations", img: "/images/img4.webp" },
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

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Delivery usually takes 3–7 business days depending on your location. Express options are available at checkout for most countries.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes — a full 30-day no-questions refund policy. Just email support and we'll send a prepaid return label.",
  },
  {
    question: "Are your products high quality?",
    answer:
      "Every product is hand-picked by our curation team and tested in-house before it goes on the site. If something falls short, it doesn't go on the shelf.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes — we ship to 40+ countries with carbon-neutral delivery. Customs and duties are calculated at checkout, so no surprises.",
  },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
const About = () => {
  const [activeFAQ, setActiveFAQ] = useState(0);

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
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#ff4500]/30 blur-3xl pointer-events-none" />
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
                    About the atelier
                  </span>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] tracking-tight">
                  We don't{" "}
                  <em className="italic font-light text-white/90">
                    sell products.
                  </em>
                  <br />
                  We curate them.
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={350}>
                <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-md">
                  A small team building a better way to shop online. Cleaner
                  design, considered products, and an experience that respects
                  your time.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ STORY ============================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-6">
              <div className="relative">
                <div className="absolute -inset-4 border border-[#ff4500]/30 rounded-3xl" />
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="/images/img6.webp"
                    alt="The team at work"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/30 to-transparent" />
                </div>
                {/* Floating year stamp */}
                <div className="absolute -right-4 lg:-right-8 top-12 bg-[#ff4500] text-white rounded-full w-28 h-28 flex flex-col items-center justify-center text-center shadow-2xl rotate-[8deg]">
                  <span className="text-[10px] tracking-[0.25em] uppercase">
                    Est.
                  </span>
                  <span className="font-serif text-3xl leading-none">2021</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={150} className="lg:col-span-6">
              <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-4">
                ⟢ Our story
              </div>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-neutral-950 leading-[1.05] mb-8">
                It started with a{" "}
                <em className="text-[#ff4500]">simple frustration.</em>
              </h2>
              <div className="space-y-5 text-neutral-700 text-lg leading-relaxed max-w-xl">
                <p>
                  Online shopping had become an exhausting scroll through
                  mediocre listings, fake reviews, and endless ads. We wanted to
                  build something different — a small, opinionated catalogue of
                  things we'd actually own ourselves.
                </p>
                <p>
                  What started as a side project in a Lagos apartment has grown
                  into a team of four serving customers across 40+ countries.
                  The principles haven't changed: pick well, ship fast, treat
                  people right.
                </p>
                <p>
                  Today, every product on the site is hand-selected and tested
                  by our curation team. If it doesn't pass, it doesn't go on the
                  shelf. Simple as that.
                </p>
              </div>

              <div className="mt-10 pt-8 border-t border-neutral-200 flex items-center gap-4">
                <img
                  src="/images/img1.webp"
                  alt="Founder"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#ff4500]"
                />
                <div>
                  <div className="font-serif text-lg text-neutral-950">
                    Adaeze Mba
                  </div>
                  <div className="text-sm text-neutral-500">
                    Founder · signed every order until 2023
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ====================== MISSION & VISION ====================== */}
      <section className="py-24 lg:py-32 bg-neutral-50 border-y border-neutral-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                ⟢ The compass
              </div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950 leading-[1.05]">
                What gets us out of bed.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal>
              <div className="group relative bg-white border border-neutral-200 hover:border-[#ff4500] rounded-3xl p-10 lg:p-12 h-full transition-colors duration-300 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-[#ff4500]/0 group-hover:bg-[#ff4500]/10 transition-colors duration-500 pointer-events-none blur-2xl" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-neutral-950 group-hover:bg-[#ff4500] text-white flex items-center justify-center mb-7 transition-colors duration-300">
                    <Target size={22} strokeWidth={1.4} />
                  </div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-3">
                    Mission
                  </div>
                  <h3 className="font-serif text-3xl text-neutral-950 mb-4 leading-tight">
                    Make shopping feel{" "}
                    <em className="text-[#ff4500]">considered.</em>
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">
                    To provide high-quality, fairly-priced, and stylish products
                    while delivering an online experience that respects the
                    person on the other side of the screen.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="group relative bg-neutral-950 text-white rounded-3xl p-10 lg:p-12 h-full overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />
                <div className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full bg-[#ff4500]/20 blur-3xl pointer-events-none" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-[#ff4500] text-white flex items-center justify-center mb-7">
                    <Eye size={22} strokeWidth={1.4} />
                  </div>
                  <div className="text-[10px] tracking-[0.3em] uppercase text-[#ff4500] font-semibold mb-3">
                    Vision
                  </div>
                  <h3 className="font-serif text-3xl mb-4 leading-tight">
                    Become the first place{" "}
                    <em className="italic font-light text-white/90">
                      you check.
                    </em>
                  </h3>
                  <p className="text-white/75 leading-relaxed">
                    To be a globally trusted store known for innovation,
                    reliability, and customer satisfaction — the kind of place
                    you bookmark and come back to without thinking.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ VALUES ============================ */}
      <section className="py-24 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                  ⟢ What we hold to
                </div>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950 leading-[1.05] max-w-xl">
                  Three values{" "}
                  <em className="text-neutral-400">we don't bend on.</em>
                </h2>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="group bg-white border border-neutral-200 rounded-2xl p-8 h-full hover:border-[#ff4500] transition-colors duration-300">
                  <div className="w-11 h-11 rounded-full bg-neutral-950 group-hover:bg-[#ff4500] text-white flex items-center justify-center mb-6 transition-colors duration-300">
                    {v.icon}
                  </div>
                  <h3 className="font-serif text-2xl text-neutral-950 mb-3">
                    {v.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed">{v.desc}</p>
                  <div className="mt-6 pt-6 border-t border-neutral-100 font-serif text-neutral-300 group-hover:text-[#ff4500] tabular-nums transition-colors">
                    0{i + 1}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ STATS ============================ */}
      <section className="bg-[#ff4500] text-white py-20 lg:py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div className="px-6 md:px-8 first:pl-0 last:pr-0 text-center md:text-left">
                  <div className="font-serif text-5xl md:text-6xl lg:text-7xl leading-none mb-3">
                    {s.number}
                  </div>
                  <div className="text-[11px] tracking-[0.3em] uppercase text-white/85 font-medium">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-16 max-w-2xl mx-auto">
              <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                ⟢ How it works
              </div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950 leading-[1.05]">
                Three steps, <em className="text-neutral-400">no friction.</em>
              </h2>
            </div>
          </Reveal>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Connecting line on desktop */}
            <div className="hidden md:block absolute top-7 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-transparent via-[#ff4500]/40 to-transparent pointer-events-none" />

            {process.map((p, i) => (
              <Reveal key={p.title} delay={i * 120}>
                <div className="relative bg-white text-center md:text-left">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-[#ff4500] text-white flex items-center justify-center relative z-10">
                      {p.icon}
                    </div>
                    <span className="absolute -top-1 -right-3 bg-neutral-950 text-white text-[10px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-full font-semibold z-20">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl text-neutral-950 mb-3">
                    {p.title}
                  </h3>
                  <p className="text-neutral-600 leading-relaxed max-w-sm md:max-w-none mx-auto md:mx-0">
                    {p.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ TEAM ============================ */}
      <section className="py-24 lg:py-32 bg-neutral-50 border-y border-neutral-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <div>
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                  ⟢ The team
                </div>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950 leading-[1.05] max-w-xl">
                  Four humans,{" "}
                  <em className="text-neutral-400">no algorithms.</em>
                </h2>
              </div>
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 text-neutral-700 hover:text-[#ff4500] self-start md:self-auto transition-colors"
              >
                <span className="border-b border-neutral-300 group-hover:border-[#ff4500] pb-1 transition-colors">
                  Get in touch
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m, i) => (
              <Reveal key={m.name} delay={i * 100}>
                <article className="group">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-white border border-neutral-200">
                    <img
                      src={m.img}
                      alt={m.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-[10px] tracking-[0.2em] uppercase text-neutral-950 font-semibold">
                      0{i + 1}
                    </div>
                  </div>
                  <div className="px-1">
                    <h3 className="font-serif text-xl text-neutral-950 group-hover:text-[#ff4500] transition-colors">
                      {m.name}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-0.5">{m.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================ TESTIMONIALS ============================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="text-center mb-16">
              <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                ⟢ Kind words
              </div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950">
                What customers say.
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 100}>
                <figure className="bg-white border border-neutral-200 rounded-2xl p-8 h-full flex flex-col hover:border-[#ff4500] transition-colors duration-300">
                  <Quote
                    className="w-7 h-7 text-[#ff4500] mb-5"
                    strokeWidth={1.2}
                  />
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        size={12}
                        strokeWidth={1.5}
                        className="fill-[#ff4500] text-[#ff4500]"
                      />
                    ))}
                  </div>
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

      {/* ============================ FAQ ============================ */}
      <section className="py-24 lg:py-32 bg-neutral-50 border-y border-neutral-200/80">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-4">
                  ⟢ Frequent questions
                </div>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950 leading-[1.05] mb-6">
                  Most answers,{" "}
                  <em className="text-[#ff4500]">already here.</em>
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-8 max-w-md">
                  Quick answers to the questions we get most. For anything else,
                  the team is one email away.
                </p>
                <Link
                  to="/faq"
                  className="inline-flex items-center gap-2 text-neutral-950 hover:text-[#ff4500] group transition-colors"
                >
                  <span className="border-b border-neutral-300 group-hover:border-[#ff4500] pb-1 font-medium transition-colors">
                    See all FAQs
                  </span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.8}
                    className="group-hover:rotate-45 transition-transform"
                  />
                </Link>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={150}>
                <div className="space-y-3">
                  {faqs.map((faq, i) => {
                    const open = activeFAQ === i;
                    return (
                      <div
                        key={i}
                        className={`bg-white border rounded-2xl overflow-hidden transition-colors duration-300 ${
                          open
                            ? "border-[#ff4500]"
                            : "border-neutral-200 hover:border-neutral-400"
                        }`}
                      >
                        <button
                          onClick={() => setActiveFAQ(open ? null : i)}
                          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                          aria-expanded={open}
                        >
                          <span className="flex items-center gap-4">
                            <span className="font-serif text-neutral-300 tabular-nums text-sm">
                              0{i + 1}
                            </span>
                            <span className="font-serif text-lg text-neutral-950">
                              {faq.question}
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
                            <div className="px-6 pb-5 pl-[3.7rem] text-neutral-600 leading-relaxed">
                              {faq.answer}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ NEWSLETTER + CTA ============================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="relative bg-neutral-950 text-white rounded-[2rem] overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
              />
              <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#ff4500]/30 blur-3xl pointer-events-none" />
              <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full border border-white/10 hidden md:block" />

              <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 p-10 lg:p-16">
                {/* Newsletter */}
                <div className="lg:col-span-7">
                  <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-5">
                    ⟢ Stay close
                  </div>
                  <h2 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.05] mb-5">
                    One thoughtful{" "}
                    <em className="italic font-light text-white/90">
                      email a month.
                    </em>
                  </h2>
                  <p className="text-white/75 leading-relaxed mb-8 max-w-lg">
                    New drops, behind-the-scenes, the occasional subscriber-only
                    discount. No spam — and one click to unsubscribe whenever.
                  </p>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col sm:flex-row gap-3 max-w-md"
                  >
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="flex-1 bg-white/10 border border-white/25 text-white placeholder:text-white/50 px-5 py-4 rounded-full outline-none focus:border-white focus:bg-white/15 transition-colors"
                    />
                    <button
                      type="submit"
                      className="bg-[#ff4500] hover:bg-[#ff5a1f] text-white px-7 py-4 rounded-full font-semibold transition-colors duration-300 inline-flex items-center justify-center gap-2 group whitespace-nowrap shadow-[0_10px_40px_-10px_rgba(255,69,0,0.6)]"
                    >
                      Subscribe
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2}
                        className="group-hover:rotate-45 transition-transform"
                      />
                    </button>
                  </form>
                  <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/60">
                    {[
                      "No spam, ever",
                      "Unsubscribe in one click",
                      "GDPR compliant",
                    ].map((t) => (
                      <li key={t} className="flex items-center gap-2">
                        <Check
                          size={14}
                          strokeWidth={1.8}
                          className="text-[#ff4500]"
                        />
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shop CTA */}
                <div className="lg:col-span-5 flex">
                  <div className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl p-8 lg:p-10 flex flex-col justify-between w-full">
                    <div>
                      <div className="text-[11px] tracking-[0.35em] uppercase text-white/85 font-semibold mb-4">
                        ⟢ Or skip ahead
                      </div>
                      <h3 className="font-serif text-3xl leading-[1.1] mb-4">
                        Ready to{" "}
                        <em className="italic font-light text-white/90">
                          explore?
                        </em>
                      </h3>
                      <p className="text-white/70 mb-8">
                        The full catalogue is one click away — sortable,
                        filterable, no scroll-to-infinity.
                      </p>
                    </div>
                    <Link
                      to="/shop"
                      className="group inline-flex items-center justify-center gap-2 bg-white text-neutral-950 hover:bg-[#ff4500] hover:text-white px-7 py-4 rounded-full font-semibold transition-colors duration-300"
                    >
                      Shop now
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2}
                        className="group-hover:rotate-45 transition-transform"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default About;
