// frontend/src/pages/AssetsPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import assetService from '../services/assetService';
import portfolioService from '../services/portfolioService';
import recommendationService from '../services/recommendationService';
import { Search, Loader2, TrendingUp, Filter, Sparkles, ArrowRight, X, Info, PlusCircle, Star, CheckCircle } from 'lucide-react';

const AssetsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Estados de búsqueda tradicional
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Estados para búsqueda IA
  const [aiQuery, setAiQuery] = useState('');
  const [aiResults, setAiResults] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [showAIResults, setShowAIResults] = useState(false);

  // Estados de recomendados
  const [recommendedAssets, setRecommendedAssets] = useState([]);
  const [loadingRecommended, setLoadingRecommended] = useState(true);

  // Estados de portfolios
  const [portfolios, setPortfolios] = useState([]);

  // Estado del asset seleccionado (para modal de detalles)
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Estados para "Te puede interesar"
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loadingSimilar, setLoadingSimilar] = useState(false);

  // 🆕 NUEVOS ESTADOS para agregar a portfolio
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPortfolioId, setSelectedPortfolioId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [addingToPortfolio, setAddingToPortfolio] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const portfoliosResponse = await portfolioService.getPortfolios();
      setPortfolios(portfoliosResponse.portfolios || []);
      await loadRecommendedAssets(portfoliosResponse.portfolios || []);
    } catch (error) {
      console.error('Error loading initial data:', error);
    } finally {
      setLoadingRecommended(false);
    }
  };

  const loadRecommendedAssets = async (userPortfolios) => {
    try {
      setLoadingRecommended(true);
      const recommendations = [];

      for (const portfolio of userPortfolios) {
        try {
          const suggestions = await portfolioService.getSuggestions(portfolio.id);
          if (suggestions.suggestions && suggestions.suggestions.length > 0) {
            suggestions.suggestions.forEach(sug => {
              if (sug.recommendedAssets && sug.recommendedAssets.length > 0) {
                sug.recommendedAssets.forEach(asset => {
                  if (!recommendations.find(r => r.ticker === asset.ticker)) {
                    recommendations.push({
                      ...asset,
                      reason: sug.message,
                      category: sug.category,
                      portfolioName: portfolio.name
                    });
                  }
                });
              }
            });
          }
        } catch (err) {
          console.error(`Error loading suggestions for portfolio ${portfolio.id}:`, err);
        }
      }

      setRecommendedAssets(recommendations.slice(0, 6));
    } catch (error) {
      console.error('Error loading recommended assets:', error);
    } finally {
      setLoadingRecommended(false);
    }
  };

  // Búsqueda tradicional con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.length >= 2) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedFilter]);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const filters = {};
      if (selectedFilter !== 'all') {
        filters.type = selectedFilter;
      }

      const response = await assetService.searchAssets(searchQuery, filters);
      setSearchResults(response.assets || []);
    } catch (error) {
      console.error('Error searching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Búsqueda con IA
  const handleAISearch = async () => {
    if (!aiQuery.trim() || aiQuery.length < 3) return;

    try {
      setLoadingAI(true);
      setShowAIResults(true);

      const filters = {};
      if (selectedFilter !== 'all') {
        filters.type = selectedFilter;
      }

      const response = await recommendationService.searchProducts(aiQuery, filters);
      setAiResults(response.products || []);
    } catch (error) {
      console.error('Error with AI search:', error);
      setAiResults([]);
    } finally {
      setLoadingAI(false);
    }
  };

  // 🆕 FUNCIÓN MODIFICADA: Trackear según origen
  const handleAssetClick = async (asset, source = 'traditional') => {
    setSelectedAsset(asset);
    setShowDetailsModal(true);
    setSimilarProducts([]);

    // 🆕 Trackear CLICKED según origen (solo si tiene ID y usuario autenticado)
    if (user && asset.id) {
      try {
        // Solo trackear si viene de búsqueda IA, recomendaciones o similares
        if (source === 'ai' || source === 'recommended' || source === 'similar') {
          await recommendationService.trackAction(asset.id, 'CLICKED');
        }
      } catch (error) {
        // Fallar silenciosamente
      }
    }

    // Cargar productos similares
    if (asset.id) {
      loadSimilarProducts(asset.id);
    }
  };

  // Cargar productos similares
  const loadSimilarProducts = async (productId) => {
    try {
      setLoadingSimilar(true);
      const response = await recommendationService.getSimilarProducts(productId, 3);
      setSimilarProducts(response.similarProducts || []);
    } catch (error) {
      console.error('Error loading similar products:', error);
      setSimilarProducts([]);
    } finally {
      setLoadingSimilar(false);
    }
  };

  // Click en producto similar (reemplaza el actual)
  const handleSimilarProductClick = async (product) => {
    // Trackear click en producto similar
    if (user && product.id) {
      try {
        await recommendationService.trackAction(product.id, 'CLICKED');
      } catch (error) {
        // Fallar silenciosamente
      }
    }

    // Reemplazar el producto actual y cargar nuevos similares
    setSelectedAsset(product);
    setSimilarProducts([]);
    
    if (product.id) {
      loadSimilarProducts(product.id);
    }
  };

  // 🆕 NUEVA FUNCIÓN: Abrir modal para agregar a portfolio
  const handleOpenAddModal = () => {
    setShowDetailsModal(false);
    setShowAddModal(true);
    setQuantity('');
    setPurchasePrice('');
    
    // Pre-seleccionar primer portfolio si existe
    if (portfolios.length > 0) {
      setSelectedPortfolioId(portfolios[0].id);
    }
  };

  // 🆕 NUEVA FUNCIÓN: Confirmar agregar a portfolio
  const handleConfirmAddToPortfolio = async () => {
    if (!selectedAsset || !selectedPortfolioId || !quantity || !purchasePrice) {
      alert('Por favor completa todos los campos');
      return;
    }

    try {
      setAddingToPortfolio(true);

      // Agregar al portfolio
      await portfolioService.addAssetToPortfolio(selectedPortfolioId, {
        ticker: selectedAsset.ticker,
        quantity: parseFloat(quantity),
        purchasePrice: parseFloat(purchasePrice)
      });

      // 🆕 Trackear SELECTED (solo si tiene ID y usuario autenticado)
      if (user && selectedAsset.id) {
        try {
          await recommendationService.trackAction(selectedAsset.id, 'SELECTED');
        } catch (error) {
          // Fallar silenciosamente
        }
      }

      // Recargar portfolios y recomendaciones
      await loadInitialData();

      // Cerrar modales y limpiar
      setShowAddModal(false);
      setSelectedAsset(null);
      setQuantity('');
      setPurchasePrice('');
      setSelectedPortfolioId('');

      // Mostrar mensaje de éxito
      alert('¡Activo agregado exitosamente a tu portfolio!');

    } catch (error) {
      console.error('Error adding asset to portfolio:', error);
      alert('Error al agregar el activo. Por favor intenta de nuevo.');
    } finally {
      setAddingToPortfolio(false);
    }
  };

  const clearAISearch = () => {
    setAiQuery('');
    setAiResults([]);
    setShowAIResults(false);
  };

  const filters = [
    { id: 'all', label: 'Todos', icon: Filter },
    { id: 'ETF', label: 'ETFs', icon: TrendingUp },
    { id: 'STOCK', label: 'Acciones', icon: TrendingUp },
    { id: 'CRYPTO', label: 'Criptomonedas', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Activos Disponibles
          </h1>
          <p className="text-gray-600">
            Busca y agrega nuevos activos a tus portfolios
          </p>
        </div>

        {/* Búsqueda IA */}
        <div className="mb-6 p-6 bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 rounded-xl border border-purple-200 shadow-sm">
          <div className="flex items-start gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-purple-600 mt-1" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Búsqueda Inteligente
              </h3>
              <p className="text-sm text-gray-600">
                Describe lo que buscas en lenguaje natural: "ETF sostenible bajo coste", "acciones tecnología emergente", etc.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAISearch()}
                placeholder="Ej: ETF global de bajo coste para largo plazo..."
                className="w-full px-4 py-3 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {aiQuery && (
                <button
                  onClick={clearAISearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button
              onClick={handleAISearch}
              disabled={loadingAI || !aiQuery.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
            {loadingAI ? "Buscando..." : "Buscar con IA"}
            </button>

          </div>

          {/* Resultados de búsqueda IA */}
          {showAIResults && (
            <div className="mt-4">
              {loadingAI ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-purple-600" />
                </div>
              ) : aiResults.length > 0 ? (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-gray-700">
                      {aiResults.length} producto{aiResults.length !== 1 ? 's' : ''} encontrado{aiResults.length !== 1 ? 's' : ''} con IA
                    </p>
                    <button
                      onClick={clearAISearch}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Limpiar
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {aiResults.map((asset) => (
                      <div
                        key={asset.id}
                        onClick={() => handleAssetClick(asset, 'ai')}
                        className="bg-white p-4 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {asset.ticker || asset.name}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {asset.name}
                            </p>
                          </div>
                          <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                            {asset.type}
                          </span>
                        </div>
                        {asset.similarity && (
                          <div className="mt-2 flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-xs text-gray-600">
                              Coincidencia: {(asset.similarity * 100).toFixed(0)}%
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No se encontraron productos con "{aiQuery}"</p>
                  <p className="text-sm mt-1">Intenta con otros términos o describe de otra forma</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 🆕 MODIFICADO: Agregar source='recommended' */}
        {/* Activos Recomendados */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-bold text-gray-900">
              Recomendados Para Ti
            </h2>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Basado en tu perfil, portfolios y categorías desbalanceadas
          </p>

          {loadingRecommended ? (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600 mb-3" />
              <p className="text-gray-600">Calculando recomendaciones...</p>
            </div>
          ) : recommendedAssets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedAssets.map((asset) => (
                <div
                  key={asset.ticker}
                  onClick={() => handleAssetClick(asset, 'recommended')}
                  className="group bg-gradient-to-br from-yellow-50 to-orange-50 p-5 rounded-xl border-2 border-yellow-200 hover:border-yellow-400 hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg mb-1">
                        {asset.ticker}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {asset.name}
                      </p>
                    </div>
                    <Star className="w-5 h-5 text-yellow-500 flex-shrink-0 ml-2" />
                  </div>

                  {asset.reason && (
                    <div className="mb-3 p-3 bg-white/60 rounded-lg">
                      <p className="text-xs font-medium text-gray-700 flex items-start gap-2">
                        <Info className="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-600" />
                        {asset.reason}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="px-2 py-1 bg-white rounded text-gray-700 font-medium">
                      {asset.type}
                    </span>
                    {asset.portfolioName && (
                      <span className="text-xs text-gray-600">
                        Para: {asset.portfolioName}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-700 font-medium text-sm">
                    Ver detalles
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Info className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Tus portfolios están bien balanceados</p>
              <p className="text-sm mt-1">No tenemos recomendaciones específicas por ahora</p>
            </div>
          )}
        </div>

        {/* Modal de detalles */}
        {showDetailsModal && selectedAsset && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {selectedAsset.ticker || selectedAsset.name}
                    </h2>
                    <p className="text-gray-600">{selectedAsset.name}</p>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600 p-2"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-6">
                  {selectedAsset.currentPrice && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Precio Actual</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedAsset.currentPrice.toLocaleString('es-ES', {
                          style: 'currency',
                          currency: 'EUR'
                        })}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Última actualización: {new Date().toLocaleDateString('es-ES')}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Categoría</p>
                      <p className="font-semibold text-gray-900">
                        {selectedAsset.category || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Exchange</p>
                      <p className="font-semibold text-gray-900">
                        {selectedAsset.exchange || 'N/A'}
                      </p>
                    </div>
                    {selectedAsset.sector && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Sector</p>
                        <p className="font-semibold text-gray-900">
                          {selectedAsset.sector}
                        </p>
                      </div>
                    )}
                    {selectedAsset.region && (
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Región</p>
                        <p className="font-semibold text-gray-900">
                          {selectedAsset.region}
                        </p>
                      </div>
                    )}
                  </div>

                  {selectedAsset.description && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Descripción</p>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedAsset.description}
                      </p>
                    </div>
                  )}

                  {/* 🆕 MODIFICADO: Botón llama a handleOpenAddModal */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleOpenAddModal}
                      disabled={portfolios.length === 0}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PlusCircle className="w-5 h-5" />
                      Agregar a Portfolio
                    </button>
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>

                  {portfolios.length === 0 && (
                    <p className="text-sm text-yellow-600 text-center bg-yellow-50 p-2 rounded">
                      Crea un portfolio primero para poder agregar activos
                    </p>
                  )}

                  {/* Sección "Te puede interesar" */}
                  {selectedAsset.id && (
                    <div className="pt-6 border-t border-gray-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-purple-600" />
                        <h3 className="text-lg font-bold text-gray-900">
                          Te puede interesar también
                        </h3>
                      </div>

                      {loadingSimilar ? (
                        <div className="text-center py-8">
                          <Loader2 className="w-6 h-6 animate-spin mx-auto text-purple-600 mb-2" />
                          <p className="text-sm text-gray-600">Buscando productos similares...</p>
                        </div>
                      ) : similarProducts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {similarProducts.map((product) => (
                            <div
                              key={product.id}
                              onClick={() => handleSimilarProductClick(product)}
                              className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200 hover:border-purple-400 hover:shadow-md transition-all cursor-pointer group"
                            >
                              <div className="mb-3">
                                <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                                  {product.ticker}
                                </h4>
                                <p className="text-xs text-gray-600 line-clamp-2">
                                  {product.name}
                                </p>
                              </div>

                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs px-2 py-1 bg-white rounded text-gray-700 font-medium">
                                  {product.type}
                                </span>
                                {product.similarity && (
                                  <span className="text-xs text-purple-600 font-medium">
                                    {(product.similarity * 100).toFixed(0)}% similar
                                  </span>
                                )}
                              </div>

                              <div className="text-xs text-purple-600 group-hover:text-purple-700 font-medium flex items-center gap-1">
                                Ver detalles
                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          <Info className="w-8 h-8 mx-auto mb-2 opacity-30" />
                          <p className="text-sm">No hay productos similares disponibles</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 🆕 NUEVO MODAL: Agregar a Portfolio */}
        {showAddModal && selectedAsset && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">
                      Agregar a Portfolio
                    </h2>
                    <p className="text-sm text-gray-600">
                      {selectedAsset.ticker} - {selectedAsset.name}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowAddModal(false)}
                    disabled={addingToPortfolio}
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
                      value={selectedPortfolioId}
                      onChange={(e) => setSelectedPortfolioId(e.target.value)}
                      disabled={addingToPortfolio}
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
                      disabled={addingToPortfolio}
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
                      disabled={addingToPortfolio}
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
                      onClick={handleConfirmAddToPortfolio}
                      disabled={addingToPortfolio || !quantity || !purchasePrice || !selectedPortfolioId}
                      className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addingToPortfolio ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Agregando...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5" />
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

export default AssetsPage;
