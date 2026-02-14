import React from 'react';
import { useStudentData } from '../../hooks/useStudentData.ts';
import { StudentSidebar } from '../../components/student/StudentSidebar.tsx';
import { StudentHeader } from '../../components/student/StudentHeader.tsx';
import { PaymentCard } from '../../components/student/PaymentCard.tsx';
import SEO from '../../components/SEO.tsx';

const StudentPayments: React.FC = () => {
  const { pagamentos, estatisticas, loading } = useStudentData();
  return (
    <>
      <SEO title="Histórico de Pagamentos" />
      <div className="min-h-screen bg-slate-50 flex">
        <StudentSidebar />
        <div className="flex-1">
          <StudentHeader title="Histórico Financeiro" subtitle="Controlo de investimentos e propinas" />
          <main className="p-8 md:p-12 space-y-12">
            <div className="bg-[#1a1a3a] text-white p-12 rounded-[3rem] shadow-xl flex justify-between items-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#e84c5c] blur-[120px] opacity-10"></div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-2">Total Investido na Carreira</p>
                  <p className="text-5xl font-black tracking-tighter">{estatisticas.totalPago.toLocaleString()} <span className="text-lg font-bold">AOA</span></p>
               </div>
               <span className="text-6xl opacity-20">🏦</span>
            </div>
            <div className="bg-white rounded-[3rem] shadow-sm border border-slate-50 overflow-hidden">
              <div className="p-8 border-b border-slate-50 bg-slate-50/50">
                 <h3 className="text-xs font-black text-[#1a1a3a] uppercase tracking-widest">Lista de Transações</h3>
              </div>
              {loading ? (
                <div className="py-24 flex justify-center"><div className="w-10 h-10 border-2 border-[#1a1a3a] border-t-transparent rounded-full animate-spin"></div></div>
              ) : (
                <div className="divide-y divide-slate-50">
                  {pagamentos.map(p => <PaymentCard key={p.id} payment={p} />)}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default StudentPayments;