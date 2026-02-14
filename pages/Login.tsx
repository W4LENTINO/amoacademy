import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSecurity } from '../hooks/useSecurity';
import { auditLogger } from '../lib/auditLogger';

const Login: React.FC = () => {
  const { sanitizeInput, secureInputProps } = useSecurity();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login, loginWithGoogle, loginWithOutlook } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const safeEmail = sanitizeInput(email.trim().toLowerCase());
    const result = await login(safeEmail, password);
    
    if (result.success) {
      await auditLogger.log({ tipo: 'login_sucesso', email: safeEmail });
      navigate('/area-do-aluno');
    } else {
      setError(result.error || 'Erro ao fazer login');
      await auditLogger.logSecurityAlert({ tipo: 'login_falha', email: safeEmail, detalhes: { erro: result.error } });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a3a] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e84c5c] rounded-full blur-[160px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-premium p-12 md:p-16 relative z-10 animate-reveal">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#e84c5c] rounded-[1.25rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-white font-black text-2xl">AMF</span>
          </div>
          <h1 className="text-3xl font-black text-[#1a1a3a] tracking-tighter uppercase mb-2">Bem-vindo</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Portal Académico</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl text-[10px] font-black uppercase mb-6 tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none transition-all font-bold text-[#1a1a3a]"
              placeholder="seu@email.com"
              required
              disabled={loading}
              {...secureInputProps}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none transition-all font-bold text-[#1a1a3a]"
              placeholder="••••••••"
              required
              disabled={loading}
              {...secureInputProps}
            />
          </div>
          
          <div className="text-right">
            <Link to="/recuperar-senha" university-colors className="text-[10px] font-black text-[#e84c5c] uppercase tracking-widest hover:text-[#1a1a3a] transition-colors">
              Esqueceu a senha?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-[#1a1a3a]/20 disabled:opacity-50"
          >
            {loading ? 'A validar...' : 'Entrar no Portal'}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100"></div>
          </div>
          <div className="relative flex justify-center text-[9px] font-black uppercase tracking-widest">
            <span className="px-4 bg-white text-slate-300">Ou continuar com</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={loginWithGoogle}
            className="flex items-center justify-center space-x-3 bg-slate-50 border border-slate-100 hover:bg-white p-4 rounded-2xl transition-all font-bold text-xs"
          >
            <span className="text-lg">G</span>
            <span className="text-[10px] font-black uppercase text-slate-500">Google</span>
          </button>
          <button
            onClick={loginWithOutlook}
            className="flex items-center justify-center space-x-3 bg-slate-50 border border-slate-100 hover:bg-white p-4 rounded-2xl transition-all font-bold text-xs"
          >
            <span className="text-lg">O</span>
            <span className="text-[10px] font-black uppercase text-slate-500">Outlook</span>
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Não tem conta? <Link to="/register" className="text-[#e84c5c] hover:underline">Solicitar Admissão</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;