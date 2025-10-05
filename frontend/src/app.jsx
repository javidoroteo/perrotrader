import { useState, useEffect } from 'react';
import ModernInvestmentQuiz from './ModernInvestmentQuiz';
import Footer from './components/Footer';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import GDPRConsentBanner from './components/GDPRConsentBanner';
import { Routes, Route } from 'react-router-dom';
import BrokerGuide from './components/BrokerGuide';

function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [showConsentBanner, setShowConsentBanner] = useState(false);

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

      {/* Contenido principal con rutas */}
      <div style={{ flex: 1 }}>
        <Routes>
          <Route
            path="/"
            element={
              <ModernInvestmentQuiz
                onOpenPrivacyPolicy={handleOpenPrivacyFromFooter}
                hasConsent={hasConsent}
              />
            }
          />
          <Route
            path="/guia-brokers"
            element={<BrokerGuide />}
          />
        </Routes>
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