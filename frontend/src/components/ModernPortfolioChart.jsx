import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BarChart3, PieChart as PieChartIcon, ArrowRightLeft, Target, ChevronDown, ChevronUp } from 'lucide-react';
import ModernSection from './ModernSection';

const ModernPortfolioChart = ({ portfolio, currentAllocation = {}, holdings = [], showComparison = false }) => {
  if (!portfolio) return null;

  // Detectar si tenemos datos reales para mostrar las pestañas
  const hasActualData = currentAllocation && Object.keys(currentAllocation).length > 0;

  // Estado de la vista: 'target', 'actual', 'comparison'
  // Si no hay datos, forzamos 'target'
  const [viewMode, setViewMode] = useState('target');
  const [selectedSegment, setSelectedSegment] = useState(null);

  // Estado seguro de la vista activa
  const activeView = hasActualData ? viewMode : 'target';

  // --- Helpers de Mapeo y Colores ---
  const getAssetDisplayName = (asset) => {
    const names = {
      acciones: 'Stocks & ETFs',
      rentavariable: 'Stocks & ETFs',
      bonos: 'Bonds & Fixed',
      rentafija: 'Bonds & Fixed',
      criptomonedas: 'Crypto Assets',
      oro: 'Gold',
      efectivo: 'Cash Reserve'
    };
    return names[asset.toLowerCase()] || asset.charAt(0).toUpperCase() + asset.slice(1);
  };

  const getModernAssetColor = (asset) => {
    const key = asset.toLowerCase();
    const colors = {
      acciones: '#3B82F6',
      rentavariable: '#3B82F6',
      bonos: '#10B981',
      rentafija: '#10B981',
      criptomonedas: '#F59E0B',
      oro: '#FFD700',
      efectivo: '#8B5CF6'
    };
    return colors[key] || '#6B7280';
  };

  const getAssetEmoji = (asset) => {
    const key = asset.toLowerCase();
    const emojis = {
      acciones: '📈',
      rentavariable: '📈',
      bonos: '🏛️',
      rentafija: '🏛️',
      criptomonedas: '₿',
      oro: '🥇',
      efectivo: '💎'
    };
    return emojis[key] || '💰';
  };

  const getAssetDescription = (asset) => {
    const key = asset.toLowerCase();
    const descriptions = {
      acciones: 'High growth potential 🚀',
      rentavariable: 'High growth potential 🚀',
      bonos: 'Stability & income 🏦',
      rentafija: 'Stability & income 🏦',
      criptomonedas: 'Digital revolution ⚡',
      oro: 'Safe haven asset 🛡️',
      efectivo: 'Liquid & secure 💫'
    };
    return descriptions[key] || 'Investment asset';
  };

  // --- Normalización de Categorías para Holdings ---
  const normalizeCategory = (cat) => {
    if (!cat) return 'unknown';
    const c = cat.toLowerCase();
    if (c.includes('variable') || c.includes('acciones') || c.includes('stock')) return 'rentavariable'; // Usamos una clave canónica
    if (c.includes('fija') || c.includes('bonos') || c.includes('bond')) return 'rentafija';
    if (c.includes('cripto') || c.includes('crypto')) return 'criptomonedas';
    if (c.includes('oro') || c.includes('gold')) return 'oro';
    if (c.includes('efectivo') || c.includes('cash')) return 'efectivo';
    return c;
  };

  // Normalizar las claves del portfolio/allocation también a nuestra canónica si es necesario, 
  // pero mantendremos las claves originales para visualización y mapearemos al comparar.
  // Para simplificar, asumiremos que las keys de portfolio/allocation son consistentes entre sí.

  // --- Preparación de Datos ---
  const prepareChartData = () => {
    // Definir la fuente de datos según la vista
    let keys = [];

    if (activeView === 'comparison') {
      // En comparación, queremos la unión de todas las claves
      const allKeys = new Set([...Object.keys(portfolio), ...Object.keys(currentAllocation)]);
      keys = Array.from(allKeys);
    } else if (activeView === 'actual') {
      keys = Object.keys(currentAllocation);
    } else {
      keys = Object.keys(portfolio);
    }

    return keys.map(key => {
      const targetVal = portfolio[key] || 0;
      const actualVal = currentAllocation[key] || 0;

      let valueToShow = activeView === 'actual' ? actualVal : targetVal;

      return {
        name: getAssetDisplayName(key),
        value: parseFloat(valueToShow.toFixed(1)),
        target: parseFloat(targetVal.toFixed(1)),
        actual: parseFloat(actualVal.toFixed(1)),
        diff: parseFloat((actualVal - targetVal).toFixed(1)),
        color: getModernAssetColor(key),
        emoji: getAssetEmoji(key),
        originalKey: key
      };
    }).filter(item => activeView === 'comparison' ? true : item.value > 0).sort((a, b) => b.value - a.value);
  };

  const chartData = prepareChartData();

  // Tooltip Personalizado
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/90 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{data.emoji}</span>
            <p className="font-bold text-white">{data.name}</p>
          </div>
          <p className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {data.value}%
          </p>
          {activeView === 'comparison' && (
            <div className="text-xs text-gray-300 mt-1">
              <div>Ideal: {data.target}%</div>
              <div>Actual: {data.actual}%</div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <ModernSection
      title="Distribución del Portfolio 📊"
      icon={BarChart3}
      gradient="from-blue-600 to-purple-600"
      glow="purple"
    >
      {/* --- PESTAÑAS DE NAVEGACIÓN (Solo si hay datos reales) --- */}
      {hasActualData && (
        <div className="mb-8">
          {/* Desktop Tabs */}
          <div className="hidden md:flex justify-center">
            <div className="bg-gray-100 p-1.5 rounded-xl flex gap-2 shadow-inner">
              <button
                onClick={() => setViewMode('actual')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeView === 'actual'
                    ? 'bg-white text-blue-600 shadow-md transform scale-105'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <PieChartIcon className="w-4 h-4" /> Distribución Actual
              </button>
              <button
                onClick={() => setViewMode('target')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeView === 'target'
                    ? 'bg-white text-purple-600 shadow-md transform scale-105'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <Target className="w-4 h-4" /> Distribución Buscada
              </button>
              <button
                onClick={() => setViewMode('comparison')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${activeView === 'comparison'
                    ? 'bg-white text-orange-600 shadow-md transform scale-105'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <ArrowRightLeft className="w-4 h-4" /> Diferencias
              </button>
            </div>
          </div>

          {/* Mobile Dropdown */}
          <div className="md:hidden">
            <div className="relative">
              <select
                value={activeView}
                onChange={(e) => setViewMode(e.target.value)}
                className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-xl leading-tight focus:outline-none focus:bg-white focus:border-blue-500 font-medium shadow-sm"
              >
                <option value="actual">📊 Distribución Actual</option>
                <option value="target">🎯 Distribución Buscada</option>
                <option value="comparison">⚖️ Diferencias</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- ZONA DE GRÁFICO (Oculta en modo comparación si se prefiere solo lista, pero la mantendremos para visualización rápida) --- */}
      {activeView !== 'comparison' && (
        <div className="relative mb-8 animate-in fade-in duration-500">
          <div className="h-80 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  innerRadius={60}
                  paddingAngle={3}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1200}
                  onMouseEnter={(data, index) => setSelectedSegment(index)}
                  onMouseLeave={() => setSelectedSegment(null)}
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth={2}
                      style={{
                        filter: selectedSegment === index ? 'brightness(1.2) drop-shadow(0 0 10px currentColor)' : '',
                        transform: selectedSegment === index ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: 'center',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Centro del gráfico con Info */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="text-3xl font-black text-gray-300 opacity-20">
                {activeView === 'target' ? 'TARGET' : 'ACTUAL'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- LISTA DE DETALLES --- */}
      <div className="grid gap-4 animate-in slide-in-from-bottom-4 duration-500">
        {chartData.map((asset, index) => {
          // -- LOGICA RENDER HOLDINGS PARA VISTA ACTUAL --
          // Filtramos los holdings que corresponden a esta categoría
          // Necesitamos normalizar ambas keys para asegurar match (ej: 'rentavariable' vs 'acciones')
          const assetHoldings = activeView === 'actual'
            ? holdings.filter(h => normalizeCategory(h.asset?.category) === normalizeCategory(asset.originalKey))
            : [];

          return (
            <div
              key={index}
              className={`group relative p-6 rounded-2xl bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm border 
                ${activeView === 'comparison' ? 'border-gray-200' : 'border-white/20'} 
                hover:shadow-xl transition-all duration-300 overflow-hidden`}
              style={{
                boxShadow: activeView === 'comparison' ? '' : `0 10px 40px ${asset.color}20`,
                borderColor: selectedSegment === index ? asset.color : undefined
              }}
              onMouseEnter={() => setSelectedSegment(index)}
              onMouseLeave={() => setSelectedSegment(null)}
            >
              {/* Efecto hover fondo */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
                style={{ backgroundColor: asset.color }}
              />

              {/* --- CONTENIDO CARD --- */}
              <div className="relative">
                {/* Header Card */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg bg-white"
                      style={{ color: asset.color }}
                    >
                      {asset.emoji}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                        {asset.name}
                      </h4>
                      <p className="text-sm text-gray-600">{getAssetDescription(asset.originalKey)}</p>
                    </div>
                  </div>

                  {/* Right side: Percentages */}
                  <div className="text-right">
                    {activeView === 'comparison' ? (
                      <div className="flex flex-col items-end">
                        <span className={`text-lg font-bold ${asset.diff === 0 ? 'text-gray-400' : asset.diff > 0 ? 'text-blue-600' : 'text-orange-500'}`}>
                          {asset.diff > 0 ? '+' : ''}{asset.diff}%
                        </span>
                        <span className="text-xs text-gray-500">diferencia</span>
                      </div>
                    ) : (
                      <div>
                        <div
                          className="text-3xl font-black group-hover:scale-110 transition-transform duration-300"
                          style={{ color: asset.color }}
                        >
                          {asset.value}%
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* --- MODO COMPARACIÓN: BARRAS DE PROGRESO --- */}
                {activeView === 'comparison' && (
                  <div className="mt-4 space-y-3 bg-white/50 p-3 rounded-xl border border-white/40">
                    {/* Target Bar */}
                    <div className="flex items-center text-xs">
                      <div className="w-16 font-semibold text-gray-500">Objetivo</div>
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden mx-2">
                        <div
                          className="h-full rounded-full opacity-60"
                          style={{ width: `${Math.min(asset.target, 100)}%`, backgroundColor: asset.color }}
                        ></div>
                      </div>
                      <div className="w-10 text-right font-bold text-gray-700">{asset.target}%</div>
                    </div>
                    {/* Actual Bar */}
                    <div className="flex items-center text-xs">
                      <div className="w-16 font-semibold text-gray-500">Actual</div>
                      <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden mx-2">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${Math.min(asset.actual, 100)}%`, backgroundColor: asset.color }}
                        ></div>
                      </div>
                      <div className="w-10 text-right font-bold text-gray-700">{asset.actual}%</div>
                    </div>
                  </div>
                )}

                {/* --- MODO ACTUAL: DESGLOSE DE HOLDINGS --- */}
                {activeView === 'actual' && assetHoldings.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gray-100/50 animate-in slide-in-from-top-2">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <Target className="w-3 h-3" /> Mis Activos en {asset.name}
                    </p>
                    <div className="space-y-2">
                      {assetHoldings.map((h, hIndex) => {
                        const totalVal = h.quantity * h.currentPrice;
                        return (
                          <div key={h.id || hIndex} className="flex justify-between items-center bg-white/60 p-2 rounded-lg hover:bg-white transition-colors">
                            <div className="flex items-center gap-2">
                              <div className="w-1 h-6 rounded-full" style={{ backgroundColor: asset.color }}></div>
                              <div>
                                <p className="text-sm font-bold text-gray-800">{h.ticker}</p>
                                <p className="text-xs text-gray-500">{h.asset?.name}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-gray-900">
                                {totalVal.toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })}
                              </p>
                              <p className="text-xs text-gray-500">{h.quantity} un.</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Loading bar visual for Target View */}
                {activeView === 'target' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/50">
                    <div
                      className="h-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${asset.value}%`,
                        backgroundColor: asset.color,
                        boxShadow: `0 0 10px ${asset.color}50`
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </ModernSection>
  );
};

export default ModernPortfolioChart;