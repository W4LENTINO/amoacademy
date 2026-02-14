import React from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO.tsx';

const PaymentFailure: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO title="Inconsistência no Pagamento" />
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-[3rem] p-12 shadow-premium text-center border border-slate-100 animate-reveal">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-[#1a1a3a] uppercase tracking-tighter mb-4">Falha no Pagamento</h1>
          <p className="text-slate-500 font-medium leading-relaxed mb-10">
            Não foi possível processar a sua transação. Verifique se possui saldo suficiente ou tente um método alternativo.
          </p>
          <div className="space-y-4">
            <button onClick={() => navigate(-1)} className="w-full bg-[#e84c5c] text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Tentar Novamente</button>
            <button onClick={() => window.location.href='https://wa.me/244943574878'} className="w-full border border-slate-200 text-slate-400 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-50 transition-all">Contactar Suporte Técnico</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFailure;