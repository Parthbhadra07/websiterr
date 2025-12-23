import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
} from "react-icons/ti";
import { AiFillInstagram } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsThreads } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { IoCall } from "react-icons/io5";
import rrDesignsLogo from "../assets/logos/logo.jpg";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Projects", path: "/projects" },
    { name: "Services", path: "/services" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact Us", path: "/contact" },
  ];

  const socialIcons = [
    {
      name: "WhatsApp",
      icon: <IoLogoWhatsapp />,
      href: "https://wa.me/your-number",
    },
    {
      name: "Facebook",
      icon: <TiSocialFacebook />,
      href: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: <AiFillInstagram />,
      href: "https://instagram.com",
    },
    {
      name: "LinkedIn",
      icon: <TiSocialLinkedin />,
      href: "https://linkedin.com",
    },
    {
      name: "YouTube",
      icon: <TiSocialYoutube />,
      href: "https://youtube.com",
    },
    {
      name: "Twitter (X)",
      icon: <RiTwitterXFill />,
      href: "https://x.com",
    },
    {
      name: "Threads",
      icon: <BsThreads />,
      href: "https://threads.com",
    },
    {
      name: "Call",
      icon: <IoCall />,
      href: "https://threads.com",
    },
    {
      name: "Telegram",
      icon: <FaTelegramPlane />,
      href: "https://telegram.com",
    },
  ];

  return (
    <header className="flex w-full justify-center md:justify-between items-center px-4 sm:px-6 md:px-8 py-4 text-white transition-all duration-300">
      <div className="absolute left-0 z-50 md:hidden flex items-center gap-4 ml-4 sm:ml-6">
        {/* Menu Icon */}
        <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
          <span
            className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"
              }`}
          >
            {isOpen ? "close" : "drag_handle"}
          </span>
        </button>
      </div>


      {/* Logo */}
      {/* Logo */}
<div className="flex items-center gap-2 sm:gap-3">
  <img
    src={rrDesignsLogo}
    alt="RR Designs logo"
    className="w-12 sm:w-14 md:w-16"
  />
  <h2 className="text-xl sm:text-4xl font-samarkan leading-none">
    rr<span className="text-primary">designs</span>
  </h2>
</div>


      {/* Nav Links */}
      <nav className="hidden md:flex gap-6 lg:gap-8 xl:gap-10 text-sm text-gray-300">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="text-sm hover:opacity-80 hover:scale-110 transitiona-all duration-300"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Right Side: Theme toggle + menu icon */}
      <div className="flex items-center gap-4 hidden md:block">
        {/* Menu Icon */}
        <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
          <span
            className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"
              }`}
          >
            {isOpen ? "close" : "drag_handle"}
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileInView={{ opacity: 1, x: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black text-white px-4 sm:px-6 py-4 flex flex-col gap-4 md:hidden z-50 overflow-y-auto">
          <div className="absolute left-0 md:hidden flex items-center gap-4 ml-4 sm:ml-6">
            {/* Menu Icon */}
            <button className="text-2xl" onClick={() => setIsOpen(!isOpen)}>
              <span
                className={`material-symbols-outlined transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"
                  }`}
              >
                {isOpen ? "close" : "drag_handle"}
              </span>
            </button>
          </div>
          <div className="flex justify-center items-center mb-4 gap-4 mt-6">
            <button className="flex justify-center items-center bg-black border w-16 h-16 border-2 rounded-3xl shadow-lg hover:opacity-80 transition">
              <span className="material-symbols-outlined">language</span>
            </button>
            <button className="flex justify-center items-center bg-black border w-16 h-16 border-2 rounded-3xl shadow-lg hover:opacity-80 transition">
              <span className="material-symbols-outlined">location_on</span>
            </button>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-sm border-b border-gray-500 pb-2"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* social media icons */}
          <div className="absolute right-0 bottom-10 w-full justify-center grid grid-cols-4 sm:grid-cols-5 px-4 sm:px-6 gap-4 sm:gap-6 text-lg sm:text-xl text-white mt-8 justify-items-center">
            {socialIcons.map(({ name, icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 p-2 rounded-xl border-white hover:opacity-80 transition-opacity flex justify-center items-center"
              >
                {icon}
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Desktop Menu */}
      {isOpen && (
        <div
          className="fixed hidden md:flex flex-col justify-center items-center
             top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
             w-auto h-auto 
             bg-black/20
             backdrop-blur-xl 
             border border-white/20
             rounded-3xl shadow-2xl
             transition-all duration-500 p-8 z-50 overflow-hidden select-none"
          onClick={() => setIsOpen(false)}
        >
          <div className="absolute top-0 left-0 bg-gray-900/10 w-full flex py-2 pl-6 gap-2">
            <span className="w-2 h-2 cursor-pointer rounded-full bg-danger" onClick={() => setIsOpen(false)}></span>
            <span className="w-2 h-2 cursor-pointer rounded-full bg-secondary" onClick={() => setIsOpen(false)}></span>
            <span className="w-2 h-2 cursor-pointer rounded-full bg-success" onClick={() => setIsOpen(false)}></span>
          </div>
          <div className="grid grid-cols-4 gap-12 text-xl text-white justify-items-center mt-2">
            <button className="flex justify-center items-center border-2 border-white w-16 h-16 rounded-3xl shadow-xl hover:scale-125 transition-all duration-500 bg-black/50 hover:rotate-[360deg]">
              <span className="material-symbols-outlined">language</span>
            </button>
            <button className="flex justify-center items-center border-2 border-white w-16 h-16 rounded-3xl shadow-xl hover:scale-125 transition-all duration-500 bg-black/50 hover:rotate-[360deg]">
              <span className="material-symbols-outlined">location_on</span>
            </button>

            {socialIcons.map(({ name, icon, href }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center border-2 border-white w-16 h-16 rounded-3xl shadow-xl hover:scale-125 transition-all duration-500 bg-black/50 hover:rotate-[360deg]"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
