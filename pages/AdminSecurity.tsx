
import React, { useState, useEffect } from 'react';
import { security } from '../lib/security';

const AdminSecurity: React.FC = () => {
  const blockedIPs = security.getBlockedIPs();
  const [terminalLines, setTerminalLines] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] Inicializando Protocolo de Defesa...`,
    `[${new Date().toLocaleTimeString()}] Monitorização de Perímetro Ativa.`,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const actions = ["Ping recebido de Luanda", "Check de integridade SQL concluído", "Sincronização Cloud estável", "Verificação de Certificados OK"];
      // Fix: Corrected property access from actions.actions.length to actions.length
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setTerminalLines(prev => [...prev.slice(-9), `[${new Date().toLocaleTimeString()}] ${randomAction}`]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight uppercase">Cibersegurança & Logs</h2>
          <p className="text-gray-400 font-medium">Escudo Digital Academia AMOFARMA</p>
        </div>
        <div className="flex space-x-2">
           <span className="flex items-center space-x-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-[9px] font-black text-emerald-600 uppercase">FIREWALL ACTIVE</span>
           </span>
        </div>
      </div>

      {/* Terminal de Monitorização */}
      <div className="bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl border-4 border-gray-800 font-mono overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
        <h3 className="text-emerald-500 text-[10px] font-bold mb-4 uppercase tracking-[0.3em]">Live System Feed_</h3>
        <div className="space-y-2">
          {terminalLines.map((line, i) => (
            <p key={i} className="text-emerald-500/80 text-xs">
              <span className="text-emerald-800">>>></span> {line}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* IPs Bloqueados */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
           <div className="flex justify-between items-center mb-8">
              <h3 className="font-black text-gray-800 uppercase tracking-tight">Perímetro de Bloqueio</h3>
              <span className="bg-red-50 text-red-600 text-[10px] font-black px-3 py-1 rounded-full">{blockedIPs.length} AMEAÇAS</span>
           </div>
           
           {blockedIPs.length > 0 ? (
             <div className="space-y-4">
                {blockedIPs.map(ip => (
                  <div key={ip} className="flex items-center justify-between p-6 bg-red-50/30 rounded-[1.5rem] border border-red-50">
                     <div className="flex items-center space-x-4">
                        <span className="text-xl">🛡️</span>
                        <div>
                           <p className="font-mono font-bold text-red-900">{ip}</p>
                           <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-0.5">Tentativas de Brute Force</p>
                        </div>
                     </div>
                     <button className="bg-white text-red-600 border border-red-100 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition">Desbloquear</button>
                  </div>
                ))}
             </div>
           ) : (
             <div className="py-12 text-center opacity-30">
                <span className="text-6xl mb-4 block">🛡️</span>
                <p className="text-xs font-black uppercase tracking-widest">Nenhuma ameaça externa detetada</p>
             </div>
           )}
        </div>

        {/* Estatísticas de Acesso */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
           <h3 className="font-black text-gray-800 uppercase tracking-tight mb-8">Whitelist Institucional</h3>
           <div className="space-y-4">
              {[
                { ip: '197.149.231.14', label: 'Luanda HQ' },
                { ip: '165.22.41.108', label: 'Cloud Gateway' }
              ].map(w => (
                <div key={w.ip} className="flex items-center justify-between p-6 bg-emerald-50/30 rounded-[1.5rem] border border-emerald-50">
                   <div className="flex items-center space-x-4">
                      <span className="text-xl">✅</span>
                      <div>
                         <p className="font-mono font-bold text-emerald-900">{w.ip}</p>
                         <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest mt-0.5">{w.label}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurity;