import { useEffect, useRef, useState } from "react";
import { Rocket, Users, Target, Headphones } from "lucide-react";

const SNIXSection3 = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [animatedNumbers, setAnimatedNumbers] = useState<{
    imagesGenerated: number;
    videosDelivered: number;
    successRate: number;
    support: number;
  }>({
    imagesGenerated: 0,
    videosDelivered: 0,
    successRate: 0,
    support: 0
  });


  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Number counting animation
  useEffect(() => {
    if (isVisible) {
      const duration = 5000; // 2 seconds
      const steps = 60; // 60 fps
      const interval = duration / steps;

      const targets = {
        imagesGenerated: 1000000,     // not "1M+"
        videosDelivered: 25000,       // not "25K+"
        successRate: 99,
        support: 24
      };



      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);

        setAnimatedNumbers({
          imagesGenerated: Math.floor(targets.imagesGenerated * easeOutQuart),
          videosDelivered: Math.floor(targets.videosDelivered * easeOutQuart),
          successRate: Math.floor(targets.successRate * easeOutQuart),
          support: Math.floor(targets.support * easeOutQuart)
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedNumbers(targets);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + "M+";
    if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + "K+";
    return num.toString();
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const stats = [
    {
      number: formatNumber(animatedNumbers.imagesGenerated),
      label: "Images Generated",
      icon: Rocket,
      description: "AI-powered creations"
    },
    {
      number: formatNumber(animatedNumbers.videosDelivered),
      label: "Videos Delivered",
      icon: Users,
      description: "Client-ready outputs"
    },
    {
      number: `${animatedNumbers.successRate}%`,
      label: "Success Rate",
      icon: Target,
      description: "Project completion"
    },
    {
      number: `${animatedNumbers.support}/7`,
      label: "Support Available",
      icon: Headphones,
      description: "Round-the-clock help"
    }
  ];



  return (
    <section
      ref={containerRef}
      className="hero-stats-section"
      onMouseMove={handleMouseMove}
    >
      {/* Enhanced Background */}
      <div className="stats-background">
        <div className="gradient-overlay"></div>
        <div className="pattern-overlay"></div>
        <div
          className="interactive-glow"
          style={{
            "--mouse-x": `${mousePosition.x}%`,
            "--mouse-y": `${mousePosition.y}%`,
          } as React.CSSProperties}
        />
      </div>

      {/* Content Container */}
      <div className="stats-container">
        {/* Header Section */}
        <div className={`stats-header ${isVisible ? "animate-in" : ""}`}>
          <div className="eyebrow">
            <span className="eyebrow-dot"></span>
            Our Numbers
            <span className="eyebrow-line"></span>
          </div>

          <h2 className="stats-title">
            Delivering Excellence
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Consistently</span>
          </h2>

          <p className="font-normal text-base sm:text-lg leading-relaxed text-gray-600 max-w-2xl mx-auto animate-[fadeInUp_0.6s_ease-out_0.6s_both]">
            <span className="block">Numbers that reflect our commitment to creating exceptional digital experiences</span>
            <span className="block">and building lasting partnerships with forward-thinking brands.</span>
          </p>
        </div>

        {/* Single Glassmorphic Stats Card */}
        <div className={`stats-card ${isVisible ? "animate-in" : ""}`}>
          <div className="card-glass">
            <div className="card-border"></div>

            {/* Stats Grid Inside Card */}
            <div className="stats-grid">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div
                    key={index}
                    className="stat-item"
                    style={{ "--index": index } as React.CSSProperties}
                  >

                    <div className="stat-icon">
                      <IconComponent size={32} />
                    </div>
                    <div className="stat-content">
                      <div className="stat-number">{stat.number}</div>
                      <div className="stat-label">{stat.label}</div>
                      <div className="stat-description">{stat.description}</div>
                    </div>
                    <div className="stat-glow"></div>
                  </div>
                );
              })}
            </div>

            {/* Card Decorations */}
            <div className="card-decoration-1"></div>
            <div className="card-decoration-2"></div>
            <div className="card-decoration-3"></div>
          </div>
        </div>

        {/* Bottom Quote */}
        <div className={`stats-quote ${isVisible ? "animate-in" : ""}`}>
          <p>
            "Innovation through collaboration, excellence through dedication"
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="float-1"></div>
        <div className="float-2"></div>
        <div className="float-3"></div>
        <div className="float-4"></div>
      </div>

      <style>{`
        .hero-stats-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 4rem 2rem;
        }

        .stats-background {
          position: absolute;
          inset: 0;
          z-index: 1;
        }

        .gradient-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              circle at 25% 25%,
              rgba(147, 51, 234, 0.08) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 75% 75%,
              rgba(236, 72, 153, 0.06) 0%,
              transparent 50%
            ),
            radial-gradient(
              circle at 50% 50%,
              rgba(168, 85, 247, 0.04) 0%,
              transparent 50%
            );
        }

        .pattern-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.02;
          background-image: radial-gradient(
              circle at 20% 30%,
              rgb(147, 51, 234) 1px,
              transparent 1px
            ),
            radial-gradient(circle at 80% 70%, rgb(236, 72, 153) 1px, transparent 1px);
          background-size: 80px 80px, 120px 120px;
          background-position: 0 0, 40px 40px;
        }

        .interactive-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(147, 51, 234, 0.04),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .hero-stats-section:hover .interactive-glow {
          opacity: 1;
        }

        .stats-container {
          position: relative;
          z-index: 2;
          max-width: 1200px;
          width: 100%;
          text-align: center;
        }

        .stats-header {
          margin-bottom: 4rem;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .stats-header.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-weight: 500;
          font-size: 0.875rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          background: linear-gradient(135deg, rgb(147, 51, 234), rgb(236, 72, 153));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 1.5rem;
          animation: fadeInUp 0.6s ease-out 0.2s both;
        }

        .eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(147, 51, 234), rgb(236, 72, 153));
          box-shadow: 0 0 10px rgba(147, 51, 234, 0.4);
        }

        .eyebrow-line {
          width: 30px;
          height: 1px;
          background: linear-gradient(90deg, rgb(147, 51, 234), transparent);
        }

        .stats-title {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-weight: 700;
          font-size: clamp(2rem, 6vw, 3.5rem);
          line-height: 1.1;
          color: #1a1a1a;
          margin-bottom: 1.5rem;
          animation: fadeInUp 0.6s ease-out 0.4s both;
          letter-spacing: -0.02em;
        }

        .stats-description {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-weight: 400;
          font-size: clamp(1rem, 2vw, 1.125rem);
          line-height: 1.6;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          animation: fadeInUp 0.6s ease-out 0.6s both;
        }

        .stats-card {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          margin-bottom: 3rem;
        }

        .stats-card.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition-delay: 0.8s;
        }

        .card-glass {
          position: relative;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          border-radius: 2rem;
          padding: clamp(2rem, 4vw, 3rem);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
          overflow: hidden;
          transition: all 0.3s ease;
          border-color: rgba(147, 51, 234, 0.3);
        }

        .card-glass:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(147, 51, 234, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.6);
          
        }

        .card-border {
          position: absolute;
          inset: 0;
          border-radius: 2rem;
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
          opacity: 1; /* Changed from 0 to 0.5 for initial visibility */
          transition: opacity 0.3s ease;
        }

        .card-glass:hover .card-border {
          opacity: 1; /* Full opacity on hover */
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: clamp(1.5rem, 3vw, 2rem);
          position: relative;
          z-index: 2;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          position: relative;
          opacity: 0;
          transform: translateY(20px);
          animation: statItemIn 0.6s ease-out forwards;
          animation-delay: calc(1s + var(--index) * 0.1s);
          padding: 1rem;
        }

        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: clamp(56px, 8vw, 64px);
          height: clamp(56px, 8vw, 64px);
          border-radius: 16px;
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1));
          border: 1px solid rgba(147, 51, 234, 0.2);
          background: linear-gradient(135deg, rgb(147, 51, 234), rgb(236, 72, 153));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 4px 12px rgba(147, 51, 234, 0.2));
          animation: iconFloat 3s ease-in-out infinite;
          animation-delay: calc(var(--index) * 0.5s);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .stat-item:hover .stat-icon {
          transform: scale(1.1) translateY(-2px);
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2));
          border-color: rgba(147, 51, 234, 0.4);
          // box-shadow: 0 8px 24px rgba(147, 51, 234, 0.3);
        }

        .stat-content {
          text-align: center;
        }

        .stat-number {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-weight: 800;
          font-size: clamp(1.8rem, 5vw, 2.8rem);
          line-height: 1;
          background: linear-gradient(135deg, #1a1a1a 0%, #4a5568 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
          transition: all 0.3s ease;
        }

        .stat-item:hover .stat-number {
          background: linear-gradient(135deg, rgb(147, 51, 234) 0%, rgb(236, 72, 153) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          transform: scale(1.05);
        }

        .stat-label {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-weight: 500;
          font-size: clamp(0.85rem, 2vw, 0.95rem);
          color: #666;
          letter-spacing: -0.01em;
          margin-bottom: 0.25rem;
        }

        .stat-description {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-weight: 400;
          font-size: clamp(0.75rem, 1.5vw, 0.8rem);
          color: #999;
          letter-spacing: -0.01em;
          opacity: 0.8;
        }

        .stat-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(147, 51, 234, 0.1) 0%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .stat-item:hover .stat-glow {
          opacity: 1;
        }

        .card-decoration-1,
        .card-decoration-2,
        .card-decoration-3 {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            rgba(147, 51, 234, 0.1),
            rgba(236, 72, 153, 0.1)
          );
          filter: blur(1px);
        }

        .card-decoration-1 {
          width: clamp(40px, 6vw, 60px);
          height: clamp(40px, 6vw, 60px);
          top: 10%;
          right: 10%;
          animation: decorFloat1 8s ease-in-out infinite;
        }

        .card-decoration-2 {
          width: clamp(30px, 4vw, 40px);
          height: clamp(30px, 4vw, 40px);
          bottom: 15%;
          left: 15%;
          animation: decorFloat2 10s ease-in-out infinite reverse;
        }

        .card-decoration-3 {
          width: clamp(20px, 3vw, 30px);
          height: clamp(20px, 3vw, 30px);
          top: 60%;
          right: 20%;
          animation: decorFloat3 12s ease-in-out infinite;
        }

        .stats-quote {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease;
          transition-delay: 1.5s;
        }

        .stats-quote.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .stats-quote p {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          font-weight: 400;
          font-size: clamp(0.9rem, 2vw, 1rem);
          color: #9ca3af;
          font-style: italic;
          margin: 0;
        }

        .floating-elements {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .float-1,
        .float-2,
        .float-3,
        .float-4 {
          position: absolute;
          border-radius: 50%;
          filter: blur(1px);
        }

        .float-1 {
          width: clamp(60px, 8vw, 100px);
          height: clamp(60px, 8vw, 100px);
          background: linear-gradient(
            135deg,
            rgba(147, 51, 234, 0.08),
            rgba(236, 72, 153, 0.12)
          );
          top: 15%;
          left: 8%;
          animation: float1 10s ease-in-out infinite;
        }

        .float-2 {
          width: clamp(48px, 6vw, 80px);
          height: clamp(48px, 6vw, 80px);
          background: linear-gradient(
            135deg,
            rgba(236, 72, 153, 0.08),
            rgba(147, 51, 234, 0.08)
          );
          top: 70%;
          right: 12%;
          animation: float2 12s ease-in-out infinite reverse;
        }

        .float-3 {
          width: clamp(36px, 5vw, 60px);
          height: clamp(36px, 5vw, 60px);
          background: linear-gradient(
            135deg,
            rgba(147, 51, 234, 0.12),
            rgba(236, 72, 153, 0.08)
          );
          bottom: 20%;
          left: 15%;
          animation: float3 14s ease-in-out infinite;
        }

        .float-4 {
          width: clamp(24px, 3vw, 40px);
          height: clamp(24px, 3vw, 40px);
          background: linear-gradient(
            135deg,
            rgba(147, 51, 234, 0.1),
            rgba(236, 72, 153, 0.08)
          );
          top: 40%;
          right: 8%;
          animation: float4 16s ease-in-out infinite;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes statItemIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconFloat {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-5px) rotate(2deg);
          }
        }

        @keyframes decorFloat1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(15px, -20px) scale(1.1);
          }
          66% {
            transform: translate(-10px, 15px) scale(0.9);
          }
        }

        @keyframes decorFloat2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-20px, -15px) scale(1.15);
          }
        }

        @keyframes decorFloat3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(10px, -15px) scale(0.95);
          }
          75% {
            transform: translate(-8px, 12px) scale(1.05);
          }
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(25px, -30px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 25px) scale(0.9);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-30px, -25px) scale(1.15);
          }
        }

        @keyframes float3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -25px) scale(0.95);
          }
          75% {
            transform: translate(-15px, 20px) scale(1.05);
          }
        }

        @keyframes float4 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(15px, -20px) scale(1.1);
          }
        }

        /* Mobile Optimizations */
        @media (max-width: 1024px) {
          .hero-stats-section {
            padding: 3rem 1.5rem;
          }
          
          .stats-container {
            max-width: 100%;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-stats-section {
            padding: 2.5rem 1rem;
            min-height: auto;
          }

          .stats-header {
            margin-bottom: 3rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.25rem;
          }

          .card-glass {
            border-radius: 1.5rem;
          }

          .stat-item {
            gap: 0.75rem;
            padding: 0.75rem;
          }

          .stat-icon {
            width: 48px;
            height: 48px;
          }

          .eyebrow {
            font-size: 0.8rem;
            gap: 0.4rem;
          }

          .eyebrow-line {
            width: 20px;
          }
        }

        @media (max-width: 640px) {
          .hero-stats-section {
            padding: 2rem 1rem;
          }

          .stats-header {
            margin-bottom: 2.5rem;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .card-glass {
            padding: 1.5rem 1rem;
            border-radius: 1.25rem;
          }

          .stat-item {
            gap: 0.5rem;
            padding: 0.5rem;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
            border-radius: 12px;
          }
        }

        @media (max-width: 480px) {
          .hero-stats-section {
            padding: 1.5rem 0.75rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
            max-width: 280px;
            margin: 0 auto;
          }

          .card-glass {
            padding: 1.5rem 1rem;
          }

          .stat-item {
            gap: 0.75rem;
            padding: 1rem 0.5rem;
          }

          .eyebrow {
            font-size: 0.75rem;
            margin-bottom: 1rem;
          }

          .stats-header {
            margin-bottom: 2rem;
          }

          .stats-card {
            margin-bottom: 2rem;
          }
        }

        /* Extra small devices */
        @media (max-width: 360px) {
          .hero-stats-section {
            padding: 1rem 0.5rem;
          }

          .stats-grid {
            max-width: 240px;
            gap: 1.25rem;
          }

          .card-glass {
            padding: 1.25rem 0.75rem;
          }

          .stat-icon {
            width: 36px;
            height: 36px;
          }
        }

        /* Large screens optimization */
        @media (min-width: 1440px) {
          .stats-container {
            max-width: 1400px;
          }

          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 2.5rem;
          }

          .card-glass {
            padding: 3.5rem 3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default SNIXSection3;