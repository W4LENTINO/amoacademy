
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AdminCourseEditor: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = Boolean(id);

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-reveal pb-20">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/acesso-a7f9k2/cursos')} className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] hover:text-[#064e3b] transition-colors">&larr; Voltar ao Arquivo</button>
        <div className="text-right">
          <h2 className="text-3xl font-prestige font-black text-slate-800 uppercase tracking-tighter leading-none">{isEditing ? 'Configurar Programa' : 'Nova Especialização'}</h2>
          <p className="text-[10px] font-black text-[#d91e18] uppercase tracking-[0.4em] mt-2">Protocolo de Ensino Superior</p>
        </div>
      </div>

      <div className="bg-white p-12 md:p-20 rounded-sm shadow-sm border border-slate-100 relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-[#064e3b]"></div>
        <form className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4 md:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Título Académico do Programa</label>
              <input type="text" className="w-full bg-slate-50 border-b-2 border-slate-100 p-5 focus:border-[#064e3b] outline-none transition font-prestige font-black text-2xl uppercase tracking-tight" placeholder="Ex: GESTÃO DE DISPENSA HOSPITALAR" />
            </div>
            
            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoria Científica</label>
              <select className="w-full bg-slate-50 border-b-2 border-slate-100 p-5 focus:border-[#064e3b] outline-none transition font-bold text-xs uppercase tracking-widest">
                <option>Farmácia Clínica</option>
                <option>Gestão e Logística</option>
                <option>Legislação e Ética</option>
                <option>Saúde Pública</option>
              </select>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Investimento Institucional (AOA)</label>
              <input type="number" className="w-full bg-slate-50 border-b-2 border-slate-100 p-5 focus:border-[#064e3b] outline-none transition font-black" placeholder="25.000" />
            </div>

            <div className="space-y-4 md:col-span-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Resumo Estratégico (Short Description)</label>
              <textarea className="w-full bg-slate-50 border-2 border-slate-50 p-8 rounded-sm focus:border-[#064e3b] outline-none transition font-light italic h-32 resize-none leading-relaxed" placeholder="Síntese técnica para o catálogo público..." />
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Carga Horária (Certs)</label>
              <input type="number" className="w-full bg-slate-50 border-b-2 border-slate-100 p-5 focus:border-[#064e3b] outline-none transition font-black" placeholder="40" />
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest">Responsável Técnico (Instrutor)</label>
              <input type="text" className="w-full bg-slate-50 border-b-2 border-slate-100 p-5 focus:border-[#064e3b] outline-none transition font-black" placeholder="Dr. Nome Exemplo" />
            </div>
          </div>

          <div className="pt-12 border-t border-slate-50 flex gap-8">
            <button type="button" onClick={() => navigate('/acesso-a7f9k2/cursos')} className="flex-1 bg-white border border-slate-200 text-slate-400 py-6 rounded-sm font-black text-[10px] uppercase tracking-[0.4em] hover:bg-slate-50 transition-all">Descartar Alterações</button>
            <button type="submit" className="flex-[2] bg-[#064e3b] text-white py-6 rounded-sm font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl hover:bg-black transition-all">Publicar no Arquivo Central</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCourseEditor;
