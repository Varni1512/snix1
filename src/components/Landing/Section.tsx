import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users, Target, Zap, Sparkles, Palette, ImageIcon, Award, Wand2, Building2, Package, Mountain, Smile } from "lucide-react";

const AIStudioSection = () => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const carouselSlides = [
    {
      input: "/hero/7.png", // Dress/outfit input
      output: "/hero/2.png", // Model output
      outfitName: "Pink Blazer Set",
      features: [
        {
          text: "Multiple ethnicity library",
          icon: Users
        },
        {
          text: "Create your own model",
          icon: Target
        }
      ]
    },
    {
      input: "/hero/13.png", // Dress input
      output: "/hero/9.png", // Model output
      outfitName: "Premium Fashion Shoot",
      features: [
        {
          text: "Professional photography styles",
          icon: Sparkles
        },
        {
          text: "Studio lighting effects",
          icon: Zap
        }
      ]
    },
    {
      input: "/hero/5.png", // Outfit input
      output: "/hero/6.png", // Model output
      outfitName: "Creative Portrait Session",
      features: [
        {
          text: "Artistic pose generation",
          icon: Palette
        },
        {
          text: "Background customization",
          icon: ImageIcon
        }
      ]
    },
    {
      input: "/hero/10.png", // Outfit input
      output: "/hero/3.png", // Model output
      outfitName: "Editorial Style Shoot",
      features: [
        {
          text: "Magazine-quality results",
          icon: Award
        },
        {
          text: "High-end retouching",
          icon: Wand2
        }
      ]
    },
    {
      input: "/hero/1.png", // Outfit input
      output: "/hero/12.png", // Model output
      outfitName: "Commercial Photography",
      features: [
        {
          text: "Brand-focused shoots",
          icon: Building2
        },
        {
          text: "Product integration",
          icon: Package
        }
      ]
    },
    {
      input: "/hero/4.png", // Outfit input
      output: "/hero/11.png", // Model output
      outfitName: "Lifestyle Photography",
      features: [
        {
          text: "Natural environment shots",
          icon: Mountain
        },
        {
          text: "Authentic expressions",
          icon: Smile
        }
      ]
    }
  ];

  // Auto-advance carousel
  useEffect(() => {
    if (!isPaused && isInView) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
          setIsTransitioning(false);
        }, 150);
      }, 2000); // Change slide every 2 seconds (faster)

      return () => clearInterval(interval);
    }
  }, [currentSlide, isPaused, isInView, carouselSlides.length]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
      setIsTransitioning(false);
    }, 150);
  };

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentSlide) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 150);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative h-full overflow-hidden flex items-center py-10 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 bg-gray-50"
    >
      <div className="w-full flex flex-col lg:flex-row rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl bg-white max-w-7xl mx-auto">
        <div
          className={`w-full lg:w-1/2 relative transition-all duration-1000 ease-out ${isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="relative h-64 sm:h-80 md:h-96 lg:h-full min-h-[400px] lg:min-h-[600px]">
            <img
              src="/hero/14.png"
              alt="Diverse models lineup"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-6 md:left-6 md:right-6 lg:bottom-8 lg:left-8 lg:right-8">
              <div className="bg-black/20 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20">
                <div className="text-white text-base sm:text-lg font-bold mb-1 sm:mb-2">+ OUR IMPACT</div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-white text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Multiple Ethnicities</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>Body Inclusive</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`w-full lg:w-1/2 relative flex items-center justify-center p-4 sm:p-6 md:p-8 transition-all duration-1000 ease-out ${isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
          style={{
            background: "linear-gradient(135deg, rgb(30,14,62) 0%, rgb(0,0,0) 50%, rgb(156,32,155) 100%)",
            transform: isInView ? "translateX(0)" : "translateX(50px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.8s ease 0.8s",
          }}
        >
          <div className="w-full">
            <div className="flex items-center justify-center mb-4 sm:mb-6">
              <h3 className="text-white text-lg sm:text-xl font-normal tracking-[8px] sm:tracking-[10px]">AI STUDIO</h3>
            </div>

            <div
              className="w-[95%] sm:w-[90%] m-auto relative bg-white/70 backdrop-blur-sm rounded-2xl sm:rounded-3xl mt-2 shadow-lg sm:shadow-xl"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div className="flex flex-col items-start">
                <div className="flex items-start gap-1 p-3 sm:p-5 justify-between">
                  <div className="w-2 h-2 bg-[rgb(30,14,62)] rounded-full"></div>
                  <div className="w-2 h-2 bg-[rgb(30,14,62)] rounded-full"></div>
                  <div className="w-2 h-2 bg-[rgb(30,14,62)] rounded-full"></div>
                </div>
                <div className="w-full h-[1px] bg-[rgb(51,28,95)]"></div>
              </div>

              <div className="relative grid grid-cols-2 w-[85%] sm:w-[90%] mx-auto gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 bg-gray-300/50 py-3 sm:py-4 md:py-5 px-3 sm:px-5 md:px-10 mt-3 sm:mt-5 rounded-xl sm:rounded-2xl">

                {/* Left side - INPUT (Dress/Outfit) */}
                <div className="relative">
                  <div className="aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg bg-gray-100 transform transition-all duration-500 hover:scale-102">
                    <img
                      key={`input-${currentSlide}`}
                      src={carouselSlides[currentSlide].input}
                      alt="Input Outfit"
                      className={`w-full h-full object-cover transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                    />
                  </div>
                  {/* INPUT Label - Repositioned */}
                  {/* <div className="absolute -bottom-3 -left-7 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg border border-white/20 z-10">
                    INPUT
                  </div> */}
                </div>

                {/* Right side - OUTPUT (Model) */}
                <div className="relative">
                  <div className="aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden shadow-md sm:shadow-lg bg-gray-100 transform transition-all duration-500 hover:scale-102">
                    <img
                      key={`output-${currentSlide}`}
                      src={carouselSlides[currentSlide].output}
                      alt="AI Generated Model"
                      className={`w-full h-full object-cover transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                    />
                  </div>
                  {/* OUTPUT Label - Repositioned */}
                  {/* <div className="absolute -bottom-3 -right-8 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg border border-white/20 z-10">
                    OUTPUT
                  </div> */}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className="absolute top-1/3 -left-[12%] sm:-left-[10%] md:-left-[9%] cursor-pointer z-10 disabled:opacity-50 hover:scale-110 transition-transform duration-200"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-500 hover:text-gray-700 transition-colors duration-200" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className="absolute top-1/3 -right-[12%] sm:-right-[10%] md:-right-[9%] cursor-pointer z-10 disabled:opacity-50 hover:scale-110 transition-transform duration-200"
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-gray-500 hover:text-gray-700 transition-colors duration-200" />
                </button>
              </div>

              {/* Dynamic Features Section */}
              <div className="flex flex-col gap-3 p-4 sm:p-5 md:p-6">
                {carouselSlides[currentSlide].features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={`${currentSlide}-${index}-${feature.text}`}
                      className={`flex items-center gap-3 bg-gradient-to-r from-white to-gray-50 rounded-xl px-4 py-3 shadow-md border border-gray-200/50 hover:shadow-lg hover:scale-105 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}
                      style={{ transitionDelay: `${index * 100}ms` }}
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                        <IconComponent className="w-4 h-4 text-white" />
                      </div>
                      <h2 className="text-sm font-semibold text-gray-800 flex-1">{feature.text}</h2>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  );
                })}
              </div>

              {/* Slide Indicators with Progress Bar */}
              <div className="flex justify-center gap-2 pb-4">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative overflow-hidden rounded-full transition-all duration-300 ${currentSlide === index
                      ? 'bg-purple-600 w-6 h-2'
                      : 'bg-gray-400 hover:bg-gray-600 w-2 h-2'
                      }`}
                  >
                    {currentSlide === index && !isPaused && (
                      <div
                        className="absolute top-0 left-0 h-full bg-purple-800 rounded-full"
                        style={{
                          animation: 'progressBar 4s linear infinite',
                          animationDelay: '0s'
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <style>{`
                @keyframes progressBar {
                  from {
                    width: 0%;
                  }
                  to {
                    width: 100%;
                  }
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStudioSection;