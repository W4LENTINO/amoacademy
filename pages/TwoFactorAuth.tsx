import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TwoFactorAuth: React.FC = () => {
  const [step, setStep] = useState<'setup' | 'verify' | 'codes'>('setup');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSetup = () => {
    setLoading(true);
    setTimeout(() => {
      setStep('verify');
      setLoading(false);
    }, 1200);
  };

  const handleVerify = () => {
    if (code.length !== 6) return;
    setLoading(true);
    setTimeout(() => {
      setStep('codes');
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#1a1a3a] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorativo */}
      <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#e84c5c] rounded-full blur-[200px] opacity-10 -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      
      <div className="w-full max-w-xl bg-white rounded-[4rem] shadow-premium p-12 md:p-20 relative z-10 animate-reveal">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-[#1a1a3a] rounded-[1.5rem] flex items-center justify-center mx-auto mb-10 shadow-2xl relative group">
            <div className="absolute inset-0 bg-[#e84c5c] rounded-[1.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
            <svg className="w-10 h-10 text-[#e84c5c] relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-black text-[#1a1a3a] tracking-tighter uppercase mb-3">Segurança Bi-Fatorial</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Protocolo 2FA Ativo</p>
        </div>

        {step === 'setup' && (
          <div className="space-y-12">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-inner">
              <h2 className="text-xs font-black text-[#1a1a3a] uppercase tracking-widest mb-8 border-b border-slate-200 pb-4">Activação de Camada</h2>
              <ul className="space-y-6">
                {[
                  { id: '1', text: 'Instale o Google ou Microsoft Authenticator' },
                  { id: '2', text: 'Digitalize o QR Code institucional' },
                  { id: '3', text: 'Valide o acesso com o código dinâmico' }
                ].map((item) => (
                  <li key={item.id} className="flex items-center space-x-5 group">
                    <span className="w-8 h-8 bg-white text-[#e84c5c] flex items-center justify-center rounded-xl text-xs font-black shadow-sm group-hover:bg-[#e84c5c] group-hover:text-white transition-all">{item.id}</span>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button 
              onClick={handleSetup} 
              disabled={loading}
              className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-8 rounded-2xl font-black text-xs uppercase tracking-[0.5em] shadow-2xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'A PROCESSAR...' : 'INICIAR CONFIGURAÇÃO'}
            </button>
            <button onClick={() => navigate('/area-do-aluno')} className="w-full text-slate-300 text-[10px] font-black uppercase tracking-widest hover:text-[#e84c5c] transition-colors">Configurar noutro momento</button>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-12">
            <div className="bg-slate-50 p-12 rounded-[3rem] text-center border border-slate-100 shadow-inner group">
              <div className="w-48 h-48 bg-white border-8 border-slate-100 mx-auto mb-8 flex items-center justify-center rounded-3xl shadow-xl group-hover:border-[#e84c5c]/20 transition-all overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=AMOFARMA-2FA-TOKEN')] bg-center bg-no-repeat bg-contain opacity-80 p-6"></div>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">Digitalize para gerar sua chave</p>
            </div>
            <div className="space-y-4">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Código Gerado</label>
               <input 
                type="text" 
                maxLength={6} 
                value={code} 
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} 
                className="w-full bg-slate-50 border border-slate-100 px-8 py-6 rounded-3xl text-center text-5xl font-black tracking-[0.5em] outline-none focus:border-[#e84c5c] focus:bg-white transition-all shadow-inner text-[#1a1a3a]" 
                placeholder="000000" 
              />
            </div>
            <button 
              onClick={handleVerify} 
              disabled={loading || code.length !== 6} 
              className="w-full bg-[#1a1a3a] hover:bg-emerald-500 text-white py-8 rounded-2xl font-black text-xs uppercase tracking-[0.5em] shadow-2xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {loading ? 'A VALIDAR...' : 'VERIFICAR CHAVE'}
            </button>
          </div>
        )}

        {step === 'codes' && (
          <div className="space-y-12">
            <div className="bg-amber-50 border border-amber-100 p-10 rounded-[3rem] shadow-sm">
              <div className="flex items-center space-x-4 mb-8">
                <span className="text-2xl">⚠️</span>
                <h2 className="text-xs font-black text-amber-800 uppercase tracking-tighter">Códigos de Resgate Crítico</h2>
              </div>
              <div className="bg-white p-8 rounded-2xl font-mono text-sm grid grid-cols-2 gap-4 text-center shadow-inner text-amber-900 font-bold border border-amber-50">
                <span className="p-2 border border-slate-100 rounded-lg">AMF-X92A</span> 
                <span className="p-2 border border-slate-100 rounded-lg">AMF-K02P</span>
                <span className="p-2 border border-slate-100 rounded-lg">AMF-L11Z</span> 
                <span className="p-2 border border-slate-100 rounded-lg">AMF-M44Q</span>
              </div>
              <p className="text-[9px] text-amber-700/60 font-bold uppercase tracking-widest mt-8 text-center italic">Guarde estes códigos offline. Eles são a única forma de recuperar acesso caso perca o seu dispositivo.</p>
            </div>
            <button 
              onClick={() => navigate('/area-do-aluno')} 
              className="w-full bg-[#1a1a3a] hover:bg-black text-white py-8 rounded-2xl font-black text-xs uppercase tracking-[0.5em] shadow-2xl transition-all"
            >
              CONCLUIR PROTOCOLO
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TwoFactorAuth;