import React, { useState } from 'react';
import { Certificate } from '../types.ts';
import { FiSearch, FiShield, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import SEO from '../components/SEO.tsx';

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
        setError('A referência técnica inserida não consta no Arquivo Digital.');
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen py-24 px-6 lg:px-12">
      <SEO title="Validar Credencial Digital" description="Verifique a autenticidade de certificados e diplomas emitidos pela Academia AMOFARMA." />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-24 animate-reveal">
          <div className="inline-block bg-[#e84c5c]/10 text-[#e84c5c] px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-10 border border-[#e84c5c]/20">
            Protocolo de Integridade Digital
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-[#1a1a3a] mb-8 tracking-tighter uppercase leading-none">Validar <br/><span className="text-[#e84c5c]">Autenticidade</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-premium border border-slate-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-2 bg-[#1a1a3a] group-hover:bg-[#e84c5c] transition-colors"></div>
            <h2 className="text-2xl font-black text-[#1a1a3a] mb-12 uppercase tracking-tight">Inserir Chave</h2>
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="AMF-XXXX-XXXX" 
                  className="w-full px-10 py-6 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#e84c5c] outline-none transition-all font-black text-[#1a1a3a] text-xl placeholder:text-slate-200 uppercase"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-7 rounded-2xl font-black text-xs uppercase tracking-[0.6em] transition-all flex items-center justify-center gap-3"
              >
                {loading ? 'Consultando...' : <><FiSearch /> Verificar Certificado</>}
              </button>
            </form>
          </div>

          <div className="min-h-[450px]">
            {result && (
              <div className="bg-[#1a1a3a] rounded-[3rem] p-12 md:p-16 text-white shadow-premium animate-reveal relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-16">
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] bg-[#10b981] px-6 py-3 rounded-xl flex items-center gap-2"><FiCheckCircle /> Credencial Válida</span>
                    <FiShield size={32} className="opacity-30" />
                  </div>
                  <div className="space-y-12">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-3">Titular Registado</p>
                      <p className="text-3xl font-black tracking-tighter uppercase">{result.userName}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] mb-3">Qualificação Técnica</p>
                      <p className="text-xl font-bold text-[#e84c5c] italic">{result.courseName}</p>
                    </div>
                  </div>
                  <div className="mt-16 pt-8 border-t border-white/5">
                     <p className="text-[8px] font-mono break-all text-slate-500">HASH: {result.hash}</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-white rounded-[3rem] p-16 text-center border border-red-50 shadow-premium animate-reveal flex flex-col items-center">
                <FiAlertTriangle size={64} className="text-[#e84c5c] mb-8" />
                <h3 className="text-2xl font-black text-[#1a1a3a] mb-4 uppercase">Inconsistência</h3>
                <p className="text-slate-400 italic">{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateCertificate;