// frontend/src/components/Portfolio/InvestmentAmountModal.jsx
import { useState } from 'react';
import { X, Wallet, Info, TrendingUp } from 'lucide-react';

const InvestmentAmountModal = ({ portfolio, onClose, onSave }) => {
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Por favor ingresa un monto válido');
      return;
    }

    onSave(amount);
  };

  const calculateBreakdown = () => {
    const total = parseFloat(amount) || 0;
    if (!portfolio?.recommended || total === 0) return null;

    return Object.entries(portfolio.recommended).map(([category, percentage]) => ({
      category,
      percentage,
      amount: (total * percentage) / 100
    }));
  };

  const breakdown = calculateBreakdown();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-blue-600 p-6 text-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-xl">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Configurar Inversión</h2>
                <p className="text-sm opacity-90">Define cuánto vas a invertir inicialmente</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">¿Por qué necesitamos esto?</p>
                <p>
                  Conocer tu inversión inicial nos permite calcular cuánto deberías invertir 
                  en cada categoría según tu perfil de riesgo y darte sugerencias personalizadas.
                </p>
              </div>
            </div>
          </div>

          {/* Input de monto */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              ¿Cuánto vas a invertir inicialmente?
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                €
              </span>
              <input
                type="number"
                step="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-10 pr-4 py-4 text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none"
                placeholder="10,000"
                autoFocus
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Este monto es referencial. Podrás ajustarlo más adelante.
            </p>
          </div>

          {/* Desglose (si hay monto ingresado) */}
          {breakdown && breakdown.length > 0 && (
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-5 mb-6 border border-green-200">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="font-bold text-gray-900">Distribución Sugerida</h3>
              </div>

              <div className="space-y-3">
                {breakdown.map(({ category, percentage, amount: categoryAmount }) => (
                  <div key={category} className="bg-white rounded-lg p-3 border border-green-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900 capitalize">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-sm font-semibold text-gray-600">
                        {percentage}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="font-bold text-green-700 whitespace-nowrap">
                        {categoryAmount.toLocaleString('es-ES', {
                          style: 'currency',
                          currency: 'EUR',
                          minimumFractionDigits: 0
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-green-200">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-green-700">
                    {parseFloat(amount).toLocaleString('es-ES', {
                      style: 'currency',
                      currency: 'EUR',
                      minimumFractionDigits: 0
                    })}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
            >
              Omitir
            </button>
            <button
              onClick={handleSubmit}
              disabled={!amount || parseFloat(amount) <= 0}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-xl transition-all font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Guardar
            </button>
          </div>

          <p className="text-xs text-center text-gray-500 mt-4">
            Puedes cambiar este monto en cualquier momento desde la configuración del portfolio
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestmentAmountModal;
