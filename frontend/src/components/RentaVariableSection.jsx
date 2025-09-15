import React from 'react';
import { BarChart3, TrendingUp, Target, Lightbulb, Users, DollarSign, Award, Shield, Leaf, Clock } from 'lucide-react';
import ModernSection from './ModernSection';

const RentaVariableSection = ({ rentaVariableAdvice }) => {
  if (!rentaVariableAdvice) {
    return null;
  }

  const getBlockIcon = (blockType) => {
    switch (blockType) {
      case 'TECNOLOGIA': return TrendingUp;
      case 'ESG': return Leaf;
      case 'LARGO_PLAZO': return Clock;
      case 'MUY_CONSERVADOR': return Shield;
      default: return Lightbulb;
    }
  };

  const getBlockGradient = (blockType) => {
    switch (blockType) {
      case 'TECNOLOGIA': return 'from-blue-500 to-purple-600';
      case 'ESG': return 'from-green-500 to-emerald-600';
      case 'LARGO_PLAZO': return 'from-orange-500 to-red-600';
      case 'MUY_CONSERVADOR': return 'from-gray-500 to-slate-600';
      default: return 'from-indigo-500 to-purple-600';
    }
  };

  const getBlockGlow = (blockType) => {
    switch (blockType) {
      case 'TECNOLOGIA': return 'blue';
      case 'ESG': return 'green';
      case 'LARGO_PLAZO': return 'orange';
      case 'MUY_CONSERVADOR': return 'gray';
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
      title="Renta Variable - Guía Personalizada"
      icon={BarChart3}
      defaultOpen={false}
      gradient="from-blue-500 to-indigo-600"
      glow="blue"
    >
      <div className="space-y-8">
        {/* Header con información del perfil */}
        <div className="text-center mb-8">
          <p className="text-lg text-gray-700 mb-4">
            {rentaVariableAdvice.description}
          </p>
          <div className="flex justify-center items-center flex-wrap gap-4 text-sm">
            <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-blue-800">
                Nivel: {rentaVariableAdvice.userProfile.experienceLevel}
              </span>
            </div>
            
            <div className="flex items-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-2 rounded-full">
              <Target className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-blue-800">
                {rentaVariableAdvice.userProfile.seeksDividends ? 'Busca dividendos' : 'Busca crecimiento'}
              </span>
            </div>
            
            <div className="flex items-center bg-gradient-to-r from-purple-50 to-pink-50 px-4 py-2 rounded-full">
              <BarChart3 className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-purple-800">
                {rentaVariableAdvice.userProfile.equityAllocation}% en acciones
              </span>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm rounded-2xl border border-white/30 p-8">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-brfrom-blue-500 to-indigo-600 shadow-lg mr-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">
              {rentaVariableAdvice.mainContent.title}
            </h3>
          </div>
          
          <div className="space-y-6">
            {/* Contenido principal */}
            <div className="prose prose-gray max-w-none">
              {formatContent(rentaVariableAdvice.mainContent.content)}
            </div>

            {/* Tips destacados - Layout responsive */}
            {rentaVariableAdvice.mainContent.tips && rentaVariableAdvice.mainContent.tips.length > 0 && (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 border border-yellow-200">
                {/* Mobile: Icon arriba del título */}
                <div className="block sm:hidden text-center mb-4">
                  <div className="inline-flex p-2 rounded-lg bg-yellow-100 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                  </div>
                  <h4 className="font-semibold text-yellow-800">Consejos importantes:</h4>
                </div>
                
                {/* Desktop: Icon a la izquierda del título */}
                <div className="hidden sm:flex items-center mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
                  <h4 className="font-semibold text-yellow-800">Consejos importantes:</h4>
                </div>
                
                <ul className="space-y-2">
                  {rentaVariableAdvice.mainContent.tips.map((tip, index) => (
                    <li key={index} className="text-sm text-yellow-700 flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 mr-3 flex-shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Productos recomendados */}
            {rentaVariableAdvice.mainContent.products && rentaVariableAdvice.mainContent.products.length > 0 && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center mb-4">
                  <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-blue-800">Productos destacados para tu perfil:</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {rentaVariableAdvice.mainContent.products.map((product, index) => (
                    <div key={index} className="bg-white/50 rounded-lg p-4 border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-2 bg-blue-100 px-3 py-1 rounded-md">
                      {product.name}
                    </h5>
                    <p className="text-sm text-blue-700">{product.description}</p>
                  </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bloques adicionales - Layout responsive */}
        {rentaVariableAdvice.additionalBlocks && rentaVariableAdvice.additionalBlocks.length > 0 && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Consideraciones Adicionales</h3>
              <p className="text-gray-600">Basadas en tu perfil específico</p>
            </div>
            
            <div className="grid gap-6">
              {rentaVariableAdvice.additionalBlocks.map((block, index) => {
                const IconComponent = getBlockIcon(block.type);
                const gradient = getBlockGradient(block.type);
                const glow = getBlockGlow(block.type);
                
                return (
                  <div
                    key={index}
                    className={`relative rounded-2xl backdrop-blur-lg bg-white/15 border border-white/30 p-6 transition-all duration-300 hover:scale-[1.01] hover:bg-white/20 shadow-lg hover:shadow-2xl hover:shadow-${glow}-500/20`}
                  >
                    {/* Mobile: Icon arriba del título */}
                    <div className="block sm:hidden text-center mb-4">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg mb-3`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold text-gray-800">
                        {block.title}
                      </h4>
                    </div>
                    
                    {/* Desktop: Icon a la izquierda */}
                    <div className="hidden sm:flex items-start space-x-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-800 mb-3">
                          {block.title}
                        </h4>
                      </div>
                    </div>
                    
                    {/* Contenido - mismo para ambos layouts */}
                    <div className="prose prose-gray max-w-none">
                      {formatContent(block.content)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mensaje de cierre */}
        <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
          <div className="flex items-center mb-3">
            <Target className="w-5 h-5 text-emerald-600 mr-2" />
            <h4 className="font-semibold text-emerald-800">Recuerda</h4>
          </div>
          <p className="text-emerald-700 text-sm leading-relaxed">
            La renta variable es el motor de crecimiento de tu cartera a largo plazo. Mantén la disciplina, 
            diversifica adecuadamente y ajusta tu estrategia según evolucione tu experiencia y situación 
            financiera. La paciencia y la consistencia son tus mejores aliados para alcanzar tus objetivos 
            de inversión.
          </p>
        </div>
      </div>
    </ModernSection>
  );
};

export default RentaVariableSection;