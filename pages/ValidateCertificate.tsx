import React, { useState } from 'react';
import { FiSearch, FiShield, FiCheckCircle, FiAlertTriangle, FiLock, FiCalendar, FiUser, FiBookOpen } from 'react-icons/fi';
import SEO from '../components/SEO.tsx';
import { motion, AnimatePresence } from 'framer-motion';

interface CertificateResult {
  id: string;
  userName: string;
  courseName: string;
  issueDate: string;
  verificationCode: string;
  hash: string;
  hours: number;
  status: 'VALID' | 'INVALID';
}

const ValidateCertificate: React.FC = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CertificateResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);
    
    // Simulação de consulta ao Arquivo Central de Diplomas
    setTimeout(() => {
      const upperCode = code.toUpperCase();
      if (upperCode.includes('AMF') && upperCode.length >= 8) {
        setResult({
          id: 'AMF-2025-0891',
          userName: 'Dra. Maria Antónia Fernandes',
          courseName: 'Especialização em Farmacovigilância e Gestão de Risco',
          issueDate: '2025-01-20',
          verificationCode: upperCode,
          hash: '0x7e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
          hours: 40,
          status: 'VALID'
        });
      } else {
        setError('O identificador técnico não foi localizado nos nossos registos digitais.');
      }
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-32">
      <SEO 
        title="Validar Credencial Digital" 
        description="Verifique a autenticidade de diplomas e certificados emitidos pela Academia AMOFARMA em conformidade com as normas ARMED." 
      />

      {/* Hero Institucional */}
      <section className="bg-[#1a1a3a] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e84c5c] rounded-full blur-[150px] opacity-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-[#e84c5c] text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Protocolo de Integridade Digital</span>
            <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">Validação de <br/><span className="text-[#e84c5c]">Credenciais</span></h1>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto italic opacity-80">
              "Garantindo a veracidade do conhecimento". Utilize esta ferramenta para auditar a autenticidade de diplomas emitidos pela nossa instituição.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 lg:px-12 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Formulário de Busca */}
          <div className="lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-[3rem] p-10 md:p-14 shadow-premium border border-slate-100 sticky top-32"
            >
              <h2 className="text-2xl font-black text-[#1a1a3a] mb-10 uppercase tracking-tight flex items-center">
                <FiLock className="mr-4 text-[#e84c5c]" /> Consulta Pública
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Código de Verificação</label>
                  <input 
                    type="text" 
                    placeholder="AMF-XXXX-XXXX" 
                    className="w-full px-8 py-6 rounded-2xl bg-slate-50 border border-slate-100 focus:border-[#e84c5c] focus:bg-white outline-none transition-all font-black text-[#1a1a3a] text-xl placeholder:text-slate-200 uppercase tracking-widest"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading || !code.trim()}
                  className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-7 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 shadow-xl disabled:opacity-50"
                >
                  {loading ? 'A VERIFICAR...' : <><FiSearch size={18} /> Verificar Autenticidade</>}
                </button>
              </form>

              <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-100 italic text-slate-400 text-[10px] leading-relaxed">
                "Qualquer tentativa de fraude será registada e comunicada à Direção Técnica e à ARMED."
              </div>
            </motion.div>
          </div>

          {/* Resultado */}
          <div className="lg:col-span-7 min-h-[400px]">
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center bg-white rounded-[3rem] border border-slate-100 p-20"
                >
                  <div className="w-16 h-16 border-4 border-[#e84c5c]/20 border-t-[#e84c5c] rounded-full animate-spin mb-6"></div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Acedendo à Base de Dados Central...</p>
                </motion.div>
              )}

              {result && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[3rem] overflow-hidden shadow-premium border border-slate-100"
                >
                  <div className="bg-[#10b981] p-10 text-white flex items-center gap-6">
                    <FiCheckCircle size={40} />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Documento Auditado</p>
                      <h3 className="text-2xl font-black uppercase tracking-tight">Certificado Válido</h3>
                    </div>
                  </div>

                  <div className="p-12 space-y-10">
                    <div>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] mb-2">Titular Registado</p>
                      <p className="text-3xl font-black text-[#1a1a3a] uppercase tracking-tighter">{result.userName}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-[0.3em] mb-2">Qualificação Atribuída</p>
                      <p className="text-xl font-bold text-[#e84c5c] italic">{result.courseName}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                       <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Data de Emissão</p>
                          <p className="font-bold text-[#1a1a3a]">{result.issueDate}</p>
                       </div>
                       <div>
                          <p className="text-[8px] font-black text-slate-400 uppercase mb-1">Carga Horária</p>
                          <p className="font-bold text-[#1a1a3a]">{result.hours} Horas Académicas</p>
                       </div>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 font-mono text-[9px] text-slate-400 break-all">
                       HASH: {result.hash}
                    </div>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[3rem] p-16 text-center border-2 border-red-50"
                >
                  <FiAlertTriangle size={60} className="text-red-500 mx-auto mb-8" />
                  <h3 className="text-2xl font-black text-[#1a1a3a] mb-4 uppercase">Credencial Inválida</h3>
                  <p className="text-slate-400 italic mb-10">{error}</p>
                  <button onClick={() => { setError(null); setCode(''); }} className="text-[#e84c5c] font-black text-[10px] uppercase tracking-widest border-b-2 border-[#e84c5c]/10 pb-1">Tentar novamente</button>
                </motion.div>
              )}

              {!result && !error && !loading && (
                <div className="h-full flex flex-col items-center justify-center bg-slate-50 rounded-[3rem] border-4 border-dashed border-slate-100 p-20 opacity-30 grayscale">
                  <FiShield size={80} className="mb-8" />
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center">Aguardando Parâmetros de Pesquisa</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidateCertificate;