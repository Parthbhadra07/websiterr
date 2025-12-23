import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialYoutube,
} from "react-icons/ti";
import { AiFillInstagram } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
  ];

  return (
    <footer className="w-full px-6 md:px-16 py-8 border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* RR Designs in Samarkan Font */}
        <div className="text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-samarkan">
            rr<span className="text-primary">designs</span>
          </h2>
        </div>

        {/* Social Media Icons - Top Right Corner */}
        <div className="flex items-center gap-3">
          {socialIcons.map(({ name, icon, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-primary text-xl transition-colors duration-300"
              aria-label={name}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-7xl mx-auto mt-6 pt-6 border-t border-white/10 text-center">
        <p className="text-white/60 text-sm">
          © {currentYear} rrdesigns. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
