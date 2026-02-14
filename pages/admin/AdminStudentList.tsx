
import React, { useState } from 'react';
import { User } from '../../types';

interface AdminStudentListProps {
  students: User[];
}

const AdminStudentList: React.FC<AdminStudentListProps> = ({ students }) => {
  const [search, setSearch] = useState('');

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.bi.includes(search) || 
    s.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 animate-reveal">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-prestige font-black text-slate-900 tracking-tighter uppercase leading-none">Corpo Discente</h2>
          <p className="text-[#d91e18] font-bold mt-3 uppercase tracking-[0.4em] text-[10px]">Controlo de Registos e Acessos Académicos</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-white border border-slate-200 text-slate-500 px-8 py-4 rounded-sm text-[10px] font-black tracking-widest hover:bg-slate-50 transition shadow-sm uppercase">Importar Base (CSV)</button>
          <button className="bg-[#064e3b] text-white px-10 py-5 rounded-sm font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition">Exportar Relatório</button>
        </div>
      </div>

      <div className="bg-white p-12 rounded-sm shadow-sm border border-slate-100">
        <div className="mb-12 relative">
          <input 
            type="text" 
            placeholder="Pesquisar por Nome Completo, BI ou Identidade Digital..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border-b-2 border-slate-50 px-12 py-5 rounded-sm focus:border-[#064e3b] outline-none transition font-bold text-sm"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-xl">🔍</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">Académico</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">Identificação Civil</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">Contacto Institucional</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">Estado</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-right">Acções</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-10">
                    <div className="flex items-center space-x-5">
                       <div className="w-12 h-12 bg-slate-100 rounded-sm flex items-center justify-center font-prestige font-black text-[#064e3b] text-sm group-hover:bg-[#064e3b] group-hover:text-white transition-colors uppercase">{s.name.charAt(0)}</div>
                       <div>
                         <p className="font-prestige font-bold text-slate-900 text-sm uppercase tracking-tight leading-none mb-1">{s.name}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aluno(a) de Especialização</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-10">
                    <span className="text-sm font-mono font-bold text-slate-500 uppercase tracking-tighter">{s.bi}</span>
                  </td>
                  <td className="px-8 py-10">
                    <p className="text-xs font-bold text-slate-700">{s.email}</p>
                    <p className="text-[9px] text-slate-400 font-medium uppercase mt-1 tracking-widest">Último Acesso: {s.lastAccess ? new Date(s.lastAccess).toLocaleDateString() : 'Sem registo'}</p>
                  </td>
                  <td className="px-8 py-10">
                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-sm uppercase tracking-widest border ${
                      s.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {s.status === 'active' ? 'Regularizado' : 'Suspenso'}
                    </span>
                  </td>
                  <td className="px-8 py-10 text-right">
                    <div className="flex justify-end space-x-6">
                      <button className="text-slate-300 hover:text-[#064e3b] transition-transform hover:scale-125" title="Ver Perfil">👁️</button>
                      <button className="text-slate-300 hover:text-blue-500 transition-transform hover:scale-125" title="Editar">✏️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminStudentList;
