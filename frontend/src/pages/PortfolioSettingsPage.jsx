import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import portfolioService from '../services/portfolioService';
import {
    ArrowLeft,
    Save,
    Trash2,
    DollarSign,
    PieChart,
    AlertTriangle,
    CheckCircle,
    Loader2
} from 'lucide-react';

const PortfolioSettingsPage = () => {
    const { portfolioId } = useParams();
    const navigate = useNavigate();

    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [successMsg, setSuccessMsg] = useState('');

    // Estados del formulario
    const [name, setName] = useState('');
    const [totalSavings, setTotalSavings] = useState('');
    const [allocation, setAllocation] = useState({
        rentaFija: 0,
        rentaVariable: 0,
        crypto: 0,
        gold: 0,
        cash: 0
    });

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        loadPortfolio();
    }, [portfolioId]);

    const loadPortfolio = async () => {
        try {
            setLoading(true);
            const data = await portfolioService.getPortfolioDetails(portfolioId);
            const p = data.portfolio;

            setPortfolio(p);
            setName(p.name);
            setTotalSavings(p.totalSavings);
            setAllocation({
                rentaFija: p.recommended?.rentaFija || 0,
                rentaVariable: p.recommended?.rentaVariable || 0,
                crypto: p.recommended?.crypto || 0,
                gold: p.recommended?.gold || 0,
                cash: p.recommended?.cash || 0
            });
        } catch (err) {
            console.error('Error loading portfolio:', err);
            setError('No se pudo cargar la configuración del portfolio.');
        } finally {
            setLoading(false);
        }
    };

    const handleAllocationChange = (field, value) => {
        setAllocation(prev => ({
            ...prev,
            [field]: parseFloat(value) || 0
        }));
    };

    const calculateTotalAllocation = () => {
        return Object.values(allocation).reduce((a, b) => a + b, 0);
    };

    const handleSave = async () => {
        setError(null);
        setSuccessMsg('');

        // Validaciones
        const total = calculateTotalAllocation();
        if (Math.abs(total - 100) > 0.1) {
            setError(`La distribución debe sumar 100%. Suma actual: ${total.toFixed(1)}%`);
            return;
        }

        try {
            setSaving(true);
            await portfolioService.updatePortfolio(portfolioId, {
                name,
                totalSavings,
                recommended: allocation
            });
            setSuccessMsg('Portfolio actualizado correctamente');
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err) {
            console.error('Error saving settings:', err);
            setError('Error al guardar los cambios.');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        try {
            await portfolioService.deletePortfolio(portfolioId);
            navigate('/dashboard');
        } catch (err) {
            console.error('Error deleting portfolio:', err);
            setError('Error al eliminar el portfolio.');
            setShowDeleteConfirm(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-12">
            {/* Header */}
            <div className="bg-white shadow border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(`/portfolio/${portfolioId}`)}
                            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-600" />
                        </button>
                        <h1 className="text-xl font-bold text-gray-900">Configuración del Portfolio</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Mensajes de Feedback */}
                {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                        <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                {successMsg && (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{successMsg}</p>
                    </div>
                )}

                {/* Sección 1: Información General y Capital */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-blue-500" />
                            Capital e Información
                        </h2>
                    </div>

                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Portfolio</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Capital Total Invertido (€)
                            </label>
                            <p className="text-xs text-gray-500 mb-2">
                                Aumenta este valor si has añadido nuevos fondos a tu cuenta. El sistema recalculará tu efectivo disponible.
                            </p>
                            <input
                                type="number"
                                value={totalSavings}
                                onChange={(e) => setTotalSavings(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                </div>

                {/* Sección 2: Estrategia de Inversión */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                <PieChart className="w-5 h-5 text-purple-500" />
                                Estrategia de Distribución
                            </h2>
                            <span className={`text-sm font-bold ${Math.abs(calculateTotalAllocation() - 100) < 0.1 ? 'text-green-600' : 'text-red-500'}`}>
                                Total: {calculateTotalAllocation().toFixed(0)}%
                            </span>
                        </div>
                    </div>

                    <div className="p-6 space-y-4">
                        <p className="text-sm text-gray-600 mb-4">
                            Define qué porcentaje de tu portfolio deseas asignar a cada categoría.
                            Esto actualizará tus recomendaciones de rebalanceo.
                        </p>

                        {[
                            { key: 'rentaFija', label: 'Renta Fija (Bonos, Deuda)', color: 'bg-blue-100 text-blue-800' },
                            { key: 'rentaVariable', label: 'Renta Variable (Acciones, ETFs)', color: 'bg-green-100 text-green-800' },
                            { key: 'crypto', label: 'Criptomonedas', color: 'bg-purple-100 text-purple-800' },
                            { key: 'gold', label: 'Materias Primas / Oro', color: 'bg-yellow-100 text-yellow-800' },
                            { key: 'cash', label: 'Efectivo / Liquidez', color: 'bg-gray-100 text-gray-800' }
                        ].map((item) => (
                            <div key={item.key} className="flex items-center gap-4">
                                <div className={`flex-1 p-3 rounded-lg ${item.color}`}>
                                    <span className="text-sm font-medium">{item.label}</span>
                                </div>
                                <div className="w-24 relative">
                                    <input
                                        type="number"
                                        value={allocation[item.key]}
                                        onChange={(e) => handleAllocationChange(item.key, e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-right pr-6"
                                        min="0"
                                        max="100"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Botón Guardar - Flotante o al final */}
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => navigate(`/portfolio/${portfolioId}`)}
                        className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all font-medium flex items-center gap-2"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        Guardar Cambios
                    </button>
                </div>

                {/* Zona de Peligro */}
                <div className="mt-12 border-t border-red-100 pt-8">
                    <div className="bg-red-50 rounded-2xl p-6 border border-red-200">
                        <h3 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Zona de Peligro
                        </h3>
                        <p className="text-sm text-red-700 mb-4">
                            Una vez eliminado el portfolio, no se puede recuperar. Se perderán todos los datos de transacciones y activos asociados.
                        </p>

                        {!showDeleteConfirm ? (
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="px-4 py-2 bg-white text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" />
                                Eliminar Portfolio
                            </button>
                        ) : (
                            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                                <span className="text-sm font-bold text-red-800">¿Estás seguro?</span>
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                >
                                    Sí, eliminar definitivamente
                                </button>
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                                >
                                    Cancelar
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default PortfolioSettingsPage;
