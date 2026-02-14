
import React, { useState } from 'react';
import { Course } from '../types';

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
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Gestão de Formações</h2>
          <p className="text-gray-400 font-medium">CRUD Completo de Cursos e Workshops</p>
        </div>
        <button className="bg-[#10b981] text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest shadow-xl shadow-[#10b981]/20 hover:bg-[#059669] transition uppercase transform active:scale-95">
          + Adicionar Novo Curso
        </button>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="flex-1 relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Pesquisar por nome do curso..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-50 px-14 py-4 rounded-2xl focus:ring-4 focus:ring-[#10b981]/10 focus:border-[#10b981] outline-none transition font-bold text-sm"
            />
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-gray-50 border-2 border-gray-50 px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-gray-500 outline-none focus:border-[#10b981]"
          >
            <option value="all">Todos os Estados</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Miniatura</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Título / ID</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Datas</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Preço (AOA)</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Instrutor</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredCourses.map(c => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6">
                    <img src={c.image} className="w-16 h-10 object-cover rounded-lg shadow-sm" alt={c.title} />
                  </td>
                  <td className="px-6 py-6">
                    <p className="font-black text-gray-800 text-sm uppercase leading-tight">{c.title}</p>
                    <p className="text-[10px] text-gray-400 font-mono mt-1">ID: AMF-C-{c.id.padStart(3, '0')}</p>
                  </td>
                  <td className="px-6 py-6 text-xs font-bold text-gray-500">
                    {new Date(c.startDate).toLocaleDateString('pt-PT')}
                  </td>
                  <td className="px-6 py-6">
                    <span className="font-black text-gray-700 text-sm">{c.price.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-6 text-xs font-bold text-gray-500">{c.instructor}</td>
                  <td className="px-6 py-6">
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${
                      c.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {c.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition" title="Editar">✏️</button>
                      <button className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition" title="Duplicar">📋</button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition" title="Eliminar">🗑️</button>
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
