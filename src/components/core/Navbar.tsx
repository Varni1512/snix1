import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ currentPage, onNavigate }) => {
  const ref = useRef(null);
  const { scrollY } = useScroll({ target: ref });
  const [visible, setVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  const navItems = [
    { name: "Home", link: "home", to: "/" },
    { name: "Use Cases", link: "ai-shoot", to: "/ai-shoot" },
    { name: "Pricing", link: "product", to: "/product" },
    { name: "Blog", link: "blog", to: "/blog" },
    { name: "Contact Us", link: "contact", to: "/contactUs" },
  ];

  const handleClick = (nav) => {
    onNavigate?.(nav.link); // optional chaining
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative w-full">
      <motion.div ref={ref} className="fixed inset-x-0 top-0 z-50 w-full">
        {/* Desktop Navigation */}
        <motion.div
          animate={{
            backdropFilter: visible ? "blur(10px)" : "none",
            boxShadow: visible
              ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
              : "none",
            width: visible ? "50%" : "100%",
            y: visible ? 20 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 50,
          }}
          style={{ minWidth: "800px" }}
          className={`relative z-60 mx-auto hidden max-w-7xl items-center justify-between rounded-full px-6 py-3 lg:flex ${visible ? "bg-white/95 shadow-lg" : "bg-transparent"
            }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <img
              src={visible ? "/logo.png" : "/logo1.png"}
              alt="Logo"
              className={`object-contain transition-all duration-300 ${visible ? "h-16 w-16" : "h-16 w-38"
                }`}
            />
          </Link>

          {/* Navigation Items */}
          <motion.div
            onMouseLeave={() => setHovered(null)}
            className="flex items-center justify-center space-x-2"
          >
            {navItems.map((item, idx) => (
              <Link
                key={`link-${idx}`}
                to={item.to}
                onClick={() => handleClick(item)}
                onMouseEnter={() => setHovered(idx)}
                className={`relative px-4 py-2 transition-colors ${currentPage === item.link
                  ? "text-purple-600 font-semibold"
                  : "text-gray-600 hover:text-gray-900"
                  }`}
              >
                {hovered === idx && (
                  <motion.div
                    layoutId="hovered"
                    className="absolute inset-0 h-full w-full rounded-full bg-gray-100"
                  />
                )}
                {currentPage === item.link && (
                  <motion.div
                    layoutId="active"
                    className="absolute inset-0 h-full w-full rounded-full bg-purple-50 border border-purple-200"
                  />
                )}
                <span className="relative z-20 font-medium">{item.name}</span>
              </Link>
            ))}
          </motion.div>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <a href="/contactUs">
              <button className="rounded-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-2 text-sm font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
                Book a Demo
              </button>
            </a>
          </div>
        </motion.div>

        {/* Mobile Navigation */}
        <motion.div
          animate={{
            backdropFilter: visible ? "blur(10px)" : "none",
            boxShadow: visible
              ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
              : "none",
            width: visible ? "95%" : "100%",
            paddingRight: visible ? "12px" : "0px",
            paddingLeft: visible ? "12px" : "0px",
            borderRadius: visible ? "16px" : "0px",
            y: visible ? 10 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 50,
          }}
          className={`relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-4 py-3 lg:hidden ${visible ? "bg-white/95 shadow-lg" : "bg-transparent"
            }`}
        >
          {/* Mobile Header */}
          <div className="flex w-full items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => onNavigate?.("home")}
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="h-12 w-12 object-contain"
              />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 w-full overflow-hidden rounded-lg bg-white/98 p-4 shadow-xl border border-gray-100"
              >
                <div className="flex flex-col space-y-4">
                  {navItems.map((item, idx) => (
                    <Link
                      key={`mobile-link-${idx}`}
                      to={item.to}
                      onClick={() => handleClick(item)}
                      className={`block py-2 px-3 rounded-lg transition-colors ${currentPage === item.link
                        ? "text-purple-600 font-semibold bg-purple-50"
                        : "text-gray-600 hover:text-gray-900"
                        }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="mt-4 flex flex-col gap-3">
                    <button
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 py-2 font-medium text-white shadow-lg transition-all hover:scale-105"
                    >
                      Get Started
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Navbar;
