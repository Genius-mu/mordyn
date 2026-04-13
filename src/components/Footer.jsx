import { Copyright, Earth, Mail, Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  let date = new Date();
  const yr = date.getFullYear();
  return (
    <>
      <footer className="py-[10%] md:py-[3%] flex justify-center items-center bg-white w-full">
        <div className="w-[90%] gap-y-10 flex flex-col lg:justify-between lg:flex-row">
          <div>
            <h2 className="text-2xl text-black font-bold">Mordyn</h2>
            <p className="text-gray-600 uppercase tracking-[3px] text-[13px] gap-x-1 flex items-center">
              <Copyright size={10} /> {yr} Mordyn. All rights reserved
            </p>
          </div>
          <nav className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-4">
            <Link
              to=""
              className="text-gray-600 uppercase hover:text-blue-600 transition duration-300 text-[13px] tracking-[2px] font-medium"
            >
              Privacy Policy
            </Link>
            <Link
              to=""
              className="text-gray-600 uppercase hover:text-blue-600 transition duration-300 text-[13px] tracking-[2px] font-medium"
            >
              Terms Of Service
            </Link>
            <Link
              to=""
              className="text-gray-600 uppercase hover:text-blue-600 transition duration-300 text-[13px] tracking-[2px] font-medium"
            >
              Shipping
            </Link>
            <Link
              to=""
              className="text-gray-600 uppercase hover:text-blue-600 transition duration-300 text-[13px] tracking-[2px] font-medium"
            >
              Returns
            </Link>
          </nav>
          <div className="flex items-center gap-x-5">
            <Earth
              className="text-gray-500 hover:text-blue-600 transition duration-300"
              strokeWidth={2}
            />
            <Mail
              className="text-gray-500 hover:text-blue-600 transition duration-300"
              strokeWidth={2}
            />
            <Phone
              className="text-gray-500 hover:text-blue-600 transition duration-300"
              strokeWidth={2}
              size={19}
            />
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
