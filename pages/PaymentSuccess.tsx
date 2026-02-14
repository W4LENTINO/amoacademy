import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet><title>Inscrição Confirmada | Academia AMOFARMA</title></Helmet>
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-premium text-center border border-slate-100 animate-reveal">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-[#1a1a3a] uppercase tracking-tighter mb-4">Pagamento Confirmado</h1>
          <p className="text-slate-500 font-medium leading-relaxed mb-10 italic">
            "A sua jornada rumo à excelência farmacêutica começou oficialmente. Bem-vindo à elite."
          </p>
          <div className="space-y-4">
            <button onClick={() => navigate('/area-do-aluno')} className="w-full bg-[#1a1a3a] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#e84c5c] transition-all shadow-xl">Aceder ao Curso Agora</button>
            <button onClick={() => navigate('/')} className="w-full text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-[#1a1a3a]">Voltar ao Início</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;