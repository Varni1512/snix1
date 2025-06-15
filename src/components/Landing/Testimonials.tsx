import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Quote,
} from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "SNIX transformed our seasonal campaign process. We cut production costs by 78% while increasing our visual content output threefold. Most importantly, our customers can't tell the difference — the quality is exceptional.",
    author: "Sarah Chen",
    position: "Marketing Director",
    company: "Luxe Apparel",
    avatar: "/avtar.png",
    rating: 5,
    metrics: "78% cost reduction",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 2,
    quote: "The ROI is undeniable. Since partnering with SNIX, our product page conversion rate has increased by 32%. We're creating more content, testing more variations, and seeing better results across all channels.",
    author: "Michael Rodriguez",
    position: "Ecommerce Director",
    company: "Urban Collective",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    metrics: "32% conversion increase",
    color: "from-blue-500 to-purple-500",
  },
  {
    id: 3,
    quote: "What impressed us most was the speed without compromising quality. Our time-to-market has improved dramatically, and our creative team can now focus on strategy rather than production bottlenecks.",
    author: "Emma Thompson",
    position: "Creative Director",
    company: "Fashion Forward Co.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    metrics: "50% faster delivery",
    color: "from-pink-500 to-orange-500",
  },
  {
    id: 4,
    quote: "SNIX has revolutionized how we approach product photography. The consistency across our entire catalog is remarkable, and our brand aesthetic has never looked more cohesive.",
    author: "David Park",
    position: "Brand Manager",
    company: "Modern Essentials",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 5,
    metrics: "100% brand consistency",
    color: "from-green-500 to-blue-500",
  },
];

const TestimonialsSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Slightly longer for mobile users to read
    return () => clearInterval(interval);
  }, [isHovered]);

  // Mouse movement tracking (disabled on mobile)
  const handleMouseMove = (e) => {
    if (isMobile || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-pink-50/30 overflow-hidden flex items-center py-12 sm:py-16 lg:py-20"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Background - Only on desktop */}
      {!isMobile && (
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(147, 51, 234, 0.15) 0%, 
              rgba(168, 85, 247, 0.08) 40%, 
              transparent 70%
            )`,
          }}
        />
      )}

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,51,234,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(147,51,234,0.03)_1px,transparent_1px)] bg-[size:30px_30px] sm:bg-[size:50px_50px] animate-pulse"></div>
      </div>

      {/* Floating Sparkles - Reduced on mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(isMobile ? 8 : 20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400/60" />
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-100/80 to-pink-100/80 border border-purple-200/40 rounded-full backdrop-blur-sm mb-4"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="w-3 h-3 text-purple-600 fill-current" />
            </motion.div>
            <span className="text-purple-700 text-xs font-medium tracking-wide uppercase">
              Client Love
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 sm:mb-4"
          >
            <span className="">What Our</span> <span className=" bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Clients Say
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto px-4"
          >
            Real results from real clients who trust us with their creative vision
          </motion.p>
        </motion.div>

        {/* Single Testimonial Card with Smooth Animation */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={`testimonial-${currentIndex}`}
              initial={{
                opacity: 0,
                y: 30,
                scale: 0.95
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1
              }}
              exit={{
                opacity: 0,
                y: -30,
                scale: 0.95
              }}
              transition={{
                duration: 0.6,
                ease: "easeOut"
              }}
              className="max-w-3xl w-full px-4"
              onMouseEnter={() => !isMobile && setIsHovered(true)}
              onMouseLeave={() => !isMobile && setIsHovered(false)}
            >
              <motion.div
                whileHover={!isMobile ? {
                  y: -4,
                  transition: { duration: 0.3, ease: "easeOut" }
                } : {}}
                className="relative bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl sm:shadow-2xl overflow-hidden group"
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                  <Quote className="w-8 h-8 sm:w-12 sm:h-12 text-purple-200/60" />
                </div>

                {/* Subtle Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${currentTestimonial.color} opacity-5 group-hover:opacity-8 transition-opacity duration-500`} />

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4 sm:mb-6 relative z-10">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <div key={i}>
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    </div>
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-gray-800 text-base sm:text-lg lg:text-xl leading-relaxed mb-6 sm:mb-8 relative z-10 font-medium">
                  "{currentTestimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.author}
                        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-3 sm:border-4 border-white shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-gray-900 text-base sm:text-lg truncate">
                        {currentTestimonial.author}
                      </h4>
                      <p className="text-gray-600 text-sm truncate">
                        {currentTestimonial.position}
                      </p>
                      <p className="text-purple-600 font-semibold text-sm truncate">
                        {currentTestimonial.company}
                      </p>
                    </div>
                  </div>

                  {/* Metric Badge */}
                  <div className={`px-3 py-2 sm:px-4 bg-gradient-to-r ${currentTestimonial.color} text-white rounded-full text-xs sm:text-sm font-bold shadow-lg self-start sm:self-center whitespace-nowrap`}>
                    {currentTestimonial.metrics}
                  </div>
                </div>
                {/* Subtle Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl sm:rounded-3xl"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="flex items-center justify-center gap-4 sm:gap-6"
        >
          <motion.button
            onClick={prevTestimonial}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/80 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center hover:bg-purple-100 transition-all duration-300 shadow-lg group touch-manipulation"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex gap-2 sm:gap-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${index === currentIndex
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextTestimonial}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/80 backdrop-blur-sm border border-white/40 rounded-full flex items-center justify-center hover:bg-purple-100 transition-all duration-300 shadow-lg group touch-manipulation"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
          </motion.button>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex justify-center mt-6 sm:mt-8"
        >
          <div className="w-32 sm:w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              initial={{ width: "0%" }}
              animate={{
                width: `${((currentIndex + 1) / testimonials.length) * 100}%`
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;