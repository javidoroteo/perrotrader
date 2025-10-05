import React from 'react';
import { Brain, Target, Timer, ArrowRight, TrendingUp, Lock, FileText, CheckCircle, BarChart3 } from 'lucide-react';

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
        Una herramienta clara, gratuita y pensada para cualquier persona —sin importar su experiencia.
      </p>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Conoce tu estilo, entiende tu tolerancia al riesgo y empieza a invertir con seguridad y propósito.
      </p>
      <p className="text-xl text-gray-600 bold max-w-2xl mx-auto leading-relaxed">
        ¿QUÉ VAS A LOGRAR?
      </p>
    </div>
    
    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto my-12">
      {[
        { icon: <Brain className="w-8 h-8" />, title: "Conócete mejor", desc: "Identifica tu perfil y evita decisiones que no van contigo.", gradient: "from-purple-500 to-purple-600" },
        { icon: <Timer className="w-8 h-8" />, title: "Ahorra tiempo y evita errores", desc: "Recibe una guía clara y directa para tomar decisiones sin sentirte abrumado.", gradient: "from-blue-500 to-blue-600" },
        { icon: <Target className="w-8 h-8" />, title: "Planifica con propósito", desc: "Define metas, estructura tu cartera y aprende a aplicar estrategias reales según tu perfil.", gradient: "from-green-500 to-green-600" }
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
      Herramienta educativa. No constituye asesoramiento financiero. Es una herramienta pensada para ayudarte en tu camino como inversor.
    </p>

    <div className="max-w-4xl mx-auto mt-12 p-8 bg-gradient-to-r from-green-50/80 to-blue-50/80 border border-green-200/50 rounded-3xl shadow-lg backdrop-blur-sm">
      <div className="space-y-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <FileText className="w-8 h-8 text-green-600" />
          <h3 className="text-2xl font-black text-gray-800">Al completar el test recibirás GRATIS:</h3>
        </div>
        
        <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl shadow-sm border border-gray-100">
          <BarChart3 className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div className="text-left">
            <p className="font-bold text-gray-800"> Informe práctico + resumen teórico</p>
            <p className="text-gray-600 text-sm">Aprende los fundamentos y descubre cómo aplicarlos a tu perfil.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            "Tu nivel de tolerancia al riesgo explicado de forma sencilla",
            "Ejemplo educativo de cartera adaptada", 
            "Estrategias de inversión según a tu perfil",
            "Cómo encajan acciones, ETFs y otros activos en tu plan"
          ].map((benefit, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white/40 rounded-xl">
              <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700 text-sm font-medium">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default QuizStart;
