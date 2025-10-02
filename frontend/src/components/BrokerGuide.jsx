import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown, 
  Smartphone, 
  CreditCard, 
  Search, 
  ShoppingCart,
  CheckCircle,
  AlertTriangle,
  User,
  FileText,
  Camera,
  Euro
} from 'lucide-react';

const BrokerGuide = () => {
  const [openStep, setOpenStep] = useState(0);

  const steps = [
    {
      title: "1. Elegir tu broker (la aplicación donde comprar)",
      subtitle: "Como elegir un supermercado, pero para inversiones",
      icon: Smartphone,
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">¿Qué es un broker?</h4>
            <p className="text-blue-800 text-sm leading-relaxed">
              Es como una tienda online donde puedes comprar acciones, ETFs y otros productos de inversión. 
              Igual que usas Amazon para comprar cosas, usas un broker para comprar inversiones.
            </p>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-3">Los 3 brokers más fáciles para empezar:</h4>
            <div className="space-y-3">
              <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">XTB</p>
                  <p className="text-sm text-gray-600">Español, gratis hasta 100.000€/mes, muy fácil</p>
                </div>
              </div>
              <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Trade Republic</p>
                  <p className="text-sm text-gray-600">Solo móvil, 1€ por compra, súper simple</p>
                </div>
              </div>
              <div className="flex items-center bg-white rounded-lg p-3 shadow-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">eToro</p>
                  <p className="text-sm text-gray-600">Gratis ETFs, interfaz muy visual</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Recomendación simple:</p>
                <p className="text-sm text-yellow-800">Si no sabes cuál elegir, empieza con <strong>XTB</strong>. Es español, regulado, y gratis hasta 100.000€.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "2. Crear tu cuenta (como registrarte en cualquier web)",
      subtitle: "Necesitarás tu DNI y 5 minutos",
      icon: User,
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">¿Qué necesitas tener a mano?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              <div className="flex items-center bg-white rounded-lg p-3">
                <FileText className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm">DNI o NIE</span>
              </div>
              <div className="flex items-center bg-white rounded-lg p-3">
                <Smartphone className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm">Móvil (para verificación)</span>
              </div>
              <div className="flex items-center bg-white rounded-lg p-3">
                <Camera className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm">Cámara (foto del DNI)</span>
              </div>
              <div className="flex items-center bg-white rounded-lg p-3">
                <Euro className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm">Cuenta bancaria</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Paso a paso:</h4>
            <div className="space-y-2">
              {[
                'Ve a la web del broker y pulsa "Abrir cuenta"',
                'Rellena tus datos básicos (como en cualquier formulario)',
                'Haz una foto de tu DNI con el móvil',
                'Te pedirán una selfie para verificar que eres tú',
                'Responde unas preguntas sobre tu experiencia (di la verdad)',
                'Espera 1-2 días a que te aprueben la cuenta'
              ].map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-green-900">Tranquilo/a, es normal:</p>
                <p className="text-sm text-green-800">Te van a hacer muchas preguntas sobre inversión. Es obligatorio por ley. Solo sé honesto/a sobre tu experiencia.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "3. Meter dinero en la cuenta",
      subtitle: "Como hacer una transferencia normal",
      icon: CreditCard,
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Es súper fácil:</h4>
            <div className="space-y-2">
              {[
                'Entra en tu cuenta del broker',
                'Busca "Ingresar dinero" o "Depositar"',
                'Elige "Transferencia bancaria" (es gratis)',
                'Te darán un número de cuenta del broker',
                'Haz una transferencia desde tu banco como siempre'
              ].map((step, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm text-green-700">{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Consejos:</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <p>• Empieza con poco dinero (50-100€) para probar</p>
              <p>• La transferencia tarda 1-2 días laborables</p>
              <p>• Algunos brokers aceptan tarjeta (instantáneo pero puede tener comisión)</p>
              <p>• En la transferencia pon tu nombre en el concepto</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Importante:</p>
                <p className="text-sm text-yellow-800">Solo invierte dinero que no necesitas en los próximos 2-3 años. Nunca inviertas dinero de emergencia.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "4. Buscar tu ETF (como buscar en Google)",
      subtitle: "Encontrar el producto que quieres comprar",
      icon: Search,
      content: (
        <div className="space-y-4">
          <div className="bg-indigo-50 rounded-lg p-4">
            <h4 className="font-semibold text-indigo-900 mb-3">¿Qué es un ETF?</h4>
            <p className="text-sm text-indigo-800 leading-relaxed">
              Es como una cesta que contiene trocitos de muchas empresas. En lugar de comprar una acción de una empresa, 
              compras un trocito de 500 o 1000 empresas diferentes. Es mucho más seguro.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Cómo buscar:</h4>
            <div className="space-y-3">
              {[
                { text: 'En tu broker, busca el buscador (como Google)', example: 'Suele estar arriba con una lupa 🔍' },
                { text: 'Escribe el nombre del ETF', example: 'Ejemplo: "IWDA" o "Vanguard All World"' },
                { text: 'Te aparecerán varios resultados', example: 'Elige el que coincida exactamente' },
                { text: 'Fíjate en el código ISIN', example: 'Ejemplo: IE00B4L5Y983 (es único para cada producto), es como el DNI para los productos financieros' }
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-lg p-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{step.text}</p>
                      <p className="text-xs text-gray-600 mt-1">{step.example}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: "5. Hacer tu primera compra",
      subtitle: "Como comprar en Amazon, pero más sencillo",
      icon: ShoppingCart,
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-3">Paso a paso:</h4>
            <div className="space-y-3">
              {[
                { text: 'Pulsa "Comprar" en el ETF que quieres', detail: 'Suele ser un botón verde o azul' },
                { text: 'Elige cuánto dinero quieres invertir', detail: 'Ejemplo: 100€ (no hace falta comprar acciones enteras)' },
                { text: 'Revisa el resumen', detail: 'Comprueba que todo esté correcto' },
                { text: 'Confirma la compra', detail: 'Dale a "Confirmar" o "Comprar"' },
                { text: '¡Ya eres inversor/a!', detail: 'En unos segundos aparecerá en tu cartera' }
              ].map((step, index) => (
                <div key={index} className="bg-white rounded-lg p-3">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-900">{step.text}</p>
                      <p className="text-xs text-green-700 mt-1">{step.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-900 mb-2">Tipos de órdenes (no te preocupes, usa "A mercado"):</h4>
            <div className="space-y-2">
              <div className="bg-white rounded-lg p-3">
                <p className="font-medium text-purple-900">A mercado 👍</p>
                <p className="text-sm text-purple-700">Compras al precio actual. Es la opción más fácil y rápida.</p>
              </div>
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="font-medium text-gray-600">Limitada </p>
                <p className="text-sm text-gray-500">Solo compras si el precio baja hasta X. Para usuarios experimentados.</p>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-yellow-900">Recuerda:</p>
                <div className="text-sm text-yellow-800 space-y-1">
                  <p>• Los precios cambian constantemente (es normal)</p>
                  <p>• No te agobies si baja el primer día</p>
                  <p>• La inversión es para largo plazo (años, no días)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
              <div>
                <p className="font-medium text-blue-900">¡Felicidades! 🎉</p>
                <p className="text-sm text-blue-800">Ya tienes tu primera inversión. Ahora solo tienes que ser paciente y seguir la estrategia elegida.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Guía Súper Fácil: Tu Primera Inversión
        </h1>
        <p className="text-lg text-gray-600">
          En 5 pasos:
        </p>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <button
              onClick={() => setOpenStep(openStep === index ? -1 : index)}
              className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.subtitle}</p>
                  </div>
                </div>
                {openStep === index ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>
            
            {openStep === index && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="pt-4">
                  {step.content}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">¿Necesitas más ayuda?</h3>
          <p className="text-gray-700 mb-4">
            Recuerda: invertir es como plantar un árbol. Lo importante es empezar, aunque sea con poco dinero.
          </p>
          <div className="bg-white rounded-lg p-4 text-sm text-gray-600">
            <p><strong>Regla de oro:</strong> Solo invierte dinero que no necesitas en 2-3 años mínimo.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerGuide;
