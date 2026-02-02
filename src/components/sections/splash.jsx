import React, { useState, useEffect } from 'react';
import l1 from "/src/assets/pic/logo_ras1.png";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setLogoLoaded(true);
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsVisible(false), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => {
      clearTimeout(logoTimer);
      clearInterval(progressInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-200 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Animated circles in background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-indigo-500/10 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-md mx-auto">
        {/* Logo area */}
        <div className={`mb-8 transition-all duration-1000 ${logoLoaded ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
          <div className="relative">
            {/* Logo container with glow effect */}
            <div className="relative p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
              <img 
                src={l1} 
                alt="IEEE RAS ISIMS Logo" 
                className="relative w-100 h-100 mx-auto object-contain filter drop-shadow-lg"
                onError={(e) => {
                  // Fallback si l'image ne charge pas
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              {/* Fallback logo si l'image ne charge pas */}
              <div 
                className="relative w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full items-center justify-center text-white font-bold text-lg hidden"
              >
                IEEE<br/>RAS
              </div>
            </div>
            
            {/* Rotating elements around logo */}
            <div className="absolute inset-0 animate-spin-slow">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-60"
                  style={{
                    transform: `rotate(${i * 60}deg) translateY(-80px)`,
                    transformOrigin: '50% 80px'
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className={`transition-all duration-1000 delay-300 ${logoLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent mb-3">
            IEEE RAS
          </h1>
          <h2 className="text-xl md:text-2xl font-light text-blue-200 mb-2">ISIMS</h2>
          <p className="text-sm text-blue-100/80 mb-8 max-w-sm mx-auto leading-relaxed">
            Robotics and Automation Society
          </p>
        </div>

        {/* Progress bar */}
        <div className={`w-72 mx-auto transition-all duration-1000 delay-500 ${logoLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="bg-white/20 backdrop-blur-sm rounded-full h-3 mb-3 overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-300 ease-out rounded-full shadow-lg"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-blue-200/80">
            <span className="font-medium">Loading...</span>
            <span className="font-mono">{progress}%</span>
          </div>
        </div>

        {/* Tagline */}
        <div className={`mt-8 transition-all duration-1000 delay-700 ${logoLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="flex items-center justify-center space-x-3 text-purple-200/80">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
            <p className="text-xs uppercase tracking-widest font-medium">
              Robotics • Automation • Innovation
            </p>
            <div className="w-8 h-px bg-gradient-to-l from-transparent via-purple-400 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Corner decorative elements */}
      <div className="absolute top-0 left-0 w-20 h-20">
        <div className="w-full h-full border-l-2 border-t-2 border-blue-400/30 rounded-tl-lg"></div>
      </div>
      <div className="absolute top-0 right-0 w-20 h-20">
        <div className="w-full h-full border-r-2 border-t-2 border-purple-400/30 rounded-tr-lg"></div>
      </div>
      <div className="absolute bottom-0 left-0 w-20 h-20">
        <div className="w-full h-full border-l-2 border-b-2 border-purple-400/30 rounded-bl-lg"></div>
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20">
        <div className="w-full h-full border-r-2 border-b-2 border-blue-400/30 rounded-br-lg"></div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
}