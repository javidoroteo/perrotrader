// frontend/src/components/Portfolio/AddHoldingModal.jsx
import { useState, useEffect } from 'react';
import { X, Search, Loader2, TrendingUp, Info } from 'lucide-react';
import assetService from '../../services/assetService';

const AddHoldingModal = ({ portfolioId, portfolio, onClose, onAdd }) => {
  const [step, setStep] = useState(1); // 1: búsqueda, 2: cantidad
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  // Buscar activos
  const handleSearch = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      const response = await assetService.searchAssets(query);
      setSearchResults(response.assets || []);
    } catch (error) {
      console.error('Error searching assets:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500); // Debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSelectAsset = (asset) => {
    setSelectedAsset(asset);
    setPurchasePrice(asset.currentPrice?.toString() || '');
    setStep(2);
  };

  const calculateSuggestion = () => {
    if (!portfolio || !selectedAsset) return null;

    const category = selectedAsset.category;
    const recommended = portfolio.recommended?.[category] || 0;
    const actual = portfolio.actual?.[category] || 0;
    const totalSavings = portfolio.totalSavings || 0;

    const targetAmount = (recommended / 100) * totalSavings;
    const currentAmount = (actual / 100) * totalSavings;
    const remaining = targetAmount - currentAmount;

    if (remaining <= 0) return null;

    const suggestedMin = remaining * 0.2;
    const suggestedMax = remaining * 0.3;

    return {
      min: Math.round(suggestedMin),
      max: Math.round(suggestedMax),
      remaining: Math.round(remaining)
    };
  };

  const suggestion = calculateSuggestion();

  const handleSubmit = () => {
    if (!quantity || !purchasePrice) {
      alert('Por favor completa todos los campos');
      return;
    }

    onAdd({
      ticker: selectedAsset.ticker,
      quantity: parseFloat(quantity),
      purchasePrice: parseFloat(purchasePrice)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              {step === 1 ? 'Buscar Activo' : 'Configurar Inversión'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {/* PASO 1: BÚSQUEDA */}
          {step === 1 && (
            <>
              {/* Buscador */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Busca por nombre o ticker (ej: Apple, AAPL, Bitcoin)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                  autoFocus
                />
              </div>

              {/* Resultados */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 mb-3">
                    {searchResults.length} resultados encontrados
                  </p>
                  {searchResults.map((asset) => (
                    <button
                      key={asset.id}
                      onClick={() => handleSelectAsset(asset)}
                      className="w-full p-4 bg-gray-50 hover:bg-blue-50 rounded-xl transition-colors text-left border border-gray-200 hover:border-blue-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900">{asset.ticker}</span>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                              {asset.type}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{asset.name}</p>
                          {asset.description && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                              {asset.description}
                            </p>
                          )}
                        </div>
                        {asset.currentPrice && (
                          <div className="text-right ml-4">
                            <p className="font-semibold text-gray-900">
                              {asset.currentPrice.toLocaleString('es-ES', {
                                style: 'currency',
                                currency: 'EUR'
                              })}
                            </p>
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery.length >= 2 ? (
                <div className="text-center py-12 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No se encontraron activos con "{searchQuery}"</p>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>Escribe al menos 2 caracteres para buscar</p>
                </div>
              )}
            </>
          )}

          {/* PASO 2: CANTIDAD E INVERSIÓN */}
          {step === 2 && selectedAsset && (
            <>
              {/* Info del activo seleccionado */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-bold text-xl text-gray-900 mb-1">
                      {selectedAsset.ticker}
                    </h3>
                    <p className="text-gray-700">{selectedAsset.name}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {selectedAsset.type}
                      </span>
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                        {selectedAsset.category}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(1)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Cambiar
                  </button>
                </div>
              </div>

              {/* Sugerencia personalizada */}
              {suggestion && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-yellow-900 mb-2">
                        💡 Sugerencia Personalizada
                      </h4>
                      <p className="text-sm text-yellow-800 mb-2">
                        Según tu portfolio, te faltan aproximadamente{' '}
                        <span className="font-bold">
                          {suggestion.remaining.toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'EUR'
                          })}
                        </span>{' '}
                        en {selectedAsset.category}.
                      </p>
                      <p className="text-sm text-yellow-800">
                        Rango sugerido para este activo:{' '}
                        <span className="font-bold">
                          {suggestion.min.toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'EUR'
                          })}{' '}
                          -{' '}
                          {suggestion.max.toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'EUR'
                          })}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Formulario */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Precio de compra (por acción/unidad)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      €
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>
                  {selectedAsset.currentPrice && (
                    <p className="text-sm text-gray-500 mt-1">
                      Precio actual: {selectedAsset.currentPrice.toLocaleString('es-ES', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ¿Cuánto quieres invertir?
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
                      €
                    </span>
                    <input
                      type="number"
                      step="10"
                      value={quantity && purchasePrice ? (quantity * purchasePrice).toFixed(2) : ''}
                      onChange={(e) => {
                        const totalAmount = parseFloat(e.target.value) || 0;
                        const pricePerUnit = parseFloat(purchasePrice) || 1;
                        setQuantity((totalAmount / pricePerUnit).toFixed(4));
                      }}
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                      placeholder="1000.00"
                    />
                  </div>
                  {suggestion && (
                    <p className="text-sm text-gray-500 mt-1">
                      Rango sugerido: €{suggestion.min} - €{suggestion.max}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cantidad de acciones/unidades
                  </label>
                  <input
                    type="number"
                    step="0.0001"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                    placeholder="10"
                  />
                  {quantity && purchasePrice && (
                    <p className="text-sm text-gray-500 mt-1">
                      Total a invertir: {(quantity * purchasePrice).toLocaleString('es-ES', {
                        style: 'currency',
                        currency: 'EUR'
                      })}
                    </p>
                  )}
                </div>
              </div>

              {/* Info adicional */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <p className="text-sm text-blue-900 flex items-start gap-2">
                  <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Estos valores son referenciales. Podrás ajustarlos más adelante desde tu broker.
                  </span>
                </p>
              </div>

              {/* Botones */}
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
                >
                  Volver
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!quantity || !purchasePrice}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl transition-all font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Agregar a Portfolio
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddHoldingModal;
