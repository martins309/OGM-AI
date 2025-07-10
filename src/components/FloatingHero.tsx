import React from 'react';

export default function FloatingHero() {
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

      {/* Main Hero Image */}
      <div className="relative z-10 animate-float-primary">
        <img
          src="/finalHeroAi.png"
          alt="AI Automation Hero"
          className="w-80 h-80 object-contain drop-shadow-2xl transform-gpu"
          style={{
            filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.3))'
          }}
        />
        
        {/* Glow Effect */}
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