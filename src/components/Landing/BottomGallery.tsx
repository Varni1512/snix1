import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const LifeLikeAIModels = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // 9 images for 3x3 grid
  const images = [
    { src: "/aimodal/1.png", alt: "AI Model 1" },  
    { src: "/aimodal/2.png", alt: "AI Model 2" },  
    { src: "/aimodal/3.png", alt: "AI Model 3" },  
    { src: "/aimodal/5.png", alt: "AI Model 5" },  
    { src: "/aimodal/4.png", alt: "AI Model 4" },  
    { src: "/aimodal/6.png", alt: "AI Model 6" },  
    { src: "/aimodal/7.png", alt: "AI Model 7" },  
    { src: "/aimodal/8.png", alt: "AI Model 8" },  
    { src: "/aimodal/9.png", alt: "AI Model 9" },  
  ];

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-full bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20 overflow-hidden flex items-center py-4 md:py-8"
      onMouseMove={handleMouseMove}
    >
      {/* Interactive Background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(147, 51, 234, 0.1) 0%, 
            rgba(168, 85, 247, 0.05) 40%, 
            transparent 70%
          )`,
        }}
      />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 4) * 20}%`,
            }}
            animate={{
              y: [0, -25, 0],
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 3.5 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10 w-full md:px-20">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center justify-between min-h-[60vh] md:min-h-[80vh]">
          {/* Left Side - Title */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1 }}
            className="flex-1 flex mx-auto flex-col justify-center text-center lg:text-left mb-4 lg:mb-0"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100/80 to-pink-100/80 border border-purple-200/40 backdrop-blur-sm rounded-full mb-4 md:mb-6 w-fit mx-auto lg:mx-0"
            >
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="text-purple-600"
              >
                🤖
              </motion.span>
              <span className="text-purple-700 text-sm font-medium tracking-wide uppercase">
                AI Technology
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-3 md:mb-4"
            >
              <span className="block font-serif">Life-Like AI</span>
              <span className="block font-serif bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                Models
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-base md:text-lg text-gray-600 leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              Experience the future of virtual modeling with our incredibly
              realistic AI-generated personas that represent diverse beauty and
              authenticity.
            </motion.p>

            <a href="/contactUS">
            <motion.button
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer mt-4 md:mt-6 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 w-fit mx-auto lg:mx-0 group text-sm md:text-base"
            >
              <span>Explore Models</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
            </a>
          </motion.div>

          {/* Right Side - Simple 3x3 Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex-1 max-h-screen max-w-lg mx-auto w-full"
          >
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{
                    delay: 0.7 + index * 0.1,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.1,
                    zIndex: 10,
                    transition: { duration: 0.3 }
                  }}
                  className="group cursor-pointer relative"
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LifeLikeAIModels;