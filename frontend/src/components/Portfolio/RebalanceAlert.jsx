// frontend/src/components/Portfolio/RebalanceAlert.jsx
import { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, RefreshCw, X, CheckCircle } from 'lucide-react';
import rebalanceService from '../../services/rebalanceService';

const RebalanceAlert = ({ rebalanceInfo, portfolioId, onRebalanced }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showAutoRebalance, setShowAutoRebalance] = useState(false);
  const [rebalancing, setRebalancing] = useState(false);
  const [rebalanceProposal, setRebalanceProposal] = useState(null);

  const deviation = rebalanceInfo.totalDeviation || 0;
  const isHighDeviation = deviation >= 10;

  const handleAutoRebalance = async () => {
    try {
      setRebalancing(true);
      // Simular propuesta de rebalanceo (en producción viene del backend)
      const proposal = {
        adjustments: rebalanceInfo.suggestions.map(sug => ({
          category: sug.category,
          current: sug.current,
          target: sug.target,
          difference: sug.difference,
          action: sug.difference > 0 ? 'reduce' : 'increase',
          assets: sug.recommendedAssets || []
        }))
      };
      
      setRebalanceProposal(proposal);
      setShowAutoRebalance(true);
    } catch (error) {
      console.error('Error getting rebalance proposal:', error);
      alert('Error al generar propuesta de rebalanceo');
    } finally {
      setRebalancing(false);
    }
  };

  const handleApplyRebalance = async () => {
    if (!confirm('¿Estás seguro de aplicar estos ajustes?')) return;

    try {
      // En producción, esto actualizaría los targets en el backend
      await rebalanceService.markAsExecuted(portfolioId);
      alert('Ajustes aplicados exitosamente');
      setShowAutoRebalance(false);
      onRebalanced();
    } catch (error) {
      console.error('Error applying rebalance:', error);
      alert('Error al aplicar ajustes');
    }
  };

  return (
    <>
      <div className={`rounded-2xl shadow-xl p-6 mb-6 border-2 ${
        isHighDeviation 
          ? 'bg-gradient-to-br from-red-50 to-orange-50 border-red-300'
          : 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${
              isHighDeviation ? 'bg-red-100' : 'bg-yellow-100'
            }`}>
              <AlertTriangle className={`w-6 h-6 ${
                isHighDeviation ? 'text-red-600' : 'text-yellow-600'
              }`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {isHighDeviation ? '⚠️ Rebalanceo Urgente' : 'Portfolio Desbalanceado'}
              </h3>
              <p className="text-sm text-gray-700">
                Desviación total: <span className="font-bold">{deviation.toFixed(1)}%</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {showDetails ? 'Ocultar' : 'Ver detalles'}
          </button>
        </div>

        {/* Sugerencias rápidas */}
        {!showDetails && rebalanceInfo.suggestions && (
          <div className="bg-white rounded-xl p-4 mb-4 border border-yellow-200">
            <p className="text-sm text-gray-700 mb-2">
              <span className="font-semibold">Acciones recomendadas:</span>
            </p>
            <ul className="space-y-1 text-sm text-gray-600">
              {rebalanceInfo.suggestions.slice(0, 2).map((sug, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  {sug.difference > 0 ? (
                    <TrendingDown className="w-4 h-4 text-red-500 flex-shrink-0" />
                  ) : (
                    <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0" />
                  )}
                  <span>
                    {sug.category}: {sug.difference > 0 ? 'Reducir' : 'Aumentar'}{' '}
                    {Math.abs(sug.difference).toFixed(1)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Detalles expandidos */}
        {showDetails && (
          <div className="space-y-3 mb-4">
            {rebalanceInfo.suggestions.map((suggestion, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-yellow-200">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {suggestion.difference > 0 ? (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    )}
                    <h4 className="font-semibold text-gray-900 capitalize">
                      {suggestion.category.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                  </div>
                  <span className={`text-sm font-bold ${
                    suggestion.difference > 0 ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {suggestion.difference > 0 ? '-' : '+'}{Math.abs(suggestion.difference).toFixed(1)}%
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                  <span>Actual: <span className="font-semibold">{suggestion.current}%</span></span>
                  <span>→</span>
                  <span>Target: <span className="font-semibold">{suggestion.target}%</span></span>
                </div>

                <p className="text-sm text-gray-700">{suggestion.message}</p>

                {suggestion.recommendedAssets && suggestion.recommendedAssets.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {suggestion.recommendedAssets.map((asset, assetIdx) => (
                      <span key={assetIdx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {asset.ticker}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-3">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 px-4 py-3 bg-white hover:bg-gray-50 border-2 border-gray-300 text-gray-700 rounded-xl transition-colors font-semibold"
          >
            {showDetails ? 'Ocultar Detalles' : 'Ver Detalles'}
          </button>
          
          <button
            onClick={handleAutoRebalance}
            disabled={rebalancing}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all font-semibold shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${rebalancing ? 'animate-spin' : ''}`} />
            <span>{rebalancing ? 'Calculando...' : 'Rebalancear Automáticamente'}</span>
          </button>
        </div>
      </div>

      {/* Modal de propuesta de rebalanceo automático */}
      {showAutoRebalance && rebalanceProposal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Propuesta de Rebalanceo</h2>
                <button
                  onClick={() => setShowAutoRebalance(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-160px)]">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-sm text-blue-900 flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    <span className="font-semibold">Importante:</span> Esta plataforma NO ejecuta 
                    compras ni ventas. Te mostramos qué ajustes hacer en tu broker.
                  </span>
                </p>
              </div>

              <div className="space-y-4">
                {rebalanceProposal.adjustments.map((adjustment, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-gray-900 capitalize">
                        {adjustment.category.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        adjustment.action === 'reduce' 
                          ? 'bg-red-100 text-red-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {adjustment.action === 'reduce' ? 'Reducir' : 'Aumentar'}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm mb-3">
                      <span className="text-gray-600">
                        Actual: <span className="font-semibold">{adjustment.current}%</span>
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="text-gray-600">
                        Target: <span className="font-semibold">{adjustment.target}%</span>
                      </span>
                    </div>

                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="text-sm text-gray-700 font-semibold mb-2">
                        {adjustment.action === 'reduce' 
                          ? '📉 No compres más en esta categoría por ahora'
                          : '📈 Agrega activos de esta categoría:'}
                      </p>
                      {adjustment.action === 'increase' && adjustment.assets.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {adjustment.assets.map((asset, assetIdx) => (
                            <span key={assetIdx} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              {asset.ticker}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAutoRebalance(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleApplyRebalance}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all font-semibold shadow-lg"
                >
                  Marcar como Aplicado
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RebalanceAlert;
