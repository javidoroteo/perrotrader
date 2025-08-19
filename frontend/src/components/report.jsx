import React, { useState, useEffect } from 'react';
import InvestorProfileSection from './InvestorProfileSection';
import ModernPortfolioChart from './ModernPortfolioChart';
import EmergencyFundReport from './EmergencyFundReport';
import EducationalGuide from './EducationalGuide';
import RecommendationsSection from './RecommendationSection';

const ModernInvestorProfile = ({ result, onRestart }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    console.log('Datos del backend en Reporte:', result);
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [result]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <p className="text-xl text-gray-800">Completa el quiz para ver tu reporte.</p>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 relative overflow-hidden">
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      <header className="text-center mb-10 relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-gray-800 leading-tight opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards]">
          Welcome to your
          <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Financial Future
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.3s_forwards]">
          Tu plan de inversión único, creado específicamente para ti 🚀
        </p>
      </header>

      <div className="max-w-6xl mx-auto py-12 space-y-8 relative z-10">
        {result.investorProfile && <InvestorProfileSection profileData={result.investorProfile} />}
        {result.portfolio && <ModernPortfolioChart portfolio={result.portfolio} />}
        {result.recommendations && <RecommendationsSection recommendations={result.recommendations} />}
        {result.report && <EmergencyFundReport report={result.report} />}
        {result.educationalGuide && <EducationalGuide guide={result.educationalGuide} />}
      </div>

      <div className="text-center mt-12 relative z-10">
        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transform">
          🚀 ¡Empezar a Invertir!
        </button>
        <button onClick={onRestart} className="ml-4 px-8 py-4 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition-colors">Reiniciar Quiz</button>
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default ModernInvestorProfile;