import {
  ArrowLeft,
  Laptop,
  Luggage,
  Shirt,
  SoapDispenserDroplet,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      name: "Electronics",
      icon: <Laptop size={40} />,
      desc: "Latest gadgets, devices, and tech essentials.",
      link: "/shop?category=electronics",
      img: "/images/img1.webp",
      items: 120,
    },
    {
      name: "Accessories",
      icon: <SoapDispenserDroplet size={40} />,
      desc: "Premium accessories to complement your lifestyle.",
      link: "/shop?category=accessories",
      img: "/images/img2.webp",
      items: 80,
    },
    {
      name: "Bags",
      icon: <Luggage size={40} />,
      desc: "Stylish and durable bags for every occasion.",
      link: "/shop?category=bags",
      img: "/images/img3.webp",
      items: 65,
    },
    {
      name: "Clothes",
      icon: <Shirt size={40} />,
      desc: "Modern fashion collections for all seasons.",
      link: "/shop?category=clothes",
      img: "/images/img4.webp",
      items: 150,
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="w-full py-[12%] flex justify-center items-center bg-gradient-to-br from-blue-600 to-blue-800 mt-[5em]">
        <div className="w-[90%] flex flex-col items-center gap-y-5 text-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            Discover Categories
          </h1>
          <p className="text-white max-w-[600px] text-lg md:text-xl">
            Browse curated collections designed to match your style, needs, and
            lifestyle. Everything you want, organized perfectly.
          </p>

          <Link
            to="/"
            className="flex items-center gap-2 text-white mt-4 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </section>

      {/* FEATURED CATEGORY (BIG CARD) */}
      <section className="w-full py-[8%] flex justify-center items-center">
        <div className="w-[90%] grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.slice(0, 2).map((cat, i) => (
            <Link
              to={cat.link}
              key={i}
              className="relative h-[28em] rounded-3xl overflow-hidden group shadow-xl"
            >
              <img
                src={cat.img}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="absolute bottom-0 p-8 flex flex-col gap-2 translate-y-6 group-hover:translate-y-0 transition duration-300">
                <div className="text-white">{cat.icon}</div>
                <h2 className="text-white text-3xl font-bold">{cat.name}</h2>
                <p className="text-gray-300 max-w-[400px]">{cat.desc}</p>
                <span className="text-blue-400 text-sm">
                  {cat.items}+ items available
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORY GRID */}
      <section className="w-full py-[5%] flex justify-center items-center">
        <div className="w-[90%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <Link
              to={cat.link}
              key={i}
              className="relative h-[22em] rounded-2xl overflow-hidden group shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

              <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-6 group-hover:translate-y-0 transition-all duration-300">
                <div className="text-white mb-3">{cat.icon}</div>

                <h2 className="text-white text-2xl font-bold mb-1">
                  {cat.name}
                </h2>

                <p className="text-gray-200 text-sm mb-2">{cat.desc}</p>

                <span className="text-blue-300 text-sm">
                  {cat.items}+ items
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY SHOP BY CATEGORY */}
      <section className="w-full py-[8%] bg-white/70 flex justify-center items-center">
        <div className="w-[90%] grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Easy Navigation",
              desc: "Quickly find what you need without wasting time browsing endlessly.",
            },
            {
              title: "Curated Products",
              desc: "Each category is carefully selected to bring you the best items.",
            },
            {
              title: "Better Deals",
              desc: "Discover exclusive offers tailored to each category.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition duration-300"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="w-full py-[8%] flex justify-center items-center">
        <div className="w-[90%] bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-10 text-center flex flex-col gap-y-4 items-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold">
            Up to 50% Off Selected Categories
          </h2>
          <p className="text-white max-w-[500px]">
            Don’t miss out on our limited-time offers across multiple
            categories.
          </p>

          <Link
            to="/shop"
            className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold flex items-center gap-2 hover:scale-105 transition"
          >
            Shop Deals <ArrowRight />
          </Link>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full py-[8%] flex justify-center items-center bg-white/70">
        <div className="w-[90%] flex flex-col items-center gap-y-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Not Sure What to Pick?
          </h2>
          <p className="text-gray-600 max-w-[500px]">
            Browse all products and discover the best deals curated just for
            you.
          </p>

          <Link
            to="/shop"
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-xl hover:scale-105 transition-all duration-300"
          >
            Browse All Products
          </Link>
        </div>
      </section>
    </>
  );
};

export default Categories;
