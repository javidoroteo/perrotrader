// frontend/src/components/Auth/UserProfile.jsx
import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { User, LogOut, ChevronDown, Settings, LayoutDashboard, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ compact = false }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated || !user) return null;

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  if (compact) {
    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {user.picture ? (
            <img
              src={user.picture}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                      {user.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button
                  onClick={() => {
                    navigate('/dashboard');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <LayoutDashboard className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Dashboard</span>
                </button>

                <button
                  onClick={() => {
                    navigate('/reporte');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <FileText className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Mis Reportes</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/settings');
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Configuración</span>
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-gray-100 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-red-50 transition-colors text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <span className="font-medium">Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  // Full profile view (for settings page, etc.)
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-start gap-4">
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        )}
        
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
          
          {user.dateOfBirth && (
            <p className="text-sm text-gray-400 mt-1">
              Nacimiento: {new Date(user.dateOfBirth).toLocaleDateString()}
            </p>
          )}

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => navigate('/settings')}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 transition-colors flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Editar Perfil
            </button>
            
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition-colors flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
