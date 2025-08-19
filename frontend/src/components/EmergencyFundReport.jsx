import React from 'react';
import { Shield } from 'lucide-react';
import ModernSection from './ModernSection';

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

export default EmergencyFundReport;