import React, { useState } from 'react';

export const MulticaixaForm: React.FC<any> = ({ paymentData, onConfirm, onCancel }) => {
  const [copied, setCopied] = useState(false);

  const copyRef = () => {
    navigator.clipboard.writeText(paymentData.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-premium animate-reveal border border-slate-100">
      <div className="text-center mb-10">
        <span className="text-4xl mb-4 block">💳</span>
        <h3 className="text-2xl font-black text-[#1a1a3a] uppercase tracking-tight">Referência Multicaixa</h3>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Válido até: {new Date(paymentData.expiresAt).toLocaleDateString()}</p>
      </div>

      <div className="space-y-6 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 mb-10">
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entidade</span>
          <span className="font-black text-[#1a1a3a]">{paymentData.entity}</span>
        </div>
        <div className="flex justify-between items-center border-b border-slate-200 pb-4">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Referência</span>
          <div className="flex items-center space-x-3">
            <span className="font-mono font-black text-lg text-[#1a1a3a]">{paymentData.reference}</span>
            <button onClick={copyRef} className="text-[#e84c5c] text-xs font-bold uppercase hover:underline">{copied ? 'OK' : 'COPIAR'}</button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Valor</span>
          <span className="font-black text-xl text-[#e84c5c]">{paymentData.amount.toLocaleString()} AOA</span>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Como Pagar:</h4>
        <div className="bg-white border border-slate-100 rounded-2xl p-6 space-y-3 text-sm text-slate-600 font-medium">
          <p>1. Aceda ao menu "Pagamentos de Serviços"</p>
          <p>2. Introduza a Entidade e Referência acima</p>
          <p>3. Confirme o valor e guarde o recibo</p>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onCancel} className="flex-1 py-5 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all">Voltar</button>
        <button onClick={onConfirm} className="flex-[2] py-5 bg-[#1a1a3a] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-[#e84c5c] transition-all shadow-xl">Já efectuei o pagamento</button>
      </div>
    </div>
  );
};