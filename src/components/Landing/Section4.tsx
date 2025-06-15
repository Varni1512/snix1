import { useRef, useState } from "react";
import {
  Target,
  Zap,
  Users,
  Camera,
  Play,
  Pause,
} from "lucide-react";

const HeroBenefitsSection = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isPlaying, setIsPlaying] = useState(true);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const benefits = [
    {
      id: 1,
      Icon: Target,
      title: "Virtual Try-On",
      description:
        "AI-powered fitting technology that shows how garments look on different body types with 99% accuracy.",
      color: "text-purple-600",
      bgColor: "from-purple-100 to-pink-100",
      borderColor: "border-purple-200",
    },
    {
      id: 2,
      Icon: Zap,
      title: "Faster Outputs",
      description:
        "Generate photorealistic try-on images in seconds, not hours. Perfect for quick decision making.",
      color: "text-pink-600",
      bgColor: "from-pink-100 to-blue-100",
      borderColor: "border-pink-200",
    },
    {
      id: 3,
      Icon: Users,
      title: "Multiple Ethnicities",
      description:
        "Showcase your products on diverse models representing different ethnicities and body types.",
      color: "text-blue-600",
      bgColor: "from-blue-100 to-purple-100",
      borderColor: "border-blue-200",
    },
    // {
    //   id: 4,
    //   Icon: BarChart3,
    //   title: "Performance Analytics",
    //   description:
    //     "Track engagement metrics and conversion rates to optimize your virtual try-on experience.",
    //   color: "text-indigo-600",
    //   bgColor: "from-indigo-100 to-purple-100",
    //   borderColor: "border-indigo-200",
    // },
    {
      id: 5,
      Icon: Camera,
      title: "Studio Quality Results",
      description:
        "Professional-grade images with perfect lighting and composition for your marketing campaigns.",
      color: "text-violet-600",
      bgColor: "from-violet-100 to-pink-100",
      borderColor: "border-violet-200",
    },
    // {
    //   id: 6,
    //   Icon: Lightbulb,
    //   title: "Smart Recommendations",
    //   description:
    //     "AI suggests the best poses and angles to showcase each garment's unique features.",
    //   color: "text-purple-600",
    //   bgColor: "from-purple-100 to-blue-100",
    //   borderColor: "border-purple-200",
    // },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden flex items-center py-8 sm:py-12 md:py-16"
      onMouseMove={handleMouseMove}
    >
      {/* Hero-style Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(182,126,220,0.05)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(215,181,138,0.08)_0%,transparent_50%),radial-gradient(circle_at_50%_50%,rgba(218,181,238,0.03)_0%,transparent_50%)]" />
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_25%_25%,#b67edc_1px,transparent_1px),radial-gradient(circle_at_75%_75%,#d7b98a_1px,transparent_1px)] bg-[length:60px_60px,80px_80px] bg-[position:0_0,30px_30px]" />

        {/* Interactive mouse glow */}
        <div
          className="absolute inset-0 opacity-40 transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(182, 126, 220, 0.1) 0%, 
              rgba(168, 85, 247, 0.05) 40%, 
              transparent 70%
            )`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full filter blur-[1px] animate-pulse"
            style={{
              width: `${30 + i * 8}px`,
              height: `${30 + i * 8}px`,
              background:
                i % 2 === 0
                  ? "linear-gradient(135deg, rgba(182, 126, 220, 0.1), rgba(218, 181, 238, 0.15))"
                  : "linear-gradient(135deg, rgba(215, 181, 138, 0.1), rgba(211, 178, 235, 0.1))",
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${6 + i}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-200 rounded-full backdrop-blur-sm mb-4 sm:mb-6 bg-white/20">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></span>
            <span className="text-gray-700 text-xs sm:text-sm font-medium tracking-wide uppercase">
              Virtual Try-On Technology
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6 px-2 sm:px-0">
            Experience Fashion in a
            <span className="block bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Whole New Way
            </span>
          </h2>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Left Side - Video Demo */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative group">
              {/* Video Container */}
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-white/15 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5">
                {/* Video Element */}
                <video
                  ref={videoRef}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  onLoadedData={() => setIsPlaying(true)}
                >
                  <source
                    src="/videos/videoside.mp4"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>

                {/* Video Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Play/Pause Button */}
                <button
                  onClick={toggleVideo}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-black/20 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/30 hover:scale-110"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" />
                  )}
                </button>

                {/* Live Indicator */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full shadow-lg animate-pulse" />
                  <span className="text-white text-xs sm:text-sm font-medium bg-black/20 backdrop-blur-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
                    Live Demo
                  </span>
                </div>

                {/* Video Title Overlay */}
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                  <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl p-2.5 sm:p-3">
                    <h3 className="text-white font-semibold text-sm sm:text-base lg:text-lg mb-0.5 sm:mb-1">
                      Virtual Try-On in Action
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm">
                      Watch how our AI transforms fashion visualization
                    </p>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-60" />
              </div>
            </div>
          </div>

          {/* Right Side - Benefits Cards */}
          <div className="lg:col-span-7 order-1 lg:order-2 my-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="relative group p-4 sm:p-5 bg-white/95 backdrop-blur-md rounded-lg sm:rounded-xl border-2 border-purple-400/70 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-[3px] hover:bg-[linear-gradient(135deg,rgba(147,51,234,0.08),rgba(236,72,153,0.08))] hover:shadow-[0_12px_32px_rgba(147,51,234,0.2)] hover:border-purple-400/90 shadow-[0_0_0_1px_rgba(147,51,234,0.1)]"
                >
                  {/* Initial subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/8 via-pink-50/5 to-blue-50/8 rounded-lg sm:rounded-xl" />

                  {/* Enhanced gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/15 via-pink-50/15 to-blue-50/15 opacity-0 group-hover:opacity-100 rounded-lg sm:rounded-xl transition-opacity duration-300" />

                  {/* Initial subtle glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/2 to-pink-500/2 rounded-lg sm:rounded-xl" />

                  {/* Enhanced glow effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg sm:rounded-xl" />

                  <div className="relative z-10">
                    <div className="flex items-start gap-2.5 sm:gap-3">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${benefit.bgColor} rounded-lg sm:rounded-xl flex items-center justify-center border ${benefit.borderColor} flex-shrink-0 shadow-md opacity-90 group-hover:opacity-100 transition-all duration-300 group-hover:shadow-lg`}
                      >
                        <benefit.Icon
                          className={`w-5 h-5 sm:w-6 sm:h-6 ${benefit.color} transition-all duration-300 group-hover:scale-110`}
                          strokeWidth={1.5}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1.5 sm:mb-2 leading-tight transition-colors duration-300 group-hover:text-gray-800">
                          {benefit.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed transition-colors duration-300 group-hover:text-gray-700">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Initial corner accent - always visible but subtle */}
                  <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-30 group-hover:opacity-70 group-hover:w-1.5 group-hover:h-1.5 sm:group-hover:w-2 sm:group-hover:h-2 transition-all duration-300" />

                  {/* Animated shimmer effect */}
                  <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
                    <div className="absolute -top-2 -left-2 w-4 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent rotate-12 transform -translate-x-full group-hover:translate-x-[calc(100vw)] transition-transform duration-1000 ease-out opacity-0 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Section */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white/95 backdrop-blur-md border-2 border-purple-400/70 rounded-xl sm:rounded-2xl text-center shadow-[0_0_0_1px_rgba(147,51,234,0.1)] relative overflow-hidden group transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-[3px] hover:bg-[linear-gradient(135deg,rgba(147,51,234,0.08),rgba(236,72,153,0.08))] hover:shadow-[0_12px_32px_rgba(147,51,234,0.2)] hover:border-purple-400/90">
              {/* Initial gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/20 via-pink-50/15 to-blue-50/20 rounded-xl sm:rounded-2xl" />

              {/* Subtle animated background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 animate-pulse" />
              </div>

              <div className="relative z-10">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 sm:mb-2">
                  Ready to Transform Your Brand Sales?
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 px-2 sm:px-0">
                  Join hundreds of brands already using our technology
                </p>
                <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 via-violet-600 to-purple-700 text-white font-semibold rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group text-sm sm:text-base transform hover:scale-105 hover:-translate-y-0.5 animate-pulse hover:animate-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <a href="/contactus">
                    <span className="relative z-10">Get Started Today</span>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
<style>{`
  .group::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 2px;
    background: linear-gradient(
      135deg,
      rgba(147, 51, 234, 0.4),
      rgba(236, 72, 153, 0.2),
      rgba(147, 51, 234, 0.4)
    );
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: xor;
    -webkit-mask-composite: xor;
    opacity: 0.5;
    transition: opacity 0.3s ease;
  }

  .group:hover::before {
    opacity: 1;
  }
`}</style>

export default HeroBenefitsSection;