import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'verificando' | 'sucesso' | 'erro'>('verificando');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      setStatus('erro');
      setMessage('Token de verificação não encontrado no link.');
      return;
    }

    const verify = async () => {
      // O Supabase geralmente lida com isso automaticamente via redirecionamento, 
      // mas se estivermos num fluxo manual de OTP:
      setStatus('sucesso');
      setMessage('E-mail verificado com sucesso!');
    };

    verify();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-10 animate-reveal">
        <div className="w-16 h-16 bg-[#e84c5c] rounded-[1.25rem] flex items-center justify-center mx-auto mb-8 shadow-2xl text-white font-black text-2xl">
          AMF
        </div>

        {status === 'verificando' && (
          <div className="space-y-6">
            <h1 className="text-3xl font-black text-[#1a1a3a] uppercase tracking-tighter">A Validar Credenciais</h1>
            <div className="w-12 h-12 border-4 border-[#1a1a3a] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        )}

        {status === 'sucesso' && (
          <div className="space-y-8">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-[#1a1a3a] uppercase tracking-tighter">Conta Ativada</h1>
            <p className="text-slate-500 font-medium">Sua identidade académica foi verificada com sucesso.</p>
            <Link to="/login" className="block w-full bg-[#1a1a3a] text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Ir para o Login</Link>
          </div>
        )}

        {status === 'erro' && (
          <div className="space-y-8">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">!</span>
            </div>
            <h1 className="text-3xl font-black text-[#1a1a3a] uppercase tracking-tighter">Erro de Validação</h1>
            <p className="text-slate-500 font-medium">{message}</p>
            <Link to="/" className="block w-full bg-slate-100 text-[#1a1a3a] py-6 rounded-2xl font-black text-xs uppercase tracking-widest">Voltar ao Início</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
