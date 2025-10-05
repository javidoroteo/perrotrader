import React, { useState, useMemo } from 'react';
import { ChevronDown, Star, Shield, Euro, Smartphone, Target, Filter, X } from 'lucide-react';
import ModernSection from './ModernSection';

const BrokerComparison = () => {
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [compactView, setCompactView] = useState(false);

  const brokers = [
    {
      name: "XTB",
      logo: "🇪🇸",
      commission: "0% hasta €100,000/mes",
      website: "xtb.com/es",
      bestFor: "Principiantes en España",
      minDeposit: "Sin mínimo",
      protection: "100.000€ (Polaco)",
      country: "España",
      category: "lowcost",
      rating: 4.5,
      regulatedSpain: true,
      mobileApp: true,
      webPlatform: true,
      commissionScore: 5 // 5 = muy bajas, 1 = altas
    },
    {
      name: "Trade Republic",
      logo: "🇩🇪",
      commission: "€1 por operación",
      website: "traderepublic.com/es",
      bestFor: "Inversores que prefieren móvil",
      minDeposit: "1€",
      protection: "100.000€ (Alemana)",
      country: "Alemania",
      category: "mobile",
      rating: 4.3,
      regulatedSpain: false,
      mobileApp: true,
      webPlatform: false,
      commissionScore: 4
    },
    {
      name: "eToro",
      logo: "🌐",
      commission: "0% en ETFs",
      website: "etoro.com/es",
      bestFor: "Inversores sociales y principiantes",
      minDeposit: "50$",
      protection: "20.000€ (CySEC)",
      country: "Chipre",
      category: "social",
      rating: 4.0,
      regulatedSpain: false,
      mobileApp: true,
      webPlatform: true,
      commissionScore: 3
    },
    {
      name: "Interactive Brokers",
      logo: "🇺🇸",
      commission: "0.05% (mín. €1.25)",
      website: "interactivebrokers.com/es",
      bestFor: "Inversores experimentados",
      minDeposit: "Sin mínimo",
      protection: "500.000$ (SIPC)",
      country: "Estados Unidos",
      category: "professional",
      rating: 4.7,
      regulatedSpain: false,
      mobileApp: true,
      webPlatform: true,
      commissionScore: 5
    },
    {
      name: "DEGIRO",
      logo: "🇳🇱",
      commission: "€2 + 0.03% en ETFs",
      website: "degiro.es",
      bestFor: "Inversores que buscan variedad",
      minDeposit: "Sin mínimo",
      protection: "100.000€ (Holandesa)",
      country: "Holanda",
      category: "lowcost",
      rating: 4.2,
      regulatedSpain: false,
      mobileApp: true,
      webPlatform: true,
      commissionScore: 4
    },
    {
      name: "MyInvestor",
      logo: "🇪🇸",
      commission: "ETFs gratuitos / Acciones 0,12% (mín. 2€)",
      website: "myinvestor.es",
      bestFor: "Inversión indexada a largo plazo",
      minDeposit: "Sin mínimo",
      protection: "100.000€ (Española)",
      country: "España",
      category: "indexing",
      rating: 4.1,
      regulatedSpain: true,
      mobileApp: true,
      webPlatform: true,
      commissionScore: 4
    },
    {
      name: "Revolut",
      logo: "🇬🇧",
      commission: "1-10 operaciones gratis/mes según plan",
      website: "revolut.com/es",
      bestFor: "Usuarios móviles que buscan todo-en-uno",
      minDeposit: "Sin mínimo",
      protection: "100.000€ (Lituana)",
      country: "Lituania",
      category: "neobank",
      rating: 4.0,
      regulatedSpain: false,
      mobileApp: true,
      webPlatform: false,
      commissionScore: 3
    },
    {
      name: "Scalable Capital",
      logo: "🇩🇪",
      commission: "0,99€ por operación / Plan PRIME+ 4,99€/mes",
      website: "es.scalable.capital",
      bestFor: "Inversores que buscan ETFs premium",
      minDeposit: "Sin mínimo",
      protection: "100.000€ (Alemana)",
      country: "Alemania",
      category: "premium",
      rating: 4.4,
      regulatedSpain: false,
      mobileApp: true,
      webPlatform: true,
      commissionScore: 4
    },
    {
      name: "Trading 212",
      logo: "🇬🇧",
      commission: "0% en acciones y ETFs",
      website: "trading212.com",
      bestFor: "Principiantes que buscan cero comisiones",
      minDeposit: "10€",
      protection: "1.000.000€ (Lloyd's)",
      country: "Bulgaria",
      category: "free",
      rating: 4.2,
      regulatedSpain: false,
      mobileApp: true,
      webPlatform: true,
      commissionScore: 5
    },
    {
      name: "Openbank",
      logo: "🇪🇸",
      commission: "0,20% (mín. 10€ nacional) / 0,25% internacional",
      website: "openbank.es/inversiones",
      bestFor: "Clientes bancarios tradicionales",
      minDeposit: "Sin mínimo",
      protection: "100.000€ (Española)",
      country: "España",
      category: "traditional",
      rating: 3.8,
      regulatedSpain: true,
      mobileApp: true,
      webPlatform: true,
      commissionScore: 2
    },
    {
      name: "ING",
      logo: "🇳🇱",
      commission: "3€ + 0,10% / 1,5€ + 0,05% (+15 ops)",
      website: "ing.es/broker",
      bestFor: "Clientes ING que invierten ocasionalmente",
      minDeposit: "Sin mínimo",
      protection: "100.000€ (Española)",
      country: "Holanda",
      category: "traditional",
      rating: 3.9,
      regulatedSpain: true,
      mobileApp: true,
      webPlatform: true,
      commissionScore: 2
    }
  ];

  const categories = {
    all: 'Todos',
    lowcost: 'Bajo coste',
    mobile: 'Móvil-first',
    social: 'Social Trading',
    professional: 'Profesional',
    indexing: 'Indexados',
    neobank: 'Neobancos',
    premium: 'Premium',
    free: 'Sin comisiones',
    traditional: 'Tradicionales'
  };

  const sortedAndFilteredBrokers = useMemo(() => {
    let filtered = brokers;
    
    if (filterBy !== 'all') {
      filtered = brokers.filter(broker => broker.category === filterBy);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'commission':
          return b.commissionScore - a.commissionScore;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [sortBy, filterBy]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const getCommissionBadge = (score) => {
    const badges = {
      5: { text: 'Muy Bajas', color: 'bg-green-100 text-green-800' },
      4: { text: 'Bajas', color: 'bg-blue-100 text-blue-800' },
      3: { text: 'Moderadas', color: 'bg-yellow-100 text-yellow-800' },
      2: { text: 'Altas', color: 'bg-orange-100 text-orange-800' },
      1: { text: 'Muy Altas', color: 'bg-red-100 text-red-800' }
    };
    
    const badge = badges[score] || badges[3];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  if (compactView) {
    return (
      <ModernSection
        title="Comparador de Brokers"
        icon={Filter}
        gradient="from-blue-600 to-purple-700"
        glow="blue"
        priority
      >
        <div className="space-y-4">
          {/* Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-between bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border">
            <div className="flex gap-2">
              <button
                onClick={() => setCompactView(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                Vista Completa
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors text-sm"
              >
                <Filter className="h-4 w-4" />
                Filtros
              </button>
            </div>
          </div>

          {/* Simple Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-xl shadow-sm border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left text-sm font-medium text-gray-900">Broker</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-900">Comisión</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-900">Rating</th>
                  <th className="p-3 text-left text-sm font-medium text-gray-900">Ideal para</th>
                </tr>
              </thead>
              <tbody>
                {sortedAndFilteredBrokers.map((broker, index) => (
                  <tr key={broker.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{broker.logo}</span>
                        <div>
                          <div className="font-medium text-gray-900">{broker.name}</div>
                          <div className="text-sm text-gray-500">{broker.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">{broker.commission}</div>
                        {getCommissionBadge(broker.commissionScore)}
                      </div>
                    </td>
                    <td className="p-3">
                      {renderStars(broker.rating)}
                    </td>
                    <td className="p-3 text-sm text-gray-600">
                      {broker.bestFor}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </ModernSection>
    );
  }

  return (
    <ModernSection
      title="Comparador de Brokers"
      icon={Filter}
      gradient="from-blue-600 to-purple-700"
      glow="blue"
      priority
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center justify-between bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border">
          <div className="flex gap-2">
            <button
              onClick={() => setCompactView(true)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
            >
              Vista Compacta
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors text-sm"
            >
              <Filter className="h-4 w-4" />
              Filtros {showFilters ? <X className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          </div>
          
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Ordenar por nombre</option>
              <option value="rating">Ordenar por rating</option>
              <option value="commission">Ordenar por comisiones</option>
            </select>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white p-4 rounded-xl border shadow-sm">
            <div className="flex flex-wrap gap-2">
              {Object.entries(categories).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilterBy(key)}
                  className={`px-3 py-2 rounded-lg text-sm transition-all ${
                    filterBy === key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comparison Cards */}
        <div className="grid gap-6">
          {sortedAndFilteredBrokers.map((broker) => (
            <div
              key={broker.name}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Broker Info */}
                  <div className="md:col-span-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl">{broker.logo}</span>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{broker.name}</h3>
                        <p className="text-sm text-gray-500">{broker.country}</p>
                      </div>
                    </div>
                    {renderStars(broker.rating)}
                    
                    <div className="mt-4 space-y-2">
                      {broker.regulatedSpain && (
                        <div className="flex items-center gap-2 text-sm">
                          <Shield className="h-4 w-4 text-green-600" />
                          <span className="text-green-700 font-medium">Regulado en España</span>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {broker.mobileApp && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full flex items-center gap-1">
                            <Smartphone className="h-3 w-3" />
                            App
                          </span>
                        )}
                        {broker.webPlatform && (
                          <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                            Web
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Commission & Features */}
                  <div className="md:col-span-2">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Comisiones</label>
                          <div className="mt-1">
                            <p className="text-sm font-medium text-gray-900">{broker.commission}</p>
                            {getCommissionBadge(broker.commissionScore)}
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-gray-500">Depósito mínimo</label>
                          <p className="text-sm text-gray-900 mt-1">{broker.minDeposit}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium text-gray-500">Protección</label>
                          <div className="flex items-center gap-2 mt-1">
                            <Shield className="h-4 w-4 text-gray-400" />
                            <p className="text-sm text-gray-900">{broker.protection}</p>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-500">Sitio web</label>
                          <p className="text-sm text-blue-600 mt-1">{broker.website}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Best For */}
                  <div className="md:col-span-1">
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-4 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Ideal para</span>
                      </div>
                      <p className="text-sm text-blue-800">{broker.bestFor}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl text-center">
            <h4 className="font-semibold text-green-900">Mejor Rating</h4>
            <p className="text-2xl font-bold text-green-700 mt-1">
              {Math.max(...brokers.map(b => b.rating)).toFixed(1)} ⭐
            </p>
            <p className="text-sm text-green-600 mt-1">Interactive Brokers</p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl text-center">
            <h4 className="font-semibold text-blue-900">Regulados en España</h4>
            <p className="text-2xl font-bold text-blue-700 mt-1">
              {brokers.filter(b => b.regulatedSpain).length}
            </p>
            <p className="text-sm text-blue-600 mt-1">de {brokers.length} brokers</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl text-center">
            <h4 className="font-semibold text-purple-900">Sin comisiones</h4>
            <p className="text-2xl font-bold text-purple-700 mt-1">
              {brokers.filter(b => b.commissionScore >= 4).length}
            </p>
            <p className="text-sm text-purple-600 mt-1">opciones disponibles</p>
          </div>
        </div>
      </div>
    </ModernSection>
  );
};

export default BrokerComparison;