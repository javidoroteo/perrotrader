import React from 'react';
import { Shield } from 'lucide-react';

const Footer = ({ onOpenPrivacyPolicy }) => {
  return (
    <footer className="relative z-20 w-full py-6 px-4 mt-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              isfinz
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <button
              onClick={onOpenPrivacyPolicy}
              className="group flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-300 font-medium"
            >
              <Shield className="w-4 h-4 group-hover:text-purple-600" />
              <span>Política de Privacidad</span>
            </button>
            
            <div className="h-4 w-px bg-gray-300"></div>
            
            <span className="text-gray-500">
              © {new Date().getFullYear()} isfinz
            </span>
          </div>
        </div>

        {/* Disclaimer adicional */}
        <div className="mt-4 pt-4 border-t border-gray-200/50 text-center">
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            Esta herramienta es solo para fines educativos e informativos. No constituye asesoramiento financiero personalizado.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;