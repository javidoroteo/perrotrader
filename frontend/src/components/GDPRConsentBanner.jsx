import React from 'react';
import { X, Shield, Eye } from 'lucide-react';

const GDPRConsentBanner = ({ onAccept, onReject, onOpenPrivacyPolicy }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl">
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {/* Icon and main text */}
          <div className="flex items-start gap-3 flex-1">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                Protegemos tu privacidad
              </h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                Utilizamos cookies esenciales para el funcionamiento del test y análisis básico. 
                Al continuar, aceptas nuestras{' '}
                <button 
                  onClick={onOpenPrivacyPolicy}
                  className="text-blue-600 hover:text-blue-700 underline font-medium transition-colors"
                >
                  políticas de privacidad
                </button>
                {' '}y el uso de cookies.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onReject}
              className="flex-1 sm:flex-none px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              Rechazar
            </button>
            <button
              onClick={onAccept}
              className="flex-1 sm:flex-none group inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Shield className="w-4 h-4" />
              <span>Aceptar y Continuar</span>
            </button>
          </div>
        </div>

        {/* Additional info row */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Eye className="w-3 h-3" />
            <span>Solo usamos cookies esenciales y de análisis básico. No vendemos tus datos.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GDPRConsentBanner;