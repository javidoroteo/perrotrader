import React from 'react';

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
    <div className="relative">
      <div className="w-24 h-24 border-4 border-purple-300/30 border-t-purple-600 rounded-full spinner"></div>
      <div className="absolute inset-0 w-24 h-24 border-4 border-blue-300/30 border-b-blue-600 rounded-full spinner-reverse"></div>
      <div className="absolute inset-2 w-20 h-20 border-2 border-pink-300/30 border-r-pink-600 rounded-full spinner"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;