import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  CreditCard,
  Lock,
  Mail,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Truck,
  User,
  Wallet,
  Zap,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */
const formatNaira = (n) =>
  `₦${Number(n).toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

const FREE_SHIPPING_THRESHOLD = 50000;
const STEPS = ["Information", "Shipping", "Payment"];

/* -------------------------------------------------------------------------- */
/*  Field — shared input component                                            */
/* -------------------------------------------------------------------------- */
const Field = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  error,
  autoComplete,
  className = "",
}) => (
  <div className={className}>
    <label
      htmlFor={name}
      className="block text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-2"
    >
      {label}
      {required && <span className="text-[#ff4500] ml-1">*</span>}
    </label>
    <input
      id={name}
      type={type}
      name={name}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      className={`w-full bg-white border text-neutral-900 placeholder:text-neutral-400 px-5 py-3.5 rounded-2xl outline-none transition-colors ${
        error
          ? "border-[#ff4500] focus:border-[#ff4500]"
          : "border-neutral-200 focus:border-neutral-950"
      }`}
    />
    {error && <p className="text-xs text-[#ff4500] mt-1.5 ml-1">{error}</p>}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Static data                                                               */
/* -------------------------------------------------------------------------- */
const SHIPPING_OPTIONS = [
  {
    id: "standard",
    name: "Standard delivery",
    eta: "3–7 business days",
    price: 2500,
    icon: <Package size={18} strokeWidth={1.5} />,
  },
  {
    id: "express",
    name: "Express delivery",
    eta: "1–3 business days",
    price: 6500,
    icon: <Zap size={18} strokeWidth={1.5} />,
  },
  {
    id: "pickup",
    name: "Local pickup",
    eta: "Ready in 2 hours · Lagos only",
    price: 0,
    icon: <MapPin size={18} strokeWidth={1.5} />,
  },
];

const PAYMENT_METHODS = [
  {
    id: "card",
    name: "Credit / debit card",
    desc: "Visa, Mastercard, Amex",
    icon: <CreditCard size={18} strokeWidth={1.5} />,
  },
  {
    id: "wallet",
    name: "Apple Pay / Google Pay",
    desc: "Fastest checkout",
    icon: <Wallet size={18} strokeWidth={1.5} />,
  },
  {
    id: "transfer",
    name: "Bank transfer",
    desc: "Manual confirmation, 2–4 hours",
    icon: <Mail size={18} strokeWidth={1.5} />,
  },
];

const COUNTRIES = [
  "Nigeria",
  "Ghana",
  "Kenya",
  "South Africa",
  "United Kingdom",
  "United States",
  "Canada",
  "Germany",
  "France",
  "Other",
];

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [errors, setErrors] = useState({});
  const [summaryOpen, setSummaryOpen] = useState(false); // mobile

  const [form, setForm] = useState({
    email: "",
    newsletter: true,
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Nigeria",
    phone: "",
    shippingMethod: "standard",
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvc: "",
    saveInfo: false,
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  /* ----------------------------- Totals ----------------------------- */
  const subtotal = useMemo(
    () => cart.reduce((s, i) => s + i.price * i.quantity, 0),
    [cart],
  );
  const totalQty = useMemo(
    () => cart.reduce((s, i) => s + i.quantity, 0),
    [cart],
  );
  const shippingOption = SHIPPING_OPTIONS.find(
    (o) => o.id === form.shippingMethod,
  );
  // Free shipping above threshold for the standard tier only
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD && form.shippingMethod === "standard"
      ? 0
      : (shippingOption?.price ?? 0);
  const tax = Math.round(subtotal * 0.075); // 7.5% VAT
  const total = subtotal + shipping + tax;

  /* ----------------------------- Validation ----------------------------- */
  const validateStep = (s) => {
    const next = {};
    if (s === 0) {
      if (!form.email.trim()) next.email = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(form.email))
        next.email = "Use a valid email address";
      if (!form.firstName.trim()) next.firstName = "Required";
      if (!form.lastName.trim()) next.lastName = "Required";
      if (!form.address.trim()) next.address = "Address is required";
      if (!form.city.trim()) next.city = "Required";
      if (!form.postalCode.trim()) next.postalCode = "Required";
      if (!form.phone.trim()) next.phone = "Required";
    }
    if (s === 2 && form.paymentMethod === "card") {
      if (!form.cardNumber.replace(/\s/g, "").match(/^\d{13,19}$/))
        next.cardNumber = "Enter a valid card number";
      if (!form.cardName.trim()) next.cardName = "Cardholder name required";
      if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) next.cardExpiry = "MM / YY";
      if (!/^\d{3,4}$/.test(form.cardCvc)) next.cardCvc = "3 digits";
      if (!form.agreeTerms) next.agreeTerms = "Please agree to the terms";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const goBack = () => {
    setStep((s) => Math.max(s - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ----------------------------- Submit ----------------------------- */
  const placeOrder = (e) => {
    e.preventDefault();
    if (!validateStep(2)) return;
    setSubmitting(true);
    // Replace with real payment + order endpoint
    setTimeout(() => {
      setSubmitting(false);
      setOrderPlaced(true);
    }, 1400);
  };

  /* ----------------------------- Card formatters ----------------------------- */
  const formatCardNumber = (v) =>
    v
      .replace(/\D/g, "")
      .slice(0, 19)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
  };

  /* ----------------------------- Empty cart guard ----------------------------- */
  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="bg-white text-neutral-900 min-h-screen pt-[8em] pb-24 px-6 lg:px-12">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[#ff4500]/10 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag
              size={26}
              strokeWidth={1.4}
              className="text-[#ff4500]"
            />
          </div>
          <h1 className="font-serif text-4xl text-neutral-950 mb-3">
            Your cart is empty.
          </h1>
          <p className="text-neutral-600 mb-8">
            Add a few things to your bag before heading to checkout.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-[#ff4500] hover:bg-[#ff5a1f] text-white px-7 py-3.5 rounded-full font-medium group transition-colors"
          >
            Browse the catalogue
            <ArrowUpRight
              size={15}
              strokeWidth={1.8}
              className="group-hover:rotate-45 transition-transform"
            />
          </Link>
        </div>
      </div>
    );
  }

  /* ----------------------------- Order placed ----------------------------- */
  if (orderPlaced) {
    return <OrderConfirmation form={form} total={total} cart={cart} />;
  }

  return (
    <div className="bg-white text-neutral-900 selection:bg-[#ff4500] selection:text-white min-h-screen">
      {/* ============================== HEADER ============================== */}
      <section className="relative mt-[5em] overflow-hidden bg-neutral-950 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff4500] via-[#cc3700] to-neutral-950" />
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-[#ff4500]/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-8 group"
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.6}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to cart
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-white/80" />
                <span className="text-[11px] tracking-[0.35em] uppercase font-medium">
                  Checkout
                </span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight">
                One last <em className="italic font-light">step.</em>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-sm text-white/75">
              <Lock size={14} strokeWidth={1.6} className="text-[#ff4500]" />
              Secure 256-bit checkout
            </div>
          </div>
        </div>
      </section>

      {/* ============================== STEPPER ============================== */}
      <div className="sticky top-[5em] z-30 bg-white/85 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-5">
          <ol className="flex items-center gap-3 md:gap-6 overflow-x-auto">
            {STEPS.map((label, i) => {
              const status = i < step ? "done" : i === step ? "active" : "todo";
              return (
                <li
                  key={label}
                  className="flex items-center gap-3 md:gap-4 shrink-0"
                >
                  <button
                    type="button"
                    onClick={() => i < step && setStep(i)}
                    disabled={i > step}
                    className={`flex items-center gap-3 group ${
                      i < step ? "cursor-pointer" : "cursor-default"
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold tabular-nums transition-colors ${
                        status === "done"
                          ? "bg-[#ff4500] text-white"
                          : status === "active"
                            ? "bg-neutral-950 text-white"
                            : "bg-neutral-100 text-neutral-400"
                      }`}
                    >
                      {status === "done" ? (
                        <Check size={14} strokeWidth={2.2} />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span
                      className={`font-serif text-sm md:text-base whitespace-nowrap ${
                        status === "todo"
                          ? "text-neutral-400"
                          : "text-neutral-950"
                      } ${i < step ? "group-hover:text-[#ff4500]" : ""}`}
                    >
                      {label}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <span
                      className={`hidden md:block h-px w-12 ${
                        i < step ? "bg-[#ff4500]" : "bg-neutral-200"
                      }`}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* ============================== MAIN ============================== */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-12 py-10 lg:py-14">
        {/* Mobile: collapsible summary */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setSummaryOpen((v) => !v)}
            className="w-full flex items-center justify-between bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4"
          >
            <span className="flex items-center gap-2 text-sm">
              <ShoppingBag
                size={16}
                strokeWidth={1.6}
                className="text-[#ff4500]"
              />
              <span className="font-medium text-neutral-950">
                {summaryOpen ? "Hide" : "Show"} order summary
              </span>
              <span className="text-neutral-500">
                ({totalQty} {totalQty === 1 ? "item" : "items"})
              </span>
            </span>
            <span className="flex items-center gap-2">
              <span className="font-serif text-lg text-neutral-950 tabular-nums">
                {formatNaira(total)}
              </span>
              <ChevronDown
                size={16}
                strokeWidth={1.8}
                className={`text-neutral-500 transition-transform ${
                  summaryOpen ? "rotate-180" : ""
                }`}
              />
            </span>
          </button>
          <AnimatePresence>
            {summaryOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <SummaryCard
                    cart={cart}
                    subtotal={subtotal}
                    shipping={shipping}
                    tax={tax}
                    total={total}
                    totalQty={totalQty}
                    inline
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ---------------- LEFT — FORM ---------------- */}
          <form
            onSubmit={placeOrder}
            className="lg:col-span-7 xl:col-span-8 space-y-10"
          >
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  className="space-y-10"
                >
                  {/* Contact */}
                  <Block
                    eyebrow="Step 01"
                    title="Contact"
                    icon={<Mail size={18} strokeWidth={1.5} />}
                  >
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      autoComplete="email"
                      required
                      error={errors.email}
                    />
                    <label className="mt-4 flex items-start gap-3 text-sm text-neutral-700 cursor-pointer">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={form.newsletter}
                        onChange={handleChange}
                        className="mt-0.5 accent-[#ff4500] w-4 h-4"
                      />
                      <span>
                        Email me with news and exclusive offers — one thoughtful
                        email a month, unsubscribe anytime.
                      </span>
                    </label>
                  </Block>

                  {/* Address */}
                  <Block
                    eyebrow="Step 02"
                    title="Shipping address"
                    icon={<MapPin size={18} strokeWidth={1.5} />}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field
                        label="First name"
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Jane"
                        autoComplete="given-name"
                        required
                        error={errors.firstName}
                      />
                      <Field
                        label="Last name"
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                        autoComplete="family-name"
                        required
                        error={errors.lastName}
                      />
                    </div>
                    <Field
                      className="mt-4"
                      label="Street address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Adetokunbo Ademola Street"
                      autoComplete="street-address"
                      required
                      error={errors.address}
                    />
                    <Field
                      className="mt-4"
                      label="Apartment, suite, etc. (optional)"
                      name="apartment"
                      value={form.apartment}
                      onChange={handleChange}
                      placeholder="Apt. 4B"
                      autoComplete="address-line2"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <Field
                        label="City"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Lagos"
                        autoComplete="address-level2"
                        required
                        error={errors.city}
                      />
                      <Field
                        label="State / region"
                        name="state"
                        value={form.state}
                        onChange={handleChange}
                        placeholder="Lagos State"
                        autoComplete="address-level1"
                      />
                      <Field
                        label="Postal code"
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        placeholder="101241"
                        autoComplete="postal-code"
                        required
                        error={errors.postalCode}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div>
                        <label
                          htmlFor="country"
                          className="block text-[11px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-2"
                        >
                          Country <span className="text-[#ff4500]">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="country"
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            className="w-full appearance-none bg-white border border-neutral-200 focus:border-neutral-950 text-neutral-900 px-5 py-3.5 pr-12 rounded-2xl outline-none transition-colors"
                          >
                            {COUNTRIES.map((c) => (
                              <option key={c}>{c}</option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            strokeWidth={1.6}
                            className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none"
                          />
                        </div>
                      </div>
                      <Field
                        label="Phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        autoComplete="tel"
                        required
                        error={errors.phone}
                      />
                    </div>
                    <label className="mt-5 flex items-start gap-3 text-sm text-neutral-700 cursor-pointer">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={form.saveInfo}
                        onChange={handleChange}
                        className="mt-0.5 accent-[#ff4500] w-4 h-4"
                      />
                      <span>Save this information for next time</span>
                    </label>
                  </Block>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                >
                  <Block
                    eyebrow="Step 03"
                    title="Shipping method"
                    icon={<Truck size={18} strokeWidth={1.5} />}
                  >
                    {/* Address recap */}
                    <div className="bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-4 mb-6 flex items-start justify-between gap-4 text-sm">
                      <div>
                        <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-1">
                          Shipping to
                        </div>
                        <div className="text-neutral-950">
                          {form.firstName} {form.lastName}
                        </div>
                        <div className="text-neutral-600">
                          {form.address}
                          {form.apartment && `, ${form.apartment}`}
                        </div>
                        <div className="text-neutral-600">
                          {form.city}
                          {form.state && `, ${form.state}`}
                          {form.postalCode && ` ${form.postalCode}`} ·{" "}
                          {form.country}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="text-[#ff4500] text-xs font-medium hover:underline underline-offset-4 shrink-0"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="space-y-3">
                      {SHIPPING_OPTIONS.map((opt) => {
                        const active = form.shippingMethod === opt.id;
                        const isFree =
                          opt.id === "standard" &&
                          subtotal >= FREE_SHIPPING_THRESHOLD;
                        return (
                          <label
                            key={opt.id}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl border cursor-pointer transition-colors ${
                              active
                                ? "border-[#ff4500] bg-[#ff4500]/5"
                                : "border-neutral-200 hover:border-neutral-400"
                            }`}
                          >
                            <input
                              type="radio"
                              name="shippingMethod"
                              value={opt.id}
                              checked={active}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                                active
                                  ? "bg-[#ff4500] text-white"
                                  : "bg-neutral-100 text-neutral-700"
                              }`}
                            >
                              {opt.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-serif text-base text-neutral-950">
                                {opt.name}
                              </div>
                              <div className="text-xs text-neutral-500">
                                {opt.eta}
                              </div>
                            </div>
                            <div className="text-sm font-medium tabular-nums text-neutral-950">
                              {isFree || opt.price === 0 ? (
                                <span className="text-[#ff4500]">Free</span>
                              ) : (
                                formatNaira(opt.price)
                              )}
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                active
                                  ? "border-[#ff4500] bg-[#ff4500]"
                                  : "border-neutral-300"
                              }`}
                            >
                              {active && (
                                <span className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </Block>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                  className="space-y-10"
                >
                  <Block
                    eyebrow="Step 04"
                    title="Payment"
                    icon={<CreditCard size={18} strokeWidth={1.5} />}
                  >
                    {/* Method selection */}
                    <div className="space-y-3 mb-6">
                      {PAYMENT_METHODS.map((m) => {
                        const active = form.paymentMethod === m.id;
                        return (
                          <label
                            key={m.id}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl border cursor-pointer transition-colors ${
                              active
                                ? "border-[#ff4500] bg-[#ff4500]/5"
                                : "border-neutral-200 hover:border-neutral-400"
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={m.id}
                              checked={active}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div
                              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                                active
                                  ? "bg-[#ff4500] text-white"
                                  : "bg-neutral-100 text-neutral-700"
                              }`}
                            >
                              {m.icon}
                            </div>
                            <div className="flex-1">
                              <div className="font-serif text-base text-neutral-950">
                                {m.name}
                              </div>
                              <div className="text-xs text-neutral-500">
                                {m.desc}
                              </div>
                            </div>
                            <div
                              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                                active
                                  ? "border-[#ff4500] bg-[#ff4500]"
                                  : "border-neutral-300"
                              }`}
                            >
                              {active && (
                                <span className="w-2 h-2 rounded-full bg-white" />
                              )}
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    {/* Card form */}
                    <AnimatePresence mode="wait">
                      {form.paymentMethod === "card" && (
                        <motion.div
                          key="card-form"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 space-y-4">
                            <Field
                              label="Card number"
                              name="cardNumber"
                              value={form.cardNumber}
                              onChange={(e) =>
                                handleChange({
                                  target: {
                                    name: "cardNumber",
                                    value: formatCardNumber(e.target.value),
                                    type: "text",
                                  },
                                })
                              }
                              placeholder="1234 5678 9012 3456"
                              autoComplete="cc-number"
                              required
                              error={errors.cardNumber}
                            />
                            <Field
                              label="Cardholder name"
                              name="cardName"
                              value={form.cardName}
                              onChange={handleChange}
                              placeholder="JANE DOE"
                              autoComplete="cc-name"
                              required
                              error={errors.cardName}
                            />
                            <div className="grid grid-cols-2 gap-4">
                              <Field
                                label="Expiry"
                                name="cardExpiry"
                                value={form.cardExpiry}
                                onChange={(e) =>
                                  handleChange({
                                    target: {
                                      name: "cardExpiry",
                                      value: formatExpiry(e.target.value),
                                      type: "text",
                                    },
                                  })
                                }
                                placeholder="MM / YY"
                                autoComplete="cc-exp"
                                required
                                error={errors.cardExpiry}
                              />
                              <Field
                                label="CVC"
                                name="cardCvc"
                                value={form.cardCvc}
                                onChange={(e) =>
                                  handleChange({
                                    target: {
                                      name: "cardCvc",
                                      value: e.target.value
                                        .replace(/\D/g, "")
                                        .slice(0, 4),
                                      type: "text",
                                    },
                                  })
                                }
                                placeholder="123"
                                autoComplete="cc-csc"
                                required
                                error={errors.cardCvc}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {form.paymentMethod === "wallet" && (
                        <motion.div
                          key="wallet-info"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-6 text-center"
                        >
                          <Wallet
                            size={28}
                            strokeWidth={1.4}
                            className="text-[#ff4500] mx-auto mb-3"
                          />
                          <p className="text-sm text-neutral-700">
                            You'll be prompted to confirm payment with{" "}
                            <span className="font-semibold">Apple Pay</span> or{" "}
                            <span className="font-semibold">Google Pay</span>{" "}
                            after placing the order.
                          </p>
                        </motion.div>
                      )}

                      {form.paymentMethod === "transfer" && (
                        <motion.div
                          key="transfer-info"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-6"
                        >
                          <p className="text-sm text-neutral-700">
                            Bank details will be sent to{" "}
                            <span className="font-semibold text-neutral-950">
                              {form.email || "your email"}
                            </span>{" "}
                            after order confirmation. Orders ship once transfer
                            is received (typically 2–4 hours).
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Terms */}
                    <label className="mt-6 flex items-start gap-3 text-sm text-neutral-700 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={form.agreeTerms}
                        onChange={handleChange}
                        className={`mt-0.5 w-4 h-4 ${
                          errors.agreeTerms
                            ? "accent-[#ff4500]"
                            : "accent-[#ff4500]"
                        }`}
                      />
                      <span>
                        I agree to the{" "}
                        <Link
                          to="/terms"
                          className="text-[#ff4500] hover:underline underline-offset-2"
                        >
                          terms of service
                        </Link>{" "}
                        and{" "}
                        <Link
                          to="/privacy"
                          className="text-[#ff4500] hover:underline underline-offset-2"
                        >
                          privacy policy
                        </Link>
                        .
                      </span>
                    </label>
                    {errors.agreeTerms && (
                      <p className="text-xs text-[#ff4500] mt-1.5 ml-7">
                        {errors.agreeTerms}
                      </p>
                    )}
                  </Block>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between pt-4">
              <button
                type="button"
                onClick={step === 0 ? () => navigate("/cart") : goBack}
                className="inline-flex items-center justify-center gap-2 text-neutral-700 hover:text-[#ff4500] group transition-colors text-sm py-3"
              >
                <ArrowLeft
                  size={15}
                  strokeWidth={1.6}
                  className="group-hover:-translate-x-1 transition-transform"
                />
                {step === 0 ? "Return to cart" : `Back to ${STEPS[step - 1]}`}
              </button>

              {step < STEPS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="group inline-flex items-center justify-center gap-2 bg-neutral-950 hover:bg-[#ff4500] text-white px-7 py-3.5 rounded-full font-medium transition-colors duration-300"
                >
                  Continue to {STEPS[step + 1]}
                  <ArrowRight
                    size={15}
                    strokeWidth={1.8}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={submitting}
                  className={`group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full font-medium text-white transition-all duration-300 shadow-[0_10px_40px_-10px_rgba(255,69,0,0.6)] ${
                    submitting
                      ? "bg-[#ff5a1f] opacity-90 cursor-wait"
                      : "bg-[#ff4500] hover:bg-[#ff5a1f]"
                  }`}
                >
                  {submitting ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                      Processing payment…
                    </>
                  ) : (
                    <>
                      <Lock size={14} strokeWidth={1.8} />
                      Place order · {formatNaira(total)}
                    </>
                  )}
                </button>
              )}
            </div>
          </form>

          {/* ---------------- RIGHT — SUMMARY ---------------- */}
          <aside className="hidden lg:block lg:col-span-5 xl:col-span-4">
            <div className="lg:sticky lg:top-[10em]">
              <SummaryCard
                cart={cart}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                totalQty={totalQty}
              />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};

export default Checkout;

/* -------------------------------------------------------------------------- */
/*  Block — section wrapper                                                   */
/* -------------------------------------------------------------------------- */
const Block = ({ eyebrow, title, icon, children }) => (
  <section className="bg-white border border-neutral-200 rounded-3xl p-6 lg:p-8">
    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
      <div className="w-11 h-11 rounded-full bg-neutral-950 text-white flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-[10px] tracking-[0.3em] uppercase text-[#ff4500] font-semibold">
          ⟢ {eyebrow}
        </div>
        <h2 className="font-serif text-2xl text-neutral-950 leading-tight">
          {title}
        </h2>
      </div>
    </div>
    {children}
  </section>
);

/* -------------------------------------------------------------------------- */
/*  Order summary card                                                        */
/* -------------------------------------------------------------------------- */
const SummaryCard = ({
  cart,
  subtotal,
  shipping,
  tax,
  total,
  totalQty,
  inline = false,
}) => (
  <div
    className={`${
      inline ? "" : "bg-neutral-50 border border-neutral-200"
    } rounded-3xl p-6 lg:p-8 space-y-6`}
  >
    {!inline && (
      <div>
        <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-2">
          ⟢ Summary
        </div>
        <h2 className="font-serif text-2xl text-neutral-950">Your order</h2>
      </div>
    )}

    {/* Line items */}
    <ul className="space-y-4 max-h-80 overflow-y-auto pr-1 -mr-1">
      {cart.map((item) => (
        <li key={item.id} className="flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-white border border-neutral-200">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -top-2 -right-2 bg-neutral-950 text-white rounded-full min-w-[20px] h-[20px] flex items-center justify-center text-[10px] font-bold px-1 ring-2 ring-white tabular-nums">
              {item.quantity}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-serif text-sm text-neutral-950 line-clamp-1">
              {item.name}
            </div>
            <div className="text-xs text-neutral-500 mt-0.5 tabular-nums">
              {formatNaira(item.price)} × {item.quantity}
            </div>
          </div>
          <div className="font-serif text-sm text-neutral-950 tabular-nums shrink-0">
            {formatNaira(item.price * item.quantity)}
          </div>
        </li>
      ))}
    </ul>

    {/* Lines */}
    <ul className="space-y-3 pt-5 border-t border-neutral-200">
      <li className="flex justify-between text-sm">
        <span className="text-neutral-600">
          Subtotal · {totalQty} {totalQty === 1 ? "item" : "items"}
        </span>
        <span className="text-neutral-950 tabular-nums">
          {formatNaira(subtotal)}
        </span>
      </li>
      <li className="flex justify-between text-sm">
        <span className="text-neutral-600">Shipping</span>
        <span className="text-neutral-950 tabular-nums">
          {shipping === 0 ? (
            <span className="text-[#ff4500] font-medium">Free</span>
          ) : (
            formatNaira(shipping)
          )}
        </span>
      </li>
      <li className="flex justify-between text-sm">
        <span className="text-neutral-600">VAT (7.5%)</span>
        <span className="text-neutral-950 tabular-nums">
          {formatNaira(tax)}
        </span>
      </li>
    </ul>

    <div className="flex justify-between items-baseline pt-4 border-t border-neutral-200">
      <span className="font-serif text-lg text-neutral-950">Total</span>
      <motion.span
        key={total}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
        className="font-serif text-3xl text-neutral-950 tabular-nums"
      >
        {formatNaira(total)}
      </motion.span>
    </div>

    {/* Trust strip */}
    <div className="grid grid-cols-2 gap-2 pt-2">
      <div className="flex items-start gap-2">
        <ShieldCheck
          size={14}
          strokeWidth={1.6}
          className="text-[#ff4500] mt-0.5"
        />
        <span className="text-xs text-neutral-600 leading-tight">
          Secure checkout
        </span>
      </div>
      <div className="flex items-start gap-2">
        <Truck size={14} strokeWidth={1.6} className="text-[#ff4500] mt-0.5" />
        <span className="text-xs text-neutral-600 leading-tight">
          Tracked delivery
        </span>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Order confirmation                                                        */
/* -------------------------------------------------------------------------- */
const OrderConfirmation = ({ form, total, cart }) => {
  const orderNumber = useRef(
    "MD-" +
      Math.random().toString(36).slice(2, 6).toUpperCase() +
      "-" +
      Date.now().toString().slice(-4),
  );

  return (
    <div className="bg-white text-neutral-900 min-h-screen">
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

        <div className="relative max-w-[900px] mx-auto px-6 lg:px-12 py-20 lg:py-28 text-center">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="w-20 h-20 rounded-full bg-white text-[#ff4500] flex items-center justify-center mx-auto mb-8"
          >
            <Check size={36} strokeWidth={2} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="text-[11px] tracking-[0.35em] uppercase font-medium mb-4">
              Order confirmed
            </div>
            <h1 className="font-serif text-4xl md:text-6xl leading-[1.05] tracking-tight mb-5">
              Thank you,{" "}
              <em className="italic font-light text-white/90">
                {form.firstName || "friend"}.
              </em>
            </h1>
            <p className="text-white/80 text-lg max-w-xl mx-auto">
              Your order is in. We've sent a confirmation to{" "}
              <span className="text-white">{form.email}</span> and you'll get
              tracking as soon as it ships.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-[900px] mx-auto px-6 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-neutral-50 border border-neutral-200 rounded-3xl p-8 lg:p-10 mb-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-1">
                Order number
              </div>
              <div className="font-serif text-xl text-neutral-950 tabular-nums">
                {orderNumber.current}
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-1">
                Total
              </div>
              <div className="font-serif text-xl text-neutral-950 tabular-nums">
                {formatNaira(total)}
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-1">
                Estimated delivery
              </div>
              <div className="font-serif text-xl text-neutral-950">
                {form.shippingMethod === "express"
                  ? "1–3 days"
                  : form.shippingMethod === "pickup"
                    ? "Today"
                    : "3–7 days"}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-2">
                Shipping to
              </div>
              <div className="text-sm text-neutral-700 leading-relaxed">
                {form.firstName} {form.lastName}
                <br />
                {form.address}
                {form.apartment && <>, {form.apartment}</>}
                <br />
                {form.city}
                {form.state && `, ${form.state}`}
                {form.postalCode && ` ${form.postalCode}`}
                <br />
                {form.country}
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold mb-2">
                Items ({cart.length})
              </div>
              <ul className="space-y-2">
                {cart.map((item) => (
                  <li
                    key={item.id}
                    className="text-sm text-neutral-700 flex justify-between gap-3"
                  >
                    <span className="line-clamp-1">
                      {item.quantity}× {item.name}
                    </span>
                    <span className="tabular-nums shrink-0">
                      {formatNaira(item.price * item.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            to="/shop"
            className="group inline-flex items-center gap-2 bg-[#ff4500] hover:bg-[#ff5a1f] text-white px-7 py-3.5 rounded-full font-medium transition-colors shadow-[0_10px_30px_-10px_rgba(255,69,0,0.6)]"
          >
            Continue shopping
            <ArrowUpRight
              size={15}
              strokeWidth={1.8}
              className="group-hover:rotate-45 transition-transform"
            />
          </Link>
          <Link
            to="/contact"
            className="border border-neutral-300 hover:border-neutral-950 text-neutral-950 px-7 py-3.5 rounded-full font-medium transition-colors"
          >
            Need help with your order?
          </Link>
        </motion.div>
      </section>
    </div>
  );
};
