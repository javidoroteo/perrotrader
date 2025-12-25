// frontend/src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import portfolioService from '../services/portfolioService';
import rebalanceService from '../services/rebalanceService';
import recommendationService from '../services/recommendationService'; // 🆕 NUEVO IMPORT
import { 
  Loader2, 
  PlusCircle, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  AlertTriangle, 
  ArrowRight, 
  BarChart3, 
  Target, 
  Activity,
  Sparkles, // 🆕 NUEVO ICONO
  X, // 🆕 NUEVO ICONO
  Info, // 🆕 NUEVO ICONO
  Star, // 🆕 NUEVO ICONO
  Eye // 🆕 NUEVO ICONO
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [portfolios, setPortfolios] = useState([]);
  const [rebalanceAlerts, setRebalanceAlerts] = useState({});

  // 🆕 NUEVOS ESTADOS para recomendaciones IA
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [loadingAIRecommendations, setLoadingAIRecommendations] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedPortfolioForAdd, setSelectedPortfolioForAdd] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addingToPortfolio, setAddingToPortfolio] = useState(false);

  // 🆕 Estados para agregar activo
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Cargar portfolios
      const response = await portfolioService.getPortfolios();
      setPortfolios(response.portfolios || []);

      // Cargar alertas de rebalanceo para cada portfolio
      const alerts = {};
      for (const portfolio of response.portfolios || []) {
        try {
          const analysis = await rebalanceService.analyzePortfolio(portfolio.id);
          if (analysis.needsRebalancing) {
            alerts[portfolio.id] = analysis;
          }
        } catch (err) {
          console.error(`Error analyzing portfolio ${portfolio.id}:`, err);
        }
      }
      setRebalanceAlerts(alerts);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
      // 🆕 Cargar recomendaciones IA después (lazy loading)
      loadAIRecommendations();
    }
  };

  // 🆕 NUEVA FUNCIÓN: Cargar recomendaciones IA (lazy loading)
  const loadAIRecommendations = async () => {
    try {
      setLoadingAIRecommendations(true);
      const response = await recommendationService.getPersonalizedRecommendations(5);
      setAiRecommendations(response.recommendations || []);
    } catch (error) {
      console.error('Error loading AI recommendations:', error);
      setAiRecommendations([]);
    } finally {
      setLoadingAIRecommendations(false);
    }
  };

  // 🆕 NUEVA FUNCIÓN: Abrir modal de producto con tracking
  const handleProductClick = async (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);

    // Trackear acción CLICKED
    try {
      await recommendationService.trackAction(product.id, 'CLICKED');
    } catch (error) {
      console.error('Error tracking click:', error);
    }
  };

  // 🆕 NUEVA FUNCIÓN: Abrir modal para agregar a portfolio
  const handleAddToPortfolio = (product) => {
    setSelectedProduct(product);
    setShowProductModal(false);
    setShowAddModal(true);
    setQuantity('');
    setPurchasePrice('');
    // Pre-seleccionar el primer portfolio si existe
    if (portfolios.length > 0) {
      setSelectedPortfolioForAdd(portfolios[0].id);
    }
  };

  // 🆕 NUEVA FUNCIÓN: Confirmar agregar al portfolio
  const confirmAddToPortfolio = async () => {
    if (!selectedProduct || !selectedPortfolioForAdd || !quantity || !purchasePrice) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      setAddingToPortfolio(true);

      await portfolioService.addAssetToPortfolio(selectedPortfolioForAdd, {
        ticker: selectedProduct.ticker,
        quantity: parseFloat(quantity),
        purchasePrice: parseFloat(purchasePrice)
      });

      // Trackear acción SELECTED
      await recommendationService.trackAction(selectedProduct.id, 'SELECTED');

      // Recargar portfolios
      await loadDashboardData();

      // Cerrar modales y limpiar
      setShowAddModal(false);
      setSelectedProduct(null);
      setQuantity('');
      setPurchasePrice('');

      alert('¡Activo agregado exitosamente!');
    } catch (error) {
      console.error('Error adding asset to portfolio:', error);
      alert('Error al agregar el activo. Intenta de nuevo.');
    } finally {
      setAddingToPortfolio(false);
    }
  };

  const calculateTotalValue = () => {
    return portfolios.reduce((sum, p) => sum + (p.totalValue || 0), 0);
  };

  const calculateTotalGains = () => {
    return portfolios.reduce((sum, p) => {
      const gains = (p.totalValue || 0) - (p.totalInvested || 0);
      return sum + gains;
    }, 0);
  };

  const calculateTotalGainsPercentage = () => {
    const totalInvested = portfolios.reduce((sum, p) => sum + (p.totalInvested || 0), 0);
    if (totalInvested === 0) return 0;
    return ((calculateTotalGains() / totalInvested) * 100).toFixed(2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto text-blue-600 mb-4" />
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Hola, {user?.name?.split(' ')[0] || 'Inversor'}! 👋
          </h1>
          <p className="text-gray-600">
            Aquí está tu resumen de inversiones
          </p>
        </div>

        {/* Métricas Generales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Invertido */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-500">Total Invertido</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              €{calculateTotalValue().toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Ganancias/Pérdidas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${calculateTotalGains() >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                {calculateTotalGains() >= 0 ? (
                  <TrendingUp className="w-6 h-6 text-green-600" />
                ) : (
                  <TrendingDown className="w-6 h-6 text-red-600" />
                )}
              </div>
              <span className="text-sm text-gray-500">Ganancias/Pérdidas</span>
            </div>
            <p className={`text-3xl font-bold ${calculateTotalGains() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {calculateTotalGains() >= 0 ? '+' : ''}€{calculateTotalGains().toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {calculateTotalGains() >= 0 ? '+' : ''}{calculateTotalGainsPercentage()}%
            </p>
          </div>

          {/* Portfolios Activos */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-500">Portfolios</span>
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {portfolios.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {Object.keys(rebalanceAlerts).length} necesita{Object.keys(rebalanceAlerts).length !== 1 ? 'n' : ''} rebalanceo
            </p>
          </div>
        </div>

        {/* Alertas de Rebalanceo */}
        {Object.keys(rebalanceAlerts).length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Algunos portfolios necesitan rebalanceo
                </h3>
                <div className="space-y-2">
                  {Object.entries(rebalanceAlerts).map(([portfolioId, alert]) => {
                    const portfolio = portfolios.find(p => p.id === portfolioId);
                    return (
                      <div key={portfolioId} className="flex items-center justify-between bg-white/60 p-3 rounded-lg">
                        <span className="font-medium text-gray-900">{portfolio?.name}</span>
                        <span className="text-sm text-yellow-700">
                          Desviación: {alert.totalDeviation?.toFixed(1)}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🆕 NUEVA SECCIÓN: Selector de opciones SOLO si no hay portfolios */}
{portfolios.length === 0 ? (
  <div className="grid md:grid-cols-2 gap-6 mb-8">
    {/* Opción 1: Crear desde cero */}
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-8 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <PlusCircle className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            Crear Cartera Desde Cero
          </h3>
        </div>
      </div>
      <p className="text-gray-600 mb-6">
        Gestiona tu cartera manualmente. Busca activos, invierte a tu ritmo.
        Perfecto si ya sabes en qué invertir.
      </p>
      <button
        onClick={() => navigate('/create-portfolio')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        Comenzar <ArrowRight size={20} />
      </button>
    </div>

    {/* Opción 2: Hacer test */}
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-8 hover:shadow-lg transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Star className="text-purple-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">
            Hacer Test de Inversión
          </h3>
        </div>
      </div>
      <p className="text-gray-600 mb-6">
        Responde las preguntas y obtén recomendaciones personalizadas. Ideal si necesitas orientación.
      </p>
      <button
        onClick={() => navigate('/quiz')}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        Comenzar Test <ArrowRight size={20} />
      </button>
    </div>
  </div>
) : null}

{/* 📊 Sección de Portfolios del usuario (aparece cuando hay portfolios) */}
{portfolios.length > 0 && (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Mis Carteras</h2>
    <div className="grid gap-4">
      {portfolios.map((portfolio) => (
        <div key={portfolio.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{portfolio.name}</h3>
              <p className="text-sm text-gray-600">
                {portfolio.riskProfile && `Perfil: ${portfolio.riskProfile}`}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                €{portfolio.totalValue?.toLocaleString('es-ES', { minimumFractionDigits: 2 }) || '0.00'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
        {/* 🆕 NUEVA SECCIÓN: Recomendaciones Personalizadas IA */}
        <div className="bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 rounded-xl border border-purple-200 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                Recomendaciones Personalizadas IA
              </h2>
              <p className="text-sm text-gray-600">
                Basadas en tu perfil de inversión y preferencias
              </p>
            </div>
            <button
              onClick={() => navigate('/assets')}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              Ver más
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {loadingAIRecommendations ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600 mb-3" />
              <p className="text-gray-600 text-sm">Cargando recomendaciones personalizadas...</p>
            </div>
          ) : aiRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {aiRecommendations.map((rec) => (
                <div
                  key={rec.product.id}
                  onClick={() => handleProductClick(rec.product)}
                  className="bg-white rounded-lg border border-purple-200 p-4 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                        {rec.product.ticker}
                      </h4>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {rec.product.name}
                      </p>
                    </div>
                    <Star className="w-4 h-4 text-yellow-500 flex-shrink-0 ml-2" />
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 font-medium rounded">
                      {rec.product.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {(rec.similarity * 100).toFixed(0)}% match
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-center text-purple-600 group-hover:text-purple-700 text-xs font-medium">
                    <Eye className="w-3 h-3 mr-1" />
                    Ver detalles
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Info className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No hay recomendaciones disponibles</p>
              <p className="text-sm mt-1">Completa el cuestionario para recibir recomendaciones personalizadas</p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              >
                Completar Quiz
              </button>
            </div>
          )}
        </div>

        {/* 🆕 NUEVO MODAL: Detalles del Producto */}
        {showProductModal && selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {selectedProduct.ticker}
                      </h2>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                        {selectedProduct.type}
                      </span>
                    </div>
                    <p className="text-gray-600">{selectedProduct.name}</p>
                  </div>
                  <button
                    onClick={() => setShowProductModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {selectedProduct.description && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2 font-semibold">Descripción</p>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {selectedProduct.category && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Categoría</p>
                        <p className="font-semibold text-gray-900">{selectedProduct.category}</p>
                      </div>
                    )}
                    {selectedProduct.expenseRatio && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Ratio de Gastos</p>
                        <p className="font-semibold text-gray-900">{selectedProduct.expenseRatio}%</p>
                      </div>
                    )}
                    {selectedProduct.region && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Región</p>
                        <p className="font-semibold text-gray-900">{selectedProduct.region}</p>
                      </div>
                    )}
                    {selectedProduct.sector && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Sector</p>
                        <p className="font-semibold text-gray-900">{selectedProduct.sector}</p>
                      </div>
                    )}
                  </div>

                  {/* Explicación de por qué es recomendado */}
                  {aiRecommendations.find(r => r.product.id === selectedProduct.id)?.explanation && (
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2 font-semibold flex items-center gap-2">
                        <Info className="w-4 h-4 text-purple-600" />
                        Por qué te lo recomendamos
                      </p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {aiRecommendations.find(r => r.product.id === selectedProduct.id).explanation.map((reason, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={() => handleAddToPortfolio(selectedProduct)}
                      disabled={portfolios.length === 0}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PlusCircle className="w-5 h-5" />
                      Agregar a Portfolio
                    </button>
                    <button
                      onClick={() => navigate('/assets')}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Ver en Activos
                    </button>
                  </div>

                  {portfolios.length === 0 && (
                    <p className="text-sm text-yellow-600 text-center bg-yellow-50 p-2 rounded">
                      Crea un portfolio primero para poder agregar activos
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🆕 NUEVO MODAL: Agregar a Portfolio */}
        {showAddModal && selectedProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      Agregar a Portfolio
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedProduct.ticker} - {selectedProduct.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Seleccionar Portfolio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Seleccionar Portfolio
                    </label>
                    <select
                      value={selectedPortfolioForAdd || ''}
                      onChange={(e) => setSelectedPortfolioForAdd(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {portfolios.map((portfolio) => (
                        <option key={portfolio.id} value={portfolio.id}>
                          {portfolio.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Cantidad */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cantidad
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      placeholder="Ej: 10"
                      min="0"
                      step="0.001"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Precio de Compra */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio de Compra (€)
                    </label>
                    <input
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      placeholder="Ej: 450.00"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Total */}
                  {quantity && purchasePrice && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Inversión Total</p>
                      <p className="text-2xl font-bold text-gray-900">
                        €{(parseFloat(quantity) * parseFloat(purchasePrice)).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={confirmAddToPortfolio}
                      disabled={addingToPortfolio || !quantity || !purchasePrice || !selectedPortfolioForAdd}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addingToPortfolio ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Agregando...
                        </>
                      ) : (
                        <>
                          <PlusCircle className="w-5 h-5" />
                          Confirmar
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => setShowAddModal(false)}
                      disabled={addingToPortfolio}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
