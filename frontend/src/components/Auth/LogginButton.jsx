// frontend/src/components/Auth/LoginButton.jsx
import { useAuth } from '../../context/authContext';
import { LogIn, Sparkles } from 'lucide-react';

const LoginButton = ({ variant = 'primary', fullWidth = false, showIcon = true }) => {
  const { login, isAuthenticated } = useAuth();

  if (isAuthenticated) return null;

  const baseStyles = "font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: `${baseStyles} bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-xl px-6 py-3`,
    secondary: `${baseStyles} bg-white text-gray-900 hover:bg-gray-100 border-2 border-gray-200 px-6 py-3`,
    outline: `${baseStyles} border-2 border-blue-500 text-blue-500 hover:bg-blue-50 px-6 py-3`,
    ghost: `${baseStyles} text-blue-500 hover:bg-blue-50 px-4 py-2`
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      onClick={login}
      className={`${variants[variant]} ${widthClass} group`}
    >
      <span>Iniciar Sesión</span>
      <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </button>
  );
};

export default LoginButton;
