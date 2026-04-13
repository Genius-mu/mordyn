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
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", to: "/", icon: Home },
  { label: "Shop", to: "/shop", icon: ShoppingBag },
  { label: "Categories", to: "/categories", icon: Grid },
  { label: "About", to: "/about", icon: Info },
  { label: "Contact", to: "/contact", icon: Phone },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, totalItems } = useCart();
  const location = useLocation();

  const close = () => setIsOpen(false);

  return (
    <>
      <header className="w-full flex justify-center items-center h-[5em] fixed top-0 bg-[#f1f1f1] z-50 border-b border-gray-200/80">
        <div className="w-[90%] h-full flex justify-between items-center">
          {/* Logo */}
          <h2 className="text-2xl font-extrabold text-black tracking-tight">
            Mordyn
          </h2>

          {/* Desktop Nav */}
          <div className="hidden lg:flex justify-center gap-x-1 items-center">
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="relative overflow-hidden text-black/70 hover:text-blue-600 px-4 py-2 font-medium text-[15px] transition-colors duration-200
                  before:content-[''] before:absolute before:bottom-0 before:left-0 before:h-[2.5px] before:w-0 hover:before:w-full before:bg-blue-500 before:rounded-full before:transition-all before:duration-300"
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex bg-blue-600 py-2 px-3 rounded-2xl shadow-lg gap-x-1 items-center">
            <button className="text-white hover:bg-black/20 rounded-xl p-2 transition-colors">
              <Search size={22} strokeWidth={2} />
            </button>
            <button className="text-white hover:bg-black/20 rounded-xl p-2 transition-colors">
              <User size={22} strokeWidth={2} />
            </button>
            <Link
              to="/cart"
              className="relative flex items-center justify-center text-white hover:bg-black/20 rounded-xl p-2 transition-colors"
            >
              {cart.length > 0 && (
                <motion.span
                  key={cart.length}
                  initial={{ scale: 1.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.22, ease: "backOut" }}
                  className="absolute -left-1 -top-1 bg-red-500 text-white rounded-full min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold px-1"
                >
                  {cart.length}
                </motion.span>
              )}
              <ShoppingCart size={22} strokeWidth={2} />
            </Link>

            {/* Hamburger — mobile only */}
            <button
              className="lg:hidden text-white hover:bg-black/20 rounded-xl p-2 transition-colors ml-1"
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
                    <X size={22} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu size={22} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              onClick={close}
            />

            {/* Drawer panel */}
            <motion.nav
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
              className="lg:hidden fixed top-0 left-0 h-full w-[75%] max-w-[320px] bg-white z-50 flex flex-col shadow-2xl"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-extrabold tracking-tight text-black">
                  Mordyn
                </h2>
                <motion.button
                  whileTap={{ scale: 0.85 }}
                  onClick={close}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X size={16} strokeWidth={2.5} className="text-gray-600" />
                </motion.button>
              </div>

              {/* Nav links */}
              <ul className="flex flex-col px-4 py-4 gap-1 flex-1">
                {navLinks.map(({ label, to, icon: Icon }, i) => {
                  const active = location.pathname === to;
                  return (
                    <motion.li
                      key={label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.055 + 0.08,
                        duration: 0.28,
                        ease: "easeOut",
                      }}
                    >
                      <Link
                        to={to}
                        onClick={close}
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-[15px] transition-colors duration-200
                          ${
                            active
                              ? "bg-blue-600 text-white"
                              : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                          }`}
                      >
                        <Icon
                          size={18}
                          strokeWidth={2}
                          className={active ? "text-white" : "text-gray-400"}
                        />
                        {label}
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

              {/* Drawer footer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="px-6 py-5 border-t border-gray-100"
              >
                <Link
                  to="/cart"
                  onClick={close}
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-3 rounded-xl text-sm"
                >
                  <ShoppingCart size={17} strokeWidth={2} />
                  View Cart
                  {cart.length > 0 && (
                    <span className="bg-white/20 text-white text-xs font-bold rounded-full px-2 py-0.5">
                      {cart.length}
                    </span>
                  )}
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
