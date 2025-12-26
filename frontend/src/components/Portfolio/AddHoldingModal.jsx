import { useState, useEffect } from 'react';
import { X, Search, Loader2, TrendingUp, Info, Sparkles } from 'lucide-react'; // Añadido Sparkles para icono de IA
import assetService from '../../services/assetService';
import recommendationService from '../../services/recommendationService'; // 1. Importar servicio de IA

const AddHoldingModal = ({ portfolioId, portfolio, onClose, onAdd }) => {
  const [step, setStep] = useState(1); // 1: búsqueda, 2: cantidad
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Estado para saber si los resultados actuales son de IA (para mostrar icono)
  const [isAiResult, setIsAiResult] = useState(false);

  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  // 2. Nueva lógica de búsqueda híbrida
  const handleSearch = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setIsAiResult(false);
      return;
    }

    try {
      setLoading(true);
      setIsAiResult(false); // Reseteamos flag de IA

      // A) Búsqueda Tradicional (Exacta/Parcial)
      const response = await assetService.searchAssets(query);
      
      if (response.assets && response.assets.length > 0) {
        setSearchResults(response.assets);
      } else {
        // B) Si no hay resultados tradicionales, intentamos con IA (Fallback)
        // Solo si la query tiene longitud suficiente para tener sentido semántico
        if (query.length > 3) {
          // console.log("Búsqueda exacta sin resultados, intentando IA...");
          const aiResponse = await recommendationService.searchProducts(query);
          
          if (aiResponse.products && aiResponse.products.length > 0) {
            setSearchResults(aiResponse.products);
            setIsAiResult(true); // Marcamos que son resultados de IA
          } else {
            setSearchResults([]);
          }
        } else {
          setSearchResults([]);
        }
      }
    } catch (error) {
      console.error('Error searching assets:', error);
      // En caso de error, podríamos intentar el fallback a IA si falló assetService, 
      // pero por seguridad mejor dejamos array vacío
      setSearchResults([]);
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

    // Sugerimos invertir entre el 20% y 30% del faltante para ir promediando
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-semibold text-slate-800">
            {step === 1 ? 'Buscar Activo' : 'Detalles de la operación'}
          </h3>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar por nombre, ticker (ej. AAPL) o descripción..."
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
              </div>

              <div className="min-h-[300px] max-h-[400px] overflow-y-auto custom-scrollbar">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                    <Loader2 className="animate-spin mb-2" size={24} />
                    <span className="text-sm">Buscando activos...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1 mb-2">
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                        {searchResults.length} resultados encontrados
                      </span>
                      {isAiResult && (
                        <span className="flex items-center gap-1 text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                          <Sparkles size={10} />
                          Sugeridos por IA
                        </span>
                      )}
                    </div>
                    
                    {searchResults.map((asset) => (
                      <button
                        key={asset.ticker}
                        onClick={() => handleSelectAsset(asset)}
                        className="w-full flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl border border-transparent hover:border-slate-100 transition-all group text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            asset.type === 'CRYPTO' ? 'bg-orange-100 text-orange-600' :
                            asset.type === 'ETF' ? 'bg-blue-100 text-blue-600' :
                            'bg-emerald-100 text-emerald-600'
                          }`}>
                            <TrendingUp size={20} />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 flex items-center gap-2">
                              {asset.ticker}
                              <span className="text-xs font-normal text-slate-500 px-2 py-0.5 bg-slate-100 rounded-full">
                                {asset.category}
                              </span>
                            </div>
                            <div className="text-sm text-slate-500 line-clamp-1 group-hover:text-primary-600 transition-colors">
                              {asset.name}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-slate-900">
                            {asset.currentPrice?.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.length > 1 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-center">
                    <Search className="mb-2 opacity-50" size={32} />
                    <p>No se encontraron activos con "{searchQuery}"</p>
                    <p className="text-xs mt-1 text-slate-400">Prueba con otro término o categoría</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-center">
                    <Search className="mb-2 opacity-50" size={32} />
                    <p>Escribe al menos 2 caracteres para buscar</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-200">
              {/* Resumen del activo seleccionado */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${
                  selectedAsset.type === 'CRYPTO' ? 'bg-orange-100 text-orange-600' :
                  selectedAsset.type === 'ETF' ? 'bg-blue-100 text-blue-600' :
                  'bg-emerald-100 text-emerald-600'
                }`}>
                  <TrendingUp size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">{selectedAsset.ticker}</h4>
                  <p className="text-slate-500 text-sm">{selectedAsset.name}</p>
                </div>
              </div>

              {/* Sugerencia inteligente */}
              {suggestion && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Info className="text-blue-500 mt-0.5 flex-shrink-0" size={18} />
                    <div className="text-sm text-blue-900 space-y-1">
                      <p>
                        Según tu portfolio, te faltan aproximadamente{' '}
                        <span className="font-semibold text-blue-700">
                          {suggestion.remaining.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </span>{' '}
                        en {selectedAsset.category}.
                      </p>
                      <p className="text-blue-700/80">
                        Rango sugerido para este activo:{' '}
                        <span className="font-medium">
                          {suggestion.min.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}{' '}
                          -{' '}
                          {suggestion.max.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 block">Cantidad</label>
                  <input
                    type="number"
                    step="0.000001"
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 block">
                    Precio Compra
                    <span className="ml-2 text-xs font-normal text-slate-400">
                      (Actual: {selectedAsset.currentPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })})
                    </span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                  />
                </div>
              </div>

              {quantity && purchasePrice && (
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
                  <span className="text-slate-500">Total a invertir:</span>
                  <span className="font-bold text-slate-900 text-lg">
                    {(quantity * purchasePrice).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                  </span>
                </div>
              )}

              {suggestion && (quantity * purchasePrice) > suggestion.max && (
                <p className="text-xs text-amber-600 flex items-center gap-1">
                  <Info size={12} />
                  Estás invirtiendo más del rango sugerido (€{suggestion.min} - €{suggestion.max})
                </p>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl font-medium transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-[2] px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-primary-500/20 flex items-center justify-center gap-2"
                >
                  <TrendingUp size={18} />
                  Agregar Activo
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddHoldingModal;
