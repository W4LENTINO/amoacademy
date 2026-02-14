import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/redefinir-senha`
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setEmail('');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#1a1a3a] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-[#e84c5c] rounded-full blur-[160px] opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-premium p-12 md:p-16 relative z-10 animate-reveal">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#e84c5c] rounded-[1.25rem] flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <span className="text-white font-black text-2xl">?</span>
          </div>
          <h1 className="text-3xl font-black text-[#1a1a3a] tracking-tighter uppercase mb-2">Recuperar Senha</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Enviaremos um link de acesso</p>
        </div>

        {success ? (
          <div className="text-center space-y-8">
            <div className="bg-emerald-50 text-emerald-600 p-8 rounded-3xl border border-emerald-100 text-xs font-bold leading-relaxed">
              E-mail enviado! Verifique sua caixa de entrada para redefinir sua senha institucional.
            </div>
            <Link to="/login" className="block w-full bg-[#1a1a3a] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest">
              Voltar ao Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-center">
                {error}
              </div>
            )}
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">E-mail de Registo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none transition-all font-bold text-[#1a1a3a]"
                placeholder="seu@email.com"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all shadow-2xl disabled:opacity-50"
            >
              {loading ? 'A enviar...' : 'Enviar Link de Recuperação'}
            </button>

            <div className="text-center">
              <Link to="/login" className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-[#e84c5c]">
                ← Voltar para o login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
