import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import {
  Shield,
  User,
  BarChart3,
  TrendingUp,
  ChevronDown,
  AlertCircle,
  Target,
  Lightbulb,
  Zap,
  Star,
  Trophy,
  Rocket,
  Sparkles,
  Eye,
  EyeOff,
  BookOpen,
  Info
} from 'lucide-react';
import { DataMapper } from '../utils/dataMapper';

// Servicio para API calls
const ReportService = {
  async generateReport(sessionData) {
    try {
      const response = await fetch('/api/portfolio/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error generating report:', error);
      throw error;
    }
  }
};

// Hook personalizado para manejar el estado del reporte
const useReportData = (sessionData) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateReport = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      const backendResponse = await ReportService.generateReport(data);
      const transformedData = DataMapper.transformBackendResponse(backendResponse);
      setReportData(transformedData);
    } catch (err) {
      setError(err.message);
      console.error('Error loading report:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sessionData) {
      generateReport(sessionData);
    }
  }, [sessionData]);

  return { reportData, loading, error, generateReport };
};

// Componente base para secciones
const ModernSection = ({
  title,
  icon: Icon,
  children,
  defaultOpen = true,
  gradient = 'from-blue-500 to-purple-600',
  glow = 'blue',
  priority = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isHovered, setIsHovered] = useState(false);

  const glowColors = {
    blue: 'shadow-blue-500/25',
    purple: 'shadow-purple-500/25',
    green: 'shadow-green-500/25',
    orange: 'shadow-orange-500/25',
    pink: 'shadow-pink-500/25',
    yellow: 'shadow-yellow-500/25'
  };

  return (
    <div
      className={`relative mb-8 rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl ${glowColors[glow]} ${priority ? 'ring-2 ring-yellow-400/50 shadow-yellow-400/20' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 transition-opacity duration-300 ${isHovered ? 'opacity-10' : ''}`} />

      <div
        onClick={() => setIsOpen(!isOpen)}
        className="relative cursor-pointer px-8 py-6 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm hover:from-white/10 hover:to-white/15 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`relative p-3 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg transform transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
              <Icon className="w-6 h-6 text-white" />
              {priority && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-2 h-2 text-yellow-900" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {title}
              </h3>
              {priority && (
                <div className="flex items-center mt-1">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-xs font-medium text-yellow-600">Prioritario</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isOpen ? (
              <EyeOff className="w-5 h-5 text-gray-600" />
            ) : (
              <Eye className="w-5 h-5 text-gray-600" />
            )}
            <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="relative px-8 py-6">
          {children}
        </div>
      </div>
    </div>
  );
};

// Componente del perfil del inversor
const ModernInvestorProfile = ({ profileData }) => {
  const RiskMeter = ({ value, color }) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
      const timer = setTimeout(() => setAnimatedValue(value), 500);
      return () => clearTimeout(timer);
    }, [value]);

    return (
      <div className="relative">
        <div className="w-full h-4 bg-gray-800/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
            style={{
              width: `${animatedValue}%`,
              background: `linear-gradient(90deg, ${color}88 0%, ${color} 50%, ${color}CC 100%)`
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-bounce" />
          </div>
        </div>
        <div className="flex justify-between text-xs font-medium text-gray-600 mt-2">
          <span>🐌 Zen</span>
          <span>⚡ Balanced</span>
          <span>🚀 Beast Mode</span>
        </div>
        <div className="text-center mt-3">
          <div className={`inline-flex items-center px-4 py-2 rounded-full font-bold text-sm`} style={{ backgroundColor: `${color}20`, color }}>
            {value > 66 ? '🚀' : value > 33 ? '⚡' : '🐌'} {value}/100 {profileData.profile.investorType}
          </div>
        </div>
      </div>
    );
  };

  return (
    <ModernSection
      title="Tu Perfil Único 🎯"
      icon={User}
      gradient="from-purple-500 via-pink-500 to-red-500"
      glow="purple"
      priority={true}
    >
      <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-gray-900/10 to-gray-800/5 backdrop-blur-sm border border-white/10">
        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <Zap className="w-5 h-5 text-yellow-500 mr-2" />
          Nivel de Tolerancia al Riesgo
        </h4>
        <RiskMeter value={profileData.riskScale.value} color={profileData.riskScale.color} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="group p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-200/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
          <div className="flex items-center mb-2">
            <Trophy className="w-4 h-4 text-blue-500 mr-2 group-hover:animate-bounce" />
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Tipo</span>
          </div>
          <p className="font-bold text-gray-800">{profileData.profile.investorType}</p>
        </div>

        <div className="group p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-600/5 border border-green-200/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
          <div className="flex items-center mb-2">
            <Target className="w-4 h-4 text-green-500 mr-2 group-hover:animate-spin" />
            <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Objetivo</span>
          </div>
          <p className="font-bold text-gray-800">{profileData.profile.mainObjective}</p>
        </div>

        <div className="group p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-200/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
          <div className="flex items-center mb-2">
            <Rocket className="w-4 h-4 text-purple-500 mr-2 group-hover:animate-pulse" />
            <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">Experiencia</span>
          </div>
          <p className="font-bold text-gray-800">{profileData.profile.experienceLevel}</p>
        </div>

        <div className="group p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-200/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
          <div className="flex items-center mb-2">
            <TrendingUp className="w-4 h-4 text-orange-500 mr-2 group-hover:animate-bounce" />
            <span className="text-xs font-medium text-orange-600 uppercase tracking-wide">Tolerancia</span>
          </div>
          <p className="font-bold text-gray-800">{profileData.profile.riskTolerance}</p>
        </div>

        <div className="group p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-200/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-4 h-4 text-indigo-500 mr-2 group-hover:animate-pulse" />
            <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Plazo</span>
          </div>
          <p className="font-bold text-gray-800">{profileData.profile.timeHorizon}</p>
        </div>

        {profileData.profile.esgSensitivity && (
          <div className="group p-4 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-200/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10">
            <div className="flex items-center mb-2">
              <Sparkles className="w-4 h-4 text-emerald-500 mr-2 group-hover:animate-spin" />
              <span className="text-xs font-medium text-emerald-600 uppercase tracking-wide">ESG</span>
            </div>
            <p className="font-bold text-gray-800">{profileData.profile.esgSensitivity}</p>
          </div>
        )}
      </div>
    </ModernSection>
  );
};

// Componente del gráfico de cartera
const ModernPortfolioChart = ({ portfolio }) => {
  if (!portfolio) return null;

  const [selectedSegment, setSelectedSegment] = useState(null);

  const getAssetDisplayName = (asset) => {
    const names = {
      acciones: 'Stocks & ETFs',
      bonos: 'Bonds & Fixed',
      criptomonedas: 'Crypto Assets',
      bonosVerdes: 'Green Bonds',
      efectivo: 'Cash Reserve'
    };
    return names[asset] || asset;
  };

  const getModernAssetColor = (asset) => {
    const colors = {
      acciones: '#3B82F6',
      bonos: '#10B981',
      criptomonedas: '#F59E0B',
      bonosVerdes: '#22C55E',
      efectivo: '#8B5CF6'
    };
    return colors[asset] || '#6B7280';
  };

  const getAssetEmoji = (asset) => {
    const emojis = {
      acciones: '📈',
      bonos: '🏛️',
      criptomonedas: '₿',
      bonosVerdes: '🌱',
      efectivo: '💎'
    };
    return emojis[asset] || '💰';
  };

  const getAssetDescription = (asset) => {
    const descriptions = {
      acciones: 'High growth potential 🚀',
      bonos: 'Stability & income 🏦',
      criptomonedas: 'Digital revolution ⚡',
      bonosVerdes: 'Sustainable future 🌍',
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
      gradient="from-cyan-400 via-purple-500 to-pink-500"
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

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-gray-600 font-medium">Diversificado</div>
            </div>
          </div>
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

// Componente de recomendaciones
const ModernRecommendations = ({ recommendations }) => {
  if (!recommendations?.explicaciones) return null;

  return (
    <ModernSection
      title="Power-Ups para tu Portfolio 🎮"
      icon={Lightbulb}
      gradient="from-yellow-400 via-orange-500 to-red-500"
      glow="orange"
    >
      <div className="space-y-4">
        {recommendations.explicaciones.map((explanation, index) => (
          <div
            key={index}
            className="group relative p-5 rounded-2xl bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 backdrop-blur-sm border border-orange-200/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/20"
          >
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg group-hover:animate-pulse">
                <span className="text-xl">💡</span>
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-medium leading-relaxed group-hover:text-gray-900 transition-colors">
                  {explanation}
                </p>
              </div>
              <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
                🚀
              </div>
            </div>
          </div>
        ))}
      </div>
    </ModernSection>
  );
};

// Componente para el reporte del fondo de emergencia
const EmergencyFundReport = ({ report }) => {
  if (!report) return null;

  return (
    <ModernSection
      title="Fondo de Emergencia 🛡️"
      icon={Shield}
      gradient="from-emerald-400 via-teal-500 to-cyan-500"
      glow="green"
    >
      <div className="prose prose-lg max-w-none">
        <div 
          className="text-gray-800 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: report }}
        />
      </div>
    </ModernSection>
  );
};

// Componente para la guía educativa
const EducationalGuide = ({ guide }) => {
  if (!guide?.assets) return null;

  return (
    <ModernSection
      title="Guía Educativa 📚"
      icon={BookOpen}
      gradient="from-indigo-400 via-blue-500 to-purple-500"
      glow="blue"
    >
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h4 className="text-xl font-bold text-gray-800 mb-2">{guide.title}</h4>
          <p className="text-gray-600">{guide.description}</p>
        </div>

        {guide.assets.map((asset, index) => (
          <div
            key={index}
            className="group p-6 rounded-2xl bg-gradient-to-br from-white/40 to-white/20 backdrop-blur-sm border border-white/30 hover:scale-[1.02] transition-all duration-300"
          >
            <h5 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
              <Info className="w-5 h-5 text-blue-500 mr-2" />
              {asset.title}
            </h5>
            
            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">{asset.description}</p>
              
              <div className="bg-blue-50/50 p-4 rounded-xl">
                <h6 className="font-semibold text-blue-800 mb-2">Función en tu cartera:</h6>
                <p className="text-blue-700">{asset.role}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-green-50/50 p-4 rounded-xl">
                  <h6 className="font-semibold text-green-800 mb-2">Ventajas:</h6>
                  <ul className="text-green-700 space-y-1">
                    {asset.pros.map((pro, proIndex) => (
                      <li key={proIndex} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50/50 p-4 rounded-xl">
                  <h6 className="font-semibold text-red-800 mb-2">Consideraciones:</h6>
                  <ul className="text-red-700 space-y-1">
                    {asset.cons.map((con, conIndex) => (
                      <li key={conIndex} className="flex items-start">
                        <span className="text-red-500 mr-2">⚠</span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50/50 p-4 rounded-xl">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h6 className="font-semibold text-gray-800 mb-1">Rentabilidad esperada:</h6>
                    <p className="text-gray-700 text-sm">{asset.expectedReturn}</p>
                  </div>
                  <div>
                    <h6 className="font-semibold text-gray-800 mb-1">Comportamiento:</h6>
                    <p className="text-gray-700 text-sm">{asset.behavior}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ModernSection>
  );
};

// Componente principal
const IntegratedReport = ({ sessionData, onGenerateReport }) => {
  const { reportData, loading, error, generateReport } = useReportData(sessionData);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-white/20 border-t-white animate-spin rounded-full mb-4 mx-auto" />
          <p className="text-white/80 text-lg">Generando tu futuro financiero...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-pink-900 to-purple-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4 mx-auto">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Oops! Algo salió mal</h2>
          <p className="text-white/80 mb-6">{error}</p>
          <button
            onClick={() => generateReport(sessionData)}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!reportData && !sessionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 mx-auto">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Crea tu Reporte!</h2>
          <p className="text-gray-600 mb-6">Proporciona tus datos de sesión para generar un reporte personalizado</p>
          {onGenerateReport && (
            <button
              onClick={onGenerateReport}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-transform duration-300"
            >
              Comenzar Evaluación
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6 relative overflow-hidden">
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50 transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      <header className="text-center mb-10 relative z-10">
        <h1 className="text-5xl md:text-7xl font-black text-gray-800 leading-tight opacity-0 animate-[fadeInUp_0.7s_ease-out_forwards]">
          Welcome to your
          <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Financial Future
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4 opacity-0 animate-[fadeInUp_0.7s_ease-out_0.3s_forwards]">
          Tu plan de inversión único, creado específicamente para ti 🚀
        </p>
      </header>

      <div className="max-w-6xl mx-auto py-12 space-y-8 relative z-10">
        {reportData?.investorProfile && (
          <ModernInvestorProfile profileData={reportData.investorProfile} />
        )}

        {reportData?.portfolio && (
          <ModernPortfolioChart portfolio={reportData.portfolio} />
        )}

        {reportData?.recommendations && (
          <ModernRecommendations recommendations={reportData.recommendations} />
        )}

        {reportData?.emergencyFundReport && (
          <EmergencyFundReport report={reportData.emergencyFundReport} />
        )}

        {reportData?.educationalGuide && (
          <EducationalGuide guide={reportData.educationalGuide} />
        )}
      </div>

      <div className="text-center mt-12 relative z-10">
        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 transform">
          🚀 ¡Empezar a Invertir!
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Demo component con datos de muestra para testing
export default function ReportDemo() {
  // Datos de sesión de ejemplo para testing
  const sampleSessionData = {
    totalScore: 65,
    timeValue: 4,
    cryptoScore: 2,
    esgValue: 1,
    emergencyFund: 3,
    dividend: 1,
    experienceScore: 10
  };

  const handleGenerateReport = () => {
    console.log('Generar nuevo reporte...');
    // Aquí podrías abrir un modal o navegar a un formulario
  };

  return (
    <IntegratedReport 
      sessionData={sampleSessionData}
      onGenerateReport={handleGenerateReport}
    />
  );
}