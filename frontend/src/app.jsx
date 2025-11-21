// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/authContext';

import ModernInvestmentQuiz from './ModernInvestmentQuiz';
import Footer from './components/Footer';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import GDPRConsentBanner from './components/GDPRConsentBanner';
import BrokerGuide from './components/BrokerGuide';

//componentes de autenticación y navegación
import Navbar from './components/Navbar';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Páginas del Portfolio Manager
import Dashboard from './pages/Dashboard';
import PortfolioDetailsPage from './pages/PortfolioDetailsPage';
import AssetsPage from './pages/AssetsPage';
import MyReportsPage from './pages/MyReportPage';
import SettingsPage from './pages/SettingPages';
import OAuthCallback from './pages/0AuthCallback';
import CreatePortfolioManualPage from './pages/CreatePortfolioManualPage';

//Página de portfolio compartido
import SharedPortfolioView from './pages/SharedPortfolioView';

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
    setHasConsent(false);
    setShowConsentBanner(false);
  };

  const handlePrivacyClick = () => {
    setShowPrivacy(true);
  };

  if (showPrivacy) {
    return <PrivacyPolicyPage onBack={() => setShowPrivacy(false)} />;
  }

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {/* Navbar - visible en todas las páginas */}
        <Navbar />

        {/* Contenido principal */}
        <main className="flex-grow">
          <Routes>
            {/* Ruta principal - Quiz */}
            <Route path="/" element={<ModernInvestmentQuiz hasConsent={hasConsent} onOpenPrivacyPolicy={handlePrivacyClick} />} />

            {/* OAuth Callback */}
            <Route path="/auth/callback" element={<OAuthCallback />} />

            {/* Broker Guide (existente) */}
            <Route path="/broker-guide" element={<BrokerGuide />} />

            {/* Privacy Policy (existente) */}
            <Route
              path="/privacy"
              element={<PrivacyPolicyPage onBack={() => window.history.back()} />}
            />

            {/* 🆕 NUEVA RUTA: Portfolio compartido (PÚBLICA) */}
            <Route
              path="/portfolio/shared/:token"
              element={<SharedPortfolioView />}
            />

            {/* ===== RUTAS PROTEGIDAS (requieren login) ===== */}

            {/* 🆕 Crear Portfolio Manual */}
            <Route
              path="/create-portfolio"
              element={
                <ProtectedRoute>
                <CreatePortfolioManualPage />
                </ProtectedRoute>
              }
            />
            
            {/* Dashboard principal */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Detalles de portfolio específico */}
            <Route
              path="/portfolio/:portfolioId"
              element={
                <ProtectedRoute>
                  <PortfolioDetailsPage />
                </ProtectedRoute>
              }
            />

            {/* Búsqueda de activos */}
            <Route
              path="/assets"
              element={
                <ProtectedRoute>
                  <AssetsPage />
                </ProtectedRoute>
              }
            />

            {/* Mis reportes guardados */}
            <Route
              path="/Reporte"
              element={
                <ProtectedRoute>
                  <MyReportsPage />
                </ProtectedRoute>
              }
            />

            {/* Configuración de perfil */}
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />

            {/* Ruta 404 */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
                    <a
                      href="/"
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      Volver al inicio
                    </a>
                  </div>
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer - visible en todas las páginas */}
        <Footer onPrivacyClick={handlePrivacyClick} />

        {/* GDPR Consent Banner */}
        {showConsentBanner && (
          <GDPRConsentBanner
            onAccept={handleAcceptConsent}
            onReject={handleRejectConsent}
            onPrivacyClick={handlePrivacyClick}
          />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
