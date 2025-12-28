import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Sparkles, Plus, TrendingUp, DollarSign, Calendar, Loader2, AlertCircle } from 'lucide-react';
import assetService from '../../services/assetService';

const AddHoldingModal = ({ portfolioId, onClose, onAdd }) => {
  const [step, setStep] = useState('search'); // 'search' | 'form'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    quantity: '',
    purchasePrice: '',
    purchaseDate: new Date().toISOString().split('T')[0]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        setIsSearching(true);
        try {
          // El servicio devuelve { success: true, assets: [...] }
          const response = await assetService.searchAssets(searchQuery);
          setSearchResults(response.assets || []);
        } catch (error) {
          console.error("Search error:", error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectAsset = (asset) => {
    setSelectedAsset(asset);

    // Pre-fill price if available
    if (asset.price) {
      setFormData(prev => ({
        ...prev,
        purchasePrice: asset.price
      }));
    }

    setStep('form');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAsset) return;

    setIsSubmitting(true);
    try {
      await onAdd({
        ticker: selectedAsset.symbol || selectedAsset.ticker, // Adaptar según API
        quantity: formData.quantity,
        purchasePrice: formData.purchasePrice,
        purchaseDate: formData.purchaseDate
      });
      // Modal will serve closing via parent handling or we close it here if onAdd doesn't
    } catch (error) {
      console.error("Error adding holding:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 20 }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'stock': return 'bg-blue-100 text-blue-700';
      case 'etf': return 'bg-purple-100 text-purple-700';
      case 'crypto': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-blue-50/50 to-purple-50/50">
            <div>
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                {step === 'search' ? (
                  <>
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Buscar Activo
                  </>
                ) : (
                  <>
                    <Plus className="w-5 h-5 text-blue-600" />
                    Configurar Posición
                  </>
                )}
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {step === 'search'
                  ? 'Encuentra acciones, ETFs o criptomonedas'
                  : `Agregando ${selectedAsset?.symbol || selectedAsset?.ticker} a tu portfolio`
                }
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-white hover:bg-gray-100 rounded-full text-gray-500 transition-colors shadow-sm border border-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">

            {/* STEP 1: SEARCH */}
            {step === 'search' && (
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ej. Apple, S&P 500, Tesla..."
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none text-gray-900"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  {isSearching && (
                    <div className="absolute right-4 top-3.5">
                      <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {searchResults.length > 0 ? (
                    searchResults.map((asset) => (
                      <motion.button
                        key={asset.ticker || asset.symbol}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full p-4 bg-white hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-xl transition-all flex items-center justify-between group text-left shadow-sm hover:shadow-md"
                        onClick={() => handleSelectAsset(asset)}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${getTypeColor(asset.type)}`}>
                            {(asset.symbol || asset.ticker).substring(0, 2)}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">
                              {asset.symbol || asset.ticker}
                            </h4>
                            <p className="text-sm text-gray-500 truncate max-w-[200px]">
                              {asset.name}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {asset.price && (
                            <span className="block font-medium text-gray-900">
                              ${asset.price}
                            </span>
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(asset.type)}`}>
                            {asset.type}
                          </span>
                        </div>
                      </motion.button>
                    ))
                  ) : searchQuery.length >= 2 && !isSearching ? (
                    <div className="text-center py-12 text-gray-500">
                      <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No encontramos activos que coincidan.</p>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      {!searchQuery && (
                        <div className="flex flex-col items-center justify-center opacity-50">
                          <Search className="w-12 h-12 text-gray-300 mb-2" />
                          <p className="text-gray-400">Escribe para buscar activos</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: FORM */}
            {step === 'form' && (
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Selected Asset Summary */}
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white bg-blue-600`}>
                      {(selectedAsset.ticker || selectedAsset.symbol).substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{selectedAsset.ticker || selectedAsset.symbol}</h3>
                      <p className="text-xs text-blue-600 font-medium">{selectedAsset.name}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('search')}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium underline"
                  >
                    Cambiar
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cantidad (Unidades)
                    </label>
                    <div className="relative">
                      <TrendingUp className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        step="any"
                        required
                        min="0.000001"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        placeholder="Ej. 10.5"
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Precio de Compra
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        step="any"
                        required
                        min="0"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        placeholder="0.00"
                        value={formData.purchasePrice}
                        onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha de Compra
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none"
                        value={formData.purchaseDate}
                        onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Agregar al Portfolio
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddHoldingModal;
