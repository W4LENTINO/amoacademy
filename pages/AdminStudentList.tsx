
import React, { useState } from 'react';
import { User } from '../types';

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
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Base de Alunos</h2>
          <p className="text-gray-400 font-medium">Controlo de Registos e Acessos</p>
        </div>
        <div className="flex space-x-3">
           <button className="bg-white border-2 border-gray-100 text-gray-500 px-6 py-4 rounded-2xl font-black text-[10px] tracking-widest hover:bg-gray-50 transition uppercase">Importar CSV</button>
           <button className="bg-[#10b981] text-white px-8 py-4 rounded-2xl font-black text-[10px] tracking-widest shadow-xl shadow-[#10b981]/20 hover:bg-[#059669] transition uppercase">Exportar Lista</button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="mb-8 relative">
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="Pesquisar por Nome, BI ou Email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-gray-50 border-2 border-gray-50 px-14 py-4 rounded-2xl focus:ring-4 focus:ring-[#10b981]/10 focus:border-[#10b981] outline-none transition font-bold text-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Aluno</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Bilhete Identidade</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Contacto</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Registo</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(s => (
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center space-x-4">
                       <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-black text-xs uppercase">{s.name.charAt(0)}</div>
                       <div>
                         <p className="font-black text-gray-800 text-sm uppercase leading-none">{s.name}</p>
                         <p className="text-[10px] text-[#10b981] font-bold uppercase mt-1">Nível: {s.role}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-sm font-mono font-bold text-gray-500 uppercase">{s.bi}</td>
                  <td className="px-6 py-6">
                    <p className="text-xs font-bold text-gray-700">{s.email}</p>
                    <p className="text-[10px] text-gray-400">{s.phone || 'Sem Telefone'}</p>
                  </td>
                  <td className="px-6 py-6 text-xs font-bold text-gray-400">
                    {s.lastAccess ? new Date(s.lastAccess).toLocaleDateString('pt-PT') : 'Nunca'}
                  </td>
                  <td className="px-6 py-6">
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${
                      s.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {s.status === 'active' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-[#10b981] transition" title="Ver Perfil">👁️</button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition" title="Editar">✏️</button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition" title="Reset Senha">🔑</button>
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
