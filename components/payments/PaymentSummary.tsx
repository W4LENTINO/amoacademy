import React from 'react';

export const PaymentSummary: React.FC<any> = ({ amount, method, fees, onConfirm, onBack }) => {
  const total = amount + fees;
  const methodsMap: any = { multicaixa: 'Multicaixa', express: 'Express', bank_transfer: 'Transferência' };

  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-premium animate-reveal border border-slate-100">
      <h3 className="text-2xl font-black text-[#1a1a3a] uppercase tracking-tight mb-10 border-b border-slate-50 pb-6">Resumo da Inscrição</h3>
      
      <div className="space-y-6 mb-12">
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Taxa de Curso</span>
          <span className="font-black text-slate-800">{amount.toLocaleString()} AOA</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Método</span>
          <span className="font-black text-[#1a1a3a]">{methodsMap[method || '']}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Custos de Processo</span>
          <span className="font-black text-amber-600">+{fees.toLocaleString()} AOA</span>
        </div>
        <div className="pt-6 border-t-2 border-slate-100 flex justify-between items-center">
          <span className="text-lg font-black text-[#1a1a3a] uppercase tracking-tighter">Total a Pagar</span>
          <span className="text-3xl font-black text-[#e84c5c] tracking-tighter">{total.toLocaleString()} AOA</span>
        </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onBack} className="flex-1 py-5 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-slate-100">Alterar Método</button>
        <button onClick={onConfirm} className="flex-[2] py-5 bg-[#1a1a3a] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-[#e84c5c] shadow-xl">Confirmar e Gerar Pagamento</button>
      </div>
    </div>
  );
};