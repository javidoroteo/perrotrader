import { useState, useEffect } from 'react';
import ModernInvestmentQuiz from './ModernInvestmentQuiz';
import Footer from './components/Footer';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import GDPRConsentBanner from './components/GDPRConsentBanner';

function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(false);

  // Verificar consentimiento guardado al cargar
  useEffect(() => {
    const savedConsent = localStorage.getItem('gdpr-consent');
    if (savedConsent === 'accepted') {
      setHasConsent(true);
      setShowConsentBanner(false);
    } else {
      setShowConsentBanner(true);
    }
  }, []);

  const handleAcceptConsent = () => {
    localStorage.setItem('gdpr-consent', 'accepted');
    localStorage.setItem('gdpr-consent-date', new Date().toISOString());
    setHasConsent(true);
    setShowConsentBanner(false);
  };

  const handleRejectConsent = () => {
    localStorage.setItem('gdpr-consent', 'rejected');
    localStorage.setItem('gdpr-consent-date', new Date().toISOString());
    setHasConsent(false);
    setShowConsentBanner(false);
  };

  const handleOpenPrivacyFromBanner = () => {
    setShowPrivacy(true);
  };

  const handleOpenPrivacyFromFooter = () => {
    setShowPrivacy(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Modal de Política de Privacidad */}
      {showPrivacy && (
        <PrivacyPolicyPage onClose={() => setShowPrivacy(false)} />
      )}
      
      {/* Contenido principal */}
      <div style={{ flex: 1 }}>
        <ModernInvestmentQuiz 
          onOpenPrivacyPolicy={handleOpenPrivacyFromFooter}
          hasConsent={hasConsent}
        />
      </div>
      
      {/* Footer */}
      <Footer onOpenPrivacyPolicy={handleOpenPrivacyFromFooter} />
      
      {/* Banner de consentimiento GDPR */}
      {showConsentBanner && (
        <GDPRConsentBanner
          onAccept={handleAcceptConsent}
          onReject={handleRejectConsent}
          onOpenPrivacyPolicy={handleOpenPrivacyFromBanner}
        />
      )}
    </div>
  );
}

export default App;