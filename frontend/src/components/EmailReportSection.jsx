import React, { useState, useEffect } from 'react';
import { Mail, Send, Check, AlertCircle, Loader2 } from 'lucide-react';

// Hook personalizado para manejar el envío de emails
const useEmailReport = (sessionId) => {
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');

  // Verificar si ya se envió un email para esta sesión
  useEffect(() => {
    const sentEmails = JSON.parse(sessionStorage.getItem('sentEmailReports') || '[]');
    if (sentEmails.includes(sessionId)) {
      setEmailSent(true);
    }
  }, [sessionId]);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const sendEmail = async () => {
    // Validación frontend
    if (!email.trim()) {
      setError('Por favor ingresa tu email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://isfinz.onrender.com/api/report/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId,
          email: email.trim().toLowerCase()
        })
      });

      const data = await response.json();

      if (data.success) {
        // Marcar como enviado
        setEmailSent(true);
        setError(null);
        
        // Guardar en sessionStorage para recordar
        const sentEmails = JSON.parse(sessionStorage.getItem('sentEmailReports') || '[]');
        if (!sentEmails.includes(sessionId)) {
          sentEmails.push(sessionId);
          sessionStorage.setItem('sentEmailReports', JSON.stringify(sentEmails));
        }
      } else {
        // Manejar diferentes tipos de errores
        if (data.error === 'Demasiados intentos de envío') {
          setError('Has alcanzado el límite de envíos. Intenta en 15 minutos.');
        } else if (data.error === 'Error de validación') {
          setError(data.message || 'Email inválido o sospechoso');
        } else if (data.error === 'Sesión no encontrada') {
          setError('Sesión inválida. Por favor reinicia el quiz.');
        } else {
          setError(data.message || 'Error al enviar el reporte');
        }
      }
    } catch (err) {
      console.error('Error sending email:', err);
      setError('Error de conexión. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setEmail('');
  };

  return {
    isLoading,
    emailSent,
    error,
    email,
    setEmail,
    sendEmail,
    reset
  };
};

// Componente principal
const EmailReportSection = ({ sessionId }) => {
  const {
    isLoading,
    emailSent,
    error,
    email,
    setEmail,
    sendEmail,
    reset
  } = useEmailReport(sessionId);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) {
      // Limpiar error al empezar a escribir
      setTimeout(() => setError(null), 100);
    }
  };

  if (emailSent) {
    return (
      <div className="bg-white/40 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6">
            <Check className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">
            ¡Reporte Enviado! 🎉
          </h3>
          <p className="text-gray-600 mb-4">
            Tu reporte personalizado + guía práctica han sido enviados a tu email.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Revisa tu bandeja de entrada y carpeta de spam por si acaso.
          </p>
          <button
            onClick={reset}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
          >
            Enviar a otro email →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/40 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] mb-8">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3">
          <Mail className="w-5 h-5 text-blue-600" />
          📧 Recibe tu reporte personalizado + Guía práctica al email
        </h3>
        <p className="text-gray-600 font-medium">
          Si no lo guardas, se perderá...
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="tu@email.com"
              disabled={isLoading}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              className={`
                w-full px-6 py-4 bg-white/60 backdrop-blur-sm border-2 rounded-xl
                text-gray-800 placeholder-gray-500 font-medium
                transition-all duration-300 focus:outline-none focus:scale-[1.02]
                disabled:opacity-50 disabled:cursor-not-allowed
                ${error 
                  ? 'border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
                  : 'border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20'
                }
              `}
            />
            {error && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
            )}
          </div>
          
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={isLoading || !email.trim()}
            className={`
              group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-semibold
              transition-all duration-300 hover:scale-105 disabled:hover:scale-100
              disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl
              ${isLoading
                ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              }
            `}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <span>📤 Enviar Reporte</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Incluye reporte completo en PDF + guía práctica de inversión
        </p>
      </div>
    </div>
  );
};

export default EmailReportSection;