

import React, { useState, useEffect } from 'react';
import { X, TrendingUp, DollarSign, Building2, ExternalLink, Loader2, AlertCircle, Info, ChevronDown, Star } from 'lucide-react';

const FinancialDetailsModal = ({ isOpen, onClose, symbol, productName }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isOpen && symbol) {
      fetchFinancialDetails();
    }
  }, [isOpen, symbol]);

  const fetchFinancialDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/financial-details/${symbol}`);
      const result = await response.json();

      if (result.success) {
        setData(result);
      } else {
        setError(result.error || 'Error al obtener los datos');
      }
    } catch (err) {
      console.error('Error fetching financial details:', err);
      setError('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price, currency = 'EUR') => {
    if (price === null || price === undefined) return 'N/A';
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  const formatPercentage = (value) => {
    if (value === null || value === undefined) return 'N/A';
    return `${(value * 100).toFixed(2)}%`;
  };

  const getRiskColor = (risk) => {
    const colors = {
      'Muy Bajo': 'text-green-600 bg-green-50',
      'Bajo': 'text-green-600 bg-green-50',
      'Bajo-Medio': 'text-yellow-600 bg-yellow-50',
      'Medio': 'text-orange-600 bg-orange-50',
      'Medio-Alto': 'text-red-600 bg-red-50',
      'Alto': 'text-red-700 bg-red-100'
    };
    return colors[risk] || 'text-gray-600 bg-gray-50';
  };

  const getBrokerRating = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {productName || symbol}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{symbol}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin mr-2" size={24} />
              <span className="text-gray-600">Cargando datos financieros...</span>
            </div>
          )}

          {error && (
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
              <AlertCircle className="text-red-500 mr-2" size={20} />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {data && !loading && !error && (
            <>
              {/* Tabs */}
              <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                {[
                  { id: 'overview', label: 'Resumen' },
                  { id: 'brokers', label: 'Dónde Comprar' },
                  { id: 'details', label: 'Detalles' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1 ${
                      activeTab === tab.id
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Product Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Información del Producto</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tipo:</span>
                            <span className="font-medium">{data.product.type.replace('_', ' ')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Categoría:</span>
                            <span className="font-medium">{data.product.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">TER:</span>
                            <span className="font-bold text-green-600">{data.product.ter}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Riesgo:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(data.product.risk)}`}>
                              {data.product.risk}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Descripción</h4>
                        <p className="text-sm text-gray-700">{data.product.description}</p>
                      </div>
                    </div>

                    {/* Market Data */}
                    <div className="space-y-4">
                      {data.product.marketData && data.product.marketData.currentPrice && (
                        <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                          <h3 className="font-semibold text-gray-900 mb-3">Datos de Mercado</h3>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Precio Actual</p>
                              <p className="text-lg font-bold text-gray-900">
                                {formatPrice(data.product.marketData.currentPrice, data.product.marketData.currency)}
                              </p>
                            </div>

                            {data.product.marketData.priceChangePercent && (
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Cambio</p>
                                <p className={`text-lg font-bold ${
                                  data.product.marketData.priceChangePercent >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {formatPercentage(data.product.marketData.priceChangePercent / 100)}
                                </p>
                              </div>
                            )}

                            {data.product.marketData.annualizedReturn5Y && (
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Rentabilidad 5Y</p>
                                <p className={`text-sm font-bold ${
                                  data.product.marketData.annualizedReturn5Y >= 0 ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {formatPercentage(data.product.marketData.annualizedReturn5Y)}
                                </p>
                              </div>
                            )}

                            {data.product.marketData.volume && (
                              <div>
                                <p className="text-xs text-gray-500 mb-1">Volumen</p>
                                <p className="text-sm font-medium text-gray-900">
                                  {new Intl.NumberFormat('es-ES', { notation: 'compact' }).format(data.product.marketData.volume)}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {(!data.product.marketData || !data.product.marketData.currentPrice) && (
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-center">
                            <Info className="text-yellow-600 mr-2" size={16} />
                            <p className="text-sm text-yellow-800">
                              Datos de mercado no disponibles temporalmente
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cost Explanation */}
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">💡 Sobre el TER</h4>
                    <p className="text-sm text-blue-800">
                      El TER (Total Expense Ratio) de <strong>{data.product.ter}</strong> es la comisión anual 
                      que cobra el fondo por gestionar tu inversión. Se descuenta automáticamente del valor 
                      de tus participaciones.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'brokers' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Brokers Recomendados</h3>
                    <span className="text-sm text-gray-500">{data.brokers.length} opciones disponibles</span>
                  </div>

                  <div className="grid gap-4">
                    {data.brokers.map((broker, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900">{broker.name}</h4>
                            <div className="flex items-center mt-1">
                              <div className="flex">{getBrokerRating(broker.rating)}</div>
                              <span className="ml-2 text-sm text-gray-600">({broker.rating}/5)</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-green-600">{broker.commission_etf}</p>
                            <p className="text-xs text-gray-500">Comisión ETF</p>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Custodia:</span>
                            <span className="font-medium">{broker.custody_fee}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Depósito mín.:</span>
                            <span className="font-medium">{broker.min_deposit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Regulación:</span>
                            <span className="font-medium text-xs">{broker.regulation}</span>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-xs text-green-600 mb-1">✓ {broker.pros}</p>
                              {broker.cons && (
                                <p className="text-xs text-red-600">⚠ {broker.cons}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg mt-6">
                    <h4 className="font-semibold text-green-900 mb-2">💼 Recomendación</h4>
                    <p className="text-sm text-green-800">
                      Todos los brokers mostrados están regulados y son seguros. Las comisiones pueden 
                      cambiar, siempre verifica las condiciones actuales antes de abrir una cuenta.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Detalles Técnicos</h3>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ticker:</span>
                          <span className="font-mono font-medium">{data.product.ticker}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ISIN:</span>
                          <span className="font-mono font-medium">{data.product.isin}</span>
                        </div>
                        {data.product.alternativeTickers && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tickers Alt.:</span>
                            <span className="font-mono font-medium">{data.product.alternativeTickers.join(', ')}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tipo:</span>
                          <span className="font-medium">{data.product.type.replace('_', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Categoría:</span>
                          <span className="font-medium">{data.product.category}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Recomendado Para</h3>
                      <div className="flex flex-wrap gap-2">
                        {data.product.recommended_for.map((tag, index) => (
                          <span 
                            key={index}
                            className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                          >
                            {tag.replace('_', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {data.product.warning && (
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="text-yellow-600 mr-2 mt-0.5" size={16} />
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-1">Advertencia</h4>
                          <p className="text-sm text-yellow-700">{data.product.warning}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                <p className="text-xs text-gray-500">
                  Última actualización: {new Date(data.timestamp).toLocaleString('es-ES')} • 
                  Fuente: {data.product.marketData?.source || 'Configuración estática'} • 
                  Los datos mostrados son orientativos
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialDetailsModal;
