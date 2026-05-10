import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Check,
} from "lucide-react";
import { Link } from "react-router-dom";
import { FaInstagram, FaXTwitter, FaLinkedin } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

/* -------------------------------------------------------------------------- */
/*  Inline brand glyphs                                                       */
/*  lucide-react deprecated Instagram/Twitter/Linkedin (won't ship 3rd-party  */
/*  logos), so we inline minimal SVGs to keep the design intact without       */
/*  adding another dependency.                                                */
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
const channels = [
  {
    icon: <Mail size={20} strokeWidth={1.5} />,
    label: "Write to us",
    value: "support@yourstore.com",
    note: "Replies within 24 hours, every day",
    href: "mailto:support@yourstore.com",
  },
  {
    icon: <Phone size={20} strokeWidth={1.5} />,
    label: "Call us",
    value: "+234 800 000 0000",
    note: "Mon — Fri · 9:00 to 18:00 WAT",
    href: "tel:+2348000000000",
  },
  {
    icon: <MapPin size={20} strokeWidth={1.5} />,
    label: "Visit us",
    value: "Lagos, Nigeria",
    note: "By appointment only",
    href: "#map",
  },
];

const subjects = [
  "Order help",
  "Returns & refunds",
  "Product question",
  "Wholesale",
  "Press",
  "Other",
];

const socials = [
  { Icon: InstagramGlyph, label: "Instagram", href: "#" },
  { Icon: XGlyph, label: "X / Twitter", href: "#" },
  { Icon: LinkedinGlyph, label: "LinkedIn", href: "#" },
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "Order help",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Replace with real API call. Faked for demo.
    setTimeout(() => {
      setStatus("sent");
      setForm({
        name: "",
        email: "",
        subject: "Order help",
        message: "",
      });
      setTimeout(() => setStatus("idle"), 3500);
    }, 900);
  };

  const charCount = form.message.length;
  const charLimit = 1000;

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
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-[#ff4500]/30 blur-3xl pointer-events-none" />
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
                    Get in touch
                  </span>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-[6rem] leading-[0.95] tracking-tight">
                  Say{" "}
                  <em className="italic font-light text-white/90">hello.</em>
                  <br />
                  We're listening.
                </h1>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={350}>
                <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-md">
                  Questions, feedback, or just need a hand with an order — we
                  read every message and reply within 24 hours.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== CHANNELS ROW ====================== */}
      <section className="border-b border-neutral-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 100}>
                <a
                  href={c.href}
                  className="group flex items-start gap-5 p-6 md:px-8 md:first:pl-0 md:last:pr-0 hover:bg-neutral-50 -m-px md:m-0 rounded-2xl transition-colors"
                >
                  <div className="shrink-0 w-12 h-12 rounded-full bg-neutral-950 group-hover:bg-[#ff4500] text-white flex items-center justify-center transition-colors duration-300">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-1">
                      {c.label}
                    </div>
                    <div className="font-serif text-xl text-neutral-950 group-hover:text-[#ff4500] transition-colors mb-1 truncate">
                      {c.value}
                    </div>
                    <div className="text-sm text-neutral-500">{c.note}</div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.5}
                    className="text-neutral-300 group-hover:text-[#ff4500] group-hover:rotate-45 transition-all duration-300 shrink-0 mt-1"
                  />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== FORM + INFO ====================== */}
      <section className="py-20 lg:py-28 bg-neutral-50">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* INFO SIDE */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-4">
                  ⟢ The conversation
                </div>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950 leading-[1.05] mb-6">
                  We'd love to <em className="text-[#ff4500]">hear from you</em>
                  .
                </h2>
                <p className="text-neutral-600 leading-relaxed text-lg max-w-md mb-10">
                  Whether you have a question about products, pricing, a stuck
                  order, or just want to say hi — our team is small, real, and
                  ready to answer.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <ul className="space-y-4 mb-10">
                  {[
                    {
                      icon: <Clock size={16} strokeWidth={1.6} />,
                      text: "Quick response within 24 hours, weekends included",
                    },
                    {
                      icon: <MessageSquare size={16} strokeWidth={1.6} />,
                      text: "Every message read by a human, never a bot",
                    },
                    {
                      icon: <Check size={16} strokeWidth={1.8} />,
                      text: "Order issues resolved on the first reply, usually",
                    },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="shrink-0 w-6 h-6 rounded-full bg-[#ff4500]/10 text-[#ff4500] flex items-center justify-center mt-0.5">
                        {item.icon}
                      </div>
                      <span className="text-neutral-700">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              {/* Social */}
              <Reveal delay={250}>
                <div className="pt-8 border-t border-neutral-200">
                  <div className="text-[11px] tracking-[0.35em] uppercase text-neutral-500 font-semibold mb-4">
                    Or find us elsewhere
                  </div>
                  <div className="flex gap-3">
                    {socials.map(({ Icon, label, href }) => (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        className="w-11 h-11 rounded-full border border-neutral-300 hover:border-[#ff4500] hover:bg-[#ff4500] hover:text-white flex items-center justify-center transition-colors duration-300"
                      >
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* FORM */}
            <div className="lg:col-span-7">
              <Reveal delay={100}>
                <form
                  onSubmit={handleSubmit}
                  className="bg-white border border-neutral-200 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
                >
                  {/* Decorative corner */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-[#ff4500]/10 blur-2xl pointer-events-none" />

                  <div className="relative">
                    <div className="flex items-baseline justify-between mb-8">
                      <h3 className="font-serif text-3xl text-neutral-950">
                        Send a message
                      </h3>
                      <span className="text-xs text-neutral-400 tabular-nums">
                        * Required
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <Field
                        label="Your name *"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Doe"
                        required
                      />
                      <Field
                        label="Your email *"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        required
                      />
                    </div>

                    {/* Subject pills */}
                    <div className="mb-5">
                      <label className="block text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-3">
                        What's it about?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {subjects.map((s) => {
                          const active = form.subject === s;
                          return (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setForm({ ...form, subject: s })}
                              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                                active
                                  ? "bg-[#ff4500] border-[#ff4500] text-white"
                                  : "bg-white border-neutral-300 text-neutral-700 hover:border-neutral-950"
                              }`}
                            >
                              {s}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label
                        htmlFor="message"
                        className="block text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-2"
                      >
                        Your message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={6}
                        maxLength={charLimit}
                        placeholder="Tell us what's on your mind…"
                        required
                        className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#ff4500] focus:bg-white text-neutral-900 placeholder:text-neutral-400 px-5 py-4 rounded-2xl outline-none transition-colors resize-none"
                      />
                      <div className="flex justify-end mt-1.5">
                        <span
                          className={`text-xs tabular-nums ${
                            charCount > charLimit * 0.9
                              ? "text-[#ff4500]"
                              : "text-neutral-400"
                          }`}
                        >
                          {charCount} / {charLimit}
                        </span>
                      </div>
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <p className="text-xs text-neutral-500 max-w-sm">
                        By sending, you agree to our privacy policy. We'll never
                        share your details.
                      </p>
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className={`group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-medium transition-all duration-300 shrink-0 ${
                          status === "sent"
                            ? "bg-emerald-600 text-white"
                            : "bg-[#ff4500] hover:bg-[#ff5a1f] text-white shadow-[0_10px_40px_-10px_rgba(255,69,0,0.6)]"
                        } ${
                          status === "sending" ? "opacity-80 cursor-wait" : ""
                        }`}
                      >
                        {status === "sent" ? (
                          <>
                            <Check size={16} strokeWidth={2} />
                            Message sent
                          </>
                        ) : status === "sending" ? (
                          <>
                            <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            <Send
                              size={15}
                              strokeWidth={1.8}
                              className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                            />
                            Send message
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== MAP ====================== */}
      <section id="map" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
              <div>
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-3">
                  ⟢ The studio
                </div>
                <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950">
                  Where we work.
                </h2>
              </div>
              <a
                href="https://maps.google.com/?q=Lagos,Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-neutral-700 hover:text-[#ff4500] self-start md:self-auto transition-colors"
              >
                <span className="border-b border-neutral-300 group-hover:border-[#ff4500] pb-1 transition-colors">
                  Open in Google Maps
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-100">
              {/* Stylized map placeholder — works without an API key.
                  Swap with an <iframe> for real Google/Mapbox embed. */}
              <div className="aspect-[16/7] relative bg-gradient-to-br from-neutral-100 via-white to-neutral-200">
                {/* Subtle grid */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="map-grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#e5e5e5"
                        strokeWidth="1"
                      />
                    </pattern>
                    <pattern
                      id="map-grid-major"
                      width="200"
                      height="200"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 200 0 L 0 0 0 200"
                        fill="none"
                        stroke="#d4d4d4"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                  <rect
                    width="100%"
                    height="100%"
                    fill="url(#map-grid-major)"
                  />
                  {/* Stylized "roads" */}
                  <path
                    d="M 0 200 Q 300 180 600 220 T 1400 250"
                    fill="none"
                    stroke="#a3a3a3"
                    strokeWidth="3"
                  />
                  <path
                    d="M 200 0 Q 220 200 180 400 T 250 700"
                    fill="none"
                    stroke="#a3a3a3"
                    strokeWidth="2"
                  />
                  <path
                    d="M 800 0 Q 780 250 820 500"
                    fill="none"
                    stroke="#c4c4c4"
                    strokeWidth="2"
                  />
                </svg>

                {/* Pin */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#ff4500] rounded-full animate-ping opacity-40" />
                    <div className="relative w-5 h-5 rounded-full bg-[#ff4500] border-4 border-white shadow-lg" />
                  </div>
                  <div className="mt-3 bg-neutral-950 text-white px-4 py-2 rounded-full text-sm font-medium shadow-xl whitespace-nowrap">
                    The Studio · Lagos, NG
                  </div>
                </div>
              </div>

              {/* Address strip below */}
              <div className="bg-white border-t border-neutral-200 px-6 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <MapPin
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#ff4500]"
                  />
                  <div>
                    <div className="font-medium text-neutral-950">
                      The Studio
                    </div>
                    <div className="text-sm text-neutral-500">
                      Victoria Island, Lagos, Nigeria · By appointment
                    </div>
                  </div>
                </div>
                <a
                  href="https://maps.google.com/?q=Lagos,Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#ff4500] hover:underline underline-offset-4"
                >
                  Get directions
                  <ArrowRight size={14} strokeWidth={1.8} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ====================== FAQ + SHOP CTA (combined) ====================== */}
      <section className="pb-24 lg:pb-32 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* FAQ shortcut */}
            <Reveal>
              <Link
                to="/faq"
                className="group relative block bg-neutral-50 border border-neutral-200 hover:border-[#ff4500] rounded-3xl p-10 lg:p-12 h-full transition-colors duration-300 overflow-hidden"
              >
                <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-4">
                  ⟢ Got questions?
                </div>
                <h3 className="font-serif text-3xl md:text-4xl tracking-tight text-neutral-950 mb-4 leading-[1.1]">
                  Most answers are{" "}
                  <em className="text-neutral-400">already written.</em>
                </h3>
                <p className="text-neutral-600 mb-8 max-w-md">
                  Check our FAQ first — shipping, returns, sizing, payment.
                  You'll likely find what you need in under a minute.
                </p>
                <span className="inline-flex items-center gap-2 text-neutral-950 group-hover:text-[#ff4500] transition-colors">
                  <span className="border-b border-neutral-300 group-hover:border-[#ff4500] pb-0.5 font-medium transition-colors">
                    Visit the FAQ
                  </span>
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.8}
                    className="group-hover:rotate-45 transition-transform"
                  />
                </span>
                <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-[#ff4500]/5 group-hover:bg-[#ff4500]/15 transition-colors duration-500 pointer-events-none" />
              </Link>
            </Reveal>

            {/* Shop CTA */}
            <Reveal delay={150}>
              <Link
                to="/shop"
                className="group relative block bg-[#ff4500] text-white rounded-3xl p-10 lg:p-12 h-full overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-[0.08]"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                  }}
                />
                <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-white/20 hidden md:block" />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full border border-white/15 hidden md:block" />

                <div className="relative">
                  <div className="text-[11px] tracking-[0.35em] uppercase text-white/85 font-semibold mb-4">
                    ⟢ Or skip ahead
                  </div>
                  <h3 className="font-serif text-3xl md:text-4xl tracking-tight mb-4 leading-[1.1]">
                    Ready to{" "}
                    <em className="italic font-light text-white/90">shop?</em>
                  </h3>
                  <p className="text-white/85 mb-8 max-w-md">
                    The full catalogue is one click away — filterable, sortable,
                    and updated every Friday.
                  </p>
                  <span className="inline-flex items-center gap-2 bg-white text-[#ff4500] hover:bg-neutral-950 hover:text-white px-6 py-3 rounded-full font-semibold transition-colors duration-300">
                    Browse products
                    <ArrowUpRight
                      size={16}
                      strokeWidth={2}
                      className="group-hover:rotate-45 transition-transform"
                    />
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Form field component                                                      */
/* -------------------------------------------------------------------------- */
const Field = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-2"
    >
      {label}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full bg-neutral-50 border border-neutral-200 focus:border-[#ff4500] focus:bg-white text-neutral-900 placeholder:text-neutral-400 px-5 py-4 rounded-2xl outline-none transition-colors"
    />
  </div>
);

export default Contact;
