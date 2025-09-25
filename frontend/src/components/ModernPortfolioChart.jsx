import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { BarChart3 } from 'lucide-react';
import ModernSection from './ModernSection';

const ModernPortfolioChart = ({ portfolio }) => {
  if (!portfolio) return null;

  const [selectedSegment, setSelectedSegment] = useState(null);

  const getAssetDisplayName = (asset) => {
    const names = {
      acciones: 'Stocks & ETFs',
      bonos: 'Bonds & Fixed',
      criptomonedas: 'Crypto Assets',
      oro: 'Gold',
      efectivo: 'Cash Reserve'
    };
    return names[asset] || asset;
  };

  const getModernAssetColor = (asset) => {
    const colors = {
      acciones: '#3B82F6',
      bonos: '#10B981',
      criptomonedas: '#F59E0B',
      oro: '#FFD700',
      efectivo: '#8B5CF6'
    };
    return colors[asset] || '#6B7280';
  };

  const getAssetEmoji = (asset) => {
    const emojis = {
      acciones: '📈',
      bonos: '🏛️',
      criptomonedas: '₿',
      oro: '🥇',
      efectivo: '💎'
    };
    return emojis[asset] || '💰';
  };

  const getAssetDescription = (asset) => {
    const descriptions = {
      acciones: 'High growth potential 🚀',
      bonos: 'Stability & income 🏦',
      criptomonedas: 'Digital revolution ⚡',
      oro: 'Safe haven asset 🛡️',
      efectivo: 'Liquid & secure 💫'
    };
    return descriptions[asset] || 'Investment asset';
  };

  const portfolioArray = Object.entries(portfolio).map(([asset, percentage]) => ({
    name: getAssetDisplayName(asset),
    value: parseFloat(percentage.toFixed(1)),
    color: getModernAssetColor(asset),
    emoji: getAssetEmoji(asset),
    originalKey: asset
  })).filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-black/90 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-2xl">
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">{payload[0].payload.emoji}</span>
            <p className="font-bold text-white">{payload[0].name}</p>
          </div>
          <p className="text-2xl font-black bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ModernSection
      title="Tu Cartera del Futuro 🚀"
      icon={BarChart3}
      gradient="from-blue-600 to-purple-600"
      glow="purple"
    >
      <div className="relative mb-8">
        <div className="h-80 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioArray}
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
                {portfolioArray.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth={2}
                    style={{
                      filter: selectedSegment === index ? 'brightness(1.2) drop-shadow(0 0 10px currentColor)' : '',
                      transform: selectedSegment === index ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: 'center'
                    }}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-4">
        {portfolioArray.map((asset, index) => (
          <div
            key={index}
            className="group relative p-6 rounded-2xl bg-gradient-to-r from-white/50 to-white/30 backdrop-blur-sm border border-white/20 hover:scale-105 transition-all duration-300 hover:shadow-2xl overflow-hidden"
            style={{
              boxShadow: `0 10px 40px ${asset.color}20`,
              borderColor: selectedSegment === index ? asset.color : 'rgba(255,255,255,0.2)'
            }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
              style={{ backgroundColor: asset.color }}
            />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
                  style={{ backgroundColor: `${asset.color}20` }}
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
              <div className="text-right">
                <div
                  className="text-3xl font-black group-hover:scale-110 transition-transform duration-300"
                  style={{ color: asset.color }}
                >
                  {asset.value}%
                </div>
                <div className="text-xs text-gray-500 font-medium">de tu cartera</div>
              </div>
            </div>

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
          </div>
        ))}
      </div>
    </ModernSection>
  );
};

export default ModernPortfolioChart;