import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Certificate } from '../types';

const ValidateCertificate: React.FC = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Certificate | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!code) return;
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    // Simulação de protocolo de segurança
    setTimeout(() => {
      if (code.toUpperCase().includes('AMF')) {
        setResult({
          id: '1',
          userId: 'u1',
          userName: 'Dr(a). Candidato Académico',
          courseId: '1',
          courseName: 'Especialização em Farmacovigilância Avançada',
          issueDate: '2025-02-15',
          verificationCode: code.toUpperCase(),
          hash: 'sha256-5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
          hours: 40,
          status: 'VALID'
        });
      } else {
        setError('A referência técnica inserida não consta no Arquivo Digital Central de Angola.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-24 px-6 lg:px-12">
      <Helmet>
        <title>Validar Credencial Digital | Academia AMOFARMA</title>
        <meta name="description" content="Verificação oficial de autenticidade para certificados emitidos pela AMOFARMA. Garanta a integridade das competências profissionais." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24 animate-reveal">
          <div className="inline-block bg-[#e84c5c]/10 text-[#e84c5c] px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-10 border border-[#e84c5c]/20">
            Protocolo de Integridade Digital AES-256
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#1a1a3a] mb-8 tracking-tighter uppercase leading-none">Validar <br/><span className="text-[#e84c5c]">Autenticidade</span></h1>
          <p className="text-slate-500 max-w-xl mx-auto font-medium italic opacity-70 leading-relaxed">
            Portal exclusivo para verificação de diplomas e credenciais profissionais emitidos pela rede central da Academia AMOFARMA em Angola.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Painel de Inserção */}
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-premium border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#1a1a3a] group-hover:bg-[#e84c5c] transition-colors"></div>
            <h2 className="text-2xl font-black text-[#1a1a3a] mb-12 uppercase tracking-tight">Inserir Chave de Acesso</h2>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3">Referência Alfanumérica (Ex: AMF-2025-XXX)</label>
                <input 
                  type="text" 
                  placeholder="AMF-XXXX-XXXX" 
                  className="w-full px-10 py-6 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#e84c5c] focus:bg-white outline-none transition-all font-black text-[#1a1a3a] text-xl placeholder:text-slate-200 uppercase tracking-widest"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-7 rounded-2xl font-black text-xs uppercase tracking-[0.6em] transition-all shadow-2xl shadow-[#1a1a3a]/10 disabled:opacity-50 transform active:scale-95"
              >
                {loading ? 'Consultando Arquivo...' : 'Verificar Certificado'}
              </button>
            </form>
          </div>

          {/* Painel de Resposta */}
          <div className="min-h-[450px] flex flex-col">
            {result && (
              <div className="bg-[#1a1a3a] rounded-[3rem] p-12 md:p-16 text-white shadow-premium animate-reveal relative overflow-hidden border border-white/5 flex-1">
                <div className="absolute top-0 right-0 w-72 h-72 bg-[#e84c5c] blur-[160px] opacity-15 -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-center mb-16">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] bg-[#10b981] px-6 py-3 rounded-xl border border-white/20">Credencial Válida 🏛️</span>
                    <span className="text-4xl grayscale opacity-30">🛡️</span>
                  </div>
                  <div className="space-y-12 flex-1">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-3">Titular Registado</p>
                      <p className="text-3xl font-black tracking-tighter uppercase leading-none">{result.userName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-3">Qualificação Técnica</p>
                      <p className="text-xl font-bold text-[#e84c5c] leading-tight uppercase tracking-tight italic">{result.courseName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/5">
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase font-black mb-1">Data Emissão</p>
                        <p className="text-sm font-bold uppercase">{new Date(result.issueDate).toLocaleDateString('pt-PT')}</p>
                      </div>
                      <div>
                        <p className="text-[9px] text-slate-500 uppercase font-black mb-1">Carga Horária</p>
                        <p className="text-sm font-bold uppercase">{result.hours}H Rigor Técnico</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-16 pt-8 border-t border-white/5">
                     <p className="text-[8px] font-mono break-all uppercase text-slate-500 tracking-widest leading-relaxed">ASSINATURA DIGITAL HASH: {result.hash}</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-white rounded-[3rem] p-16 text-center border border-red-50 shadow-premium animate-reveal flex-1 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-red-50 text-[#e84c5c] rounded-full flex items-center justify-center mb-10 text-4xl shadow-inner group">
                   <span className="animate-bounce">⚠️</span>
                </div>
                <h3 className="text-2xl font-black text-[#1a1a3a] mb-4 uppercase tracking-tight">Inconsistência Detetada</h3>
                <p className="text-slate-400 font-medium leading-relaxed italic max-w-xs mx-auto">{error}</p>
              </div>
            )}

            {!result && !error && (
              <div className="bg-white/40 backdrop-blur-sm rounded-[3rem] p-24 text-center border-4 border-dashed border-slate-100 flex flex-col items-center justify-center space-y-8 flex-1 grayscale opacity-40">
                <span className="text-7xl">🔎</span>
                <p className="text-slate-300 font-black uppercase text-[11px] tracking-[0.8em]">Aguardando Entrada de Credencial Oficial</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateCertificate;