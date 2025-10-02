import React, { useState } from 'react';
import { BarChart3, TrendingUp, Target, Lightbulb, Users, DollarSign, Award, Shield, Leaf, Clock, Info } from 'lucide-react';
import ModernSection from './ModernSection';
import FinancialDetailsModal from './FinancialDetailsModal_v2';

const RentaVariableSection = ({ rentaVariableAdvice }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (!rentaVariableAdvice) {
    return null;
  }

  // Mapeo de productos de renta variable
  const productTickerMap = {
    'iShares Core MSCI World UCITS ETF': 'IWDA.L',
    'Vanguard FTSE All-World UCITS ETF': 'VWCE.DE',
    'Xtrackers MSCI World UCITS ETF': 'XMWO.L',
    'iShares MSCI World Dividend UCITS ETF': 'WQDV.L',
    'Vanguard FTSE All-World High Dividend Yield': 'VHYL.L',
    'SPDR S&P Global Dividend Aristocrats': 'GLDV.L',
    'SPDR S&P 500 UCITS ETF': 'SPY5.L'
  };

  const openProductDetails = (product) => {
    const ticker = productTickerMap[product.name] || product.name;
    setSelectedProduct({ ...product, ticker });
    setModalOpen(true);
  };

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
      case 'TECNOLOGIA': return 'shadow-blue-200';
      case 'ESG': return 'shadow-green-200';
      case 'LARGO_PLAZO': return 'shadow-orange-200';
      case 'MUY_CONSERVADOR': return 'shadow-gray-200';
      default: return 'shadow-indigo-200';
    }
  };

  return (
    <ModernSection
      icon={BarChart3}
      title="Renta Variable Recomendada"
      subtitle="ETFs de renta variable seleccionados para tu perfil inversor"
      gradient="from-purple-600 to-pink-700"
    >
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{rentaVariableAdvice.mainContent.title}</h3>
          <p className="text-gray-600 max-w-4xl mx-auto leading-relaxed">{rentaVariableAdvice.mainContent.content}</p>
        </div>

        {/* Productos Recomendados */}
        {rentaVariableAdvice.mainContent.products && rentaVariableAdvice.mainContent.products.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xl font-bold text-gray-900 mb-6 text-center">ETFs Destacados</h4>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rentaVariableAdvice.mainContent.products.map((product, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 overflow-hidden group">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h5 className="font-semibold text-gray-900 text-sm leading-tight mb-2 group-hover:text-purple-600 transition-colors">
                          {product.name}
                        </h5>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      
                      {/* Botón minimalista "Saber más" */}
                      <button
                        onClick={() => openProductDetails(product)}
                        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-purple-100 hover:text-purple-600 transition-all duration-200 group-hover:scale-110 ml-2"
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
                        <p className="text-xs font-semibold text-gray-900">{product.riesgo || 'Medio'}</p>
                        <p className="text-xs text-gray-500">Riesgo</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resto del componente igual que antes... */}
        {/* Bloques, tips, etc. */}
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

export default RentaVariableSection;

