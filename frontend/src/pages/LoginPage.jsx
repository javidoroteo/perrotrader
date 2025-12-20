import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }

        const errorParam = searchParams.get('error');
        if (errorParam === 'auth_failed') {
            setError('Error de autenticación. Por favor, intenta de nuevo.');
        } else if (errorParam === 'login_failed') {
            setError('No se pudo iniciar sesión. Intenta nuevamente.');
        }

        const createdParam = searchParams.get('created');
        if (createdParam === 'true') {
            setSuccess('¡Cuenta creada exitosamente! Inicia sesión para continuar.');
        }
    }, [searchParams, isAuthenticated, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50 blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-100 rounded-full -ml-16 -mb-16 opacity-50 blur-xl"></div>

                <button
                    onClick={() => navigate('/')}
                    className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <div className="relative z-10 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                        <span className="text-white font-bold text-2xl">IF</span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido a IsFinz</h1>
                    <p className="text-gray-500 mb-8">Gestiona tus inversiones de forma inteligente</p>

                    {error && (
                        <div className="w-full bg-red-50 text-red-600 p-4 rounded-xl mb-6 flex items-start gap-3 text-left animate-in fade-in slide-in-from-top-2">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <p className="text-sm font-medium">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="w-full bg-green-50 text-green-600 p-4 rounded-xl mb-6 flex items-start gap-3 text-left animate-in fade-in slide-in-from-top-2">
                            <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <p className="text-sm font-medium">{success}</p>
                        </div>
                    )}

                    <button
                        onClick={login}
                        className="w-full bg-white border border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-3 group shadow-sm hover:shadow-md"
                    >
                        <img
                            src="https://www.google.com/favicon.ico"
                            alt="Google"
                            className="w-5 h-5 group-hover:scale-110 transition-transform"
                        />
                        <span>Continuar con Google</span>
                    </button>

                    <div className="mt-8 pt-6 border-t border-gray-100 w-full">
                        <p className="text-xs text-gray-400">
                            Al continuar, aceptas nuestros{' '}
                            <a href="/terms" className="text-blue-600 hover:underline">Términos de Servicio</a>
                            {' '}y{' '}
                            <a href="/privacy" className="text-blue-600 hover:underline">Política de Privacidad</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;