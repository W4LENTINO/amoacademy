import React from 'react';
import { Helmet } from 'react-helmet';
import { StudentSidebar } from '../../components/student/StudentSidebar';
import { StudentHeader } from '../../components/student/StudentHeader';

const StudentSettings: React.FC = () => {
  return (
    <>
      <Helmet><title>Ajustes de Conta | Academia AMOFARMA</title></Helmet>
      <div className="min-h-screen bg-slate-50 flex">
        <StudentSidebar />
        <div className="flex-1">
          <StudentHeader title="Ajustes Mestres" subtitle="Controlo de segurança e preferências" />
          <main className="p-8 md:p-12 max-w-4xl mx-auto space-y-12">
             <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
                <h3 className="font-black text-[#1a1a3a] uppercase tracking-tight text-lg mb-10 border-b border-slate-50 pb-6">Segurança Bi-Fatorial</h3>
                <div className="flex items-center justify-between">
                   <div className="flex-1 pr-12">
                      <p className="text-sm text-slate-500 font-medium leading-relaxed italic">"O protocolo 2FA adiciona uma camada adicional de protecção às suas credenciais académicas e certificados digitais."</p>
                   </div>
                   <button className="bg-[#1a1a3a] text-white px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#e84c5c] transition-all shadow-xl">Activar 2FA</button>
                </div>
             </div>
             <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100">
                <h3 className="font-black text-[#1a1a3a] uppercase tracking-tight text-lg mb-10 border-b border-slate-50 pb-6">Privacidade & Cookies</h3>
                <p className="text-sm text-slate-500 font-medium mb-10">Gerencie como os seus dados são processados e armazenados na nossa plataforma.</p>
                <button className="text-[10px] font-black text-[#e84c5c] border-b-2 border-[#e84c5c]/20 hover:border-[#e84c5c] pb-2 transition-all uppercase tracking-widest">Rever Consentimentos de Cookies</button>
             </div>
          </main>
        </div>
      </div>
    </>
  );
};
export default StudentSettings;