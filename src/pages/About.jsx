import {
  ArrowLeft,
  Users,
  Target,
  ShieldCheck,
  Truck,
  Star,
  ArrowRight,
  Eye,
  Heart,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const About = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    {
      question: "How long does delivery take?",
      answer:
        "Delivery usually takes between 3–7 business days depending on your location.",
    },
    {
      question: "Do you offer refunds?",
      answer: "Yes, we offer a 7-day refund policy.",
    },
    {
      question: "Are your products high quality?",
      answer: "Every product is carefully selected and tested.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship worldwide.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="w-full py-[12%] flex justify-center items-center bg-gradient-to-br from-blue-600 to-blue-800 mt-[5em]">
        <div className="w-[90%] flex flex-col items-center text-center gap-y-5">
          <h1 className="text-white text-4xl md:text-6xl font-bold">
            About Our Store
          </h1>
          <p className="text-white max-w-[600px] text-lg md:text-xl">
            We’re not just selling products. We’re building experiences,
            delivering quality, and redefining how online shopping should feel.
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

      {/* STORY */}
      <section className="w-full py-[8%] flex justify-center items-center">
        <div className="w-[90%] grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <img
            src="/images/img6.webp"
            className="rounded-3xl shadow-2xl w-full h-[400px] object-cover"
          />

          <div className="flex flex-col gap-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Our Story
            </h2>
            <p className="text-gray-600">
              It started with a simple idea — make online shopping better.
              Cleaner design, better products, and a smoother experience.
            </p>
            <p className="text-gray-600">
              What began as a small project quickly grew into something bigger.
              Today, we serve customers worldwide with carefully curated
              collections.
            </p>
            <p className="text-gray-600">
              Every product you see here is selected with intention — quality,
              usability, and style always come first.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="w-full py-[8%] bg-white/70 flex justify-center">
        <div className="w-[90%] grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-8 bg-white rounded-2xl shadow-lg">
            <Target className="text-blue-600 mb-3" />
            <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To provide high-quality, affordable, and stylish products while
              delivering a seamless and enjoyable shopping experience.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-lg">
            <Eye className="text-blue-600 mb-3" />
            <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become a globally trusted online store known for innovation,
              reliability, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="w-full py-[8%] flex justify-center">
        <div className="w-[90%] grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Heart />,
              title: "Customer First",
              desc: "We prioritize our customers above everything.",
            },
            {
              icon: <ShieldCheck />,
              title: "Integrity",
              desc: "Transparency and honesty in all we do.",
            },
            {
              icon: <Globe />,
              title: "Global Reach",
              desc: "Serving customers all over the world.",
            },
          ].map((v, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl shadow-lg">
              <span className="text-blue-600">{v.icon}</span>
              <h3 className="font-bold text-lg mt-2">{v.title}</h3>
              <p className="text-gray-600 text-sm">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="w-full py-[8%] bg-white/70 flex justify-center">
        <div className="w-[90%] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { number: "10K+", label: "Customers" },
            { number: "500+", label: "Products" },
            { number: "4.9★", label: "Rating" },
            { number: "24/7", label: "Support" },
          ].map((stat, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl shadow-lg">
              <h2 className="text-3xl font-bold text-blue-600">
                {stat.number}
              </h2>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="w-full py-[8%] flex justify-center">
        <div className="w-[90%] grid md:grid-cols-3 gap-6">
          {["Browse", "Select", "Delivered"].map((step, i) => (
            <div
              key={i}
              className="p-6 bg-white rounded-2xl shadow-lg text-center"
            >
              <h3 className="text-blue-600 font-bold text-xl">Step {i + 1}</h3>
              <p className="text-gray-600">{step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="w-full py-[8%] flex justify-center">
        <div className="w-[90%] grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              <img
                src={`/images/img${i + 1}.webp`}
                className="h-[250px] w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="font-bold">Team Member {i + 1}</h3>
                <p className="text-gray-500 text-sm">Specialist</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full py-[8%] bg-white/70 flex justify-center">
        <div className="w-[90%] grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm">
                Amazing experience. Fast delivery and great quality products.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ (FUNCTIONAL) */}
      <section className="w-full py-[8%] flex justify-center">
        <div className="w-[90%] max-w-[700px] flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-center">FAQs</h2>

          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                className="w-full flex justify-between items-center p-4 font-semibold text-left"
              >
                {faq.question}
                <ChevronDown
                  className={`transition-transform ${
                    activeFAQ === i ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-4 transition-all duration-300 ${
                  activeFAQ === i ? "max-h-40 pb-4" : "max-h-0 overflow-hidden"
                }`}
              >
                <p className="text-gray-600 text-sm">{faq.answer}</p>
              </div>
            </div>
          ))}

          {/* LINK TO FULL FAQ PAGE */}
          <Link
            to="/faq"
            className="text-blue-600 text-center font-semibold mt-4 hover:underline"
          >
            View All FAQs →
          </Link>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="w-full py-[8%] flex justify-center">
        <div className="w-[90%] text-center flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Stay Updated</h2>
          <input
            className="border p-3 rounded-xl w-full md:w-[400px] mx-auto"
            placeholder="Email"
          />
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl w-fit mx-auto">
            Subscribe
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-[10%] flex justify-center">
        <div className="w-[90%] bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-10 text-center">
          <h2 className="text-white text-3xl font-bold">Ready to Explore?</h2>
          <Link
            to="/shop"
            className="mt-4 inline-flex bg-white text-blue-600 px-6 py-3 rounded-xl"
          >
            Shop Now <ArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
