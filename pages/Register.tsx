import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.tsx';
import { useSecurity } from '../hooks/useSecurity.ts';
import { SimpleCaptcha } from '../components/Captcha.tsx';
import { auditLogger } from '../lib/auditLogger.ts';

// Sub-componente de Força de Senha
const PasswordStrength: React.FC<{ password: string }> = ({ password }) => {
  const strength = useMemo(() => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const config = [
    { label: 'Vulnerável', color: 'bg-slate-200', text: 'text-slate-400' },
    { label: 'Fraca', color: 'bg-[#e84c5c]', text: 'text-[#e84c5c]' },
    { label: 'Média', color: 'bg-amber-400', text: 'text-amber-500' },
    { label: 'Forte', color: 'bg-emerald-500', text: 'text-emerald-600' },
    { label: 'Excelente', color: 'bg-[#1a1a3a]', text: 'text-[#1a1a3a]' },
  ];

  const current = config[Math.min(strength, 4)];

  if (!password) return null;

  return (
    <div className="mt-4 space-y-2 animate-reveal">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Segurança da Chave</span>
        <span className={`text-[9px] font-black uppercase tracking-widest ${current.text}`}>{current.label}</span>
      </div>
      <div className="flex gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div 
            key={step} 
            className={`flex-1 rounded-full transition-all duration-500 ${
              step <= Math.min(strength, 4) ? current.color : 'bg-slate-100'
            }`} 
          />
        ))}
      </div>
    </div>
  );
};

const Register: React.FC = () => {
  const { sanitizeInput, secureInputProps } = useSecurity();
  const [formData, setFormData] = useState({
    nome_completo: '',
    email: '',
    numero_bi: '',
    telefone: '',
    profissao: '',
    password: '',
    confirmPassword: ''
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaVerified) {
      setError('Por favor, complete a verificação de segurança.');
      return;
    }

    setLoading(true);
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setLoading(false);
      return;
    }

    const safeData = {
      nome_completo: sanitizeInput(formData.nome_completo),
      email: formData.email.trim().toLowerCase(),
      numero_bi: formData.numero_bi.toUpperCase().replace(/\s/g, ''),
      telefone: sanitizeInput(formData.telefone || ''),
      profissao: sanitizeInput(formData.profissao || ''),
      password: formData.password
    };

    const result = await register(safeData);

    if (result.success) {
      await auditLogger.log({ tipo: 'login_sucesso', email: safeData.email, detalhes: { acao: 'registo_novo_utilizador' } });
      navigate('/verificar-email-enviado');
    } else {
      setError(result.error || 'Erro ao criar conta');
      await auditLogger.logSecurityAlert({ tipo: 'login_falha', email: safeData.email, detalhes: { erro: result.error, contexto: 'registo' } });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 py-24">
      <div className="w-full max-w-2xl bg-white rounded-[3rem] shadow-premium p-12 md:p-16 border border-slate-100 animate-reveal">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-black text-[#1a1a3a] tracking-tighter uppercase mb-4">Criar Conta Académica</h1>
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em]">Junte-se à elite farmacêutica de Angola</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-5 rounded-2xl text-[10px] font-black uppercase mb-8 tracking-widest text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Nome Completo (Conforme BI)</label>
            <input
              type="text"
              name="nome_completo"
              value={formData.nome_completo}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none transition-all font-bold text-[#1a1a3a]"
              placeholder="Seu nome completo"
              required
              disabled={loading}
              {...secureInputProps}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">E-mail Corporativo</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none transition-all font-bold text-[#1a1a3a]"
              placeholder="seu@email.com"
              required
              disabled={loading}
              {...secureInputProps}
            />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Bilhete de Identidade (BI)</label>
            <input
              type="text"
              name="numero_bi"
              value={formData.numero_bi}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none transition-all font-bold text-[#1a1a3a]"
              placeholder="001234567LA045"
              required
              disabled={loading}
              {...secureInputProps}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none transition-all font-bold text-[#1a1a3a]"
              placeholder="+244 9..."
              disabled={loading}
              {...secureInputProps}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Profissão</label>
            <input
              type="text"
              name="profissao"
              value={formData.profissao}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none transition-all font-bold text-[#1a1a3a]"
              placeholder="Farmacêutico..."
              disabled={loading}
              {...secureInputProps}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none transition-all font-bold text-[#1a1a3a]"
              placeholder="••••••••"
              required
              disabled={loading}
              minLength={8}
              {...secureInputProps}
            />
            <PasswordStrength password={formData.password} />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Confirmar</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-100 px-8 py-5 rounded-2xl focus:border-[#e84c5c] outline-none transition-all font-bold text-[#1a1a3a]"
              placeholder="••••••••"
              required
              disabled={loading}
              {...secureInputProps}
            />
          </div>

          <div className="md:col-span-2 pt-4">
            <SimpleCaptcha onVerify={() => setCaptchaVerified(true)} />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading || !captchaVerified}
              className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-[0.4em] transition-all shadow-2xl shadow-[#1a1a3a]/20 disabled:opacity-50"
            >
              {loading ? 'A criar conta...' : 'Finalizar Registo Académico'}
            </button>
          </div>
        </form>

        <div className="mt-12 text-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Já tem conta? <Link to="/login" className="text-[#e84c5c] hover:underline">Fazer Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;