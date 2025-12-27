import { useState, useEffect } from 'react';
import { X, Search, Loader2, TrendingUp, Info, Sparkles } from 'lucide-react';
import assetService from '../../services/assetService';
import recommendationService from '../../services/recommendationService';

const AddHoldingModal = ({ portfolioId, portfolio, onClose, onAdd }) => {
  const [step, setStep] = useState(1); // 1: búsqueda, 2: cantidad
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAiResult, setIsAiResult] = useState(false);
  
  // Estado para el formulario de cantidad
  const [quantity, setQuantity] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');

  // Lógica de búsqueda corregida
  const handleSearch = async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setIsAiResult(false);
      return;
    }

    try {
      setLoading(true);
      setIsAiResult(false);

      // 1. Intentar búsqueda tradicional explícita
      // Pasamos un objeto vacío como segundo argumento para asegurar compatibilidad
      const response = await assetService.searchAssets(query, {}); 
      
      if (response.assets && response.assets.length > 0) {
        setSearchResults(response.assets);
      } else {
        // 2. Fallback a IA si no hay resultados y la query es larga
        if (query.length > 3) {
          const aiResponse = await recommendationService.searchProducts(query);
          if (aiResponse.products && aiResponse.products.length > 0) {
            setSearchResults(aiResponse.products);
            setIsAiResult(true);
          } else {
            setSearchResults([]);
          }
        } else {
          setSearchResults([]);
        }
      }
    } catch (error) {
      console.error('Error searching assets:', error);
      // Intento final de fallback a IA en caso de error del servicio tradicional
      if (query.length > 3) {
          try {
            const aiResponse = await recommendationService.searchProducts(query);
            if (aiResponse.products && aiResponse.products.length > 0) {
                setSearchResults(aiResponse.products);
                setIsAiResult(true);
            }
          } catch (aiError) {
              setSearchResults([]);
          }
      } else {
          setSearchResults([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(searchQuery);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const handleSelectAsset = (asset) => {
    // Aseguramos que el asset tenga ticker, si no, usamos symbol o id como fallback
    const assetToSave = {
        ...asset,
        ticker: asset.ticker || asset.symbol || asset.id 
    };
    setSelectedAsset(assetToSave);
    setPurchasePrice(asset.currentPrice?.toString() || '');
    setStep(2);
  };

  // Cálculo de sugerencia (sin cambios, solo defensivo)
  const calculateSuggestion = () => {
    if (!portfolio || !selectedAsset) return null;
    
    // Protección contra valores nulos/indefinidos en portfolio.recommended
    const category = selectedAsset.category || 'General';
    const recommended = portfolio.recommended?.[category] || 0;
    const actual = portfolio.actual?.[category] || 0;
    const totalSavings = portfolio.totalSavings || 0;

    const targetAmount = (recommended / 100) * totalSavings;
    const currentAmount = (actual / 100) * totalSavings;
    const remaining = targetAmount - currentAmount;

    if (remaining <= 0) return null;

    return {
      min: Math.round(remaining * 0.2),
      max: Math.round(remaining * 0.3),
      remaining: Math.round(remaining)
    };
  };

  const suggestion = calculateSuggestion();

  const handleSubmit = () => {
    if (!quantity || !purchasePrice) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Verificación final antes de enviar
    if (!selectedAsset || !selectedAsset.ticker) {
        alert('Error: Activo inválido seleccionado');
        return;
    }

    onAdd({
      ticker: selectedAsset.ticker,
      quantity: parseFloat(quantity),
      purchasePrice: parseFloat(purchasePrice)
    });
  };

  // ... (Resto del renderizado igual, asegurando que uses los handlers nuevos)
  // Asegúrate de que el input de búsqueda llame a setSearchQuery
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] flex flex-col">
        {/* Header fijo */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">
            {step === 1 ? 'Agregar Activo' : 'Detalles de Inversión'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 1 ? (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Buscar ETF, acción o cripto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  autoFocus
                />
              </div>

              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              ) : (
                <div className="space-y-2">
                  {searchResults.map((asset) => (
                    <button
                      key={asset.id || asset.ticker} // Key robusta
                      onClick={() => handleSelectAsset(asset)}
                      className="w-full p-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors text-left group"
                    >
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-2">
                            {asset.ticker}
                            {/* Mostrar badge si es resultado de IA */}
                            {isAiResult && <Sparkles className="w-3 h-3 text-purple-500" />}
                        </div>
                        <div className="text-sm text-gray-500">{asset.name}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          {asset.currentPrice ? `$${asset.currentPrice}` : '-'}
                        </div>
                        <div className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                          Seleccionar
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  {searchQuery.length > 2 && searchResults.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No se encontraron resultados
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm font-bold text-gray-900">
                  {selectedAsset.ticker?.[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{selectedAsset.ticker}</h3>
                  <p className="text-sm text-gray-500">{selectedAsset.name}</p>
                </div>
              </div>

              {suggestion && (
                <div className="p-4 bg-blue-50 text-blue-700 rounded-xl text-sm flex gap-3">
                  <Info className="w-5 h-5 shrink-0" />
                  <div>
                    <p className="font-medium mb-1">Sugerencia de inversión</p>
                    <p>
                      Para balancear tu portfolio, considera invertir entre{' '}
                      <strong>€{suggestion.min}</strong> y <strong>€{suggestion.max}</strong>.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cantidad (Unidades)
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Precio de Compra
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={purchasePrice}
                    onChange={(e) => setPurchasePrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                >
                  Atrás
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!quantity || !purchasePrice}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
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

