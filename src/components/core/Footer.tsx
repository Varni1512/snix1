import { useState, useRef, useEffect } from 'react';
import {
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Heart,
  ArrowUpRight,
} from "lucide-react";

const FooterSection = () => {
  const containerRef = useRef(null);
  // const [email, setEmail] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const footerLinks = {
    solutions: [
      { name: "AI Catalogue Images", },
      { name: "AI Editorial Images", },
      { name: "AI Short Videos", },
      { name: "AI Product Photography", },
    ],
    quickLinks: [
      { name: "Home", href: "/" },
      { name: "Use Cases", href: "/ai-shoot" },
      { name: "Pricing", href: "/product" },
      { name: "Blog", href: "/blog" },
      { name: "Contact Us", href: "/contactUs" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/snix.ai?igsh=MXE1M3EzMnE1bWs5aQ%3D%3D&utm_source=qr", label: "Instagram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/snix-ai-22498b360?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", label: "LinkedIn" },
  ];

  const images = [
    "/Images/2.jpg",
    "/Images/8.png",
    "/Images/3.jpg",
    "/Images/4.jpg",
    "/Images/5.png",
    "/Images/9.png",
    "/Images/11.png",
    "/Images/12.png",
    "/Images/13.jpeg",
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsAnimating(false);
      }, 300); // Half of the transition duration

    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    if (index !== currentIndex) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsAnimating(false);
      }, 300);
    }
  };
  return (
    <footer
      ref={containerRef}
      className="relative bg-white border-t border-gray-100"
    >
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-50/30"></div>

      {/* Subtle Floating Dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-200 rounded-full animate-bounce"
            style={{
              left: `${25 + i * 20}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '8s'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Enhanced Newsletter Section with Model */}


        {/* Links Grid - Updated to 5 columns with image space */}
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-start gap-8 mb-8">
          {/* Brand Column */}
          <div className="md:w-1/4">
            <a href="/">
              <img
                src="/logo1.png"
                alt="SNIX Logo"
                className="h-10 w-auto mb-4"
              />
            </a>

            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Revolutionizing creative workflows with cutting-edge AI solutions for modern brands and content creators.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail className="w-4 h-4 text-purple-500" />
                <span>sales@snix.ai</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span>Bengaluru, India</span>
              </div>
            </div>
          </div>

          <div className="flex fles-col md:fles-row gap-4 justify-around md:w-1/2">
            {/* Solutions */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-sm">
                Solutions
              </h4>
              <ul className="space-y-2">
                {footerLinks.solutions.map((link, index) => (
                  <li key={index}>
                    <p
                      className="text-gray-600 text-sm transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <span>{link.name}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4 text-sm">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {footerLinks.quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 text-sm hover:text-purple-600 transition-colors duration-200 flex items-center gap-1 group hover:translate-x-1"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Connect Section */}
          {/* <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">
              Connect With Us
            </h4>
            
            <div className="flex gap-3 mb-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-purple-600 transition-colors duration-200 hover:scale-110 hover:-translate-y-1"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            
            <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-100">
              <p className="text-xs text-gray-600 leading-relaxed">
                Follow us for daily AI photography inspiration and creative insights.
              </p>
            </div>
          </div> */}

          {/* Image Space Column - NEW */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-sm">
              Featured Work
            </h4>

            {/* Image Container - Replace with your actual image */}
            <div className="relative w-full h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg overflow-hidden border border-purple-200 group cursor-pointer hover:shadow-lg transition-all duration-300">
              {/* Image Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={images[currentIndex]}
                  alt={`Featured Work ${currentIndex + 1}`}
                  className={`w-auto h-full group-hover:scale-105 transition-all duration-600 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                    }`}
                />
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Dot Indicators */}
              {/* <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                      ? 'bg-purple-500 scale-125'
                      : 'bg-purple-300 hover:bg-purple-400'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div> */}

              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-200">
                <div
                  className="h-full bg-purple-500 transition-all duration-300 ease-linear"
                  style={{
                    width: `${((currentIndex + 1) / images.length) * 100}%`
                  }}
                />
              </div>

              {/* Navigation Arrows (appear on hover) */}
              <button
                onClick={() => goToSlide(currentIndex === 0 ? images.length - 1 : currentIndex - 1)}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm"
                aria-label="Previous image"
              >
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => goToSlide(currentIndex === images.length - 1 ? 0 : currentIndex + 1)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm"
                aria-label="Next image"
              >
                <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-2 leading-relaxed">
              Latest AI-generated photography showcase
            </p>
          </div>
        </div>

        {/* Bottom Section - Single Row Only */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-gray-100">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <span>© 2025 SNIX. Made with</span>
            <div className="animate-pulse">
              <Heart className="w-4 h-4 text-pink-500 fill-current" />
            </div>
            <span>for Creative Professionals</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="md:w-8 md:h-8 flex items-center justify-center text-gray-400 hover:text-purple-600 transition-colors duration-200 hover:scale-110 hover:-translate-y-1"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 md:w-8 md:h-8" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;