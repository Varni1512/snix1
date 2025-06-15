import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

const AIStudioSection = () => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Carousel slides with real model and outfit combinations
  const carouselSlides = [
    {
      model:
        "https://images.unsplash.com/photo-1594736797933-d0301ba8ac6a?w=300&h=400&fit=crop&crop=face",
      outfit:
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=400&fit=crop",
      outfitName: "Pink Blazer Set",
    },
    {
      model:
        "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=300&h=400&fit=crop&crop=face",
      outfit:
        "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=300&h=400&fit=crop",
      outfitName: "Blue Dress",
    },
    {
      model:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=400&fit=crop&crop=face",
      outfit:
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop",
      outfitName: "Green Outfit",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex items-center py-20 px-8 bg-gray-50"
    >
      <div className="w-full flex rounded-3xl overflow-hidden shadow-2xl bg-white max-w-7xl mx-auto">
        {/* Left Side - Diverse Models Image (50% width) */}
        <div
          className={`w-1/2 relative transition-all duration-1000 ease-out ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {/* Full width image of diverse models */}
          <div className="relative h-[600px]">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=1200&fit=crop"
              alt="Diverse models lineup"
              className="w-full h-full object-cover"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />

            {/* Bottom text overlay */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-black/20 backdrop-blur-md rounded-xl p-4 border border-white/20">
                <div className="text-white text-lg font-bold mb-2">
                  + OUR IMPACT
                </div>
                <div className="flex items-center gap-4 text-white text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
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

        {/* Right Side - AI Studio Interface (50% width) */}
        <div
          className={`w-1/2 relative flex items-center justify-center p-8 transition-all duration-1000 ease-out ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"
          }`}
          style={{
            background:
              "linear-gradient(135deg, rgb(30,14,62) 0%, rgb(0,0,0) 50%, rgb(156,32,155) 100%)",
            transform: isInView ? "translateX(0)" : "translateX(50px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.8s ease 0.8s",
          }}
        >
          {/* AI Studio Interface Container */}
          <div className="w-full max-w-md">
            {/* Interface Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-xl font-light tracking-wider">
                AI STUDIO
              </h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
                <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              </div>
            </div>

            {/* Try-On Display */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl">
              {/* Navigation Arrows */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevSlide}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-200 shadow-sm hover:shadow-md transform hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Try-On Results Grid with Carousel */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Left - Model with outfit */}
                <div className="relative">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg bg-gray-100 transform transition-all duration-500 hover:scale-102">
                    <img
                      key={`model-${currentSlide}`}
                      src={carouselSlides[currentSlide].model}
                      alt="Model"
                      className="w-full h-full object-cover transition-opacity duration-500"
                      style={{ opacity: 1 }}
                    />
                  </div>
                </div>

                {/* Right - Outfit/Dress */}
                <div className="relative">
                  <div className="aspect-[3/4] rounded-xl overflow-hidden shadow-lg bg-gray-100 transform transition-all duration-500 hover:scale-102">
                    <img
                      key={`outfit-${currentSlide}`}
                      src={carouselSlides[currentSlide].outfit}
                      alt={carouselSlides[currentSlide].outfitName}
                      className="w-full h-full object-cover transition-opacity duration-500"
                      style={{ opacity: 1 }}
                    />
                  </div>
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mb-6">
                {carouselSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 hover:opacity-80 ${
                      index === currentSlide
                        ? "bg-purple-600 w-6"
                        : "bg-gray-300 w-2"
                    }`}
                  />
                ))}
              </div>

              {/* Feature Tags */}
              <div className="space-y-3 mb-6">
                <div
                  className={`flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 transform transition-all duration-700 hover:shadow-md ${
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: "1200ms" }}
                >
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-yellow-800 text-sm font-medium">
                    Multiple ethnicity library
                  </span>
                </div>

                <div
                  className={`flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200 transform transition-all duration-700 hover:shadow-md ${
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                  style={{ transitionDelay: "1400ms" }}
                >
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <span className="text-yellow-800 text-sm font-medium">
                    Create your own model
                  </span>
                </div>
              </div>

              {/* SNIX Logo Area */}
              <div
                className={`text-center transform transition-all duration-800 ${
                  isInView ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                style={{ transitionDelay: "1600ms" }}
              >
                <div className="text-2xl font-bold text-gray-800 tracking-wider mb-2 hover:text-purple-600 transition-colors duration-300 cursor-pointer">
                  SNIX
                </div>
                <div className="w-16 h-1 bg-purple-600 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIStudioSection;
