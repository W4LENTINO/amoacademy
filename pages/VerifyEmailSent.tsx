import React from 'react';
import { Link } from 'react-router-dom';

const VerifyEmailSent: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#1a1a3a] flex items-center justify-center p-6 text-white">
      <div className="w-full max-w-md text-center space-y-12 animate-reveal">
        <div className="w-24 h-24 bg-[#e84c5c] rounded-[2rem] flex items-center justify-center mx-auto shadow-3xl animate-bounce">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-black tracking-tighter uppercase">Verifique seu E-mail</h1>
          <p className="text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
            Enviamos um link de validação institucional. Por favor, clique no link para ativar sua conta na Academia AMOFARMA.
          </p>
        </div>

        <div className="pt-8">
          <Link
            to="/login"
            className="inline-block bg-white text-[#1a1a3a] hover:bg-[#e84c5c] hover:text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl"
          >
            Ir para o Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailSent;
