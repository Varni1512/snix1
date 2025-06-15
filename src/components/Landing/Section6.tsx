import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Sparkles, Zap, Palette, ArrowRight, Star } from "lucide-react";

const RefinedAISection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Enhanced Background */}
      <div className="absolute inset-0 z-1">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20" />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_25%_25%,#b67edc_1px,transparent_1px),radial-gradient(circle_at_75%_75%,#d7b98a_1px,transparent_1px)] bg-[length:60px_60px,80px_80px] bg-[position:0_0,30px_30px]" />
        <div
          className="absolute inset-0 bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(182,126,220,0.06),transparent_40%)] opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={
            {
              "--mouse-x": `${mousePosition.x}%`,
              "--mouse-y": `${mousePosition.y}%`,
            } as React.CSSProperties
          }
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + i * 8}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Content Grid - Full Width, No Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-16 items-center relative z-10">
            {/* Left Side - Detailed Closeup Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="lg:col-span-6 flex justify-center order-2 lg:order-1"
            >
              <div className="relative">
                {/* Main Detailed Image - Responsive sizing */}
                <motion.div
                  className="relative group"
                  whileHover={{
                    scale: 1.02,
                    y: -5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className="relative w-72 h-96 sm:w-80 sm:h-[420px] md:w-96 md:h-[500px] bg-white/15 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Enhanced Card with Old Background Style */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-purple-50/5 to-pink-50/10 opacity-80 rounded-2xl" />

                    {/* Card border gradient on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 via-transparent to-pink-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                    <img
                      src="/Images/7.png"
                      alt="Detailed fashion closeup"
                      className="relative z-10 w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                    />

                    {/* Enhanced overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                    {/* Detail indicator */}
                    <motion.div
                      className="absolute top-4 right-4 z-30"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <div className="w-3 h-3 bg-purple-500 rounded-full shadow-lg" />
                      <div className="absolute inset-0 w-3 h-3 bg-purple-400 rounded-full animate-ping" />
                    </motion.div>

                    {/* Detail label */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      className="absolute bottom-4 left-4 right-4 z-30"
                    >
                      <div className="p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg">
                        <h3 className="text-white font-semibold text-sm mb-1">
                          Ultra-High Detail
                        </h3>
                        <p className="text-white/80 text-xs">
                          Fabric texture & material precision
                        </p>
                      </div>
                    </motion.div>

                    {/* Floating detail particles */}
                    <div className="absolute inset-0 pointer-events-none z-20">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1.5 h-1.5 bg-purple-400/60 rounded-full"
                          style={{
                            left: `${20 + i * 20}%`,
                            top: `${25 + i * 15}%`,
                          }}
                          animate={{
                            y: [0, -12, 0],
                            opacity: [0, 0.8, 0],
                            scale: [0, 1, 0],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            delay: i * 0.4,
                          }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Zoom indicators around the image */}
                  {[
                    { pos: "top-2 left-2", delay: 0 },
                    { pos: "top-2 right-2", delay: 0.5 },
                    { pos: "bottom-2 left-2", delay: 1 },
                    { pos: "bottom-2 right-2", delay: 1.5 },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className={`absolute ${item.pos} w-6 h-6 border-2 border-purple-400/40 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm`}
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: item.delay,
                      }}
                    >
                      <div className="w-1 h-1 bg-purple-500 rounded-full" />
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Now taking 6 columns */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-6 space-y-6 sm:space-y-8 order-1 lg:order-2"
            >
              {/* Badge */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="inline-flex items-center px-3 py-2 sm:px-4 bg-white/50 border border-gray-200/40 rounded-full backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
                <span className="text-purple-700 text-xs sm:text-sm font-medium tracking-wide uppercase">
                  AI-Enhanced Workflow
                </span>
              </motion.div>

              {/* Main Heading - Responsive sizing */}
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                }
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="block">Create fashion content</span>
                <span className="block bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  80% faster with AI
                </span>
              </motion.h2>

              {/* Description - Responsive sizing */}
              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                }
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Transform your creative process with intelligent tools that
                enhance productivity while maintaining the quality your brand
                demands. Experience the future of fashion content creation.
              </motion.p>

              {/* Stats Row - Responsive layout */}
              <motion.div
                className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 lg:gap-8 py-4"
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                }
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {[
                  { icon: Zap, label: "80% Faster", value: "Processing Speed" },
                  { icon: Star, label: "99% Quality", value: "Maintained" },
                  { icon: Palette, label: "500+ Brands", value: "Trust Us" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-100/60 to-pink-100/60 rounded-xl flex items-center justify-center border border-purple-200/30 backdrop-blur-sm">
                      <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-semibold text-gray-900">
                        {stat.label}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-500">{stat.value}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons - Responsive */}
              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4"
                initial={{ opacity: 0, y: 15 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }
                }
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <a href="/contactUs" className="cursor-pointer">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="cursor-pointer px-6 py-3 sm:px-8 sm:py-4 bg-white/50 backdrop-blur-sm border border-gray-200/50 text-gray-700 font-semibold rounded-xl hover:bg-white/70 transition-all duration-300 flex items-center justify-center gap-3 group"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Enhanced Bottom Trust Strip - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <span className="text-purple-600 font-semibold text-sm sm:text-base lg:text-lg tracking-wider">
                TRUSTED BY Leading BRANDS
              </span>
              <div className="hidden sm:block w-px h-6 bg-gray-300/50"></div>
              <span className="text-gray-600 text-sm sm:text-base lg:text-lg">
                Leading fashion companies worldwide
              </span>
              <motion.button
                whileHover={{ scale: 1.05, x: 3 }}
                className="text-purple-600 hover:text-purple-700 transition-colors flex items-center space-x-2 font-medium"
              >
                <span className="text-sm sm:text-base">View case studies</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default RefinedAISection;