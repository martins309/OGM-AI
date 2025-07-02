import React, { useEffect, useState } from 'react';

export default function FloatingHero() {
  const [isIgnited, setIsIgnited] = useState(false);

  useEffect(() => {
    // Start ignition sequence after component mounts
    const timer = setTimeout(() => {
      setIsIgnited(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-96 flex items-center justify-center overflow-hidden">
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {/* Particle 1 - Top Left */}
        <div className="absolute top-12 left-16 w-3 h-3 bg-cyan-400/40 rounded-full animate-float-slow" />
        
        {/* Particle 2 - Top Right */}
        <div className="absolute top-20 right-20 w-2 h-2 bg-blue-500/50 rounded-full animate-float-medium" />
        
        {/* Particle 3 - Bottom Left */}
        <div className="absolute bottom-16 left-24 w-4 h-4 bg-purple-400/30 rounded-full animate-float-fast" />
        
        {/* Particle 4 - Bottom Right */}
        <div className="absolute bottom-24 right-16 w-2.5 h-2.5 bg-cyan-300/60 rounded-full animate-float-slow" />
        
        {/* Geometric Shape 1 */}
        <div className="absolute top-32 left-1/4 w-6 h-6 border border-cyan-400/30 rotate-45 animate-float-rotate" />
        
        {/* Geometric Shape 2 */}
        <div className="absolute bottom-32 right-1/4 w-8 h-8 border border-blue-500/25 animate-float-reverse" />
        
        {/* Energy Rings */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-cyan-400/10 rounded-full animate-pulse-ring" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-blue-500/5 rounded-full animate-pulse-ring-delayed" />
      </div>

      {/* Main Hero Image Container */}
      <div className="relative z-10 animate-float-primary">
        {/* Heat Distortion Effect */}
        <div className="absolute inset-0 animate-heat-distortion">
          <img
            src="/src/assets/images/finalHeroAi.png"
            alt="AI Automation Hero"
            className="w-80 h-80 object-contain drop-shadow-2xl transform-gpu will-change-transform"
            style={{
              filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.3))'
            }}
          />
        </div>

        {/* Flame Effects */}
        {isIgnited && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Primary Flame - Bottom Center */}
            <div 
              className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-24 rounded-t-full ${
                isIgnited ? 'animate-flame-ignition' : ''
              }`}
              style={{
                background: 'linear-gradient(to top, #ff6b35, #f7931e, #ffd23f)',
                clipPath: 'polygon(45% 100%, 55% 100%, 65% 80%, 70% 60%, 65% 40%, 60% 20%, 50% 0%, 40% 20%, 35% 40%, 30% 60%, 35% 80%)',
                animationDelay: '0s'
              }}
              onAnimationEnd={() => {
                const element = document.querySelector('.flame-1');
                if (element) {
                  element.classList.add('animate-flame-flicker-1');
                }
              }}
            >
              <div className="flame-1 w-full h-full" />
            </div>

            {/* Secondary Flame - Bottom Left */}
            <div 
              className={`absolute bottom-12 left-1/2 transform -translate-x-8 w-12 h-20 rounded-t-full ${
                isIgnited ? 'animate-flame-ignition' : ''
              }`}
              style={{
                background: 'linear-gradient(to top, #ff5722, #ff9800, #ffeb3b)',
                clipPath: 'polygon(40% 100%, 60% 100%, 70% 75%, 65% 50%, 55% 25%, 45% 0%, 35% 25%, 25% 50%, 30% 75%)',
                animationDelay: '0.3s'
              }}
              onAnimationEnd={() => {
                const element = document.querySelector('.flame-2');
                if (element) {
                  element.classList.add('animate-flame-flicker-2');
                }
              }}
            >
              <div className="flame-2 w-full h-full" />
            </div>

            {/* Tertiary Flame - Bottom Right */}
            <div 
              className={`absolute bottom-12 left-1/2 transform translate-x-4 w-10 h-16 rounded-t-full ${
                isIgnited ? 'animate-flame-ignition' : ''
              }`}
              style={{
                background: 'linear-gradient(to top, #d84315, #f57c00, #fff59d)',
                clipPath: 'polygon(42% 100%, 58% 100%, 68% 70%, 62% 45%, 52% 20%, 48% 0%, 38% 20%, 28% 45%, 32% 70%)',
                animationDelay: '0.6s'
              }}
              onAnimationEnd={() => {
                const element = document.querySelector('.flame-3');
                if (element) {
                  element.classList.add('animate-flame-flicker-3');
                }
              }}
            >
              <div className="flame-3 w-full h-full" />
            </div>

            {/* Small Spark Flames */}
            <div 
              className={`absolute bottom-6 left-1/2 transform -translate-x-12 w-6 h-10 rounded-t-full ${
                isIgnited ? 'animate-flame-ignition' : ''
              }`}
              style={{
                background: 'linear-gradient(to top, #ff8f00, #ffb300, #ffff8d)',
                clipPath: 'polygon(35% 100%, 65% 100%, 75% 60%, 65% 30%, 50% 0%, 35% 30%, 25% 60%)',
                animationDelay: '0.9s'
              }}
            >
              <div className="animate-flame-flicker-1" />
            </div>

            <div 
              className={`absolute bottom-6 left-1/2 transform translate-x-8 w-5 h-8 rounded-t-full ${
                isIgnited ? 'animate-flame-ignition' : ''
              }`}
              style={{
                background: 'linear-gradient(to top, #ff6f00, #ffa000, #fff176)',
                clipPath: 'polygon(40% 100%, 60% 100%, 70% 55%, 60% 25%, 50% 0%, 40% 25%, 30% 55%)',
                animationDelay: '1.2s'
              }}
            >
              <div className="animate-flame-flicker-3" />
            </div>

            {/* Flame Glow Effects */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-gradient-radial from-orange-500/30 via-yellow-500/20 to-transparent rounded-full blur-xl animate-glow" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gradient-radial from-red-500/40 via-orange-500/25 to-transparent rounded-full blur-lg animate-pulse" />
          </div>
        )}
        
        {/* Original Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-glow" />
      </div>

      {/* Orbiting Elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 animate-orbit">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50" />
      </div>
      
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 animate-orbit-reverse">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
      </div>
    </div>
  );
}