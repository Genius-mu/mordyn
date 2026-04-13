import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Info, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = () => {
  const { cart, increment, decrement, totalItems } = useCart();
  const [selectedInfo, setSelectedInfo] = useState(null);

  const handleInfoClick = (item) => {
    setSelectedInfo(item);
  };

  return (
    <>
      <AnimatePresence>
        {selectedInfo && (
          <InfoPop
            info={selectedInfo.description}
            title={selectedInfo.name}
            onClose={() => setSelectedInfo(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {cart.length > 0 ? (
          <motion.section
            key="cart"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-full px-6 py-8"
          >
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center gap-3 mb-8"
            >
              <ShoppingBag className="w-7 h-7 text-blue-600" />
              <h1 className="text-3xl font-extrabold tracking-tight">
                Your Cart
              </h1>
              <span className="ml-auto text-sm text-gray-500 font-medium">
                {cart.length} item{cart.length !== 1 ? "s" : ""}
              </span>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <AnimatePresence initial={false}>
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 24 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.85,
                      y: -16,
                      transition: { duration: 0.25, ease: "easeIn" },
                    }}
                    transition={{
                      duration: 0.35,
                      delay: index * 0.06,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col group"
                  >
                    {/* Image area */}
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-40 object-cover"
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />

                      {/* Info button */}
                      <button
                        onClick={() => handleInfoClick(item)}
                        className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Info className="w-4 h-4" strokeWidth={2} />
                      </button>

                      {/* Quantity badge */}
                      <AnimatePresence>
                        {item.quantity > 1 && (
                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 0.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "backOut" }}
                            className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            {item.quantity}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Card body */}
                    <div className="p-3 flex flex-col gap-3 flex-1">
                      <div>
                        <h2 className="text-sm font-semibold text-gray-800 line-clamp-1">
                          {item.name}
                        </h2>
                        <motion.p
                          key={item.price * item.quantity}
                          initial={{ opacity: 0.5, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-blue-600 font-extrabold text-lg mt-0.5"
                        >
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </motion.p>
                        {item.quantity > 1 && (
                          <p className="text-xs text-gray-400 font-medium">
                            ₦{item.price.toLocaleString()} each
                          </p>
                        )}
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2 py-1">
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            whileHover={{
                              backgroundColor: "#3b82f6",
                              color: "#fff",
                            }}
                            transition={{ duration: 0.12 }}
                            className="w-6 h-6 flex items-center justify-center rounded-lg bg-white shadow-sm text-gray-700 font-bold text-base"
                            onClick={() => decrement(item.id)}
                          >
                            −
                          </motion.button>

                          <motion.span
                            key={item.quantity}
                            initial={{ scale: 1.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.18, ease: "backOut" }}
                            className="text-sm font-bold w-5 text-center"
                          >
                            {item.quantity}
                          </motion.span>

                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            whileHover={{
                              backgroundColor: "#3b82f6",
                              color: "#fff",
                            }}
                            transition={{ duration: 0.12 }}
                            className="w-6 h-6 flex items-center justify-center rounded-lg bg-white shadow-sm text-gray-700 font-bold text-base"
                            onClick={() => increment(item.id)}
                          >
                            +
                          </motion.button>
                        </div>

                        {/* Remove all */}
                        <motion.button
                          whileHover={{ scale: 1.15 }}
                          whileTap={{ scale: 0.85 }}
                          transition={{ duration: 0.15 }}
                          className="text-gray-300 hover:text-red-500 transition-colors duration-200"
                          onClick={() => {
                            for (let i = 0; i < item.quantity; i++)
                              decrement(item.id);
                          }}
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={2} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Footer bar */}
            <motion.div
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: cart.length * 0.06 + 0.15,
                duration: 0.4,
                ease: "easeOut",
              }}
              className="mt-8 flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm"
            >
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Order Total
                </span>
                <motion.span
                  key={totalItems}
                  initial={{ scale: 1.06 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.22, ease: "backOut" }}
                  className="text-2xl font-extrabold text-gray-900"
                >
                  ₦{Number(totalItems).toLocaleString()}
                </motion.span>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="ml-auto"
              >
                <Link
                  to=""
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors duration-300 text-white font-semibold px-6 py-3 rounded-xl text-sm"
                >
                  Continue to Checkout →
                </Link>
              </motion.div>
            </motion.div>
          </motion.section>
        ) : (
          <motion.section
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="h-[60vh] flex justify-center items-center flex-col gap-3"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.4, ease: "backOut" }}
            >
              <ShoppingBag className="w-16 h-16 text-gray-200" />
            </motion.div>
            <motion.h2
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="text-4xl font-extrabold text-gray-800"
            >
              Your cart is empty
            </motion.h2>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="text-gray-400 text-base"
            >
              Add some items to get started ( •̀ .̫ •́ )
            </motion.p>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartPage;

const InfoPop = ({ info, onClose, title }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-black/40 h-full w-full fixed inset-0 flex justify-center items-center z-50"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 16 }}
        transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        className="bg-[rgba(10,10,10,0.95)] shadow-[inset_0_0_20px_#555] backdrop-blur-3xl w-[30em] h-fit rounded-2xl p-6 relative"
      >
        <motion.button
          whileHover={{ scale: 1.2, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute top-4 right-5 text-red-500 hover:text-red-400 font-bold cursor-pointer text-lg"
        >
          ✕
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.28 }}
          className="flex flex-col gap-2"
        >
          <h2 className="font-bold text-white text-lg">{title}</h2>
          <div className="w-8 h-0.5 bg-blue-500 rounded-full" />
          <p className="text-sm text-white/90 font-light leading-relaxed mt-1">
            {info}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
