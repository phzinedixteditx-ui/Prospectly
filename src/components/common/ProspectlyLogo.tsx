import React from 'react';

interface Props {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const ProspectlyLogo: React.FC<Props> = ({ 
  className = '', 
  size = 'md', 
  showText = true 
}) => {
  const sizeMap = {
    sm: { box: 'w-7 h-7', svg: 'w-4 h-4', text: 'text-sm' },
    md: { box: 'w-8 h-8', svg: 'w-5 h-5', text: 'text-base' },
    lg: { box: 'w-10 h-10', svg: 'w-6 h-6', text: 'text-lg' },
    xl: { box: 'w-12 h-12', svg: 'w-7 h-7', text: 'text-2xl' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none group cursor-pointer ${className}`}>
      {/* Black & White PS Monogram Icon Box */}
      <div 
        className={`${currentSize.box} rounded-xl bg-zinc-950 border border-zinc-700/80 flex items-center justify-center shadow-lg shadow-black/40 group-hover:border-zinc-500 transition-all duration-300 relative overflow-hidden`}
      >
        {/* Subtle interior glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
        
        {/* Geometric PS Monogram Vector */}
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className={`${currentSize.svg} text-white transition-transform duration-300 group-hover:scale-105`}
        >
          {/* Letter P stem and loop */}
          <path 
            d="M8 6V26" 
            stroke="currentColor" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
          />
          <path 
            d="M8 6H16.5C19.5376 6 22 8.23858 22 11C22 13.7614 19.5376 16 16.5 16H8" 
            stroke="currentColor" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
          {/* Letter S swoosh interwoven with P */}
          <path 
            d="M24 16.5C21.5 14.5 16 14.5 14 17C12 19.5 13 22 17 22.5C21 23 23.5 24 23 26.5C22.5 29 18 29.5 13 28" 
            stroke="#e4e4e7" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Brand Text in Crisp Monochrome */}
      {showText && (
        <div className="flex flex-col">
          <span className={`font-extrabold tracking-tight text-white flex items-center gap-1 ${currentSize.text}`}>
            Prospectly
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-100 animate-pulse" />
          </span>
        </div>
      )}
    </div>
  );
};
