
import React from 'react';
import { Enrollment } from '../../types';

interface AdminEnrollmentListProps {
  enrollments: Enrollment[];
}

const AdminEnrollmentList: React.FC<AdminEnrollmentListProps> = ({ enrollments }) => {
  return (
    <div className="space-y-12 animate-reveal">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-prestige font-black text-slate-900 tracking-tighter uppercase leading-none">Fluxo de Admissões</h2>
          <p className="text-[#d91e18] font-bold mt-3 uppercase tracking-[0.4em] text-[10px]">Análise Curricular & Validação de Candidaturas</p>
        </div>
      </div>

      <div className="bg-white p-12 rounded-sm shadow-sm border border-slate-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest">Candidato Institucional</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">Programa Pretendido</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">Data Candidatura</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-center">Estado do Processo</th>
                <th className="px-8 py-8 text-[10px] font-black text-slate-300 uppercase tracking-widest text-right">Decisão Final</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {enrollments.length > 0 ? enrollments.map(e => (
                <tr key={e.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-10">
                    <div className="flex items-center space-x-5">
                       <div className="w-12 h-12 bg-slate-50 rounded-sm flex items-center justify-center font-prestige font-black text-[#064e3b] text-xs uppercase tracking-tighter border border-slate-100">{e.studentName.charAt(0)}</div>
                       <div>
                         <p className="font-prestige font-bold text-slate-900 text-sm uppercase tracking-tight leading-none mb-1">{e.studentName}</p>
                         <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest italic">{e.studentEmail}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-10 text-center">
                    <span className="text-[10px] font-black text-[#064e3b] uppercase tracking-widest bg-[#064e3b]/5 px-5 py-2.5 rounded-sm border border-[#064e3b]/10">{e.courseName}</span>
                  </td>
                  <td className="px-8 py-10 text-center text-[10px] font-black text-slate-300 uppercase tracking-widest italic">
                    {new Date(e.date).toLocaleDateString('pt-PT')}
                  </td>
                  <td className="px-8 py-10 text-center">
                    <span className={`text-[9px] font-black px-4 py-2 rounded-sm uppercase tracking-[0.2em] border shadow-sm ${
                      e.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      {e.status === 'confirmed' ? 'Validado 🏛️' : 'Pendente ⏳'}
                    </span>
                  </td>
                  <td className="px-8 py-10 text-right">
                    <div className="flex justify-end space-x-6">
                      <button className="text-emerald-500 hover:scale-125 transition-all p-2 bg-emerald-50/50 rounded-sm" title="Confirmar Admissão">✅</button>
                      <button className="text-red-500 hover:scale-125 transition-all p-2 bg-red-50/50 rounded-sm" title="Declinar Candidatura">❌</button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="py-24 text-center italic text-slate-200 font-prestige text-2xl tracking-tight">"Nenhuma candidatura activa no fluxo actual do arquivo central."</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEnrollmentList;
