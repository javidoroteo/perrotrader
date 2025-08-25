import React from 'react';
import { TrendingUp, Target, CheckCircle, AlertCircle, Lightbulb, Star } from 'lucide-react';
import ModernSection from './ModernSection';

const StrategiesSection = ({ strategies }) => {
  if (!strategies || !strategies.strategies?.length) {
    return null;
  }

  const getStrategyIcon = (strategyName) => {
    const name = strategyName?.toLowerCase() || '';
    if (name.includes('dca') || name.includes('averaging')) return Target;
    if (name.includes('core') || name.includes('satellite')) return TrendingUp;
    if (name.includes('rebalancing')) return CheckCircle;
    if (name.includes('dip')) return AlertCircle;
    return Lightbulb;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'from-yellow-500 to-orange-600';
      case 'medium': return 'from-blue-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityGlow = (priority) => {
    switch (priority) {
      case 'high': return 'orange';
      case 'medium': return 'blue';
      default: return 'gray';
    }
  };

  return (
    <ModernSection
      title="Estrategias de Inversión"
      icon={TrendingUp}
      defaultOpen={false}
      gradient="from-indigo-500 to-purple-600"
      glow="purple"
    >
      <div className="space-y-6">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 mb-2">
            {strategies.description}
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center">
              <Target className="w-4 h-4 mr-1" />
              Perfil: {strategies.userProfile?.riskProfile}
            </span>
            <span className="flex items-center">
              <Lightbulb className="w-4 h-4 mr-1" />
              Experiencia: {strategies.userProfile?.experienceLevel}
            </span>
          </div>
        </div>

        <div className="grid gap-6">
          {strategies.strategies.map((strategy, index) => {
            const IconComponent = getStrategyIcon(strategy.name);
            const isHighPriority = strategy.priority === 'high';
            
            return (
              <div
                key={index}
                className={`relative rounded-2xl backdrop-blur-lg bg-white/15 border border-white/30 p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/20 ${
                  isHighPriority ? 'ring-2 ring-yellow-400/50 shadow-yellow-400/20' : ''
                }`}
              >
                {isHighPriority && (
                  <div className="absolute top-4 right-4 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs font-semibold text-yellow-600 bg-yellow-100/80 px-2 py-1 rounded-full">
                      Recomendada
                    </span>
                  </div>
                )}

                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${getPriorityColor(strategy.priority)} shadow-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {strategy.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 italic">
                      {strategy.shortDescription}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-blue-600" />
                          ¿Por qué es ideal para ti?
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {strategy.personalizedReason}
                        </p>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                          ¿Cómo funciona?
                        </h4>
                        <p className="text-gray-700 text-sm leading-relaxed mb-3">
                          {strategy.howItWorks}
                        </p>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4">
                          <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Ventajas
                          </h4>
                          <ul className="space-y-1">
                            {strategy.advantages?.map((advantage, idx) => (
                              <li key={idx} className="text-sm text-green-700 flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 mr-2 flex-shrink-0" />
                                {advantage}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                          <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-2" />
                            Consideraciones
                          </h4>
                          <ul className="space-y-1">
                            {strategy.disadvantages?.map((disadvantage, idx) => (
                              <li key={idx} className="text-sm text-orange-700 flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 mr-2 flex-shrink-0" />
                                {disadvantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl border border-purple-200">
          <div className="flex items-center mb-3">
            <Lightbulb className="w-5 h-5 text-purple-600 mr-2" />
            <h4 className="font-semibold text-purple-800">Consejo General</h4>
          </div>
          <p className="text-purple-700 text-sm leading-relaxed">
            Recuerda que puedes combinar varias estrategias según evolucione tu experiencia y situación financiera. 
            Lo más importante es mantener la disciplina y consistencia a largo plazo, independientemente de la 
            estrategia que elijas.
          </p>
        </div>
      </div>
    </ModernSection>
  );
};

export default StrategiesSection;