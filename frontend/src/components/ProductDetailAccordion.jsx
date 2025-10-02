// frontend/src/components/ProductDetailAccordion.jsx
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  BarChart3,
  Activity,
  Info,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

const ProductDetailAccordion = ({ product, isLoading, error }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!product) return null;

  const { liveData, dataSource } = product;
  const hasLiveData = dataSource === 'live' && liveData;

  const formatNumber = (num, decimals = 2) => {
    if (num === null || num === undefined) return 'N/A';
    return Number(num).toFixed(decimals);
  };

  const formatCurrency = (num, currency = 'EUR') => {
    if (num === null || num === undefined) return 'N/A';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency
    }).format(num);
  };

  const formatPercent = (num) => {
    if (num === null || num === undefined) return 'N/A';
    const value = Number(num).toFixed(2);
    const isPositive = num >= 0;
    return (
      <span className={isPositive ? 'text-green-600' : 'text-red-600'}>
        {isPositive ? '+' : ''}{value}%
      </span>
    );
  };

  return (
    <div className="mt-3 border border-gray-200 rounded-lg overflow-hidden">
      {/* Botón de toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-indigo-50 to-purple-50 
                   hover:from-indigo-100 hover:to-purple-100 transition-all duration-200
                   flex items-center justify-between group"
      >
        <span className="text-xs sm:text-sm font-semibold text-gray-700 group-hover:text-indigo-700">
          Ver Detalles del Producto
        </span>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-indigo-600 flex-shrink-0" />
        )}
      </button>

      {/* Contenido del acordeón */}
      {isOpen && (
        <div className="bg-white p-3 sm:p-4 md:p-6 border-t border-gray-200">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-3 sm:p-4 rounded-lg">
              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="text-xs sm:text-sm">{error}</span>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              
              {/* Información Estática */}
              <div>
                <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 flex-shrink-0" />
                  <span className="text-sm sm:text-base">Información del Producto</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  <InfoItem label="Ticker" value={product.ticker} />
                  <InfoItem label="ISIN" value={product.isin} />
                  <InfoItem label="Tipo" value={product.type} />
                  <InfoItem label="Categoría" value={product.category} />
                  <InfoItem label="TER" value={product.ter} />
                  <InfoItem label="Riesgo" value={product.risk} />
                </div>
                <div className="mt-3 sm:mt-4">
                  <p className="text-xs sm:text-sm text-gray-600">
                    <span className="font-semibold">Descripción:</span> {product.description}
                  </p>
                  {product.recommended_for && (
                    <p className="text-xs sm:text-sm text-gray-600 mt-2">
                      <span className="font-semibold">Recomendado para:</span>{' '}
                      {product.recommended_for.join(', ')}
                    </p>
                  )}
                </div>
              </div>

              {/* Datos en Tiempo Real */}
              {hasLiveData ? (
                <div>
                  {/* Header responsive */}
                  <div className="mb-3 sm:mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                        <h4 className="text-base sm:text-lg font-bold text-gray-800">
                          Datos en Tiempo Real
                        </h4>
                      </div>
                      <span className="flex items-center gap-1 text-xs font-normal text-green-600 sm:ml-auto">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        Actualizado
                      </span>
                    </div>
                  </div>

                  {/* Precio y cambio - Responsive */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg sm:rounded-xl p-4 sm:p-6 mb-3 sm:mb-4">
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm text-gray-600 mb-1">Precio Actual</p>
                        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 break-all">
                          {formatCurrency(liveData.price, liveData.currency)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 sm:text-right">
                        {liveData.changePercent >= 0 ? (
                          <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
                        ) : (
                          <TrendingDown className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 flex-shrink-0" />
                        )}
                        <div>
                          <div className="text-sm sm:text-base">
                            {formatPercent(liveData.changePercent)}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {formatCurrency(liveData.change, liveData.currency)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Métricas principales - Responsive grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                    {liveData.annualizedReturn5Y !== null && (
                      <MetricCard
                        icon={<TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />}
                        label="Rentabilidad 5Y"
                        value={formatPercent(liveData.annualizedReturn5Y)}
                        color="indigo"
                      />
                    )}
                    
                    {liveData.dividendYield !== null && (
                      <MetricCard
                        icon={<DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />}
                        label="Dividend Yield"
                        value={`${formatNumber(liveData.dividendYield)}%`}
                        color="green"
                      />
                    )}
                    
                    {liveData.volume && (
                      <MetricCard
                        icon={<BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />}
                        label="Volumen"
                        value={liveData.volume.toLocaleString('es-ES')}
                        color="purple"
                      />
                    )}

                    {liveData.fiftyTwoWeekHigh && (
                      <MetricCard
                        label="Máximo 52S"
                        value={formatCurrency(liveData.fiftyTwoWeekHigh, liveData.currency)}
                        color="blue"
                      />
                    )}

                    {liveData.fiftyTwoWeekLow && (
                      <MetricCard
                        label="Mínimo 52S"
                        value={formatCurrency(liveData.fiftyTwoWeekLow, liveData.currency)}
                        color="red"
                      />
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-3 sm:mt-4">
                    Última actualización: {new Date(liveData.lastUpdated).toLocaleString('es-ES')}
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-2 text-blue-600 bg-blue-50 p-3 sm:p-4 rounded-lg">
                  <Info className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm">
                    Datos en tiempo real no disponibles. Mostrando solo información estática.
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Componente auxiliar para items de información - Responsive
const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-1.5 sm:py-2 border-b border-gray-100 gap-2">
    <span className="text-xs sm:text-sm font-medium text-gray-600 flex-shrink-0">{label}:</span>
    <span className="text-xs sm:text-sm text-gray-900 text-right truncate">{value || 'N/A'}</span>
  </div>
);

// Componente auxiliar para tarjetas de métricas - Responsive
const MetricCard = ({ icon, label, value, color = 'indigo' }) => {
  const colorClasses = {
    indigo: 'from-indigo-50 to-indigo-100 text-indigo-700',
    green: 'from-green-50 to-green-100 text-green-700',
    purple: 'from-purple-50 to-purple-100 text-purple-700',
    blue: 'from-blue-50 to-blue-100 text-blue-700',
    red: 'from-red-50 to-red-100 text-red-700'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-lg p-2.5 sm:p-3 md:p-4`}>
      {icon && <div className="mb-1 sm:mb-2">{icon}</div>}
      <p className="text-xs font-medium opacity-80 mb-1">{label}</p>
      <p className="text-sm sm:text-base md:text-lg font-bold break-all">{value}</p>
    </div>
  );
};

export default ProductDetailAccordion;
