// frontend/src/pages/PortfolioDetailsPage.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import portfolioService from '../services/portfolioService';
import rebalanceService from '../services/rebalanceService';
import ModernPortfolioChart from '../components/ModernPortfolioChart';
import HoldingCard from '../components/Portfolio/HoldingCard';
import AddHoldingModal from '../components/Portfolio/AddHoldingModal';
import InvestmentAmountModal from '../components/Portfolio/InvestmentAmountModal';
import RebalanceAlert from '../components/Portfolio/RebalanceAlert';
import SharePortfolioSection from '../components/SharePortfolioSection';

import { Loader2, TrendingUp, TrendingDown, PlusCircle, RefreshCw, Settings, Share2, Download, AlertTriangle, CheckCircle, Info } from 'lucide-react';


const PortfolioDetailsPage = () => {
  const { portfolioId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  // Estado del portfolio
  const [portfolio, setPortfolio] = useState(null);
  const [holdings, setHoldings] = useState([]);
  const [suggestions, setSuggestions] = useState(null);
  const [rebalanceInfo, setRebalanceInfo] = useState(null);
  
  // Estados de carga y modales
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddHoldingModal, setShowAddHoldingModal] = useState(false);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // 🆕 Estados de compartir
const [showShareMenu, setShowShareMenu] = useState(false);
const [shareLink, setShareLink] = useState(null);
const [loadingShare, setLoadingShare] = useState(false);


  useEffect(() => {
    loadPortfolioData();
  }, [portfolioId]);

  const loadPortfolioData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Cargar datos del portfolio
      const portfolioData = await portfolioService.getPortfolioDetails(portfolioId);
      setPortfolio(portfolioData.portfolio);
      setHoldings(portfolioData.portfolio.holdings || []);

      // Verificar si necesita configurar inversión inicial
      if (!portfolioData.portfolio.totalSavings || portfolioData.portfolio.totalSavings === 0) {
        setShowInvestmentModal(true);
      }

      // Cargar sugerencias de inversión
      const suggestionsData = await portfolioService.getSuggestions(portfolioId);
      setSuggestions(suggestionsData);

      // Cargar análisis de rebalanceo
      const rebalanceData = await rebalanceService.analyzePortfolio(portfolioId);
      setRebalanceInfo(rebalanceData);

    } catch (err) {
      console.error('Error loading portfolio:', err);
      setError('Error al cargar el portfolio. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadPortfolioData();
    setRefreshing(false);
  };

  const handleAddHolding = async (holdingData) => {
    try {
      await portfolioService.addHolding(
        portfolioId,
        holdingData.ticker,
        holdingData.quantity,
        holdingData.purchasePrice
      );
      
      setShowAddHoldingModal(false);
      await handleRefresh();
    } catch (err) {
      console.error('Error adding holding:', err);
      alert('Error al agregar activo. Intenta nuevamente.');
    }
  };

  const handleSetInvestmentAmount = async (amount) => {
    try {
      await portfolioService.updatePortfolio(portfolioId, {
        totalSavings: parseFloat(amount)
      });
      
      setShowInvestmentModal(false);
      await handleRefresh();
    } catch (err) {
      console.error('Error setting investment amount:', err);
      alert('Error al configurar monto de inversión.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Cargando portfolio...</p>
        </div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error || 'Portfolio no encontrado'}</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  const totalValue = portfolio.currentValue || 0;
  const totalInvested = holdings.reduce((sum, h) => sum + (h.quantity * h.averagePrice), 0);
  const totalGainLoss = totalValue - totalInvested;
  const gainLossPercentage = totalInvested > 0 ? ((totalGainLoss / totalInvested) * 100) : 0;
  const isProfit = totalGainLoss >= 0;

  // 🆕 AGREGAR ESTAS FUNCIONES

const handleGenerateShareLink = async () => {
  try {
    setLoadingShare(true);
    const result = await portfolioService.createShareLink(portfolioId);
    setShareLink(result);
    setShowShareMenu(false);
  } catch (error) {
    alert('Error generando link: ' + error.message);
  } finally {
    setLoadingShare(false);
  }
};

const handleCopyShareLink = () => {
  if (shareLink?.shareUrl) {
    navigator.clipboard.writeText(shareLink.shareUrl);
    alert('Link copiado al portapapeles');
  }
};

const handleCopyPortfolioSummary = async () => {
  try {
    await portfolioService.copyPortfolioSummary(portfolio, holdings);
    alert('Resumen copiado al portapapeles');
    setShowShareMenu(false);
  } catch (error) {
    alert('Error: ' + error.message);
  }
};

const handleExportCSV = async () => {
  try {
    await portfolioService.exportPortfolioAsCSV(portfolio, holdings);
  } catch (error) {
    alert('Error exportando: ' + error.message);
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PARTE 2 - HEADER Y ESTADÍSTICAS */}
        
        {/* Header con nombre y acciones */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Nombre y perfil */}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {portfolio.name}
              </h1>
              <p className="text-gray-600">
                Perfil: <span className="font-semibold text-gray-900">{portfolio.riskProfile}</span>
              </p>
            </div>

            {/* Acciones rápidas */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-2 text-gray-700"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                <span>Actualizar</span>
              </button>

              <button
                onClick={() => navigate(`/portfolio/${portfolioId}/settings`)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-2 text-gray-700"
              >
                <Settings className="w-5 h-5" />
                <span>Configurar</span>
              </button>

              {/* BOTÓN COMPARTIR - CON MENÚ DESPLEGABLE */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors flex items-center gap-2 text-gray-700"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Compartir</span>
                </button>

                {/* Menú desplegable - DENTRO del relative */}
                {showShareMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-10 min-w-max">
                    <button
                      onClick={handleGenerateShareLink}
                      disabled={loadingShare}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm border-b border-gray-100 disabled:opacity-50"
                    >
                      {loadingShare ? '⏳ Generando...' : '🔗 Generar link (7 días)'}
                    </button>
                    <button
                      onClick={handleCopyPortfolioSummary}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-sm"
                    >
                      📋 Copiar resumen
                    </button>
                  </div>
                )}
              </div>

              {/* BOTÓN EXPORTAR CSV */}
              <button
                onClick={handleExportCSV}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all flex items-center gap-2 shadow-lg"
              >
                <Download className="w-5 h-5" />
                <span>Exportar</span>
              </button>
            </div>

            {/* 🆕 MOSTRAR LINK COMPARTIDO SI EXISTE - FUERA DE LOS BOTONES */}
            {shareLink && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-gray-900 mb-2">Link generado (válido 7 días):</p>
                <div className="flex items-center gap-2 bg-white p-3 rounded border border-blue-300">
                  <input
                    type="text"
                    value={shareLink.shareUrl}
                    readOnly
                    className="flex-1 text-sm text-gray-600 bg-transparent outline-none"
                  />
                  <button
                    onClick={handleCopyShareLink}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Copiar
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Expira: {new Date(shareLink.expiresAt).toLocaleDateString('es-ES')}
                </p>
              </div>
            )}
          </div>

          {/* Estadísticas principales */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            {/* Valor Total */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <p className="text-sm text-blue-600 font-medium mb-1">Valor Total</p>
              <p className="text-2xl font-bold text-blue-900">
                {totalValue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>

            {/* Invertido */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <p className="text-sm text-purple-600 font-medium mb-1">Invertido</p>
              <p className="text-2xl font-bold text-purple-900">
                {totalInvested.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>

            {/* Ganancia/Pérdida */}
            <div className={`bg-gradient-to-br ${isProfit ? 'from-green-50 to-green-100' : 'from-red-50 to-red-100'} rounded-xl p-4`}>
              <p className={`text-sm ${isProfit ? 'text-green-600' : 'text-red-600'} font-medium mb-1 flex items-center gap-1`}>
                {isProfit ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                Ganancia/Pérdida
              </p>
              <p className={`text-2xl font-bold ${isProfit ? 'text-green-900' : 'text-red-900'}`}>
                {totalGainLoss.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                <span className="text-lg ml-2">({gainLossPercentage.toFixed(2)}%)</span>
              </p>
            </div>

            {/* Holdings */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4">
              <p className="text-sm text-orange-600 font-medium mb-1">Activos</p>
              <p className="text-2xl font-bold text-orange-900">
                {holdings.length} {holdings.length === 1 ? 'activo' : 'activos'}
              </p>
            </div>
          </div>
        </div>

        {/* PARTE 3 - ALERTA DE REBALANCEO (si aplica) */}
        {rebalanceInfo?.needsRebalancing && (
          <RebalanceAlert 
            rebalanceInfo={rebalanceInfo}
            portfolioId={portfolioId}
            onRebalanced={handleRefresh}
          />
        )}

        {/* PARTE 4 - GRÁFICO DE DISTRIBUCIÓN */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Info className="w-6 h-6 text-blue-500" />
            Distribución de tu Portfolio
          </h2>
          
          {portfolio.recommended && (
            <ModernPortfolioChart
              portfolio={portfolio.recommended}
              currentAllocation={portfolio.actual || {}}
              showComparison={true}
            />
          )}

          {/* Info adicional del gráfico */}
          <div className="mt-4 p-4 bg-blue-50 rounded-xl">
            <div className="flex items-start gap-2">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">¿Qué significa esto?</p>
                <p>
                  El gráfico muestra tu distribución <span className="font-semibold">recomendada</span> vs 
                  tu distribución <span className="font-semibold">actual</span>. Intenta mantener las barras 
                  cerca de los valores recomendados para un portfolio balanceado.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 🆕 AGREGAR AQUÍ - Sección de Compartir Portfolio */}
        <div className="mb-8">
          <SharePortfolioSection portfolioId={portfolioId} />
        </div>
        {/* PARTE 5 - SUGERENCIAS DE INVERSIÓN (si existen) */}
        {suggestions && suggestions.suggestions && suggestions.suggestions.length > 0 && (
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-xl p-6 mb-6 border border-yellow-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
              Sugerencias de Inversión
            </h2>

            <div className="space-y-3">
              {suggestions.suggestions.map((suggestion, index) => (
                <div key={index} className="bg-white rounded-xl p-4 border border-yellow-200">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {suggestion.category}: {suggestion.message}
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Te faltan aproximadamente{' '}
                        <span className="font-semibold text-yellow-600">
                          {suggestion.amountNeeded?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </span>
                      </p>
                      {suggestion.recommendedAssets && suggestion.recommendedAssets.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500 mb-1">Activos sugeridos:</p>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.recommendedAssets.map((asset, idx) => (
                              <span key={idx} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-medium">
                                {asset.ticker}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-white rounded-xl border border-yellow-200">
              <p className="text-sm text-gray-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>
                  Estas sugerencias te ayudan a mantener tu portfolio balanceado según tu perfil de riesgo. 
                  No es obligatorio seguirlas al pie de la letra.
                </span>
              </p>
            </div>
          </div>
        )}

        {/* CONTINÚA EN PARTE 3 (Holdings y modales)... */}
        {/* PARTE 3 - LISTA DE HOLDINGS */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Tus Activos ({holdings.length})
            </h2>

            <button
              onClick={() => setShowAddHoldingModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all flex items-center gap-2 shadow-lg group"
            >
              <PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Agregar Activo</span>
            </button>
          </div>

          {holdings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusCircle className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Aún no tienes activos
              </h3>
              <p className="text-gray-600 mb-6">
                Comienza agregando tu primer activo a este portfolio
              </p>
              <button
                onClick={() => setShowAddHoldingModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
              >
                Agregar Primer Activo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {holdings.map((holding) => (
                <HoldingCard
                  key={holding.id}
                  holding={holding}
                  portfolioId={portfolioId}
                  onUpdate={handleRefresh}
                />
              ))}
            </div>
          )}

          {holdings.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-900 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Recuerda:</span> Los precios se actualizan automáticamente 
                  cada día. Las ganancias/pérdidas son calculadas en base a tus precios de compra.
                </span>
              </p>
            </div>
          )}
        </div>

        {/* PARTE 4 - INFORMACIÓN ADICIONAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Diversificación */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Diversificación</h3>
            <div className="space-y-3">
              {Object.entries(portfolio.actual || {}).map(([category, percentage]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 capitalize">
                      {category.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-semibold text-gray-900">{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rendimiento */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Rendimiento</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Hoy</span>
                <span className="font-semibold text-green-600">+0.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Esta semana</span>
                <span className="font-semibold text-green-600">+2.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Este mes</span>
                <span className="font-semibold text-green-600">+5.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total</span>
                <span className={`font-semibold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                  {gainLossPercentage >= 0 ? '+' : ''}{gainLossPercentage.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MODALES */}
        
        {/* Modal: Agregar Activo */}
        {showAddHoldingModal && (
          <AddHoldingModal
            portfolioId={portfolioId}
            portfolio={portfolio}
            onClose={() => setShowAddHoldingModal(false)}
            onAdd={handleAddHolding}
          />
        )}

        {/* Modal: Configurar Inversión Inicial */}
        {showInvestmentModal && (
          <InvestmentAmountModal
            portfolio={portfolio}
            onClose={() => setShowInvestmentModal(false)}
            onSave={handleSetInvestmentAmount}
          />
        )}

      </div>
    </div>
  );
};

export default PortfolioDetailsPage;

