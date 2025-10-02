import React, { useState, useEffect } from 'react';

const RiskMeter = ({ value, color, profileData }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="relative">
      <div className="w-full h-4 bg-gray-800/20 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
          style={{
            width: `${animatedValue}%`,
            background: `linear-gradient(90deg, ${color="#800080"}88 0%, ${color} 50%, ${color}CC 100%)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-bounce" />
        </div>
      </div>
      <div className="text-center mt-3">
        <div className={`inline-flex items-center px-4 py-2 rounded-full font-bold text-sm`} style={{ backgroundColor: `${color}20`, color }}>
          {value > 66 ? '🚀' : value > 33 ? '⚡' : '🐌'} {value}/100 {profileData.profile.investorType}
        </div>
      </div>
    </div>
  );
};

export default RiskMeter;