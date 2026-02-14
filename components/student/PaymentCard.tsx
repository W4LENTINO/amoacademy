import React from 'react';

interface PaymentCardProps {
  payment: {
    id: string;
    valor: number;
    metodo: string;
    estado: string;
    data_pagamento?: string;
    created_at: string;
    curso_nome?: string;
  };
  detailed?: boolean;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({ payment, detailed = false }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'concluido': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pendente': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-red-50 text-red-600 border-red-100';
    }
  };

  return (
    <div className={`p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors ${detailed ? 'bg-white rounded-2xl mb-4 shadow-sm border' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
           <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl">💰</div>
           <div>
              <p className="text-sm font-black text-[#1a1a3a] uppercase tracking-tight">{payment.curso_nome || 'Inscrição Académica'}</p>
              <div className="flex items-center space-x-3 mt-1">
                 <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{payment.metodo}</span>
                 <span className="text-[10px] text-slate-300">•</span>
                 <span className="text-[10px] text-slate-400 font-bold tracking-widest">{new Date(payment.created_at).toLocaleDateString()}</span>
              </div>
           </div>
        </div>
        <div className="text-right">
           <p className="font-black text-[#e84c5c] text-lg leading-none mb-2">{payment.valor.toLocaleString()} AOA</p>
           <span className={`text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border ${getStatusStyle(payment.estado)}`}>
              {payment.estado}
           </span>
        </div>
      </div>
    </div>
  );
};