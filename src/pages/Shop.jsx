import {
  ArrowLeft,
  ChevronDown,
  Star,
  StarHalf,
  ShoppingCart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../lib/product";
import { useState } from "react";

const Shop = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [priceRange, setPriceRange] = useState([0, 500]);

  const categories = [
    { name: "All Products", value: "all" },
    { name: "Electronics", value: "electronics" },
    { name: "Accessories", value: "accessories" },
    { name: "Bags", value: "bags" },
    { name: "Clothes", value: "clothes" },
  ];

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "popular") return b.rating - a.rating;
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "newest") return b.id - a.id;
    return 0;
  });

  return (
    <>
      <section className="w-full h-fit flex justify-center items-center py-[5%] bg-gradient-to-br from-blue-600 to-blue-800 mt-[5em]">
        <div className="w-[90%] flex justify-start items-center gap-y-5">
          <div className="w-full flex flex-col justify-center items-start gap-y-3">
            <Link
              to="/"
              className="text-white text-[14px] flex items-center gap-x-2 hover:gap-x-3 transition-all"
            >
              <ArrowLeft size={18} /> Back to Home
            </Link>
            <h1 className="text-5xl font-bold text-white">Our Shop</h1>
            <p className="text-white text-lg max-w-[600px]">
              Explore our entire collection of premium products. Find exactly
              what you're looking for with our advanced filters and sorting
              options.
            </p>
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center items-center py-[5%]">
        <div className="w-[90%] flex flex-col gap-y-8">
          {/* Filters and Sorting */}
          <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-y-5 lg:gap-x-5">
            {/* Category Filter */}
            <div className="w-full lg:w-fit flex flex-col gap-y-3">
              <h3 className="text-gray-800 font-bold text-[15px]">
                CATEGORIES
              </h3>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`px-6 py-2 rounded-xl font-medium transition-all transform duration-300 ${
                      selectedCategory === cat.value
                        ? "bg-blue-600 text-white shadow-lg"
                        : "bg-white border-2 border-gray-300 text-gray-800 hover:border-blue-600"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="w-full lg:w-fit relative">
  <h3 className="text-gray-800 font-bold text-[15px] mb-3">
    SORT BY
  </h3>
  <div className="relative group">
    <button
      className="w-full lg:w-[200px] px-6 py-3 rounded-xl font-medium bg-white border-2 border-gray-300 text-gray-800 hover:border-blue-600 transition-all flex items-center justify-between group-hover:shadow-lg"
    >
      <span className="text-sm">
        {sortBy === "popular" && "Most Popular"}
        {sortBy === "price-low" && "Price: Low to High"}
        {sortBy === "price-high" && "Price: High to Low"}
        {sortBy === "newest" && "Newest First"}
        {sortBy === "rating" && "Highest Rated"}
        {sortBy === "discount" && "Best Discount"}
      </span>
      <ChevronDown
        size={20}
        className="text-gray-600 group-hover:text-blue-600 transition-transform group-hover:rotate-180 duration-300"
      />
    </button>

    {/* Dropdown Menu */}
    <div className="absolute top-full left-0 w-full mt-2 bg-white border-2 border-gray-300 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
      {[
        { value: "popular", label: "Most Popular", icon: "⭐" },
        { value: "price-low", label: "Price: Low to High", icon: "💰" },
        { value: "price-high", label: "Price: High to Low", icon: "💸" },
        { value: "newest", label: "Newest First", icon: "✨" },
        { value: "rating", label: "Highest Rated", icon: "🌟" },
        { value: "discount", label: "Best Discount", icon: "🎉" },
      ].map((option) => (
        <button
          key={option.value}
          onClick={() => setSortBy(option.value)}
          className={`w-full px-6 py-3 text-left font-medium transition-all duration-200 flex items-center gap-3 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 ${
            sortBy === option.value
              ? "bg-blue-100 text-blue-600"
              : "text-gray-800 hover:text-blue-600"
          }`}
        >
          <span className="text-lg">{option.icon}</span>
          <span className="flex-1">{option.label}</span>
          {sortBy === option.value && (
            <span className="text-blue-600 font-bold">✓</span>
          )}
        </button>
      ))}
    </div>
  </div>
</div>
          </div>

          {/* Price Range Filter */}
          <div className="w-full bg-white/70 p-6 rounded-2xl">
            <h3 className="text-gray-800 font-bold text-[15px] mb-4">
              PRICE RANGE
            </h3>
            <div className="flex flex-col gap-y-4">
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], parseInt(e.target.value)])
                }
                className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between items-center">
                <span className="text-gray-800 font-semibold">
                  $0 - ${priceRange[1]}
                </span>
                <button
                  onClick={() => setPriceRange([0, 500])}
                  className="text-blue-600 text-sm font-medium hover:text-blue-800"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full">
            <h3 className="text-gray-800 font-bold text-xl mb-6">
              Showing {sortedProducts.length} products
            </h3>
            <div className="w-full gap-6 h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {sortedProducts.map((product, i) => (
                <div
                  key={i}
                  className="flex flex-col h-[21em] md:h-[21em] shadow-xl border-2 border-gray-300 bg-white overflow-hidden gap-y-4 rounded-2xl group hover:-translate-y-3 transition-all duration-300"
                >
                  <div className="w-full h-[53%] relative overflow-hidden bg-gray-200">
                    <img
                      src={product.img}
                      className="w-full h-full grayscale-100 group-hover:grayscale-0 transition ease-in-out duration-200 object-cover"
                      alt={product.name}
                    />
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                      {Math.round(Math.random() * 40 + 10)}% OFF
                    </div>
                  </div>

                  <div className="flex justify-between items-start px-4 py-2 flex-1">
                    <span className="flex flex-col gap-y-2">
                      <span className="flex">
                        <Star fill="orange" size={18} strokeWidth={0} />
                        <Star fill="orange" size={18} strokeWidth={0} />
                        <Star fill="orange" size={18} strokeWidth={0} />
                        <Star fill="orange" size={18} strokeWidth={0} />
                        <StarHalf fill="orange" size={18} strokeWidth={0} />
                      </span>
                      <h2 className="text-[15px] text-black font-semibold max-w-[150px]">
                        {product.name}
                      </h2>
                      <p className="text-gray-600 text-xs">
                        {product.category}
                      </p>
                    </span>
                    <h2 className="text-xl font-bold text-gray-700 group-hover:text-blue-600">
                      ${product.price}
                    </h2>
                  </div>

                  <span
                    className="text-3xl font-medium flex justify-center items-center text-white py-[6px] px-[15px] cursor-pointer transition duration-300 relative w-full h-[2em]"
                    onClick={() => addToCart(product)}
                  >
                    <h2 className="absolute h-full bg-[#404040] group-hover:bg-[#ff2a00] transition ease-in-out duration-300 flex justify-center items-center w-full bottom-0">
                      +
                    </h2>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* No Products Found */}
          {sortedProducts.length === 0 && (
            <div className="w-full flex justify-center items-center py-20">
              <div className="text-center flex flex-col gap-y-4">
                <ShoppingCart size={64} className="text-gray-400 mx-auto" />
                <h3 className="text-2xl font-bold text-gray-800">
                  No products found
                </h3>
                <p className="text-gray-600 max-w-[400px]">
                  Try adjusting your filters or categories to find what you're
                  looking for.
                </p>
                <Link
                  to="/"
                  className="text-blue-600 font-semibold hover:text-blue-800 mt-4"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Shop;
