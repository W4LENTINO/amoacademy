
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../../types';

interface AdminCourseListProps {
  courses: Course[];
}

const AdminCourseList: React.FC<AdminCourseListProps> = ({ courses }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (statusFilter === 'all' || c.status === statusFilter)
  );

  return (
    <div className="space-y-12 animate-reveal">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-prestige font-black text-slate-900 tracking-tighter uppercase leading-none">Arquivo de Programas</h2>
          <p className="text-[#d91e18] font-bold mt-3 uppercase tracking-[0.4em] text-[10px]">Gestão Académica de Formações</p>
        </div>
        <Link to="/acesso-a7f9k2/cursos/novo" className="bg-[#064e3b] text-white px-10 py-5 rounded-sm font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition-all transform active:scale-95">
          + Criar Novo Programa Especializado
        </Link>
      </div>

      <div className="bg-white p-12 rounded-sm shadow-sm border border-slate-100">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="Pesquisar por título ou identificador técnico..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border-b-2 border-slate-50 px-12 py-5 rounded-sm focus:border-[#064e3b] outline-none transition font-bold text-sm"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30 text-xl">🔍</span>
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-100 px-10 py-5 rounded-sm font-black text-[10px] uppercase tracking-widest text-slate-400 outline-none focus:border-[#064e3b]"
          >
            <option value="all">Filtrar por Status</option>
            <option value="active">Activos no Mercado</option>
            <option value="inactive">Suspensos / Arquivo</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">Identificador</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">Título do Programa</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">Início</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">Investimento</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">Estado</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCourses.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-10">
                    <img src={c.image} className="w-24 h-14 object-cover rounded-sm shadow-sm grayscale group-hover:grayscale-0 transition-all" alt={c.title} />
                  </td>
                  <td className="px-8 py-10">
                    <p className="font-prestige font-bold text-slate-900 text-sm uppercase tracking-tight">{c.title}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-2 tracking-tighter italic">REF-AMF-{c.id.padStart(3, '0')}</p>
                  </td>
                  <td className="px-8 py-10 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    {new Date(c.startDate).toLocaleDateString('pt-PT')}
                  </td>
                  <td className="px-8 py-10 text-center">
                    <span className="font-black text-slate-800 text-sm">{c.price.toLocaleString()} AOA</span>
                  </td>
                  <td className="px-8 py-10 text-center">
                    <span className={`text-[9px] font-black px-3 py-1.5 rounded-sm uppercase tracking-widest border ${
                      c.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'
                    }`}>
                      {c.status === 'active' ? 'Activo' : 'Arquivo'}
                    </span>
                  </td>
                  <td className="px-8 py-10 text-right">
                    <div className="flex justify-end space-x-6">
                      <Link to={`/acesso-a7f9k2/cursos/editar/${c.id}`} className="text-slate-300 hover:text-[#064e3b] transition-transform hover:scale-125">✏️</Link>
                      <button className="text-slate-300 hover:text-red-500 transition-transform hover:scale-125">🗑️</button>
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

export default AdminCourseList;
