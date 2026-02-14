import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const StudentLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError('Credenciais inválidas. Por favor, tente novamente.');
      setIsLoading(false);
    } else {
      navigate('/area-do-aluno');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a3a] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e84c5c] rounded-full blur-[160px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-premium p-12 md:p-16 relative z-10 animate-reveal">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-[#e84c5c] rounded-[1.25rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-white font-black text-2xl">AMF</span>
          </div>
          <h1 className="text-3xl font-black text-[#1a1a3a] tracking-tighter uppercase mb-2">Portal Académico</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Autenticação de Estudante</p>
        </div>

        {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold border border-red-100">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">E-mail de Registo</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none transition-all font-bold text-[#1a1a3a]" placeholder="exemplo@amofarma.ao" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Palavra-passe</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none transition-all font-bold text-[#1a1a3a]" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl disabled:opacity-50 transform active:scale-95">
            {isLoading ? 'A Processar...' : 'Entrar no Portal'}
          </button>
        </form>

        <div className="mt-12 text-center space-y-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">Não tem acesso? <Link to="/register" className="text-[#e84c5c] hover:underline">Solicitar Admissão</Link></p>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;