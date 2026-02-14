import React, { useState, useEffect } from 'react';
import { security } from '../../lib/security';

const AdminSecurity: React.FC = () => {
  const blockedIPs = security.getBlockedIPs();
  const [terminalLines, setTerminalLines] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] Inicializando Protocolo de Defesa Institucional...`,
    `[${new Date().toLocaleTimeString()}] Monitorização de Perímetro Luanda Core: Activa.`,
    `[${new Date().toLocaleTimeString()}] Encriptação AES-256 Verificada para Certificados.`,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const logs = [
        "Ping de integridade recebido do Cloud Gateway Central",
        "Backup incremental concluído no arquivo secundário",
        "Check de integridade SQL: OK (0 anomalias)",
        "Tráfego externo monitorizado: Padrão Normal",
        "Sincronização ARMED: Estável (Latência 12ms)",
        "Varredura de vulnerabilidades: Nenhuma falha encontrada",
        "Firewall: 0 tentativas bloqueadas nos últimos 60s"
      ];
      const rand = logs[Math.floor(Math.random() * logs.length)];
      setTerminalLines(prev => [...prev.slice(-12), `[${new Date().toLocaleTimeString()}] ${rand}`]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-12 animate-reveal">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h2 className="text-4xl font-black text-[#1a1a3a] tracking-tighter uppercase leading-none">Cibersegurança</h2>
          <p className="text-[#e84c5c] font-black mt-3 uppercase tracking-[0.4em] text-[10px]">Defesa Perimétrica & Integridade de Dados</p>
        </div>
        <div className="flex items-center space-x-4">
           <span className="bg-emerald-50 text-emerald-600 px-8 py-3 rounded-xl border border-emerald-100 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse flex items-center shadow-lg shadow-emerald-100/50">
             <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-3"></span>
             Firewall Activa • Rede Segura
           </span>
        </div>
      </div>

      {/* Terminal Hacker-Style */}
      <div className="bg-slate-900 rounded-[3rem] p-12 shadow-premium border-t-8 border-[#1a1a3a] font-mono relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="flex justify-between items-center mb-10 opacity-40">
          <h3 className="text-emerald-500 text-[11px] font-bold uppercase tracking-[0.5em]">Live_Security_Feed.v3.1</h3>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500/50 rounded-full"></div>
            <div className="w-3 h-3 bg-amber-500/50 rounded-full"></div>
            <div className="w-3 h-3 bg-emerald-500/50 rounded-full"></div>
          </div>
        </div>
        <div className="space-y-3 min-h-[350px]">
          {terminalLines.map((line, i) => (
            <p key={i} className="text-emerald-500/80 text-[11px] md:text-xs leading-relaxed">
              <span className="text-emerald-900 mr-5">>>></span> {line}
            </p>
          ))}
          <p className="text-emerald-400 animate-pulse">_</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* IPs Bloqueados */}
        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
           <div className="flex justify-between items-center mb-10">
              <h3 className="font-black text-[#1a1a3a] uppercase tracking-tight text-xl">Bloqueios de Perímetro</h3>
              <span className="bg-red-50 text-red-600 text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest">{blockedIPs.length} AMEAÇAS ACTIVAS</span>
           </div>
           
           {blockedIPs.length > 0 ? (
             <div className="space-y-6">
                {blockedIPs.map(ip => (
                  <div key={ip} className="flex items-center justify-between p-8 bg-red-50/20 rounded-[2rem] border border-red-50 hover:bg-red-50 transition-all">
                     <div className="flex items-center space-x-6">
                        <span className="text-4xl grayscale opacity-30">🛡️</span>
                        <div>
                           <p className="font-mono font-black text-red-900 text-lg tracking-tighter">{ip}</p>
                           <p className="text-[10px] text-red-400 font-black uppercase tracking-[0.2em] mt-1 italic">Tentativa de Injeção SQL Detectada</p>
                        </div>
                     </div>
                     <button 
                        onClick={() => security.unblockIP(ip)} 
                        className="bg-white text-red-600 border border-red-100 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all shadow-sm"
                     >
                        Desbloquear
                     </button>
                  </div>
                ))}
             </div>
           ) : (
             <div className="py-24 text-center opacity-10 grayscale">
                <span className="text-8xl mb-10 block">🛡️</span>
                <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#1a1a3a]">Integridade Exterior Verificada</p>
             </div>
           )}
        </div>

        {/* Whitelist de Confiança */}
        <div className="bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm">
           <h3 className="font-black text-[#1a1a3a] uppercase tracking-tight text-xl mb-10">Zonas de Confiança (VPN)</h3>
           <div className="space-y-6">
              {[
                { ip: '197.149.231.14', label: 'Sede Luanda - Direção Técnica', icon: '🏛️' },
                { ip: '165.22.41.108', label: 'Cloud Gateway Central (ARMED)', icon: '📦' }
              ].map(w => (
                <div key={w.ip} className="flex items-center space-x-8 p-8 bg-emerald-50/20 rounded-[2rem] border border-emerald-50 hover:bg-emerald-50 transition-all cursor-default">
                   <span className="text-3xl opacity-40">{w.icon}</span>
                   <div>
                      <p className="font-mono font-black text-emerald-900 text-lg tracking-tighter">{w.ip}</p>
                      <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mt-1">{w.label}</p>
                   </div>
                </div>
              ))}
           </div>
           <div className="mt-12 p-8 bg-slate-50 border border-slate-100 rounded-2xl italic text-slate-400 text-sm leading-relaxed">
             "IPs incluídos na Whitelist possuem bypass dos protocolos de validação MFA para acessos via infraestrutura física da Academia."
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurity;