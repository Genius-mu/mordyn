import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form); // Replace with API call
    alert("Message sent!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      {/* HERO */}
      <section className="w-full py-[12%] flex justify-center items-center bg-gradient-to-br from-blue-600 to-blue-800 mt-[5em]">
        <div className="w-[90%] text-center flex flex-col gap-y-5">
          <h1 className="text-white text-5xl md:text-6xl font-bold">
            Contact Us
          </h1>
          <p className="text-white max-w-[600px] mx-auto text-lg">
            Have questions, feedback, or need help? We're here for you.
          </p>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-white mt-4 hover:underline"
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>
        </div>
      </section>

      {/* CONTACT OPTIONS */}
      <section className="w-full py-[8%] flex justify-center">
        <div className="w-[90%] grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Mail />,
              title: "Email Us",
              desc: "support@yourstore.com",
            },
            {
              icon: <Phone />,
              title: "Call Us",
              desc: "+234 800 000 0000",
            },
            {
              icon: <MapPin />,
              title: "Location",
              desc: "Lagos, Nigeria",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition"
            >
              <span className="text-blue-600 flex justify-center mb-2">
                {item.icon}
              </span>
              <h3 className="font-bold text-lg">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="w-full py-[8%] bg-white/70 flex justify-center">
        <div className="w-[90%] grid lg:grid-cols-2 gap-10">
          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg flex flex-col gap-4"
          >
            <h2 className="text-2xl font-bold">Send a Message</h2>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="p-3 border rounded-xl outline-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="p-3 border rounded-xl outline-blue-500"
              required
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="5"
              className="p-3 border rounded-xl outline-blue-500"
              required
            />

            <button className="bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2 hover:scale-105 transition">
              <Send size={16} />
              Send Message
            </button>
          </form>

          {/* INFO SIDE */}
          <div className="flex flex-col gap-6 justify-center">
            <h2 className="text-3xl font-bold text-gray-800">
              We’d love to hear from you
            </h2>
            <p className="text-gray-600">
              Whether you have a question about products, pricing, or anything
              else, our team is ready to answer all your questions.
            </p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <MessageSquare className="text-blue-600" />
                <span className="text-gray-700">
                  Quick response within 24 hours
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="text-blue-600" />
                <span className="text-gray-700">support@yourstore.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-blue-600" />
                <span className="text-gray-700">+234 800 000 0000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section className="w-full py-[8%] flex justify-center">
        <div className="w-[90%] h-[300px] bg-gray-300 rounded-2xl flex items-center justify-center text-gray-600">
          Map Placeholder
        </div>
      </section>

      {/* FAQ SHORTCUT */}
      <section className="w-full py-[8%] bg-white/70 flex justify-center">
        <div className="w-[90%] text-center flex flex-col gap-4">
          <h2 className="text-3xl font-bold">Got Questions?</h2>
          <p className="text-gray-600">
            Check out our FAQ page for quick answers.
          </p>

          <Link
            to="/faq"
            className="text-blue-600 font-semibold hover:underline"
          >
            Go to FAQ →
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-[10%] flex justify-center">
        <div className="w-[90%] bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-10 text-center">
          <h2 className="text-white text-3xl font-bold">Ready to Shop?</h2>

          <Link
            to="/shop"
            className="mt-4 inline-block bg-white text-blue-600 px-6 py-3 rounded-xl"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </>
  );
};

export default Contact;
