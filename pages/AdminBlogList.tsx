
import React, { useState } from 'react';
import { BlogPost } from '../types';

interface AdminBlogListProps {
  posts: BlogPost[];
}

const AdminBlogList: React.FC<AdminBlogListProps> = ({ posts }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Artigos do Blog</h2>
          <p className="text-gray-400 font-medium">Gestão de Conteúdo e Insights</p>
        </div>
        <button className="bg-[#10b981] text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest shadow-xl shadow-[#10b981]/20 hover:bg-[#059669] transition uppercase">
          + Novo Artigo
        </button>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Capa</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Título / Categoria</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Publicação</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {posts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6">
                    <img src={p.image} className="w-20 h-12 object-cover rounded-xl shadow-sm" alt={p.title} />
                  </td>
                  <td className="px-6 py-6">
                    <p className="font-black text-gray-800 text-sm uppercase leading-tight line-clamp-1">{p.title}</p>
                    <p className="text-[10px] text-[#10b981] font-black uppercase mt-1 tracking-widest">{p.category}</p>
                  </td>
                  <td className="px-6 py-6 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                    {p.date}
                  </td>
                  <td className="px-6 py-6">
                    <span className="text-[9px] font-black px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full uppercase">
                      Publicado
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-500 transition">✏️</button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition">🗑️</button>
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

export default AdminBlogList;
