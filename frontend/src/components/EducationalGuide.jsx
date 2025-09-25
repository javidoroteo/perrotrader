import React from 'react';
import { BookOpen, Info } from 'lucide-react';
import ModernSection from './ModernSection';

const EducationalGuide = ({ guide }) => {
  if (!guide?.assets) return null;

  return (
    <ModernSection
      title="Guía Educativa 📚"
      icon={BookOpen}
      defaultOpen={false}
      gradient="from-blue-600 to-purple-600"
      glow="blue"
    >
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h4 className="text-xl font-bold text-gray-800 mb-4">{guide.title}</h4>
          <p className="text-gray-600">{guide.description}</p>
        </div>

        {guide.assets.map((asset, index) => (
          <div
            key={index}
            className="group p-6 rounded-2xl bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm border border-white/30 hover:scale-[1.02] transition-all duration-300"
          >
            <h5 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <Info className="w-5 h-5 text-blue-500 mr-2" />
              {asset.title}
            </h5>
            
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">{asset.description}</p>
              
              <div className="bg-blue-50/50 p-4 rounded-xl">
                <h6 className="font-semibold text-blue-800 mb-6 text-base md:text-lg">Función en tu cartera:</h6>
                <p className="text-blue-700">{asset.role}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50/50 p-4 rounded-xl">
                  <h6 className="font-semibold text-green-800 mb-6 text-base md:text-lg">Ventajas:</h6>
                  <ul className="text-green-700 space-y-1">
                    {asset.pros.map((pro, proIndex) => (
                      <li key={proIndex} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50/50 p-4 rounded-xl">
                  <h6 className="font-semibold text-red-800 mb-6 text-base md:text-lg">Consideraciones:</h6>
                  <ul className="text-red-700 space-y-1">
                    {asset.cons.map((con, conIndex) => (
                      <li key={conIndex} className="flex items-start">
                        <span className="text-red-500 mr-2">⚠</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50/50 p-4 rounded-xl">
            <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="font-semibold text-gray-800 mb-6 text-base md:text-lg">
                Rentabilidad esperada:
              </h6>
                <p className="text-gray-700 text-sm">{asset.expectedReturn}</p>
            </div>
              <div>
                <h6 className="font-semibold text-gray-800 mb-6 text-base md:text-lg">
                Comportamiento:
                </h6>
                  <p className="text-gray-700 text-sm">{asset.behavior}</p>
              </div>
            </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </ModernSection>
  );
};

export default EducationalGuide;