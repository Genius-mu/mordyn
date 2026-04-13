import {
  ArrowRight,
  Laptop,
  Luggage,
  Shirt,
  ShoppingCart,
  SoapDispenserDroplet,
  Star,
  StarHalf,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { products } from "../lib/product";

const Home = () => {
  const { addToCart } = useCart();
  const firstFourProducts = products.slice(0, 4);

  return (
    <>
      {/* <section className="py-[15%] flex justify-center items-center lg:py-[1%] bg-gradient-to-br from-blue-600 to-blue-800 mt-[5em]"> */}
      <section className="py-[15%] flex justify-center items-center lg:py-[1%] bg-[url(/images/img2.webp)] bg-[rgba(0,0,0,.5)] bg-blend-darken mt-[5em] bg-center rounded-br-[20%] bg-cover">
        <div className="w-[90%] flex justify-center items-center flex-col lg:flex-row gap-y-5">
          <div className="w-full flex flex-col justify-center items-center lg:items-start gap-y-2">
            <span className="text-white text-[14px] uppercase rounded-4xl px-10 border border-gray-100/40 shadow-2xl py-2 bg-[rgba(0,0,0,.1)] backdrop-blur-xl">
              premium collection
            </span>
            <h2 className="text-4xl font-bold text-white">
              Welcome to Our Store
            </h2>
            <p className="text-white text-xl text-center lg:text-left max-w-[500px]">
              Discover premium products at unbeatable prices. Free shipping on
              over $50.
            </p>
            <Link
              to=""
              className="text-blue-700 bg-white py-3 px-10 font-medium text-[16px] rounded-xl shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white"
            >
              Explore Now
            </Link>
          </div>
          <div className="w-full flex justify-center items-center h-full lg:h-[30em]">
            <img
              src="/images/img1.webp"
              className="w-[25em] h-full lg:h-[25em] rounded-[50%] flex justify-center items-center object-center opacity-90 shadow-2xl"
              alt=""
            />
          </div>
        </div>
      </section>
      <section className="py-[10%] w-full flex justify-center items-center">
        <div className="w-[90%] flex flex-col justify-center items-center gap-y-10">
          <div className="w-full flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Top Categories</h3>
            <Link
              to=""
              className="text-[16px] font-medium text-blue-600 flex justify-center items-center gap-x-2"
            >
              View all <ArrowRight />
            </Link>
          </div>
          <div className="w-full h-fit grid grid-cols-2 gap-4 lg:grid-cols-4">
            {[
              {
                CatName: "Electronics",
                icon: <Laptop className="w-8 h-8" />,
                CatLink: "electronics",
              },
              {
                CatName: "Accessories",
                icon: <SoapDispenserDroplet className="w-8 h-8" />,
                CatLink: "electronics",
              },
              {
                CatName: "Bags",
                icon: <Luggage className="w-8 h-8" />,
                CatLink: "electronics",
              },
              {
                CatName: "Clothes",
                icon: <Shirt className="w-8 h-8" />,
                CatLink: "electronics",
              },
            ].map((item, i) => (
              <>
                <Link
                  className="h-[10em] hover:scale-105 transform transition duration-300 flex flex-col justify-center items-center rounded-2xl shadow-xl bg-white"
                  key={i}
                  to={item.CatLink}
                >
                  <div className="w-full h-full flex justify-center items-center flex-col gap-1">
                    <p className="text-blue-600">{item.icon}</p>
                    <h2 className="text-black font-medium text-xl">
                      {item.CatName}
                    </h2>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full h-full flex justify-center items-center py-[10%] bg-white/70">
        <div className="w-[90%] h-full flex justify-center flex-col gap-y-5">
          <div className="flex justify-between w-full h-fit">
            <span className="flex flex-col gap-y-2">
              <h3 className="text-blue-600 uppercase text-xs font-bold tracking-[4px]">
                featured arrivals
              </h3>
              <h2 className="text-black font-bold text-4xl">
                Selected for You
              </h2>
            </span>
            <span>
              <Link
                to="/shop"
                className="text-blue-600 uppercase font-bold text-[13px] border-b-2"
              >
                Browse All Shop
              </Link>
            </span>
          </div>

          <div className="w-full gap-3 h-fit grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {firstFourProducts.map((SelectedCart, i) => (
              <>
                <div className="w-full max-w-sm">
                  <div className="relative h-96 rounded-2xl overflow-hidden group bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                    {/* Full-size Image */}
                    <img
                      src={SelectedCart.img}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      alt={SelectedCart.name}
                    />

                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content Overlay - Appears on Hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 translate-y-6 group-hover:translate-y-0 transition-transform duration-300 pb-10">
                      <h3 className="text-white text-xl text-shadow-[.5px_.6px_#444] font-bold mb-2 line-clamp-2">
                        {SelectedCart.name}
                      </h3>

                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${
                                i < Math.floor(SelectedCart.rating)
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-gray-400"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-white text-sm font-medium">
                          {SelectedCart.rating}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-white text-2xl font-bold">
                          ${SelectedCart.price}
                        </span>
                        <button
                          onClick={() => addToCart(SelectedCart)}
                          className="px-4 py-2 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 active:scale-95 transition-all duration-200 flex items-center gap-2"
                        >
                          <ShoppingCart size={16} />
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      -28%
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>
      <section className="flex justify-center items-center w-full py-[8%]">
        <div className="flex justify-center items-center flex-col gap-y-3">
          <h2 className="text-black font-bold text-4xl text-center">
            Join the Atelier
          </h2>
          <p className="text-gray-600 max-w-[600px] text-center">g
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut
            corporis, inventore consequatur nesciunt nulla, explicabo non.
          </p>
          <div className="flex w-full justify-center items-center flex-col md:flex-row gap-3">
            <input
              type="email"
              placeholder="Email Address"
              className="text-black bg-white px-5 py-4 w-[80%] shadow-xl rounded-xl outline-0"
            />
            <button className="text-white bg-blue-600 px-5 py-4 md:w-[30%] w-[80%] font-medium text-[17px] shadow-xl rounded-xl hover:scale-105 transform transition duration-300 cursor-pointer">
              subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
