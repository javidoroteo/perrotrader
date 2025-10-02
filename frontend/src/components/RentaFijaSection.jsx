import React, { useState } from 'react';
import { Building2, TrendingDown, Target, Lightbulb, Users, DollarSign, Award, Shield, Leaf, Clock, Timer, PiggyBank, TrendingUp, Info } from 'lucide-react';
import ModernSection from './ModernSection';
import FinancialDetailsModal from './FinancialDetailsModal';

const RentaFijaSection = ({ rentaFijaAdvice }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!rentaFijaAdvice) {
    return null;
  }

  // Mapeo de productos de tu configuración actual a los nuevos tickers
  const productTickerMap = {
    'iShares Core Global Aggregate Bond UCITS ETF AGGG': 'AGGG.L',
    'Vanguard Global Aggregate Bond UCITS ETF': 'VAGF.L',
    'Xtrackers Global Government Bond UCITS ETF': 'XGOV.L',
    'Vanguard EUR Corporate Bond UCITS ETF': 'VECP.L',
    'iShares EUR Government Bond UCITS ETF Dist': 'SEGA.L',
    'iShares Core EUR Govt Bond UCITS ETF': 'IEAG.L',
    'Xtrackers EUR Corporate Bond UCITS ETF Dist': 'XEUC.L',
    'iShares USD Treasury Bond 7-10yr UCITS ETF': 'IDTU.L',
    'iShares USD Treasury Bond 20+yr UCITS ETF': 'IDTL.L',
    'iShares USD TIPS UCITS ETF': 'TIPS.L',
    'iShares Global High Yield Corp Bond UCITS ETF': 'GHYG.L',
    'iShares EUR High Yield Corp Bond UCITS ETF': 'IHYG.L',
    'SPDR Bloomberg Euro High Yield Bond UCITS ETF': 'JNK4.L',
    'iShares Global Inflation Linked Govt Bond UCITS ETF': 'GILD.L',
    'iShares USD Floating Rate Bond UCITS ETF': 'FLOT.L',
    'iShares Convertible Bond UCITS ETF': 'ICVT.L',
    'WisdomTree AT1 CoCo Bond UCITS ETF': 'COCO.L',
    'Invesco EUR Corporate Bond UCITS ETF': 'PSCS.L',
    'Global X SuperDividend ETF': 'SDIV'
  };

  const openProductDetails = (product) => {
    const ticker = productTickerMap[product.name] || product.name;
    setSelectedProduct({ ...product, ticker });
    setModalOpen(true);
  };

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
      case 'HORIZONTE_CORTO': return 'shadow-red-200';
      case 'HORIZONTE_MEDIO': return 'shadow-yellow-200';
      case 'HORIZONTE_LARGO': return 'shadow-blue-200';
      case 'ESG': return 'shadow-green-200';
      case 'MUY_CONSERVADOR': return 'shadow-gray-200';
      case 'INFLACION_ALTA': return 'shadow-orange-200';
      default: return 'shadow-indigo-200';
    }
  };

  return (
    <ModernSection
      icon={Building2}
      title="Renta Fija Recomendada"
      subtitle="Productos de renta fija seleccionados para tu perfil de inversión"
      gradient="from-blue-600 to-indigo-700"
    >
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{rentaFijaAdvice.mainContent.title}</h3>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">{rentaFijaAdvice.mainContent.content}</p>
        </div>

        {/* Productos Recomendados */}
        {rentaFijaAdvice.mainContent.products && rentaFijaAdvice.mainContent.products.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">Productos Destacados</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentaFijaAdvice.mainContent.products.map((product, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 text-sm leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                          {product.name}
                        </h5>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      
                      {/* Botón minimalista "Saber más" */}
                      <button
                        onClick={() => openProductDetails(product)}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-blue-100 hover:text-blue-600 transition-all duration-200 group-hover:scale-110 ml-2"
                        title="Ver detalles"
                      >
                        <Info size={16} />
                      </button>
                    </div>

                    {/* Stats del producto */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-xs font-semibold text-gray-900">{product.ter || 'N/A'}</p>
                        <p className="text-xs text-gray-500">TER</p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <p className="text-xs font-semibold text-gray-900">{product.riesgo || 'Bajo'}</p>
                        <p className="text-xs text-gray-500">Riesgo</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bloques de consejo existentes */}
        {rentaFijaAdvice.blocks && rentaFijaAdvice.blocks.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentaFijaAdvice.blocks.map((block, index) => {
              const IconComponent = getBlockIcon(block.type);
              return (
                <div 
                  key={index}
                  className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getBlockGradient(block.type)} p-6 text-white shadow-xl ${getBlockGlow(block.type)} hover:scale-105 transition-all duration-300`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-white/20 rounded-lg mr-3">
                        <IconComponent size={24} />
                      </div>
                      <h4 className="font-bold text-lg">{block.title}</h4>
                    </div>
                    <p className="text-white/90 text-sm leading-relaxed mb-4">
                      {block.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tips */}
        {rentaFijaAdvice.mainContent.tips && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
                <Target className="text-green-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-green-900 mb-2">Consejos Clave</h4>
                <ul className="space-y-2">
                  {rentaFijaAdvice.mainContent.tips.map((tip, index) => (
                    <li key={index} className="text-green-800 text-sm flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal de detalles */}
      <FinancialDetailsModal 
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        symbol={selectedProduct?.ticker}
        productName={selectedProduct?.name}
      />
    </ModernSection>
  );
};

export default RentaFijaSection;
