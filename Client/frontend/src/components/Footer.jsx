import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, CalendarCheck } from "lucide-react";

const Footer = () => {
   const socialLinks = [
     { Icon: FaFacebookF, url: "https://www.facebook.com/share/1FF3fYs4B6/" },
     {
       Icon: FaInstagram,
       url: "https://www.instagram.com/up50tattoo?igsh=MWhzMDUxY3AzbWxraQ==",
     },
     { Icon: FaTwitter, url: "#" },
     { Icon: FaPinterestP, url: "https://pin.it/76XpBSA0e" },
   ];

  return (
    <footer
      id="ContactSection"
      className="bg-zinc-950 text-white pt-24 pb-10 px-6 border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/">
              <img
                src="./tattoo.png"
                className="h-16 w-auto"
                alt="Tattoo Studio Logo"
              />
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
              We transform bold visions into timeless body art. Premium tattoo
              experiences crafted with creativity, safety, and passion.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
            {socialLinks.map((item, index) => (
               <a
             key={index}
              href={item.url}
             target="_blank"
             rel="noopener noreferrer"
             className="w-11 h-11 rounded-full border border-gray-800 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all duration-300"
             >
              <item.Icon size={16} />
              </a>
            ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-wider border-b border-red-600 w-fit pb-2">
              Quick Links
            </h3>

            <ul className="space-y-4 text-gray-400 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Portfolio", path: "/portfolio" },
                { name: "Blogs", path: "/blog" },
                { name: "Contact", path: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="hover:text-red-500 transition"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-wider border-b border-red-600 w-fit pb-2">
              Our Services
            </h3>

            <ul className="space-y-4 text-gray-400 text-sm">
              {[
                "Custom Tattoo Design",
                "Cover-Up Tattoos",
                "Body Piercing",
                "Aftercare Consultation",
                "Fine Line Art",
              ].map((service, index) => (
                <li
                  key={index}
                  className="hover:text-red-500 transition cursor-pointer"
                >
                  <Link to="/services">{service}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-wider border-b border-red-600 w-fit pb-2">
              Contact Us
            </h3>

            <ul className="space-y-5 text-gray-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-red-500 mt-1" size={18} />
                <span>Azamgharh, Uttar Pradesh, India</span>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="text-red-500" size={18} />
                <span>+91 88748 81670</span>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="text-red-500" size={18} />
                <span>kannaujiyasahil13@gmail.com</span>
              </li>

              <li className="flex items-center gap-3">
                <Clock className="text-red-500" size={18} />
                <span>Mon - Sun: 10:00 AM - 8:00 PM</span>
              </li>
            </ul>

            {/* Booking Button */}
            <Link
              to="/booking"
              className="inline-flex items-center gap-3 mt-4 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full text-white font-semibold uppercase tracking-wide transition-all duration-300"
            >
              <CalendarCheck size={18} />
              Book Now
            </Link>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 pt-12 border-t border-white/5 text-center">
          <h3 className="text-3xl font-bold uppercase mb-4">
            Stay <span className="text-red-500">Inkspired</span>
          </h3>

          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Get updates on new tattoo trends, artist showcases, and exclusive
            promotions.
          </p>

          <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:flex-1 bg-black/40 border border-white/10 rounded-full px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
            />

            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 px-8 py-4 rounded-full font-bold uppercase tracking-wide transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center text-gray-500 text-xs tracking-[0.3em] uppercase">
          © 2026 UP50 Tattoo Studio. All Rights Reserved.{" "}
          <a
            href="https://shyam-sundar.com/"
            className="hover:text-red-500 transition"
          >
            Designed by Shyam
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
