import React, { useState, useEffect } from 'react';
import InvestorProfileSection from './InvestorProfileSection';
import PersonalityProfileSection from './PersonalityProfileSection';
import ModernPortfolioChart from './ModernPortfolioChart';
import EmergencyFundReport from './EmergencyFundReport';
import RentaVariableSection from './RentaVariableSection';
import StrategiesSection from './strategiesSection';
import EducationalGuide from './EducationalGuide';
import RentaFijaSection from './RentaFijaSection';
import PersonalityDimensionsChart from './PersonalityDimensionsChart';

const ModernInvestorProfile = ({ result, onRestart }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {

    console.log('result.personality completo:', result.personality);
  console.log('profile percentage dimensions:', result.personality?.dimensions);
  
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress((window.scrollY / totalHeight) * 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [result]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [result]);
// Función auxiliar para convertir riskProfile a valor numérico
  const getRiskScaleValue = (riskProfile) => {
    switch (riskProfile?.toLowerCase()) {
      case 'bajo riesgo':
      case 'conservador': return 20;
      case 'riesgo moderado':
      case 'moderado': return 50;
      case 'alto riesgo':
      case 'agresivo': return 80;
      default: return 5;
    }
  };

  // Función auxiliar para obtener color del riesgo
  const getRiskColor = (riskProfile) => {
    switch (riskProfile?.toLowerCase()) {
      case 'bajo riesgo':
      case 'conservador': return 'green';
      case 'riesgo moderado':
      case 'moderado': return 'yellow';
      case 'alto riesgo':
      case 'agresivo': return 'red';
      default: return 'blue';
    };
  };
  // Mapear los datos del backend a la estructura que esperan los componentes
  const mapBackendData = (backendResult) => {
    
    if (!backendResult) {
      return null;
    }
    // Usar la estructura real que envía el backend
    const investorProfile = backendResult.investorProfile || {
      investorType: 'Inversor',
      mainObjective: 'Crecimiento patrimonial',
      experienceLevel: backendResult.experienceLevel || 'Principiante',
      timeHorizon: 'Largo plazo'
    };

    const riskScale = {
      value: getRiskScaleValue(backendResult.riskProfile),
      color: getRiskColor(backendResult.riskProfile)
    };

    const result = {
      investorProfile: { 
        profile: investorProfile, 
        riskScale 
      },
      portfolio: backendResult.portfolio,                    // Usar directamente
      report: backendResult.report || null,
      investmentStrategies: backendResult.investmentStrategies || null,
      rentaVariableAdvice: backendResult.rentaVariableAdvice || null,
      rentaFijaAdvice: backendResult.rentaFijaAdvice || null,
      educationalGuide: backendResult.educationalGuide || null,
      originalData: backendResult
    };
    
    return result;
  };

  // Mapear los datos
  const mappedResult = mapBackendData(result);
  if (!mappedResult) {
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
          CONSTRUYE TU
          <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            FUTURO
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.3s_forwards]">
          El plan de inversión basado en perfiles similares al tuyo🚀
        </p>
      </header>

      <div className="max-w-6xl mx-auto py-12 space-y-8 relative z-10">
        
        {mappedResult.investorProfile && <InvestorProfileSection profileData={mappedResult.investorProfile} />}
        {result.personality?.dimensions && (
          <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <PersonalityDimensionsChart dimensions={result.personality.dimensions} />
          </div>
          </div>
        )}
        {result.personality && <PersonalityProfileSection archetypeDetails={result.personality.archetypeDetails} />}
        {mappedResult.portfolio && <ModernPortfolioChart portfolio={mappedResult.portfolio} />}
        {mappedResult.report && <EmergencyFundReport report={mappedResult.report} />}
        {result.rentaFijaAdvice && <RentaFijaSection rentaFijaAdvice={result.rentaFijaAdvice} />}
        {result.rentaVariableAdvice && <RentaVariableSection rentaVariableAdvice={result.rentaVariableAdvice} />}
        {result.investmentStrategies && <StrategiesSection strategies={result.investmentStrategies} />}
        {mappedResult.educationalGuide && <EducationalGuide guide={mappedResult.educationalGuide} />}
      </div>

      <div className="text-center mt-12 relative z-10">
        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transform">
          🚀 ¡Empezar a Invertir!
        </button>
        <button onClick={onRestart} className="ml-4 px-8 py-4 bg-gray-200 text-gray-800 rounded-full font-semibold hover:bg-gray-300 transition-colors">Reiniciar Quiz</button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ModernInvestorProfile;
