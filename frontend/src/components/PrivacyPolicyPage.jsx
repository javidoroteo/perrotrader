import React from 'react';
import { Shield, Mail, Clock, Users, FileText, Lock, RefreshCw, AlertCircle, ArrowLeft } from 'lucide-react';

const PrivacyPolicyPage = ({ onBack }) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header con botón cerrar */}
          <div className="mb-6">
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-3 px-4 py-2 bg-white/60 hover:bg-white/80 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-lg backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Volver</span>
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r  from-blue-600 to-purple-600 text-white p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-xl">
                  <Shield className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Política de Privacidad</h1>
                  <p className="text-purple-100">isfinz - Test de Perfil de Inversión</p>
                </div>
              </div>
              <p className="text-lg text-purple-100">
                Nos comprometemos a proteger tu privacidad y ser transparentes sobre cómo utilizamos tus datos.
              </p>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
              
              {/* 1. Responsable */}
              <section className="bg-blue-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Responsable del tratamiento</h2>
                    <p className="text-gray-700 mb-3">El responsable del tratamiento de tus datos es:</p>
                    <div className="bg-white rounded-lg p-4 space-y-2">
                      <p><strong>Nombre:</strong> isfinz</p>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-blue-600" />
                        <p><strong>Email de contacto:</strong> 
                          <a 
                            href="mailto:info@isfinz.com" 
                            className="text-blue-600 font-semibold hover:underline ml-1"
                          >
                            info@isfinz.com
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Datos que recogemos */}
              <section className="bg-green-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Datos que recogemos</h2>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>Respuestas al test de inversión</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>Dirección IP y datos técnicos básicos</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>Correo electrónico si lo introduces para recibir tu resultado</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. Finalidad */}
              <section className="bg-purple-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Finalidad del tratamiento</h2>
                    <p className="text-gray-700 mb-3">Los datos se utilizan únicamente para:</p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <span>Mostrarte un resultado personalizado del test</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                        <span>Analizar de forma agregada y anónima el uso de la herramienta para mejorarla</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 4. Base legal */}
              <section className="bg-orange-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Base legal</h2>
                    <p className="text-gray-700">
                      El tratamiento de los datos se basa en tu <strong>consentimiento</strong> expreso, 
                      que otorgas al marcar la casilla antes de iniciar el test.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Conservación */}
              <section className="bg-red-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Clock className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Conservación de datos</h2>
                    <p className="text-gray-700">
                      Los datos se conservarán durante un máximo de <strong>6 meses</strong>, 
                      tras lo cual serán eliminados o anonimizados.
                    </p>
                  </div>
                </div>
              </section>

              {/* 6. Destinatarios */}
              <section className="bg-indigo-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Users className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Destinatarios de los datos</h2>
                    <p className="text-gray-700">
                      No compartimos tus datos con terceros, salvo que utilicemos herramientas de análisis de tráfico 
                      en cuyo caso las IPs se anonimizan.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. Derechos */}
              <section className="bg-teal-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Shield className="w-6 h-6 text-teal-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Derechos del usuario</h2>
                    <p className="text-gray-700 mb-3">
                      Puedes ejercer tus derechos de acceso, rectificación, supresión ("derecho al olvido"), 
                      oposición y portabilidad enviando un correo a:
                    </p>
                    <div className="flex items-center gap-2 bg-white rounded-lg p-3">
                      <Mail className="w-4 h-4 text-teal-600" />
                      <a 
                        href="mailto:info@isfinz.com" 
                        className="text-teal-600 font-semibold hover:underline"
                      >
                        info@isfinz.com
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* 8. Seguridad */}
              <section className="bg-yellow-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Lock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Seguridad</h2>
                    <p className="text-gray-700">
                      Tus datos se almacenan en servidores seguros y se aplican medidas de protección técnicas 
                      y organizativas adecuadas (HTTPS, control de acceso).
                    </p>
                  </div>
                </div>
              </section>

              {/* 9. Cambios */}
              <section className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <RefreshCw className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Cambios en esta política</h2>
                    <p className="text-gray-700">
                      Podremos actualizar esta política para mejorar la transparencia o cumplir con nuevas normativas. 
                      Publicaremos siempre la última versión en esta página.
                    </p>
                  </div>
                </div>
              </section>

              {/* Fecha actualización */}
              <div className="text-center text-gray-500 text-sm border-t pt-6">
                Última actualización: {new Date().toLocaleDateString('es-ES')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;