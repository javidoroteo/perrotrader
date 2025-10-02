// frontend/src/components/RentaFijaSection.jsx (MODIFICADO)
import React, { useState, useEffect } from 'react';
import { Building2, TrendingDown, Target, Lightbulb, Users, DollarSign, Award, Shield, Leaf, Clock, Timer, PiggyBank } from 'lucide-react';
import ModernSection from './ModernSection';
import ProductDetailAccordion from './ProductDetailAccordion';

const RentaFijaSection = ({ rentaFijaAdvice }) => {
  const [productsData, setProductsData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Extraer todos los tickers de los productos recomendados
  const extractTickers = () => {
    const tickers = [];
    if (rentaFijaAdvice?.products) {
      rentaFijaAdvice.products.forEach(product => {
        // Asumiendo que el ticker viene en algún campo del producto
        // Ajusta esto según tu estructura real
        if (product.ticker) {
          tickers.push(product.ticker);
        }
      });
    }
    return tickers;
  };

  // Cargar datos de productos al montar el componente
  useEffect(() => {
    const loadProductsData = async () => {
      const tickers = extractTickers();
      
      if (tickers.length === 0) return;

      setIsLoading(true);
      
      try {
        const response = await fetch('http://localhost:3000/api/products/batch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ tickers })
        });

        const result = await response.json();
        
        if (result.success) {
          setProductsData(result.data);
        } else {
          console.error('Error al cargar productos:', result.error);
        }
      } catch (error) {
        console.error('Error en la petición:', error);
        setErrors({ general: 'Error al cargar los datos de productos' });
      } finally {
        setIsLoading(false);
      }
    };

    loadProductsData();
  }, [rentaFijaAdvice]);

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
      case 'HORIZONTE_MEDIO': return 'orange';
      case 'HORIZONTE_LARGO': return 'blue';
      case 'ESG': return 'green';
      case 'MUY_CONSERVADOR': return 'gray';
      case 'INFLACION_ALTA': return 'orange';
      default: return 'indigo';
    }
  };

  return (
    <ModernSection
      icon={Building2}
      title="Renta Fija"
      subtitle="Inversiones en bonos y activos de renta fija"
      gradient="from-blue-600 to-indigo-700"
      glow="blue"
    >
      <div className="space-y-8">
        {/* Contenido Principal */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {rentaFijaAdvice.mainContent.title}
              </h3>
              <div className="prose prose-blue max-w-none">
                {rentaFijaAdvice.mainContent.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {rentaFijaAdvice.mainContent.tips && (
            <div className="mt-6 bg-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Consejos Clave
              </h4>
              <ul className="space-y-2">
                {rentaFijaAdvice.mainContent.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-blue-800">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Productos Recomendados con Detalles */}
        {rentaFijaAdvice.products && rentaFijaAdvice.products.length > 0 && (
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                Productos Recomendados
              </h3>
            </div>

            <div className="space-y-6">
              {rentaFijaAdvice.products.map((product, idx) => {
                const productData = productsData[product.ticker];
                const productInfo = productData?.success ? productData.data : null;
                const productError = productData && !productData.success ? productData.error : null;

                return (
                  <div key={idx} className="border border-blue-100 rounded-xl p-6 hover:border-blue-300 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900 mb-2">
                          {product.name}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          {product.description}
                        </p>
                        
                        {/* Acordeón de detalles */}
                        <ProductDetailAccordion
                          product={productInfo}
                          isLoading={isLoading}
                          error={productError}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bloques adicionales existentes... */}
        {rentaFijaAdvice.additionalBlocks && rentaFijaAdvice.additionalBlocks.map((block, idx) => {
          const BlockIcon = getBlockIcon(block.type);
          const gradient = getBlockGradient(block.type);
          const glow = getBlockGlow(block.type);

          return (
            <div key={idx} className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 shadow-lg`}>
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 bg-white/20 rounded-xl backdrop-blur-sm`}>
                  <BlockIcon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {block.title}
                  </h3>
                  <div className="prose prose-blue max-w-none">
                    {block.content.split('\n\n').map((paragraph, pIdx) => (
                      <p key={pIdx} className="text-white/90 leading-relaxed mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {block.tips && (
                <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <ul className="space-y-2">
                    {block.tips.map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-white">
                        <span className="mt-1">•</span>
                        <span className="text-sm">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ModernSection>
  );
};

export default RentaFijaSection;
