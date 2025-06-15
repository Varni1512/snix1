import React, { useState, useEffect } from "react";
import {
  CheckCircle,
  ArrowRight,
  Play,
  // Sparkles,
} from "lucide-react";

interface VisibilityState {
  [key: string]: boolean;
}

const heroImages = [
  '/gallery/3.webp',
];


const SolutionsPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState<VisibilityState>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[data-animate]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const useCases: string[] = [
    "Launch Campaigns for New Collections",
    "Replace Traditional Model Photoshoots",
    "Create Influencer-Style Content",
    "Expand into New Markets with Diverse Models",
    "Generate Seasonal Content",
    "Develop Social Media Campaigns",
  ];
  const [heroImageIndex, setHeroImageIndex] = useState<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el: Element) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const heroInterval = setInterval(() => {
      setHeroImageIndex(prev => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(heroInterval);
  }, [heroImages.length]);


  return (
    <div
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50"
      style={{
        backgroundImage: `linear-gradient(rgba(147,51,234,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(147,51,234,0.05) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }}
    >
      {/* Hero Section */}
      {/* <section className="relative overflow-hidden pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <div
            id="hero-title"
            data-animate
            className={`transform transition-all duration-1000 ${isVisible["hero-title"]
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
              }`}
          >
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-800 bg-clip-text text-transparent mb-6 leading-tight">
              AI-Powered Fashion Imagery
            </h1>
            <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
              That Delivers{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Results
              </span>
            </div>
          </div>

          <div
            id="hero-subtitle"
            data-animate
            className={`transform transition-all duration-1000 delay-300 ${isVisible["hero-subtitle"]
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
              }`}
          >
            <p className="text-xl sm:text-2xl lg:text-3xl text-gray-700 mb-4 max-w-4xl mx-auto leading-relaxed">
              Your creative vision is our mission, bringing it to life is our
              expertise
            </p>
            <p className="text-lg sm:text-xl text-purple-600 font-semibold mb-12">
              Your vision, our expertise
            </p>
          </div>
        </div>
      </section> */}


      <section className="relative px-4 py-20 md:py-32 overflow-hidden">

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className={`transform transition-all duration-1000 ${isVisible.hero ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`} id="hero">
              {/* <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-pulse">
                <Sparkles className="w-4 h-4" />
                AI Fashion Shoots by SNIX
              </div> */}

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI-Powered Fashion Imagery
                </span>
                <span className="block">That Delivers <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Results</span> </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 mb-4">
                Your creative vision is our mission, bringing it to life is our expertise
              </p>

              <p className="text-lg md:text-xl text-gray-500 mb-8">
                <span className="font-bold text-purple-600">Your vision, our expertise</span>
              </p>

            </div>

            {/* Right Side - Hero Image Carousel */}
            <div className="relative">
              <div className="relative w-5/6 h-80 md:h-[400px] lg:h-[500px] rounded-3xl mx-auto overflow-hidden shadow-2xl">
                {heroImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ${index === heroImageIndex
                      ? 'opacity-100 scale-100'
                      : 'opacity-0 scale-105'
                      }`}
                  >
                    <img
                      src={image}
                      alt={`Fashion showcase ${index + 1}`}
                      className="w-full h-full object-top object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent"></div>
                  </div>
                ))}

                {/* Overlay content */}
                <div className="absolute bottom-6 left-6 right-6">
                  {/* <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4">
                    <p className="text-purple-600 font-semibold text-sm">AI Generated</p>
                    <p className="text-gray-800 font-bold">Professional Fashion Photography</p>
                  </div> */}
                </div>
              </div>


              {/* Floating stats */}
              <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-purple-100 animate-bounce">
                <div className="text-center">
                  <p className="text-2xl font-bold text-pink-600">3x</p>
                  <p className="text-sm text-gray-600">Faster Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            id="comparison-title"
            data-animate
            className={`text-center mb-16 transform transition-all duration-1000 ${isVisible["comparison-title"]
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
              }`}
          >
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              The old way drains resources, <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                the SNIX way conserves them
              </span>
            </h2>
          </div>

          <div
            id="pricing-cards"
            data-animate
            className={`transform transition-all duration-1000 delay-300 ${isVisible["pricing-cards"]
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
              }`}
          >
            <div className="bg-white/95 backdrop-blur-md border-2 border-purple-400/70 rounded-xl sm:rounded-2xl relative overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="bg-gradient-to-r from-purple-100 to-pink-100">
                      <th className="px-6 py-6 text-left text-lg font-bold text-gray-900 w-1/4">Feature</th>
                      <th className="px-6 py-6 text-center text-lg font-bold text-purple-600 w-1/4">
                        <div className="flex flex-col items-center">
                          <span className="text-xl mb-1">Basic</span>
                          <span className="text-2xl font-bold">$199</span>
                        </div>
                      </th>
                      <th className="px-6 py-6 text-center text-lg font-bold text-purple-600 w-1/4 relative">
                        <div className="flex flex-col items-center mt-2">
                          <span className="text-xl mb-1">Essentials</span>
                          <span className="text-2xl font-bold">$349</span>
                        </div>
                      </th>
                      <th className="px-6 py-6 text-center text-lg font-bold text-purple-600 w-1/4">
                        <div className="flex flex-col items-center">
                          <span className="text-xl mb-1">Premier</span>
                          <span className="text-2xl font-bold">Custom</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-6 font-semibold text-gray-900 text-lg">Number of Products</td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium">5</td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium bg-purple-50">10</td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium">50+</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-6 font-semibold text-gray-900 text-lg">Images per Product</td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium">Up to 5</td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium bg-purple-50">Up to 5</td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium">Customizable</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-6 font-semibold text-gray-900 text-lg">Videos per Product</td>
                      <td className="px-6 py-6 text-center">
                        <span className="text-red-500 font-medium">Not included</span>
                      </td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium bg-purple-50">
                        <div className="flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          1 × 10s HD video
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium">
                        <div className="flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          Customizable
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-6 font-semibold text-gray-900 text-lg">Pose Customization</td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium">Limited presets</td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium bg-purple-50">Expanded presets</td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium">Fully customizable</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-6 font-semibold text-gray-900 text-lg">Models per Category</td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium">1 model per demographic</td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium bg-purple-50">5 models per category</td>
                      <td className="px-6 py-6 text-center text-gray-700 font-medium">Exclusive & brand-owned</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-6 py-8">
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a href="/contactUs">
                    <button className="cursor-pointer bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      Get Plan
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div
            id="use-cases"
            data-animate
            className={`transform transition-all duration-1000 ${isVisible["use-cases"]
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
              }`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((useCase: string, index: number) => (
                <div
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-purple-100"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg text-white group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-4 h-4" />
                    </div>
                    <p className="ml-4 font-semibold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                      {useCase}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center">
          <div
            id="cta-section"
            data-animate
            className={`transform transition-all duration-1000 ${isVisible["cta-section"]
              ? "translate-y-0 opacity-100"
              : "translate-y-12 opacity-0"
              }`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Fashion Content?
            </h2>
            <p className="text-xl text-purple-100 mb-12 leading-relaxed">
              Our team of AI fashion experts will show you how SNIX can
              revolutionize your visual strategy.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/contactUs">
                <button className="group w-fit inline-flex items-center px-8 py-4 bg-white text-purple-600 cursor-pointer font-bold rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  Book Demo
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </a>

              {/* <a href="/contactUs">
              <button className="group w-fit inline-flex items-center ml-13 sm:ml-0 px-8 py-4 bg-transparent border-2 border-white cursor-pointer text-white font-bold rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105">
                Browse Our Portfolio
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              </a> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SolutionsPage;
