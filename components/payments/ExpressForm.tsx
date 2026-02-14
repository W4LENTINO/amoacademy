import React from 'react';

export const ExpressForm: React.FC<any> = ({ paymentData, onConfirm, onCancel }) => {
  return (
    <div className="bg-white rounded-[3rem] p-10 shadow-premium animate-reveal border border-slate-100">
      <div className="text-center mb-10">
        <span className="text-4xl mb-4 block">⚡</span>
        <h3 className="text-2xl font-black text-[#1a1a3a] uppercase tracking-tight">Pagamento Express</h3>
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-2 italic">Protocolo de Confirmação Instantânea</p>
      </div>

      <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl text-center mb-10">
        <p className="text-amber-700 text-sm font-bold">Aguardando interação no terminal Express...</p>
        <p className="text-amber-600 text-xs mt-2 uppercase tracking-widest font-black animate-pulse">Referência: {paymentData.transactionId}</p>
      </div>

      <div className="flex justify-center mb-12">
         <div className="w-48 h-48 bg-slate-50 border-4 border-dashed border-slate-200 rounded-3xl flex items-center justify-center grayscale opacity-30">
            <span className="text-xs font-black uppercase text-slate-400">QR CODE SECURE</span>
         </div>
      </div>

      <div className="flex gap-4">
        <button onClick={onCancel} className="flex-1 py-5 bg-slate-50 text-slate-400 font-black text-[10px] uppercase tracking-widest rounded-2xl">Cancelar</button>
        <a href={paymentData.checkoutUrl} target="_blank" rel="noreferrer" className="flex-[2] py-5 bg-[#e84c5c] text-white text-center font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-[#1a1a3a] transition-all shadow-xl">Abrir Portal Express</a>
      </div>
    </div>
  );
};