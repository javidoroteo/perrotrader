// frontend/src/pages/SharedPortfolioView.jsx

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, AlertTriangle, TrendingUp, TrendingDown, Eye, Copy, Download } from 'lucide-react';
import portfolioService from '../services/portfolioService';

const SharedPortfolioView = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadSharedPortfolio();
  }, [token]);

  const loadSharedPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await portfolioService.getSharedPortfolio(token);
      
      if (!response.success) {
        setError(response.error || 'No se pudo cargar el portfolio');
        return;
      }

      setPortfolio(response.portfolio);
    } catch (err) {
      console.error('Error loading shared portfolio:', err);
      
      // Manejo específico de errores
      if (err.response?.status === 404) {
        setError('Link no encontrado');
      } else if (err.response?.status === 410) {
        setError('Este link ha expirado');
      } else {
        setError('Error al cargar el portfolio compartido');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadPDF = () => {
    // Implementar descarga de PDF si es necesario
    console.log('Descargar PDF - Por implementar');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-blue-500" size={48} />
          <p className="text-gray-600">Cargando portfolio compartido...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="text-red-500" size={32} />
            <h2 className="text-2xl font-bold text-gray-900">Error</h2>
          </div>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  if (!portfolio) return null;

  // Calcular desviaciones
  const deviations = {
    rentaFija: Math.abs(portfolio.allocation.actualRentaFija - portfolio.recommendedAllocation.rentaFija),
    rentaVariable: Math.abs(portfolio.allocation.actualRentaVariable - portfolio.recommendedAllocation.rentaVariable),
    crypto: Math.abs(portfolio.allocation.actualCrypto - portfolio.recommendedAllocation.crypto),
  };

  const maxDeviation = Math.max(...Object.values(deviations));
  const needsRebalancing = maxDeviation > 5; // Si desviación > 5%

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📊 {portfolio.name}
          </h1>
          <p className="text-gray-600">
            Portfolio compartido • Compartido el {new Date(portfolio.sharedAt).toLocaleDateString('es-ES')}
          </p>
        </div>

        {/* Tarjeta Principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          
          {/* Valores Principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            
            {/* Valor Total */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
              <p className="text-gray-600 text-sm mb-2">Valor Total</p>
              <p className="text-3xl font-bold text-gray-900">
                €{portfolio.totalValue.toLocaleString('es-ES', { maximumFractionDigits: 2 })}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Invertido: €{portfolio.totalInvested.toLocaleString('es-ES', { maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Ganancia/Pérdida */}
            <div className={`rounded-xl p-6 ${portfolio.totalGain >= 0 ? 'bg-gradient-to-br from-green-50 to-green-100' : 'bg-gradient-to-br from-red-50 to-red-100'}`}>
              <p className="text-gray-600 text-sm mb-2">Ganancia / Pérdida</p>
              <div className="flex items-center gap-2">
                {portfolio.totalGain >= 0 ? (
                  <TrendingUp className="text-green-600" size={24} />
                ) : (
                  <TrendingDown className="text-red-600" size={24} />
                )}
                <p className={`text-3xl font-bold ${portfolio.totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  €{Math.abs(portfolio.totalGain).toLocaleString('es-ES', { maximumFractionDigits: 2 })}
                </p>
              </div>
              <p className={`text-xs mt-2 ${portfolio.totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {portfolio.totalGainPercentage?.toFixed(2)}%
              </p>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors font-semibold"
            >
              <Copy size={18} />
              {copied ? 'Copiado!' : 'Copiar Link'}
            </button>
          </div>
        </div>

        {/* Allocation vs Recomendado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Allocation Actual */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">📊 Allocation Actual</h3>
            
            <div className="space-y-4">
              {Object.entries(portfolio.allocation).map(([key, value]) => (
                <div key={key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-700 font-medium capitalize">
                      {key.replace('actual', '')}
                    </span>
                    <span className="text-gray-900 font-bold">{value}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          
        </div>

        {/* Holdings */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📋 Holdings ({portfolio.holdings?.length || 0})</h3>
          
          {portfolio.holdings && portfolio.holdings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Ticker</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Nombre</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Cantidad</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Precio Medio</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Precio Actual</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Valor Total</th>
                    <th className="text-right py-3 px-4 font-semibold text-gray-700">Ganancia %</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.holdings.map((holding) => (
                    <tr key={holding.ticker} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-4 font-bold text-gray-900">{holding.ticker}</td>
                      <td className="py-4 px-4 text-gray-700">{holding.name}</td>
                      <td className="py-4 px-4 text-right text-gray-700">{holding.quantity}</td>
                      <td className="py-4 px-4 text-right text-gray-600">
                        €{holding.averagePrice.toLocaleString('es-ES', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-right text-gray-600">
                        €{holding.currentPrice.toLocaleString('es-ES', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-right font-semibold text-gray-900">
                        €{holding.currentValue.toLocaleString('es-ES', { maximumFractionDigits: 2 })}
                      </td>
                      <td className={`py-4 px-4 text-right font-semibold ${holding.gainPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {holding.gainPercentage >= 0 ? '+' : ''}{holding.gainPercentage.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No hay holdings en este portfolio</p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>📌 Creado con <span className="text-blue-500 font-semibold">isfinz</span> • Hacemos fácil la inversión💼</p>
        </div>
      </div>
    </div>
  );
};

export default SharedPortfolioView;
