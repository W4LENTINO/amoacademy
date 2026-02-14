
import React from 'react';

const AdminCertificateManager: React.FC = () => {
  const stats = [
    { label: 'Certificados Emitidos', val: 4502, color: 'text-emerald-600', icon: '🏛️' },
    { label: 'Verificações QR Activas', val: 12403, color: 'text-blue-600', icon: '🔍' },
    { label: 'Revogados por Inconformidade', val: 3, color: 'text-red-600', icon: '🚫' }
  ];

  return (
    <div className="space-y-12 animate-reveal">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-prestige font-black text-slate-900 tracking-tighter uppercase leading-none">Central de Credenciais</h2>
          <p className="text-[#d91e18] font-bold mt-3 uppercase tracking-[0.4em] text-[10px]">Emissão Digital • Protocolo Hash AES-256</p>
        </div>
        <button className="bg-[#064e3b] text-white px-10 py-5 rounded-sm font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition transform active:scale-95">
          Emitir Credenciais em Lote (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-16 rounded-sm border border-slate-50 shadow-sm text-center group hover:shadow-premium transition-all">
            <span className="text-5xl mb-8 block opacity-40 group-hover:scale-110 group-hover:opacity-100 transition-all">{s.icon}</span>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">{s.label}</p>
            <p className={`text-5xl font-prestige font-black ${s.color} leading-none tracking-tighter`}>{s.val.toLocaleString()}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-24 rounded-sm border-2 border-dashed border-slate-100 text-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative z-10">
          <span className="text-8xl mb-12 block opacity-10 group-hover:opacity-30 transition-all grayscale">📂</span>
          <h3 className="text-2xl font-prestige font-bold text-slate-900 uppercase tracking-tight mb-4">Arquivo Histórico de Qualificações</h3>
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.6em] leading-relaxed max-w-xl mx-auto italic">
            Sincronizando Protocolos Criptográficos com a Base de Dados Central da ARMED...
          </p>
        </div>
      </div>

      <div className="bg-slate-900 p-16 rounded-sm shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#d91e18] blur-[150px] opacity-10"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
             <h3 className="text-white font-prestige font-black text-2xl uppercase tracking-tight mb-4 leading-tight">Segurança de Dados & Integridade</h3>
             <p className="text-slate-400 text-sm font-light italic leading-relaxed">Cada certificado emitido pela Academia AMOFARMA possui uma assinatura digital única baseada no Bilhete de Identidade do aluno e na Hash do curso, garantindo imutabilidade eterna.</p>
          </div>
          <button className="border border-white/20 hover:bg-white hover:text-slate-900 text-white px-12 py-6 rounded-sm font-black text-[10px] uppercase tracking-[0.4em] transition-all">Auditar Base de Dados</button>
        </div>
      </div>
    </div>
  );
};

export default AdminCertificateManager;
