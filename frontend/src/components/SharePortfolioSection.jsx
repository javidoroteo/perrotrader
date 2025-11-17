// frontend/src/components/SharePortfolioSection.jsx
//  Componente para compartir portfolio con analytics

import { useState, useEffect } from 'react';
import { Share2, Copy, Eye, Trash2, ExternalLink, Clock, Calendar } from 'lucide-react';
import portfolioService from '../services/portfolioService';

const SharePortfolioSection = ({ portfolioId }) => {
  const [shareLink, setShareLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadShareLink();
  }, [portfolioId]);

  const loadShareLink = async () => {
    try {
      setLoading(true);
      const response = await portfolioService.getMyShareLinks();
      
      if (response.success) {
        // Buscar el link de este portfolio específico
        const link = response.shareLinks.find(l => l.portfolioId === portfolioId);
        setShareLink(link || null);
      }
    } catch (err) {
      console.error('Error loading share link:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateLink = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await portfolioService.createShareLink(portfolioId);
      
      if (response.success) {
        setShareLink({
          token: response.token,
          shareUrl: response.shareUrl,
          expiresAt: response.expiresAt,
          viewCount: 0,
          lastViewedAt: null,
          createdAt: new Date()
        });
      } else {
        setError(response.error || 'Error generando link');
      }
    } catch (err) {
      console.error('Error creating share link:', err);
      setError('Error generando link de compartir');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    if (shareLink) {
      navigator.clipboard.writeText(shareLink.shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDeleteLink = async () => {
    if (!shareLink || !confirm('¿Eliminar este link? Ya no será accesible.')) return;
    
    try {
      setLoading(true);
      await portfolioService.deleteShareLink(shareLink.token);
      setShareLink(null);
    } catch (err) {
      console.error('Error deleting share link:', err);
      setError('Error eliminando link');
    } finally {
      setLoading(false);
    }
  };

  const handleViewShared = () => {
    if (shareLink) {
      window.open(shareLink.shareUrl, '_blank');
    }
  };

  const getDaysRemaining = () => {
    if (!shareLink) return 0;
    const now = new Date();
    const expires = new Date(shareLink.expiresAt);
    const diffTime = expires - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const formatLastViewed = () => {
    if (!shareLink?.lastViewedAt) return 'Nunca';
    
    const now = new Date();
    const viewed = new Date(shareLink.lastViewedAt);
    const diffMs = now - viewed;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 1) return 'Hace un momento';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    return `Hace ${diffDays} días`;
  };

  if (loading && !shareLink) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <Share2 className="text-blue-500" size={24} />
        <h3 className="text-xl font-bold text-gray-900">Compartir Portfolio</h3>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {!shareLink ? (
        // No existe link - Mostrar botón para crear
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            Comparte tu portfolio con un link temporal (7 días)
          </p>
          <button
            onClick={handleCreateLink}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Generando...' : '🔗 Generar Link de Compartir'}
          </button>
        </div>
      ) : (
        // Existe link - Mostrar analytics
        <div className="space-y-4">
          
          {/* Link compartido */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-2">Link compartido:</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareLink.shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <Copy size={16} />
                {copied ? 'Copiado!' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Analytics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Vistas */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="text-blue-600" size={20} />
                <p className="text-xs text-gray-600 font-medium">Vistas Totales</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{shareLink.viewCount || 0}</p>
            </div>

            {/* Última vista */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-purple-600" size={20} />
                <p className="text-xs text-gray-600 font-medium">Última Vista</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">{formatLastViewed()}</p>
            </div>

            {/* Días restantes */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="text-green-600" size={20} />
                <p className="text-xs text-gray-600 font-medium">Expira en</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">{getDaysRemaining()} días</p>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex gap-3">
            <button
              onClick={handleViewShared}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
            >
              <ExternalLink size={18} />
              Ver Link
            </button>
            
            <button
              onClick={handleDeleteLink}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={18} />
              Eliminar
            </button>
          </div>

          {/* Info adicional */}
          <div className="text-xs text-gray-500 text-center pt-2 border-t border-gray-200">
            Creado el {new Date(shareLink.createdAt).toLocaleDateString('es-ES', { 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SharePortfolioSection;
