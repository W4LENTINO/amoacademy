import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-[3rem] shadow-premium p-12 md:p-16 animate-reveal">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-[#1a1a3a] tracking-tighter uppercase mb-2">Nova Senha</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Defina suas credenciais</p>
        </div>

        {success ? (
          <div className="bg-emerald-50 text-emerald-600 p-8 rounded-3xl border border-emerald-100 text-xs font-bold text-center">
            Senha redefinida com sucesso! Redirecionando para o login...
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs text-center">{error}</div>}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nova Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none font-bold"
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Confirmar</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none font-bold"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl"
            >
              {loading ? 'A redefinir...' : 'Redefinir Senha'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
