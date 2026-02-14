import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Certificate } from '../types';

const AreaDoAluno: React.FC<{ certificates: Certificate[] }> = ({ certificates }) => {
  const { profile } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 min-h-screen bg-slate-50 animate-reveal">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-10">
        <div className="flex items-center space-x-8">
          <div className="w-24 h-24 border-4 border-white bg-[#1a1a3a] flex items-center justify-center text-4xl shadow-xl rounded-[2rem] overflow-hidden font-black text-white uppercase">
            {profile?.nome_completo.charAt(0)}
          </div>
          <div>
            <p className="text-[#e84c5c] text-xs font-bold uppercase tracking-widest mb-2">Portal Académico Central</p>
            <h1 className="text-4xl font-black text-[#1a1a3a] uppercase tracking-tighter leading-none">{profile?.nome_completo}</h1>
            <p className="text-slate-400 text-sm mt-4 font-medium uppercase tracking-widest">Identidade Digital: {profile?.numero_bi}</p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="px-10 py-6 bg-white border border-slate-100 text-center rounded-[2rem] shadow-sm">
            <span className="block text-3xl font-black text-[#1a1a3a]">{certificates.length}</span>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Diplomas</span>
          </div>
        </div>
      </div>
      {/* Content for certificates and progress remains visual for now as per schema logic */}
      <div className="bg-white rounded-[2.5rem] p-20 text-center border border-dashed border-slate-200">
        <p className="text-slate-400 italic">"Seus cursos e certificados serão carregados aqui após a validação administrativa da sua conta."</p>
      </div>
    </div>
  );
};

export default AreaDoAluno;