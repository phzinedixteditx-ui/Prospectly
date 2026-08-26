import React from 'react';

export const LightBeamBackground: React.FC<{ opacity?: number }> = ({ opacity = 1 }) => {
  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none z-0" 
      style={{ opacity, willChange: 'transform' }}
    >
      {/* Deep black background */}
      <div className="absolute inset-0 bg-[#070709]" />

      {/* GPU Accelerated Smooth Chromatic Light Beam */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[500px] pointer-events-none">
        
        {/* Upper Amber / Orange Glow Layer */}
        <div 
          className="absolute inset-x-0 top-1/4 h-32 rounded-full transform -rotate-6 scale-110 opacity-70 animate-beam-fluid-1"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(249, 115, 22, 0.45), rgba(217, 119, 6, 0.15), transparent 70%)',
            filter: 'blur(35px)',
            transform: 'translate3d(0, 0, 0) rotate(-6deg)'
          }}
        />

        {/* Lower Cyan / Electric Blue Glow Layer */}
        <div 
          className="absolute inset-x-0 bottom-1/4 h-36 rounded-full transform -rotate-6 scale-110 opacity-60 animate-beam-fluid-2"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 50%, rgba(14, 165, 233, 0.45), rgba(37, 99, 235, 0.15), transparent 70%)',
            filter: 'blur(40px)',
            transform: 'translate3d(0, 0, 0) rotate(-6deg)'
          }}
        />

        {/* Central Intense Rainbow Chromatic Light Ribbon */}
        <div 
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-14 opacity-90 transform -rotate-6 animate-beam-flow"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(245, 158, 11, 0.7) 15%, rgba(255, 255, 255, 0.95) 45%, rgba(255, 255, 255, 1) 50%, rgba(224, 242, 254, 0.95) 55%, rgba(14, 165, 233, 0.8) 85%, transparent 100%)',
            filter: 'blur(8px)',
            transform: 'translate3d(0, 0, 0) rotate(-6deg)'
          }}
        />

        {/* Razor-Sharp Blazing White Core Line */}
        <div 
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2.5 opacity-100 transform -rotate-6"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(251, 146, 60, 0.6) 20%, #ffffff 40%, #ffffff 60%, rgba(56, 189, 248, 0.6) 80%, transparent 100%)',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.95), 0 0 50px rgba(14, 165, 233, 0.6), 0 0 80px rgba(249, 115, 22, 0.5)',
            transform: 'translate3d(0, 0, 0) rotate(-6deg)'
          }}
        />

        {/* Smooth Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-[#070709] opacity-75" />
      </div>
    </div>
  );
};
