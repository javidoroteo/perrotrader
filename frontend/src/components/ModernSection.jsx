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
          headerRef.current.scrollIntoView({ block: 'start' }); // instantáneo
        }, 300);
      }
      return next;
    });
  };

  return (
    <div
      className={`relative mb-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl ${glowColors[glow]} ${priority ? 'ring-2 ring-yellow-400/50 shadow-yellow-400/20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 transition-opacity duration-300 ${isHovered ? 'opacity-10' : ''}`} />

      <div
        ref={headerRef}
        onClick={handleToggle}
        className="relative cursor-pointer px-8 py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/15 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`relative p-3 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg transform transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
              <Icon className="w-6 h-6 text-white" />
              {priority && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-yellow-900" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {title}
              </h3>
              {priority && (
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-xs font-medium text-yellow-600">Prioritario</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isOpen ? (
              <EyeOff className="w-5 h-5 text-gray-600" />
            ) : (
              <Eye className="w-5 h-5 text-gray-600" />
            )}
            <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="relative px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModernSection;
