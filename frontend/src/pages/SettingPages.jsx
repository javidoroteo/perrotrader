// frontend/src/pages/SettingsPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { 
  User, 
  Mail, 
  Bell, 
  Trash2, 
  Download, 
  LogOut,
  Shield,
  ChevronRight,
  Info,
  AlertTriangle,
  CheckCircle,
  Save,
  Target,
  Clock,
  TrendingUp
} from 'lucide-react';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Estados para notificaciones (preparado para futuro)
  const [notifications, setNotifications] = useState({
    weeklyReport: false,
    rebalanceAlerts: false,
    marketNews: false,
    recommendedAssets: false
  });

  // Estados para el perfil de inversor
  const [investorProfile, setInvestorProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [showEditProfile, setShowEditProfile] = useState(false);

  // Estados de carga
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadUserSettings();
  }, []);

  const loadUserSettings = async () => {
    try {
      setLoadingProfile(true);
      
      // Cargar perfil de inversor desde el último quiz/report
      // Este endpoint deberás crearlo en el backend
      const response = await authService.getUserProfile();
      setInvestorProfile(response.profile);
      
      // Cargar preferencias de notificaciones (si existen en BD)
      if (response.preferences) {
        setNotifications(response.preferences.notifications || notifications);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleSaveNotifications = async () => {
    try {
      setSaving(true);
      await authService.updatePreferences({ notifications });
      alert('Preferencias guardadas correctamente');
    } catch (error) {
      console.error('Error saving notifications:', error);
      alert('Error al guardar preferencias');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateInvestorProfile = async (newProfile) => {
    try {
      setSaving(true);
      await authService.updateInvestorProfile(newProfile);
      setInvestorProfile(newProfile);
      setShowEditProfile(false);
      alert('Perfil de inversor actualizado correctamente');
    } catch (error) {
      console.error('Error updating investor profile:', error);
      alert('Error al actualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = async () => {
    if (!confirm('¿Descargar todos tus datos en formato JSON?')) return;

    try {
      setExporting(true);
      
      // El backend genera un JSON con todos los datos del usuario
      const data = await authService.exportUserData();
      
      // Crear blob y descargar
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `isfinz-data-${user.email}-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      window.URL.revokeObjectURL(url);
      
      alert('Datos exportados correctamente');
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Error al exportar datos');
    } finally {
      setExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      '⚠️ ATENCIÓN: Esta acción es PERMANENTE.\n\n' +
      'Se eliminarán:\n' +
      '- Tu cuenta de usuario\n' +
      '- Todos tus portfolios\n' +
      '- Todos tus reportes\n' +
      '- Todos tus datos\n\n' +
      '¿Estás seguro de que deseas eliminar tu cuenta?'
    );

    if (!confirmed) return;

    const confirmEmail = prompt('Para confirmar, escribe tu email:');
    if (confirmEmail !== user.email) {
      alert('El email no coincide. Cancelado.');
      return;
    }

    try {
      setDeleting(true);
      await authService.deleteAccount();
      
      alert('Tu cuenta ha sido eliminada correctamente.');
      logout();
      navigate('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Error al eliminar cuenta. Intenta nuevamente.');
    } finally {
      setDeleting(false);
    }
  };

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      logout();
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Configuración ⚙️
          </h1>
          <p className="text-gray-600 text-lg">
            Gestiona tu cuenta y preferencias
          </p>
        </div>

        {/* SECCIÓN 1: PERFIL */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Tu Perfil</h2>
          </div>

          <div className="space-y-4">
            {/* Foto y nombre */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
              {user?.picture && (
                <img 
                  src={user.picture} 
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-blue-500"
                />
              )}
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Nombre completo</p>
                <p className="font-bold text-lg text-gray-900">{user?.name || 'Usuario'}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Vinculado con Google (no editable)
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-5 h-5 text-gray-600" />
                <p className="text-sm text-gray-600">Email</p>
              </div>
              <p className="font-semibold text-gray-900">{user?.email || 'N/A'}</p>
              <p className="text-xs text-gray-500 mt-1">
                Vinculado con Google (no editable)
              </p>
            </div>

            {/* Fecha de registro */}
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <p className="text-sm text-gray-600">Miembro desde</p>
              </div>
              <p className="font-semibold text-gray-900">
                {user?.createdAt 
                  ? new Date(user.createdAt).toLocaleDateString('es-ES', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* SECCIÓN 2: PERFIL DE INVERSOR */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Perfil de Inversor</h2>
                <p className="text-sm text-gray-600">Basado en tu test de inversión</p>
              </div>
            </div>

            <button
              onClick={() => setShowEditProfile(!showEditProfile)}
              className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-xl transition-colors font-semibold"
            >
              {showEditProfile ? 'Cancelar' : 'Editar'}
            </button>
          </div>

          {loadingProfile ? (
            <div className="text-center py-8 text-gray-500">
              Cargando perfil...
            </div>
          ) : !investorProfile ? (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 mb-4">
                Aún no has completado el test de inversión
              </p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold"
              >
                Hacer Test Ahora
              </button>
            </div>
          ) : showEditProfile ? (
            <InvestorProfileEditor 
              profile={investorProfile}
              onSave={handleUpdateInvestorProfile}
              onCancel={() => setShowEditProfile(false)}
              saving={saving}
            />
          ) : (
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Perfil de Riesgo</p>
                <p className="text-xl font-bold text-gray-900">{investorProfile.riskProfile}</p>
              </div>

              {investorProfile.age && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Edad</p>
                  <p className="font-semibold text-gray-900">{investorProfile.age} años</p>
                </div>
              )}

              {investorProfile.investmentHorizon && (
                <div className="p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">Horizonte de Inversión</p>
                  <p className="font-semibold text-gray-900">{investorProfile.investmentHorizon}</p>
                </div>
              )}

              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 flex items-start gap-2">
                  <Info className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <span>
                    Puedes actualizar tu perfil manualmente o hacer el test de nuevo para 
                    obtener una recomendación actualizada.
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* SECCIÓN 3: NOTIFICACIONES (Preparado para futuro) */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Bell className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Notificaciones</h2>
              <p className="text-sm text-gray-600">Gestiona tus preferencias de notificaciones</p>
            </div>
          </div>

          <div className="space-y-4">
            <NotificationToggle
              label="Reporte Semanal"
              description="Recibe un resumen semanal de tus portfolios por email"
              checked={notifications.weeklyReport}
              onChange={(checked) => setNotifications({ ...notifications, weeklyReport: checked })}
              comingSoon={true}
            />

            <NotificationToggle
              label="Alertas de Rebalanceo"
              description="Notificaciones cuando tu portfolio necesita rebalanceo"
              checked={notifications.rebalanceAlerts}
              onChange={(checked) => setNotifications({ ...notifications, rebalanceAlerts: checked })}
              comingSoon={true}
            />

            <NotificationToggle
              label="Activos Recomendados"
              description="Recibe sugerencias de nuevos activos basadas en tu perfil"
              checked={notifications.recommendedAssets}
              onChange={(checked) => setNotifications({ ...notifications, recommendedAssets: checked })}
              comingSoon={true}
            />

            <NotificationToggle
              label="Noticias del Mercado"
              description="Actualizaciones importantes sobre el mercado financiero"
              checked={notifications.marketNews}
              onChange={(checked) => setNotifications({ ...notifications, marketNews: checked })}
              comingSoon={true}
            />
          </div>

          <button
            onClick={handleSaveNotifications}
            disabled={saving}
            className="mt-6 w-full px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl transition-all font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{saving ? 'Guardando...' : 'Guardar Preferencias'}</span>
          </button>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>
                <span className="font-semibold">Próximamente:</span> Sistema de notificaciones 
                por email para mantener te actualizado sobre tus inversiones.
              </span>
            </p>
          </div>
        </div>

        {/* SECCIÓN 4: PRIVACIDAD Y DATOS */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Privacidad y Datos</h2>
              <p className="text-sm text-gray-600">Gestiona tus datos personales (GDPR)</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleExportData}
              disabled={exporting}
              className="w-full p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border border-blue-300 rounded-xl transition-all text-left group disabled:opacity-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Download className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Descargar mis Datos</p>
                    <p className="text-sm text-gray-600">
                      Exporta todos tus datos en formato JSON (GDPR)
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

        {/* SECCIÓN 5: CUENTA */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gestión de Cuenta</h2>
              <p className="text-sm text-gray-600">Cierra sesión o elimina tu cuenta</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleLogout}
              className="w-full p-4 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-xl transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <LogOut className="w-6 h-6 text-gray-600" />
                  <div>
                    <p className="font-semibold text-gray-900">Cerrar Sesión</p>
                    <p className="text-sm text-gray-600">
                      Sal de tu cuenta de forma segura
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="w-full p-4 bg-red-50 hover:bg-red-100 border border-red-300 rounded-xl transition-all text-left group disabled:opacity-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-6 h-6 text-red-600" />
                  <div>
                    <p className="font-semibold text-red-900">Eliminar Cuenta</p>
                    <p className="text-sm text-red-700">
                      Elimina permanentemente tu cuenta y todos tus datos
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-red-600 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <span>
                  <span className="font-semibold">Advertencia:</span> Eliminar tu cuenta es una 
                  acción permanente que no se puede deshacer. Todos tus portfolios, reportes y 
                  datos serán eliminados definitivamente.
                </span>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Componente para toggle de notificaciones
const NotificationToggle = ({ label, description, checked, onChange, comingSoon = false }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-900">{label}</p>
          {comingSoon && (
            <span className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
              Próximamente
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      
      <button
        onClick={() => onChange(!checked)}
        disabled={comingSoon}
        className={`relative w-14 h-7 rounded-full transition-colors ${
          checked ? 'bg-green-500' : 'bg-gray-300'
        } ${comingSoon ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${
            checked ? 'translate-x-7' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

// Componente para editar perfil de inversor
const InvestorProfileEditor = ({ profile, onSave, onCancel, saving }) => {
  const [editedProfile, setEditedProfile] = useState({...profile});

  const riskProfiles = [
    { value: 'Conservador', label: 'Conservador', description: 'Bajo riesgo, estabilidad' },
    { value: 'Moderado', label: 'Moderado', description: 'Equilibrio riesgo-rendimiento' },
    { value: 'Agresivo', label: 'Agresivo', description: 'Alto riesgo, alto rendimiento' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Perfil de Riesgo
        </label>
        <div className="space-y-2">
          {riskProfiles.map((riskProfile) => (
            <button
              key={riskProfile.value}
              onClick={() => setEditedProfile({ ...editedProfile, riskProfile: riskProfile.value })}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                editedProfile.riskProfile === riskProfile.value
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200 bg-white hover:border-purple-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{riskProfile.label}</p>
                  <p className="text-sm text-gray-600">{riskProfile.description}</p>
                </div>
                {editedProfile.riskProfile === riskProfile.value && (
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <button
          onClick={onCancel}
          className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
        >
          Cancelar
        </button>
        <button
          onClick={() => onSave(editedProfile)}
          disabled={saving}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white rounded-xl transition-all font-semibold shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
        >
          <Save className="w-5 h-5" />
          <span>{saving ? 'Guardando...' : 'Guardar Cambios'}</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
