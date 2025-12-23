// frontend/src/pages/OAuthCallback.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import authService from '../services/authService';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { checkAuthentication } = useAuth();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    handleOAuthCallback();
  }, []);

  const handleOAuthCallback = async () => {
    try {
      // Obtener token de la URL (enviado por el backend)
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setMessage(error);
        setTimeout(() => navigate('/'), 3000);
        return;
      }

      if (!token) {
        setStatus('error');
        setMessage('No se recibió token de autenticación');
        setTimeout(() => navigate('/'), 3000);
        return;
      }

      // Guardar token
      authService.saveToken(token);

      // Verificar autenticación y obtener datos del usuario
      const authResponse = await authService.checkAuth();

      if (!authResponse.authenticated || !authResponse.user) {
        throw new Error('No se pudo verificar la autenticación');
      }

      // Guardar usuario limpio
      authService.saveUser(authResponse.user);

      setStatus('success');
      setMessage('¡Autenticación exitosa!');

      // Verificar si el usuario tiene quiz completado
      setTimeout(() => {
        if (authResponse.user.hasCompletedQuiz) {
          navigate('/dashboard');
        } else {
          navigate('/', { state: { message: 'Completa el test de inversión para comenzar' } });
        }
      }, 2000);

    } catch (error) {
      console.error('Error en OAuth callback:', error);
      setStatus('error');
      setMessage('Error al autenticar. Intenta nuevamente.');
      setTimeout(() => navigate('/'), 3000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="w-16 h-16 animate-spin text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Iniciando sesión...
            </h2>
            <p className="text-gray-600">
              Estamos verificando tu cuenta con Google
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              ¡Bienvenido!
            </h2>
            <p className="text-gray-600">{message}</p>
            <p className="text-sm text-gray-500 mt-4">
              Redirigiendo...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Error de autenticación
            </h2>
            <p className="text-gray-600">{message}</p>
            <p className="text-sm text-gray-500 mt-4">
              Redirigiendo al inicio...
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;

