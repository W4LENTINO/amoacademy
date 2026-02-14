import React from 'react';

export const BankTransferForm: React.FC<any> = ({ paymentData, onConfirm, onCancel }) => {
  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-premium animate-reveal border border-slate-100">
      <div className="text-center mb-10">
        <span className="text-4xl mb-4 block">🏦</span>
        <h3 className="text-2xl font-black text-[#1a1a3a] uppercase tracking-tight">Transferência Bancária</h3>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2">Dados para Depósito Institucional</p>
      </div>

      <div className="space-y-6 bg-slate-50 p-8 rounded-[2rem] border border-slate-100 mb-10">
        <div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">IBAN Destino</span>
          <span className="font-mono font-black text-slate-800 break-all">{paymentData.iban}</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Banco</span>
              <span className="font-bold text-sm text-slate-700">{paymentData.bankName}</span>
           </div>
           <div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1">Referência</span>
              <span className="font-bold text-sm text-slate-700">{paymentData.reference}</span>
           </div>
        </div>
      </div>

      <div className="mb-10 p-8 border-2 border-dashed border-slate-200 rounded-[2rem] text-center group hover:border-[#e84c5c] transition-colors cursor-pointer">
         <span className="text-3xl mb-3 block opacity-20 group-hover:opacity-100 transition-opacity">📎</span>
         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Carregar Comprovativo (PDF/JPG)</p>
      </div>

      <div className="flex gap-4">
        <button onClick={onCancel} className="flex-1 py-5 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl">Voltar</button>
        <button onClick={onConfirm} className="flex-[2] py-5 bg-[#1a1a3a] text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-[#e84c5c] transition-all shadow-xl">Submeter Comprovativo</button>
      </div>
    </div>
  );
};