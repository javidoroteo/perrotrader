import React from 'react';
import { User, Zap, Trophy, Target, Rocket, TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import ModernSection from './ModernSection';

const InvestorProfileSection = ({ profileData }) => {
  return (
    <ModernSection
      title="Perfil 🎯"
      icon={User}
      gradient="from-blue-600 to-purple-600"
      glow="blue"
      priority={false}
    >


      <div className="grid md:grid-cols-2 gap-4">
        <div className="group p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-200/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
          <div className="flex items-center mb-2">
            <Trophy className="w-4 h-4 text-blue-500 mr-2 group-hover:animate-bounce" />
            <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">Tipo</span>
          </div>
          <p className="font-bold text-gray-800">{profileData.profile.investorType}</p>
        </div>

        <div className="group p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-600/5 border border-green-200/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
          <div className="flex items-center mb-2">
            <Target className="w-4 h-4 text-green-500 mr-2 group-hover:animate-spin" />
            <span className="text-xs font-medium text-green-600 uppercase tracking-wide">Objetivo</span>
          </div>
          <p className="font-bold text-gray-800">{profileData.profile.mainObjective}</p>
        </div>

        <div className="group p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-200/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
          <div className="flex items-center mb-2">
            <Rocket className="w-4 h-4 text-purple-500 mr-2 group-hover:animate-pulse" />
            <span className="text-xs font-medium text-purple-600 uppercase tracking-wide">Experiencia</span>
          </div>
          <p className="font-bold text-gray-800">{profileData.profile.experienceLevel}</p>
        </div>

        <div className="group p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 border border-indigo-200/20 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10">
          <div className="flex items-center mb-2">
            <AlertCircle className="w-4 h-4 text-indigo-500 mr-2 group-hover:animate-pulse" />
            <span className="text-xs font-medium text-indigo-600 uppercase tracking-wide">Plazo</span>
          </div>
          <p className="font-bold text-gray-800">{profileData.profile.timeHorizon}</p>
        </div>
      </div>
    </ModernSection>
  );
};

export default InvestorProfileSection;