import { useState, useEffect, useRef } from 'react';

const InfiniteGallery = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const galleryRef = useRef(null);
  const observerRef = useRef(null);

  // Create array of images from slideshow folder (14-27)
  const modelImages = Array.from({ length: 6 }, (_, idx) => {
    const imgNum = idx + 11;
    return {
      id: imgNum,
      src: `/slide/${imgNum}.png`,
      alt: `Fashion model ${idx + 1}`,
      name: `Model ${idx + 1}`,
      style: 'Diverse representation',
    };
  });

  // Responsive breakpoint detection
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  // Intersection observer for animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observerRef.current.observe(galleryRef.current);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, []);

  // Mouse tracking for interactive effects
  const handleMouseMove = (e) => {
    if (!galleryRef.current) return;

    const rect = galleryRef.current.getBoundingClientRect();
    setCursorPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  // Animation configurations based on screen size
  const getAnimationSpeed = () => {
    switch (screenSize) {
      case 'mobile': return '40s';
      case 'tablet': return '35s';
      default: return '30s';
    }
  };

  const getImageSize = () => {
    switch (screenSize) {
      case 'mobile': return 'w-52 h-64';
      case 'tablet': return 'w-64 h-80';
      default: return 'w-80 h-96';
    }
  };

  return (
    <div
      ref={galleryRef}
      className="relative h-full bg-gradient-to-br from-slate-50 via-purple-50/20 to-pink-50/30 overflow-hidden flex items-center py-16"
      onMouseMove={handleMouseMove}
    >
      {/* Dynamic background effect */}
      <div
        className="absolute inset-0 opacity-20 transition-all duration-300"
        style={{
          background: `radial-gradient(600px circle at ${cursorPos.x}% ${cursorPos.y}%, 
            rgba(139, 69, 19, 0.1), 
            rgba(168, 85, 247, 0.08), 
            transparent 50%)`
        }}
      />

      {/* Animated background elements */}
      <div className="absolute inset-0">
        {Array.from({ length: screenSize === 'mobile' ? 3 : 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-300/10 to-pink-300/10"
            style={{
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 4) * 20}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite alternate`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Header Section */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg border border-purple-100">
            <span className="animate-spin-slow text-2xl">✨</span>
            <span className="text-purple-700 font-semibold tracking-wider uppercase text-sm">
              Infinite Poses
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-gray-800">Customize Your Images as per</span>
            <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent">
               Your Brand Kit
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Let brands visualise their campaigns with us
          </p>
        </div>

        {/* Infinite Scroll Gallery */}
        <div
          className={`relative transition-all duration-1200 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          <div className="flex overflow-hidden">
            <div
              className="flex gap-6 animate-scroll-infinite"
              style={{
                animationDuration: getAnimationSpeed(),
                width: 'fit-content'
              }}
            >
              {/* Triple the array for seamless infinite scroll */}
              {[...modelImages, ...modelImages, ...modelImages].map((model, idx) => (
                <div
                  key={`${model.id}-${idx}`}
                  className={`${getImageSize()} flex-shrink-0`}
                >
                  <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
                    <img
                      src={model.src}
                      alt={model.alt}
                      className="max-w-full max-h-full object-contain rounded-2xl"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Edge fade effects */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 via-purple-50/40 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 via-purple-50/40 to-transparent pointer-events-none z-10" />
        </div>
      </div>

      <style>{`
        @keyframes float {
          from { transform: translateY(0) rotate(0deg); }
          to { transform: translateY(-20px) rotate(10deg); }
        }
        
        @keyframes scroll-infinite {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        
        .animate-scroll-infinite {
          animation: scroll-infinite linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin 4s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default InfiniteGallery;