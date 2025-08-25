import React from 'react';
import { Building2, TrendingDown, Target, Lightbulb, Users, DollarSign, Award, Shield, Leaf, Clock, Timer, PiggyBank } from 'lucide-react';
import ModernSection from './ModernSection';

const RentaFijaSection = ({ rentaFijaAdvice }) => {
  if (!rentaFijaAdvice) {
    return null;
  }

  const getBlockIcon = (blockType) => {
    switch (blockType) {
      case 'HORIZONTE_CORTO': return Timer;
      case 'HORIZONTE_MEDIO': return Clock;
      case 'HORIZONTE_LARGO': return TrendingDown;
      case 'ESG': return Leaf;
      case 'MUY_CONSERVADOR': return Shield;
      case 'INFLACION_ALTA': return TrendingDown;
      default: return Lightbulb;
    }
  };

  const getBlockGradient = (blockType) => {
    switch (blockType) {
      case 'HORIZONTE_CORTO': return 'from-red-500 to-pink-600';
      case 'HORIZONTE_MEDIO': return 'from-yellow-500 to-orange-600';
      case 'HORIZONTE_LARGO': return 'from-blue-500 to-indigo-600';
      case 'ESG': return 'from-green-500 to-emerald-600';
      case 'MUY_CONSERVADOR': return 'from-gray-500 to-slate-600';
      case 'INFLACION_ALTA': return 'from-orange-500 to-red-600';
      default: return 'from-indigo-500 to-purple-600';
    }
  };

  const getBlockGlow = (blockType) => {
    switch (blockType) {
      case 'HORIZONTE_CORTO': return 'red';
      case 'HORIZONTE_MEDIO': return 'yellow';
      case 'HORIZONTE_LARGO': return 'blue';
      case 'ESG': return 'green';
      case 'MUY_CONSERVADOR': return 'gray';
      case 'INFLACION_ALTA': return 'orange';
      default: return 'purple';
    }
  };

  const formatContent = (content) => {
    return content.split('\n\n').map((paragraph, index) => (
      <p key={index} className="text-gray-700 mb-4 leading-relaxed">
        {paragraph}
      </p>
    ));
  };

  return (
    <ModernSection
      title="Renta Fija - Tu Estrategia de Bonos"
      icon={Building2}
      defaultOpen={false}
      gradient="from-emerald-500 to-teal-600"
      glow="green"
    >
      <div className="space-y-8">
        {/* Header con información del perfil */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 mb-4">
            {rentaFijaAdvice.description}
          </p>
          <div className="flex justify-center items-center flex-wrap gap-4 text-sm">
            <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-blue-800">
                Nivel: {rentaFijaAdvice.userProfile.experienceLevel}
              </span>
            </div>
            
            <div className="flex items-center bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full">
              <Target className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-green-800">
                {rentaFijaAdvice.userProfile.seeksDividends ? 'Busca ingresos' : 'Busca acumulación'}
              </span>
            </div>
            
            <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-full">
              <Building2 className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-purple-800">
                {rentaFijaAdvice.userProfile.totalFixedIncomeAllocation}% en renta fija
              </span>
            </div>

            {rentaFijaAdvice.userProfile.greenBondsAllocation > 0 && (
              <div className="flex items-center bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 rounded-full">
                <Leaf className="w-4 h-4 mr-2 text-emerald-600" />
                <span className="text-emerald-800">
                  {rentaFijaAdvice.userProfile.greenBondsAllocation}% bonos verdes
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm rounded-2xl border border-white/30 p-8">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg mr-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {rentaFijaAdvice.mainContent.title}
            </h3>
          </div>
          
          <div className="space-y-6">
            {/* Contenido principal */}
            <div className="prose prose-gray max-w-none">
              {formatContent(rentaFijaAdvice.mainContent.content)}
            </div>

            {/* Tips destacados */}
            {rentaFijaAdvice.mainContent.tips && rentaFijaAdvice.mainContent.tips.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
                  <h4 className="font-semibold text-yellow-800">Consejos importantes:</h4>
                </div>
                <ul className="space-y-2">
                  {rentaFijaAdvice.mainContent.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-yellow-700 flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 mr-3 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Productos recomendados */}
            {rentaFijaAdvice.mainContent.products && rentaFijaAdvice.mainContent.products.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-800">Productos destacados para tu perfil:</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {rentaFijaAdvice.mainContent.products.map((product, index) => (
                    <div key={index} className="bg-white/50 rounded-lg p-4 border border-blue-200">
                      <h5 className="font-semibold text-blue-900 mb-2">{product.name}</h5>
                      <p className="text-sm text-blue-700">{product.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bloques adicionales */}
        {rentaFijaAdvice.additionalBlocks && rentaFijaAdvice.additionalBlocks.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Consideraciones Específicas</h3>
              <p className="text-gray-600">Adaptadas a tu horizonte temporal y perfil</p>
            </div>
            
            <div className="grid gap-6">
              {rentaFijaAdvice.additionalBlocks.map((block, index) => {
                const IconComponent = getBlockIcon(block.type);
                const gradient = getBlockGradient(block.type);
                const glow = getBlockGlow(block.type);
                
                return (
                  <div
                    key={index}
                    className={`relative rounded-2xl backdrop-blur-lg bg-white/15 border border-white/30 p-6 transition-all duration-300 hover:scale-[1.01] hover:bg-white/20 shadow-lg hover:shadow-2xl hover:shadow-${glow}-500/20`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                          {block.title}
                        </h4>
                        <div className="prose prose-gray max-w-none">
                          {formatContent(block.content)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mensaje de cierre */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
          <div className="flex items-center mb-3">
            <PiggyBank className="w-5 h-5 text-blue-600 mr-2" />
            <h4 className="font-semibold text-blue-800">Recuerda</h4>
          </div>
          <p className="text-blue-700 text-sm leading-relaxed">
            La renta fija es el componente estabilizador de tu cartera, proporcionando seguridad y 
            flujos predecibles. Mantén una estrategia disciplinada, diversifica adecuadamente según 
            tu horizonte temporal, y ajusta la duración según las condiciones del mercado y tus 
            necesidades de liquidez.
          </p>
        </div>
      </div>
    </ModernSection>
  );
};

export default RentaFijaSection;