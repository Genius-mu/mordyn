import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
  Info,
  Trash2,
  ShoppingBag,
  ArrowLeft,
  ArrowUpRight,
  Minus,
  Plus,
  Truck,
  ShieldCheck,
  Tag,
  Lock,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */
const formatNaira = (n) =>
  `₦${Number(n).toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;

const FREE_SHIPPING_THRESHOLD = 50000; // ₦50,000

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */
const CartPage = () => {
  const { cart, increment, decrement } = useCart();
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  // Derived totals (the original used `totalItems` as the price — wrong.
  // Compute from line items instead.)
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );
  const totalQty = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 2500;
  const total = subtotal - discount + shipping;
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(
    100,
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
  );

  const removeItem = (item) => {
    // Original cart context only exposes `decrement`. Loop until quantity
    // hits zero. (Better: add a `removeItem(id)` to your CartContext.)
    for (let i = 0; i < item.quantity; i++) decrement(item.id);
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promo.trim().toUpperCase() === "WELCOME10") {
      setPromoApplied(true);
    } else if (promo.trim()) {
      setPromoApplied(false);
    }
  };

  return (
    <div className="bg-white text-neutral-900 selection:bg-[#ff4500] selection:text-white min-h-screen">
      {/* Info modal */}
      <AnimatePresence>
        {selectedInfo && (
          <InfoPop
            info={selectedInfo.description}
            title={selectedInfo.name}
            onClose={() => setSelectedInfo(null)}
          />
        )}
      </AnimatePresence>

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
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-[#ff4500]/30 blur-3xl pointer-events-none" />

        <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm mb-8 group"
          >
            <ArrowLeft
              size={16}
              strokeWidth={1.6}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Continue shopping
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-white/80" />
                <span className="text-[11px] tracking-[0.35em] uppercase font-medium">
                  Your bag
                </span>
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
                {cart.length === 0 ? "Your cart is empty." : "Almost yours."}
              </h1>
            </div>
            {cart.length > 0 && (
              <div className="text-white/75 text-sm tabular-nums">
                {totalQty} {totalQty === 1 ? "item" : "items"} · {cart.length}{" "}
                {cart.length === 1 ? "product" : "products"}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================== BODY ============================== */}
      <AnimatePresence mode="wait">
        {cart.length > 0 ? (
          <motion.section
            key="cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 lg:py-16"
          >
            {/* Free shipping progress */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-neutral-50 border border-neutral-200 rounded-2xl px-6 py-5 mb-10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-9 h-9 rounded-full bg-[#ff4500]/10 text-[#ff4500] flex items-center justify-center">
                    <Truck size={16} strokeWidth={1.6} />
                  </div>
                  {remainingForFreeShip > 0 ? (
                    <span className="text-neutral-700">
                      You're{" "}
                      <span className="font-semibold text-neutral-950">
                        {formatNaira(remainingForFreeShip)}
                      </span>{" "}
                      away from{" "}
                      <span className="text-[#ff4500] font-medium">
                        free shipping
                      </span>
                      .
                    </span>
                  ) : (
                    <span className="text-neutral-700">
                      🎉 You've unlocked{" "}
                      <span className="text-[#ff4500] font-semibold">
                        free shipping
                      </span>
                      .
                    </span>
                  )}
                </div>
              </div>
              <div className="h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${shippingProgress}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="h-full bg-[#ff4500] rounded-full"
                />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* ---------------- LINE ITEMS ---------------- */}
              <div className="lg:col-span-7 xl:col-span-8">
                <div className="hidden md:flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-neutral-500 font-semibold pb-4 border-b border-neutral-200">
                  <span>Product</span>
                  <span className="flex gap-12">
                    <span>Quantity</span>
                    <span className="w-20 text-right">Total</span>
                  </span>
                </div>

                <ul className="divide-y divide-neutral-200">
                  <AnimatePresence initial={false}>
                    {cart.map((item, i) => (
                      <motion.li
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{
                          opacity: 0,
                          x: -40,
                          transition: { duration: 0.25 },
                        }}
                        transition={{
                          duration: 0.35,
                          delay: i * 0.05,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="py-6 group"
                      >
                        <div className="flex gap-4 md:gap-6">
                          {/* Image */}
                          <div className="relative shrink-0">
                            <Link
                              to={`/shop/${item.id ?? ""}`}
                              className="block w-24 h-28 md:w-32 md:h-36 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200"
                            >
                              <img
                                src={item.img}
                                alt={item.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </Link>
                            <AnimatePresence>
                              {item.quantity > 1 && (
                                <motion.span
                                  key={item.quantity}
                                  initial={{ scale: 0.5, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0.5, opacity: 0 }}
                                  transition={{
                                    duration: 0.22,
                                    ease: [0.34, 1.56, 0.64, 1],
                                  }}
                                  className="absolute -top-2 -right-2 bg-[#ff4500] text-white rounded-full min-w-[22px] h-[22px] flex items-center justify-center text-[11px] font-bold px-1 ring-2 ring-white tabular-nums"
                                >
                                  {item.quantity}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Body */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
                            <div>
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <Link
                                    to={`/shop/${item.id ?? ""}`}
                                    className="font-serif text-lg md:text-xl text-neutral-950 hover:text-[#ff4500] transition-colors line-clamp-2 block"
                                  >
                                    {item.name}
                                  </Link>
                                  {item.category && (
                                    <p className="text-xs text-neutral-500 capitalize mt-1 tracking-wide">
                                      {item.category}
                                    </p>
                                  )}
                                  <p className="text-sm text-neutral-500 tabular-nums mt-2">
                                    {formatNaira(item.price)} each
                                  </p>
                                </div>

                                {/* Total per line */}
                                <div className="text-right shrink-0 hidden md:block">
                                  <motion.div
                                    key={item.price * item.quantity}
                                    initial={{ opacity: 0.5, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="font-serif text-xl text-neutral-950 tabular-nums"
                                  >
                                    {formatNaira(item.price * item.quantity)}
                                  </motion.div>
                                </div>
                              </div>
                            </div>

                            {/* Controls */}
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-1 border border-neutral-300 rounded-full overflow-hidden">
                                <motion.button
                                  whileTap={{ scale: 0.85 }}
                                  onClick={() => decrement(item.id)}
                                  aria-label="Decrease quantity"
                                  className="w-9 h-9 flex items-center justify-center text-neutral-700 hover:bg-[#ff4500] hover:text-white transition-colors"
                                >
                                  <Minus size={14} strokeWidth={1.8} />
                                </motion.button>
                                <motion.span
                                  key={item.quantity}
                                  initial={{ scale: 1.4, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{
                                    duration: 0.18,
                                    ease: [0.34, 1.56, 0.64, 1],
                                  }}
                                  className="text-sm font-semibold w-8 text-center tabular-nums"
                                >
                                  {item.quantity}
                                </motion.span>
                                <motion.button
                                  whileTap={{ scale: 0.85 }}
                                  onClick={() => increment(item.id)}
                                  aria-label="Increase quantity"
                                  className="w-9 h-9 flex items-center justify-center text-neutral-700 hover:bg-[#ff4500] hover:text-white transition-colors"
                                >
                                  <Plus size={14} strokeWidth={1.8} />
                                </motion.button>
                              </div>

                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => setSelectedInfo(item)}
                                  aria-label="Product details"
                                  className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-500 hover:text-[#ff4500] hover:bg-neutral-100 transition-colors"
                                >
                                  <Info size={15} strokeWidth={1.6} />
                                </button>
                                <motion.button
                                  whileTap={{ scale: 0.85 }}
                                  onClick={() => removeItem(item)}
                                  aria-label="Remove item"
                                  className="w-9 h-9 flex items-center justify-center rounded-full text-neutral-400 hover:text-[#ff4500] hover:bg-neutral-100 transition-colors"
                                >
                                  <Trash2 size={15} strokeWidth={1.6} />
                                </motion.button>
                              </div>
                            </div>

                            {/* Mobile total */}
                            <div className="md:hidden font-serif text-lg text-neutral-950 tabular-nums pt-2 border-t border-neutral-100">
                              {formatNaira(item.price * item.quantity)}
                            </div>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>

                {/* Continue shopping */}
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 mt-8 text-neutral-700 hover:text-[#ff4500] group transition-colors"
                >
                  <ArrowLeft
                    size={16}
                    strokeWidth={1.6}
                    className="group-hover:-translate-x-1 transition-transform"
                  />
                  <span className="border-b border-neutral-300 group-hover:border-[#ff4500] pb-0.5 font-medium transition-colors">
                    Continue shopping
                  </span>
                </Link>
              </div>

              {/* ---------------- ORDER SUMMARY ---------------- */}
              <aside className="lg:col-span-5 xl:col-span-4">
                <div className="lg:sticky lg:top-[7em] space-y-4">
                  <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 lg:p-8">
                    <div className="text-[11px] tracking-[0.35em] uppercase text-[#ff4500] font-semibold mb-2">
                      ⟢ Summary
                    </div>
                    <h2 className="font-serif text-2xl text-neutral-950 mb-6">
                      Order total
                    </h2>

                    {/* Promo */}
                    <form
                      onSubmit={handleApplyPromo}
                      className="flex gap-2 mb-6"
                    >
                      <div className="relative flex-1">
                        <Tag
                          size={14}
                          strokeWidth={1.6}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                        />
                        <input
                          type="text"
                          value={promo}
                          onChange={(e) => setPromo(e.target.value)}
                          placeholder="Promo code"
                          className="w-full bg-white border border-neutral-200 focus:border-[#ff4500] text-neutral-900 placeholder:text-neutral-400 pl-10 pr-4 py-3 rounded-full text-sm outline-none transition-colors"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-5 py-3 rounded-full bg-neutral-950 hover:bg-[#ff4500] text-white text-sm font-medium transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                    {promoApplied && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-emerald-600 font-medium mb-5 -mt-3"
                      >
                        ✓ Promo "WELCOME10" applied — 10% off your subtotal.
                      </motion.div>
                    )}
                    {!promoApplied && promo && (
                      <p className="text-xs text-neutral-500 mb-5 -mt-3">
                        Try{" "}
                        <span className="font-mono text-[#ff4500]">
                          WELCOME10
                        </span>{" "}
                        for 10% off.
                      </p>
                    )}

                    {/* Lines */}
                    <ul className="space-y-3 pb-5 border-b border-neutral-200">
                      <li className="flex justify-between text-sm">
                        <span className="text-neutral-600">
                          Subtotal · {totalQty}{" "}
                          {totalQty === 1 ? "item" : "items"}
                        </span>
                        <span className="text-neutral-950 tabular-nums">
                          {formatNaira(subtotal)}
                        </span>
                      </li>
                      {promoApplied && (
                        <li className="flex justify-between text-sm">
                          <span className="text-neutral-600">
                            Discount (WELCOME10)
                          </span>
                          <span className="text-[#ff4500] tabular-nums">
                            −{formatNaira(discount)}
                          </span>
                        </li>
                      )}
                      <li className="flex justify-between text-sm">
                        <span className="text-neutral-600">Shipping</span>
                        <span className="text-neutral-950 tabular-nums">
                          {shipping === 0 ? (
                            <span className="text-[#ff4500] font-medium">
                              Free
                            </span>
                          ) : (
                            formatNaira(shipping)
                          )}
                        </span>
                      </li>
                      <li className="flex justify-between text-xs text-neutral-500">
                        <span>Taxes</span>
                        <span>Calculated at checkout</span>
                      </li>
                    </ul>

                    {/* Grand total */}
                    <div className="flex justify-between items-baseline pt-5 mb-6">
                      <span className="font-serif text-xl text-neutral-950">
                        Total
                      </span>
                      <motion.span
                        key={total}
                        initial={{ scale: 1.06 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.22,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                        className="font-serif text-3xl text-neutral-950 tabular-nums"
                      >
                        {formatNaira(total)}
                      </motion.span>
                    </div>

                    {/* Checkout button */}
                    <Link
                      to="/checkout"
                      className="group w-full inline-flex items-center justify-center gap-3 bg-[#ff4500] hover:bg-[#ff5a1f] text-white font-medium px-6 py-4 rounded-full text-sm transition-colors duration-300 shadow-[0_10px_40px_-10px_rgba(255,69,0,0.6)]"
                    >
                      <Lock size={14} strokeWidth={1.8} />
                      Secure checkout
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.8}
                        className="group-hover:rotate-45 transition-transform"
                      />
                    </Link>

                    <p className="text-xs text-neutral-500 mt-4 text-center">
                      Taxes and shipping calculated at checkout
                    </p>
                  </div>

                  {/* Trust strip */}
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        Icon: ShieldCheck,
                        title: "Secure checkout",
                        sub: "256-bit encryption",
                      },
                      {
                        Icon: Truck,
                        title: "Fast shipping",
                        sub: "3–7 days, tracked",
                      },
                    ].map(({ Icon, title, sub }) => (
                      <div
                        key={title}
                        className="bg-white border border-neutral-200 rounded-2xl p-4"
                      >
                        <Icon
                          size={18}
                          strokeWidth={1.5}
                          className="text-[#ff4500] mb-2"
                        />
                        <div className="text-sm font-medium text-neutral-950">
                          {title}
                        </div>
                        <div className="text-xs text-neutral-500">{sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Payment chips */}
                  <div className="flex flex-wrap items-center gap-1.5 px-2 pt-2">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 font-semibold mr-1">
                      We accept:
                    </span>
                    {["Visa", "Mastercard", "Amex", "Apple Pay", "Klarna"].map(
                      (p) => (
                        <span
                          key={p}
                          className="text-[9px] tracking-[0.15em] uppercase text-neutral-600 px-2 py-1 rounded border border-neutral-200"
                        >
                          {p}
                        </span>
                      ),
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </motion.section>
        ) : (
          /* ============================ EMPTY STATE ============================ */
          <motion.section
            key="empty"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28"
          >
            <div className="border border-dashed border-neutral-300 rounded-3xl py-20 px-8 flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.4, ease: "backOut" }}
                className="w-20 h-20 rounded-full bg-[#ff4500]/10 flex items-center justify-center mb-8"
              >
                <ShoppingBag
                  size={32}
                  strokeWidth={1.4}
                  className="text-[#ff4500]"
                />
              </motion.div>
              <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-neutral-950 mb-4">
                Nothing here <em className="text-neutral-400">yet.</em>
              </h2>
              <p className="text-neutral-600 max-w-md mb-10 leading-relaxed">
                Your cart is empty. Wander the catalogue and pick out something
                you'd like to take home.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link
                  to="/shop"
                  className="group bg-[#ff4500] hover:bg-[#ff5a1f] text-white px-7 py-3.5 rounded-full font-medium inline-flex items-center gap-2 transition-colors shadow-[0_10px_30px_-10px_rgba(255,69,0,0.6)]"
                >
                  Browse the catalogue
                  <ArrowUpRight
                    size={15}
                    strokeWidth={1.8}
                    className="group-hover:rotate-45 transition-transform"
                  />
                </Link>
                <Link
                  to="/categories"
                  className="border border-neutral-300 hover:border-neutral-950 text-neutral-950 px-7 py-3.5 rounded-full font-medium transition-colors"
                >
                  Or browse by category
                </Link>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CartPage;

/* -------------------------------------------------------------------------- */
/*  Info modal                                                                */
/* -------------------------------------------------------------------------- */
const InfoPop = ({ info, onClose, title }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
    className="bg-neutral-950/50 backdrop-blur-sm h-full w-full fixed inset-0 flex justify-center items-center z-[100] p-4"
    onClick={(e) => e.target === e.currentTarget && onClose()}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 12 }}
      transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
      className="bg-white w-full max-w-md rounded-3xl p-8 relative shadow-2xl"
    >
      <motion.button
        whileHover={{ rotate: 90 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-neutral-100 hover:bg-[#ff4500] hover:text-white text-neutral-700 transition-colors"
      >
        <X size={16} strokeWidth={1.8} />
      </motion.button>

      <div className="pr-10">
        <div className="text-[10px] tracking-[0.3em] uppercase text-[#ff4500] font-semibold mb-3">
          ⟢ Product details
        </div>
        <h2 className="font-serif text-2xl text-neutral-950 mb-3 leading-tight">
          {title}
        </h2>
        <div className="w-10 h-px bg-[#ff4500] mb-5" />
        <p className="text-neutral-600 leading-relaxed">
          {info ||
            "No description provided yet — we're working on filling these in."}
        </p>
      </div>
    </motion.div>
  </motion.div>
);
