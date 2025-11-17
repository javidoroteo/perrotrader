// frontend/src/components/Portfolio/HoldingCard.jsx
import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Edit, Trash2 } from 'lucide-react';
import portfolioService from '../../services/portfolioService';

const HoldingCard = ({ holding, portfolioId, onUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentValue = holding.quantity * holding.currentPrice;
  const investedValue = holding.quantity * holding.averagePrice;
  const gainLoss = currentValue - investedValue;
  const gainLossPercentage = ((gainLoss / investedValue) * 100) || 0;
  const isProfit = gainLoss >= 0;

  const handleDelete = async () => {
    if (!confirm(`¿Estás seguro de eliminar ${holding.asset?.name || holding.ticker}?`)) {
      return;
    }

    try {
      setIsDeleting(true);
      await portfolioService.deleteHolding(portfolioId, holding.id);
      onUpdate();
    } catch (error) {
      console.error('Error deleting holding:', error);
      alert('Error al eliminar activo');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all">
      {/* VISTA SIMPLE */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                {holding.ticker?.substring(0, 2).toUpperCase()}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 truncate">
                {holding.ticker}
              </h4>
              <p className="text-sm text-gray-600 truncate">
                {holding.asset?.name || 'Activo desconocido'}
              </p>
            </div>
          </div>
        </div>

        <div className="text-right mr-4">
          <p className="font-bold text-gray-900">
            {currentValue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
          </p>
          <div className="flex items-center justify-end gap-1 text-sm">
            {isProfit ? (
              <TrendingUp className="w-4 h-4 text-green-600" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-600" />
            )}
            <span className={isProfit ? 'text-green-600' : 'text-red-600'}>
              {gainLossPercentage >= 0 ? '+' : ''}{gainLossPercentage.toFixed(2)}%
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* VISTA EXPANDIDA */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-300 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Cantidad</p>
              <p className="font-semibold text-gray-900">
                {holding.quantity} {holding.quantity === 1 ? 'acción' : 'acciones'}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Precio de compra</p>
              <p className="font-semibold text-gray-900">
                {holding.averagePrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Precio actual</p>
              <p className="font-semibold text-gray-900">
                {holding.currentPrice.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Invertido</p>
              <p className="font-semibold text-gray-900">
                {investedValue.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Ganancia/Pérdida</p>
              <p className={`font-semibold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                {gainLoss >= 0 ? '+' : ''}{gainLoss.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Categoría</p>
              <p className="font-semibold text-gray-900">
                {holding.asset?.category || 'N/A'}
              </p>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-2">
            <button
              onClick={() => {/* TODO: Implementar editar */}}
              className="flex-1 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Edit className="w-4 h-4" />
              <span>Editar</span>
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Trash2 className="w-4 h-4" />
              <span>{isDeleting ? 'Eliminando...' : 'Eliminar'}</span>
            </button>
          </div>

          {holding.asset?.description && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-gray-200">
              <p className="text-sm text-gray-600">{holding.asset.description}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HoldingCard;
