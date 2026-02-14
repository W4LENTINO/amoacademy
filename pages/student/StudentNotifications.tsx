import React from 'react';
import { Helmet } from 'react-helmet';
import { useStudentData } from '../../hooks/useStudentData';
import { StudentSidebar } from '../../components/student/StudentSidebar';
import { StudentHeader } from '../../components/student/StudentHeader';

const StudentNotifications: React.FC = () => {
  const { notificacoes, refreshNotifications } = useStudentData();
  return (
    <>
      <Helmet><title>Notificações | Academia AMOFARMA</title></Helmet>
      <div className="min-h-screen bg-slate-50 flex">
        <StudentSidebar />
        <div className="flex-1">
          <StudentHeader title="Central de Mensagens" subtitle="Actualizações institucionais" />
          <main className="p-8 md:p-12 max-w-4xl mx-auto space-y-6">
             {notificacoes.map(n => (
               <div key={n.id} className={`bg-white p-8 rounded-[2.5rem] border border-slate-50 shadow-sm flex items-start space-x-6 relative transition-all hover:shadow-lg ${!n.lida ? 'border-l-4 border-l-[#e84c5c]' : ''}`}>
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl">🔔</div>
                  <div className="flex-1">
                     <h3 className="font-black text-[#1a1a3a] uppercase tracking-tight mb-2">{n.titulo}</h3>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">{n.mensagem}</p>
                     <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{new Date(n.created_at).toLocaleString()}</span>
                        {n.acao_link && <a href={n.acao_link} className="text-[10px] font-black text-[#e84c5c] uppercase tracking-widest hover:underline">{n.acao_texto} &rarr;</a>}
                     </div>
                  </div>
               </div>
             ))}
             {notificacoes.length === 0 && <div className="py-32 text-center text-slate-300 italic font-black uppercase text-[10px] tracking-[0.4em]">Nenhuma notificação por ler.</div>}
          </main>
        </div>
      </div>
    </>
  );
};
export default StudentNotifications;