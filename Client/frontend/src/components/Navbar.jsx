import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { CalendarCheck } from "lucide-react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  /* Prevent background scroll when mobile menu is open */
  useEffect(() => {
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 py-3 px-6 md:px-10 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center z-50">
            <img
              src="./tattoo.png"
              className="w-14 h-14 object-contain"
              alt="Tattoo Studio Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;

              return (
                <Link
                  key={index}
                  to={link.path}
                  className={`relative uppercase tracking-wide font-medium transition duration-300 group ${
                    isActive
                      ? "text-red-500"
                      : "text-white/80 hover:text-red-500"
                  }`}
                >
                  <span>{link.name}</span>

                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-red-500 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </Link>
              );
            })}

            {/* Booking Button */}
            <Link
              to="/booking"
              className="ml-4 flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full text-white font-semibold uppercase tracking-wide transition-all duration-300 shadow-lg hover:shadow-red-500/30"
            >
              <CalendarCheck size={18} />
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden z-50 text-white"
            aria-label="Toggle Menu"
          >
            {showMenu ? (
              <FaXmark className="text-3xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/98 backdrop-blur-xl z-40 transform transition-all duration-500 ease-in-out md:hidden ${
          showMenu
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col justify-center items-center min-h-screen px-8 pt-24 pb-12">
          {/* Navigation Links */}
          <div className="flex flex-col items-center space-y-6 w-full max-w-sm">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setShowMenu(false)}
                className={`text-2xl uppercase tracking-[0.2em] font-medium transition duration-300 ${
                  location.pathname === link.path
                    ? "text-red-500"
                    : "text-white/80 hover:text-red-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-white/10 my-10"></div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-5 w-full max-w-xs">
            <Link
              to="/booking"
              onClick={() => setShowMenu(false)}
              className="w-full flex justify-center items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 rounded-full text-white uppercase tracking-widest font-semibold transition-all duration-300"
            >
              <CalendarCheck size={20} />
              Book Appointment
            </Link>

            <Link
              to="/admin/login"
              onClick={() => setShowMenu(false)}
              className="text-gray-400 hover:text-white transition duration-300 text-sm uppercase tracking-[0.3em]"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
