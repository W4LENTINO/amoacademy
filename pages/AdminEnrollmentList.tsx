
import React from 'react';
import { Enrollment } from '../types';

interface AdminEnrollmentListProps {
  enrollments: Enrollment[];
}

const AdminEnrollmentList: React.FC<AdminEnrollmentListProps> = ({ enrollments }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-gray-800 uppercase tracking-tight">Fluxo de Inscrições</h2>
          <p className="text-gray-400 font-medium">Validação de Candidaturas e Pagamentos</p>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Candidato</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Curso Pretendido</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Data</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Estado</th>
                <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {enrollments.map(e => (
                <tr key={e.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-6">
                    <p className="font-black text-gray-800 text-sm uppercase">{e.studentName}</p>
                    <p className="text-[10px] text-gray-400 font-bold">{e.studentEmail}</p>
                  </td>
                  <td className="px-6 py-6 text-xs font-bold text-emerald-600 uppercase">{e.courseName}</td>
                  <td className="px-6 py-6 text-xs font-bold text-gray-400 uppercase">{e.date}</td>
                  <td className="px-6 py-6">
                    <span className={`text-[9px] font-black px-3 py-1 rounded-full uppercase ${
                      e.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <div className="flex justify-end space-x-2">
                       <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">✅</button>
                       <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">❌</button>
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

export default AdminEnrollmentList;
