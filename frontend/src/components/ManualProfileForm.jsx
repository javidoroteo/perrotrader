// frontend/src/components/ManualProfileForm.jsx

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const ManualProfileForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    education: 'Intermedio',
    riskTolerance: 'Riesgo Moderado',
    timeHorizon: 'MEDIO',
    age: '',
    savingsGoal: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar
    const newErrors = {};
    if (!formData.age) newErrors.age = 'La edad es requerida';
    if (!formData.savingsGoal) newErrors.savingsGoal = 'El capital es requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Nivel de Educación */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Nivel de Educación Financiera
        </label>
        <select
          name="education"
          value={formData.education}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="Básico">Básico - Estoy aprendiendo</option>
          <option value="Intermedio">Intermedio - Tengo experiencia</option>
          <option value="Avanzado">Avanzado - Soy experto</option>
        </select>
      </div>

      {/* Tolerancia al Riesgo */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tolerancia al Riesgo
        </label>
        <select
          name="riskTolerance"
          value={formData.riskTolerance}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="Bajo Riesgo">Bajo Riesgo - Seguridad primero</option>
          <option value="Riesgo Moderado">Riesgo Moderado - Balance</option>
          <option value="Alto Riesgo">Alto Riesgo - Máximo crecimiento</option>
        </select>
      </div>

      {/* Horizonte Temporal */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Horizonte Temporal de Inversión
        </label>
        <select
          name="timeHorizon"
          value={formData.timeHorizon}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
        >
          <option value="CORTO">Corto Plazo (1-3 años)</option>
          <option value="MEDIO">Medio Plazo (3-5 años)</option>
          <option value="LARGO">Largo Plazo (5-10 años)</option>
          <option value="MUY_LARGO">Muy largo Plazo (10+ años)</option>
        </select>
      </div>

      {/* Edad */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tu Edad
        </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="ej: 35"
          min="18"
          max="100"
          className={`w-full px-4 py-3 border ${
            errors.age ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
        />
        {errors.age && (
          <p className="text-red-600 text-sm mt-1">{errors.age}</p>
        )}
      </div>

      {/* Capital de Inversión */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Capital de Inversión (€)
        </label>
        <input
          type="number"
          name="savingsGoal"
          value={formData.savingsGoal}
          onChange={handleChange}
          placeholder="ej: 5000"
          min="0"
          step="100"
          className={`w-full px-4 py-3 border ${
            errors.savingsGoal ? 'border-red-500' : 'border-gray-300'
          } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none`}
        />
        {errors.savingsGoal && (
          <p className="text-red-600 text-sm mt-1">{errors.savingsGoal}</p>
        )}
      </div>

      {/* Botones */}
      <div className="flex gap-4 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={20} className="animate-spin" />}
          Crear Cartera
        </button>
      </div>
    </form>
  );
};

export default ManualProfileForm;
