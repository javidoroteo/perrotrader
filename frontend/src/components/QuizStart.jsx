import React from 'react';
import { Brain, Target, Timer, ArrowRight, TrendingUp, Lock } from 'lucide-react';

const QuizStart = ({ onStart, loading, onOpenPrivacyPolicy, hasConsent = false }) => (
  <div className="text-center space-y-10 fade-in">
    <div className="space-y-6">
      <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-300/30 rounded-full shadow-lg backdrop-blur-lg">
        <TrendingUp className="w-7 h-7 text-purple-600" />
        <span className="text-purple-800 font-bold text-lg">DESCUBRE TU PERFIL DE INVERSIÓN EN MINUTOS</span>
      </div>
      <h1 className="text-5xl md:text-7xl font-black leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        isfinz
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        ¿Qué tipo de inversor eres? Aprende a estructurar tus inversiones en menos de 5 minutos
      </p>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Obtén claridad sobre tu perfil financiero y descubre cómo los métodos que usan los expertos pueden ayudarte a alcanzar tus metas
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto my-12">
      {[
        { icon: <Brain className="w-8 h-8" />, title: "Conócete mejor", desc: "Identifica tu tolerancia al riesgo y define tu estilo de inversión.", gradient: "from-purple-500 to-purple-600" },
        { icon: <Timer className="w-8 h-8" />, title: "Ahorra tiempo", desc: "Accede a un marco probado que transforma información compleja en pasos simples", gradient: "from-blue-500 to-blue-600" },
        { icon: <Target className="w-8 h-8" />, title: "Planifica con propósito", desc: "Establece objetivos claros y aprende a estructurar tu estrategia", gradient: "from-green-500 to-green-600" }
      ].map((feature, i) => (
        <div key={i} className="card-feature">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
            {feature.icon}
          </div>
          <h3 className="font-black text-xl text-gray-800 mb-3">{feature.title}</h3>
          <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
        </div>
      ))}
    </div>
    
    {/* Botón principal con lógica de consentimiento */}
    <div className="space-y-4">
      <button 
        onClick={hasConsent ? onStart : undefined} 
        disabled={loading || !hasConsent} 
        className={`group relative inline-flex items-center gap-4 px-12 py-6 font-black text-lg text-white rounded-3xl transition-all duration-500 shadow-2xl transform hover:scale-110 active:scale-95 overflow-hidden ${
          hasConsent 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer' 
            : 'bg-gray-400 cursor-not-allowed opacity-60'
        }`}
      >
        {!hasConsent && <Lock className="w-6 h-6" />}
        <span>{hasConsent ? 'Haz el Test Gratis Ahora' : 'Acepta las Cookies para Continuar'}</span>
        {hasConsent && <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </button>
      
      {/* Mensaje de estado del consentimiento */}
      {!hasConsent && (
        <p className="text-sm text-orange-600 max-w-sm mx-auto leading-normal">
          👆 Necesitas aceptar las cookies en la parte inferior para empezar el test
        </p>
      )}
    </div>
    
    <p className="text-sm text-gray-600 max-w-sm mx-auto leading-normal">
      Herramienta educativa. No constituye asesoramiento financiero.
    </p>
  </div>
);

export default QuizStart;