import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Shirt,
  User,
  Zap,
  Check,
  Clock,
  Users,
  Award,
} from "lucide-react";

const HeroSpeedSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Mouse movement handler
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  // Fashion item images - Replace these URLs with your actual images
  const fashionImages = [
    {
      src: "/last-section/6.png",
      alt: "Fashion Item 2",
      title: "Luxury Shoes"
    },
    {
      src: "/last-section/5.png",
      alt: "Fashion Item 1",
      title: "Designer Dress"
    },
    {
      src: "/last-section/7.png",
      alt: "Fashion Item 3",
      title: "Watch Collection"
    },
    {
      src: "/last-section/8.png",
      alt: "Fashion Item 4",
      title: "Handbag"
    },
    {
      src: "/last-section/9.png",
      alt: "Fashion Item 5",
      title: "Sunglasses"
    },
    {
      src: "/last-section/10.png",
      alt: "Fashion Item 6",
      title: "Jewelry"
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen  overflow-hidden flex items-center py-16"
      onMouseMove={handleMouseMove}
    >
      {/* Hero-style Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(182,126,220,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(215,181,138,0.08)_0%,transparent_50%),radial-gradient(circle_at_50%_50%,rgba(218,181,238,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_25%_25%,#b67edc_1px,transparent_1px),radial-gradient(circle_at_75%_75%,#d7b98a_1px,transparent_1px)] bg-[length:60px_60px,80px_80px] bg-[position:0_0,30px_30px]" />

        {/* Interactive mouse glow */}
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(182, 126, 220, 0.1) 0%, 
              rgba(168, 85, 247, 0.05) 40%, 
              transparent 70%
            )`,
          }}
        />
      </div>

      {/* Floating Elements like Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full filter blur-[1px]"
            style={{
              width: `${60 + i * 15}px`,
              height: `${60 + i * 15}px`,
              background:
                i % 2 === 0
                  ? "linear-gradient(135deg, rgba(182, 126, 220, 0.1), rgba(218, 181, 238, 0.15))"
                  : "linear-gradient(135deg, rgba(215, 181, 138, 0.1), rgba(211, 178, 235, 0.1))",
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              delay: i * 0.8,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        {/* Left Side - AI Fashion Visual (Bigger) */}
        <motion.div
          initial={{ opacity: 0, x: -50, scale: 0.9 }}
          animate={
            isInView
              ? { opacity: 1, x: 0, scale: 1 }
              : { opacity: 0, x: -50, scale: 0.9 }
          }
          transition={{ duration: 1.2, delay: 0.2 }}
          className="lg:col-span-7 relative md:mx-auto mt-[10%] flex justify-center lg:justify-start"
        >
          <div className="relative">
            {/* AI Fashion Processing Display - Bigger Size */}
            <motion.div
              className="relative w-96 h-96 bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-purple-50/5 to-pink-50/10 opacity-80 rounded-2xl" />

              {/* AI Processing Interface */}
              <div className="absolute inset-0 p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-gray-800 font-medium text-base">
                      AI Processing
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 font-mono">72h*</div>
                </div>

                {/* Fashion Items Grid - Now with Images */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {fashionImages.map((item, i) => (
                    <motion.div
                      key={i}
                      className="aspect-square bg-gradient-to-br from-purple-100/60 to-pink-100/60 rounded-xl border border-purple-200/30 relative overflow-hidden group"
                      animate={{
                        scale: [1, 1.02, 1],
                        opacity: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 2 + i * 0.2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    >
                      {/* Fashion Image */}
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      {/* Fallback content if image fails */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/60 to-pink-100/60 items-center justify-center text-xs text-purple-600 font-medium hidden">
                        {item.title}
                      </div>

                      {/* Processing effect overlay */}
                      {i < 3 && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/40 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                            repeatDelay: 2,
                          }}
                        />
                      )}

                      {/* Subtle overlay for better text visibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  ))}
                </div>

                {/* AI Process Steps - Larger */}
                <div className="space-y-3">
                  <motion.div
                    className="flex items-center gap-4 p-3 bg-green-100/60 border border-green-200/40 rounded-xl"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <User className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-800">
                      Model Selection
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4 p-3 bg-purple-100/60 border border-purple-200/40 rounded-xl"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  >
                    <Shirt className="w-4 h-4 text-purple-600 animate-pulse" />
                    <span className="text-sm font-medium text-gray-800">
                      AI Fitting
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex items-center gap-4 p-3 bg-pink-100/60 border border-pink-200/40 rounded-xl"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Zap className="w-4 h-4 text-pink-600" />
                    <span className="text-sm font-medium text-gray-800">
                      Image Generation
                    </span>
                  </motion.div>
                </div>

                {/* Speed Indicator */}
                <div className="absolute bottom-6 right-6">
                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Zap className="w-4 h-4" />
                    <span>60% Faster</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* AI Performance Metrics - Updated with icons */}
            {[
              {
                pos: "top-2 -left-16",
                delay: 0,
                metric: "99%",
                label: "Accuracy",
                Icon: Check,
              },
              {
                pos: "top-2 -right-16",
                delay: 0.5,
                metric: "Quick",
                label: "Delivery",
                Icon: Clock,
              },
              {
                pos: "bottom-2 -left-16",
                delay: 1,
                metric: "500+",
                label: "Models",
                Icon: Users,
              },
              {
                pos: "bottom-2 -right-16",
                delay: 1.5,
                metric: "4K",
                label: "Quality",
                Icon: Award,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className={`absolute ${item.pos} w-20 h-20 bg-white/90 backdrop-blur-sm border border-purple-200/40 rounded-xl flex flex-col items-center justify-center shadow-lg`}
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  delay: item.delay,
                }}
              >
                <item.Icon className="w-4 h-4 text-purple-600 mb-1" />
                <span className="text-sm font-bold text-purple-700">
                  {item.metric}
                </span>
                <span className="text-xs text-gray-600">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Content (Smaller space) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="lg:col-span-5 space-y-8"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ delay: 0.6, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 border border-gray-200/40 rounded-full backdrop-blur-sm"
          >
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            <span className="text-purple-700 text-sm font-medium tracking-wide uppercase">
              FASTEST AI
            </span>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            >
              <span className="block text-gray-900 mb-2">Fashion Moves</span>
              <span className="block bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 bg-clip-text text-transparent">
                Fast
              </span>
              <span className="block text-gray-700 text-2xl md:text-3xl lg:text-4xl font-semibold mt-2">
                Your Content Should Too
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              While your competitors wait weeks for photoshoots, you'll have
              campaign-ready visuals in 72 hours. Don't let slow production kill
              your seasonal launches.
            </motion.p>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="pt-4"
          >
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 cursor-pointer bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              />
              <a className="relative z-10" href="/contactUs">
                Book Demo
              </a>
              <motion.span
                className="relative z-10"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSpeedSection;