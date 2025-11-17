// frontend/src/pages/Dashboard.jsx
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import portfolioService from '../services/portfolioService';
import rebalanceService from '../services/rebalanceService';
import recommendationService from '../services/recommendationService';
import { 
  Loader2, PlusCircle, TrendingUp, TrendingDown, Wallet, 
  AlertTriangle, ArrowRight, BarChart3, Target, Activity, 
  Sparkles, X, Info, Star, Eye, CheckCircle, XCircle 
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // ✅ NUEVO: Ref para cleanup y prevenir race conditions
  const isMountedRef = useRef(true);
  
  const [loading, setLoading] = useState(true);
  const [portfolios, setPortfolios] = useState([]);
  const [rebalanceAlerts, setRebalanceAlerts] = useState({});
  
  // Estados para recomendaciones IA
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [loadingAIRecommendations, setLoadingAIRecommendations] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedPortfolioForAdd, setSelectedPortfolioForAdd] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addingToPortfolio, setAddingToPortfolio] = useState(false);
  
  // Estados para agregar activo
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  
  // ✅ NUEVO: Estados para notificaciones (reemplaza alert())
  const [notification, setNotification] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // ✅ MEJORADO: useEffect con cleanup
  useEffect(() => {
    isMountedRef.current = true;
    loadDashboardData();
    
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // ✅ MEJORADO: Con verificación de mounted
  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      
      // Cargar portfolios
      const response = await portfolioService.getPortfolios();
      
      if (!isMountedRef.current) return;
      
      setPortfolios(response.portfolios || []);
      
      // Cargar alertas de rebalanceo para cada portfolio
      const alerts = {};
      for (const portfolio of response.portfolios || []) {
        try {
          const analysis = await rebalanceService.analyzePortfolio(portfolio.id);
          
          if (!isMountedRef.current) return;
          
          if (analysis.needsRebalancing) {
            alerts[portfolio.id] = analysis;
          }
        } catch (err) {
          console.error(`Error analyzing portfolio ${portfolio.id}:`, err);
        }
      }
      
      if (!isMountedRef.current) return;
      
      setRebalanceAlerts(alerts);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      if (isMountedRef.current) {
        setErrorMessage('Error al cargar los datos del dashboard');
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        // Cargar recomendaciones IA después (lazy loading)
        loadAIRecommendations();
      }
    }
  };

  // ✅ MEJORADO: Con verificación de mounted
  const loadAIRecommendations = async () => {
    try {
      setLoadingAIRecommendations(true);
      const response = await recommendationService.getPersonalizedRecommendations(5);
      
      if (!isMountedRef.current) return;
      
      setAiRecommendations(response.recommendations || []);
    } catch (error) {
      console.error('Error loading AI recommendations:', error);
      if (isMountedRef.current) {
        setAiRecommendations([]);
      }
    } finally {
      if (isMountedRef.current) {
        setLoadingAIRecommendations(false);
      }
    }
  };

  // ✅ MEJORADO: Con verificación de mounted
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

  const handleAddToPortfolio = (product) => {
    setSelectedProduct(product);
    setShowProductModal(false);
    setShowAddModal(true);
    setQuantity('');
    setPurchasePrice('');
    setErrorMessage(null);
    
    // Pre-seleccionar el primer portfolio si existe
    if (portfolios.length > 0) {
      setSelectedPortfolioForAdd(portfolios[0].id);
    }
  };

  // ✅ MEJORADO: Validación robusta de inputs + Notificaciones
  const confirmAddToPortfolio = async () => {
    // Validar campos obligatorios
    if (!selectedProduct || !selectedPortfolioForAdd) {
      setErrorMessage('Selecciona un producto y un portfolio');
      return;
    }
    
    // ✅ VALIDACIÓN ROBUSTA de quantity y purchasePrice
    const qty = parseFloat(quantity);
    const price = parseFloat(purchasePrice);
    
    if (!quantity || !purchasePrice) {
      setErrorMessage('Por favor completa todos los campos');
      return;
    }
    
    if (isNaN(qty) || qty <= 0) {
      setErrorMessage('La cantidad debe ser un número positivo mayor a 0');
      return;
    }
    
    if (isNaN(price) || price <= 0) {
      setErrorMessage('El precio debe ser un número positivo mayor a 0');
      return;
    }
    
    try {
      setAddingToPortfolio(true);
      setErrorMessage(null);
      
      await portfolioService.addAssetToPortfolio(selectedPortfolioForAdd, {
        ticker: selectedProduct.ticker,
        quantity: qty,
        purchasePrice: price
      });
      
      if (!isMountedRef.current) return;
      
      // Trackear acción SELECTED
      try {
        await recommendationService.trackAction(selectedProduct.id, 'SELECTED');
      } catch (err) {
        console.error('Error tracking action:', err);
      }
      
      // Recargar portfolios
      await loadDashboardData();
      
      if (!isMountedRef.current) return;
      
      // Cerrar modales y limpiar
      setShowAddModal(false);
      setSelectedProduct(null);
      setQuantity('');
      setPurchasePrice('');
      
      // ✅ Notificación de éxito en lugar de alert()
      setNotification({
        type: 'success',
        message: '¡Activo agregado exitosamente!'
      });
      
      // Auto-cerrar notificación después de 3 segundos
      setTimeout(() => {
        if (isMountedRef.current) {
          setNotification(null);
        }
      }, 3000);
      
    } catch (error) {
      console.error('Error adding asset to portfolio:', error);
      if (isMountedRef.current) {
        setErrorMessage('Error al agregar el activo. Intenta de nuevo.');
      }
    } finally {
      if (isMountedRef.current) {
        setAddingToPortfolio(false);
      }
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

  // ✅ MEJORADO: Devuelve string formateado consistentemente
  const calculateTotalGainsPercentage = () => {
    const totalInvested = portfolios.reduce((sum, p) => 
      sum + (p.totalInvested || 0), 0);
    
    if (totalInvested === 0) return '0.00';
    
    return ((calculateTotalGains() / totalInvested) * 100).toFixed(2);
  };

  // ✅ NUEVO: Componente de notificación (reemplaza alert())
  const NotificationToast = ({ notification, onClose }) => {
    if (!notification) return null;
    
    const isSuccess = notification.type === 'success';
    
    return (
      <div className="fixed top-4 right-4 z-50 animate-slide-in">
        <div className={`
          p-4 rounded-xl shadow-lg border flex items-center gap-3 min-w-[300px]
          ${isSuccess 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
          }
        `}>
          {isSuccess ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="flex-1 font-medium">{notification.message}</p>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/50 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  // ✅ NUEVO: Componente de error global
  const ErrorBanner = ({ message, onClose }) => {
    if (!message) return null;
    
    return (
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-red-800 font-medium">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-red-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-red-600" />
        </button>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      {/* ✅ NUEVO: Notificaciones */}
      <NotificationToast 
        notification={notification} 
        onClose={() => setNotification(null)} 
      />
      
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Aquí está tu resumen de inversiones
            </p>
          </div>
          <button
            onClick={() => navigate('/portfolio/create')}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            <PlusCircle className="w-5 h-5" />
            Crear Portfolio
          </button>
        </div>

        {/* ✅ NUEVO: Error Banner */}
        <ErrorBanner 
          message={errorMessage} 
          onClose={() => setErrorMessage(null)} 
        />

        {/* Resumen General */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm">Valor Total</p>
              <Wallet className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              €{calculateTotalValue().toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm">Ganancias/Pérdidas</p>
              {calculateTotalGains() >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>
            <p className={`text-3xl font-bold ${calculateTotalGains() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {calculateTotalGains() >= 0 ? '+' : ''}€{calculateTotalGains().toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </p>
            <p className={`text-sm ${calculateTotalGains() >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {calculateTotalGains() >= 0 ? '+' : ''}{calculateTotalGainsPercentage()}%
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm">Portfolios</p>
              <BarChart3 className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-3xl font-bold text-gray-900">
              {portfolios.length}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-600 text-sm">Alertas</p>
              <AlertTriangle className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-600">
              {Object.keys(rebalanceAlerts).length}
            </p>
            <p className="text-sm text-gray-600">
              necesita{Object.keys(rebalanceAlerts).length !== 1 ? 'n' : ''} rebalanceo
            </p>
          </div>
        </div>

        {/* Mis Portfolios */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Mis Portfolios</h2>
          </div>

          {portfolios.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                Crea tu primer portfolio respondiendo nuestro cuestionario
              </p>
              <button
                onClick={() => navigate('/portfolio/create')}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
              >
                Empezar Ahora
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolios.map(portfolio => (
                <div
                  key={portfolio.id}
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(`/portfolio/${portfolio.id}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{portfolio.name}</h3>
                      <p className="text-sm text-gray-600">{portfolio.riskProfile || 'Perfil no definido'}</p>
                    </div>
                    {rebalanceAlerts[portfolio.id] && (
                      <AlertTriangle className="w-5 h-5 text-orange-600" />
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valor:</span>
                      <span className="font-semibold">
                        €{(portfolio.totalValue || 0).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ganancia:</span>
                      <span className={`font-semibold ${
                        ((portfolio.totalValue || 0) - (portfolio.totalInvested || 0)) >= 0 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {((portfolio.totalValue || 0) - (portfolio.totalInvested || 0)) >= 0 ? '+' : ''}
                        €{((portfolio.totalValue || 0) - (portfolio.totalInvested || 0)).toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/portfolio/${portfolio.id}`);
                    }}
                    className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Ver Detalles
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Recomendaciones IA Personalizadas */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg border border-blue-100">
          <div className="flex items-center gap-3 mb-6">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Recomendaciones para ti</h2>
              <p className="text-sm text-gray-600">Basadas en tu perfil de inversión y preferencias</p>
            </div>
          </div>

          {loadingAIRecommendations ? (
            <div className="text-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600">Cargando recomendaciones personalizadas...</p>
            </div>
          ) : aiRecommendations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiRecommendations.map((rec, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleProductClick(rec.product)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {rec.product.ticker}
                    </h3>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-xs font-medium">{rec.score.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {rec.product.name}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">{rec.product.category}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(rec.product);
                      }}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                    >
                      <Eye className="w-3 h-3" />
                      Ver más
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Info className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600">No hay recomendaciones disponibles</p>
              <p className="text-sm text-gray-500 mt-1">
                Completa el cuestionario para recibir recomendaciones personalizadas
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Detalles del Producto */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {selectedProduct.ticker}
                </h3>
                <p className="text-gray-600">{selectedProduct.name}</p>
              </div>
              <button
                onClick={() => setShowProductModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Descripción</h4>
                <p className="text-gray-600">{selectedProduct.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Categoría</h4>
                  <p className="text-gray-600">{selectedProduct.category}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Ratio de Gastos</h4>
                  <p className="text-gray-600">{selectedProduct.expenseRatio}%</p>
                </div>
                {selectedProduct.region && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Región</h4>
                    <p className="text-gray-600">{selectedProduct.region}</p>
                  </div>
                )}
                {selectedProduct.sector && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Sector</h4>
                    <p className="text-gray-600">{selectedProduct.sector}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowProductModal(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Cerrar
              </button>
              <button
                onClick={() => handleAddToPortfolio(selectedProduct)}
                disabled={portfolios.length === 0}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                title={portfolios.length === 0 ? 'Crea un portfolio primero para poder agregar activos' : ''}
              >
                Agregar a Portfolio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Agregar a Portfolio */}
      {showAddModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-6">
            <div className="flex justify-between items-start">
              <h3 className="text-2xl font-bold text-gray-900">
                Agregar a Portfolio
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setErrorMessage(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="font-semibold text-gray-900">
                {selectedProduct.ticker} - {selectedProduct.name}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio
                </label>
                <select
                  value={selectedPortfolioForAdd || ''}
                  onChange={(e) => setSelectedPortfolioForAdd(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {portfolios.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <input
                  type="number"
                  min="0.001"
                  step="0.001"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Ej: 10"
                  className={`
                    w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    ${quantity && (isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0) 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300'
                    }
                  `}
                />
                {quantity && (isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0) && (
                  <p className="text-sm text-red-600 mt-1">
                    Debe ser un número positivo
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio de Compra (€)
                </label>
                <input
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(e.target.value)}
                  placeholder="Ej: 150.50"
                  className={`
                    w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    ${purchasePrice && (isNaN(parseFloat(purchasePrice)) || parseFloat(purchasePrice) <= 0) 
                      ? 'border-red-300 bg-red-50' 
                      : 'border-gray-300'
                    }
                  `}
                />
                {purchasePrice && (isNaN(parseFloat(purchasePrice)) || parseFloat(purchasePrice) <= 0) && (
                  <p className="text-sm text-red-600 mt-1">
                    Debe ser un número positivo
                  </p>
                )}
              </div>

              {quantity && purchasePrice && 
               !isNaN(parseFloat(quantity)) && !isNaN(parseFloat(purchasePrice)) &&
               parseFloat(quantity) > 0 && parseFloat(purchasePrice) > 0 && (
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <p className="text-sm text-gray-600">Inversión Total</p>
                  <p className="text-2xl font-bold text-gray-900">
                    €{(parseFloat(quantity) * parseFloat(purchasePrice)).toLocaleString('es-ES', { 
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2 
                    })}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setErrorMessage(null);
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                disabled={addingToPortfolio}
              >
                Cancelar
              </button>
              <button
                onClick={confirmAddToPortfolio}
                disabled={addingToPortfolio || !quantity || !purchasePrice}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
              >
                {addingToPortfolio ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Agregando...
                  </>
                ) : (
                  'Agregar'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
