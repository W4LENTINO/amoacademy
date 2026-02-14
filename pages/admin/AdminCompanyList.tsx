
import React from 'react';

const AdminCompanyList: React.FC = () => {
  const companies = [
    { name: 'Mecofarma', type: 'Rede de Farmácias Especializadas', students: 142, icon: '🏥', status: 'Protocolo Activo' },
    { name: 'Angofarma', type: 'Distribuição Logística', students: 85, icon: '📦', status: 'Protocolo Activo' },
    { name: 'Ministério da Saúde', type: 'Governo da República de Angola', students: 502, icon: '🏛️', status: 'Convénio Estratégico' }
  ];

  return (
    <div className="space-y-12 animate-reveal">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-prestige font-black text-slate-900 tracking-tighter uppercase leading-none">Parcerias Institucionais</h2>
          <p className="text-[#d91e18] font-bold mt-3 uppercase tracking-[0.4em] text-[10px]">Gestão de Protocolos Corporativos & Convénios</p>
        </div>
        <button className="bg-[#064e3b] text-white px-10 py-5 rounded-sm font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition">
          + Iniciar Novo Protocolo Corporativo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {companies.map((c, i) => (
          <div key={i} className="bg-white p-16 rounded-sm border border-slate-50 shadow-sm hover:shadow-premium transition-all group relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#064e3b] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-24 h-24 bg-slate-50 rounded-sm flex items-center justify-center text-5xl mb-12 group-hover:bg-[#064e3b]/5 transition-colors border border-slate-50">{c.icon}</div>
            <h3 className="text-2xl font-prestige font-black text-slate-800 uppercase tracking-tight leading-tight">{c.name}</h3>
            <p className="text-[10px] font-black text-[#d91e18] uppercase tracking-[0.3em] mb-12 mt-4 opacity-70 italic">{c.type}</p>
            
            <div className="space-y-6 pt-10 border-t border-slate-50">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Formandos Alocados</span>
                <span className="text-4xl font-prestige font-black text-slate-900 tracking-tighter">{c.students}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Estado do Convénio</span>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{c.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 p-20 rounded-sm border border-slate-100 text-center">
         <h4 className="text-xl font-prestige font-bold text-slate-900 uppercase mb-4 tracking-tight">Benefícios de Protocolo</h4>
         <p className="text-slate-500 text-sm font-light italic leading-relaxed max-w-2xl mx-auto mb-10">
           Empresas em regime de convénio possuem acesso prioritário a vagas de especialização e descontos institucionais para formação contínua dos seus quadros técnicos.
         </p>
         <button className="text-[10px] font-black text-[#064e3b] border-b-2 border-[#064e3b]/20 hover:border-[#064e3b] pb-2 transition-all uppercase tracking-[0.4em]">Solicitar Relatório de Impacto Formativo &rarr;</button>
      </div>
    </div>
  );
};

export default AdminCompanyList;
