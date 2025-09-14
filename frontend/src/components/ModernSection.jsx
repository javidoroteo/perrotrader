import React, { useState, useRef } from 'react';
import { ChevronDown, Eye, EyeOff, Sparkles, Star } from 'lucide-react';

const ModernSection = ({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
  gradient = 'from-blue-500 to-purple-600',
  glow = 'blue',
  priority = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isHovered, setIsHovered] = useState(false);
  const headerRef = useRef(null);

  const glowColors = {
    blue: 'shadow-blue-500/25',
    purple: 'shadow-purple-500/25',
    green: 'shadow-green-500/25',
    orange: 'shadow-orange-500/25',
    pink: 'shadow-pink-500/25',
    yellow: 'shadow-yellow-500/25'
  };

  const handleToggle = () => {
    setIsOpen((prev) => {
      const next = !prev;
      if (!prev && headerRef.current) {
        setTimeout(() => {
          headerRef.current.scrollIntoView({ block: 'start' });
        }, 300);
      }
      return next;
    });
  };

  return (
    <div
      className={`
        relative mb-4 sm:mb-6 lg:mb-8 
        mx-2 sm:mx-0
        rounded-2xl sm:rounded-3xl 
        backdrop-blur-xl bg-white/10 border border-white/20 
        overflow-hidden transition-all duration-500 
        hover:scale-[1.005] sm:hover:scale-[1.01] 
        hover:shadow-xl sm:hover:shadow-2xl 
        ${glowColors[glow]} 
        ${priority ? 'ring-1 sm:ring-2 ring-yellow-400/50 shadow-yellow-400/20' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 transition-opacity duration-300 ${isHovered ? 'opacity-10' : ''}`} />

      <div
        ref={headerRef}
        onClick={handleToggle}
        className="relative cursor-pointer px-3 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/15 transition-all duration-300"
      >
        <div className="flex items-start sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className={`
              relative p-2 sm:p-2.5 lg:p-3 
              rounded-xl sm:rounded-2xl 
              bg-gradient-to-br ${gradient} shadow-lg 
              transform transition-transform duration-300 
              flex-shrink-0
              ${isHovered ? 'scale-105 sm:scale-110 rotate-1 sm:rotate-3' : ''}
            `}>
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
              {priority && (
                <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-1.5 h-1.5 sm:w-2 sm:h-2 text-yellow-900" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="
                text-base sm:text-lg lg:text-xl font-bold 
                bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent
                leading-tight sm:leading-normal
                break-words
              ">
                {title}
              </h3>
              {priority && (
                <div className="flex items-center mt-0.5 sm:mt-1">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1 flex-shrink-0" />
                  <span className="text-xs font-medium text-yellow-600">Prioritario</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {isOpen ? (
              <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            ) : (
              <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            )}
            <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="relative px-3 sm:px-6 lg:px-8 py-4 sm:py-5 lg:py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModernSection;
