import React from 'react';
import { Shield } from 'lucide-react';
import ModernSection from './ModernSection';

const EmergencyFundReport = ({ report }) => {
  if (!report) return null;

  return (
    <ModernSection
      title="Fondo de Emergencia 🛡️"
      icon={Shield}
      defaultOpen={false}
      gradient="from-blue-600 to-purple-600"
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