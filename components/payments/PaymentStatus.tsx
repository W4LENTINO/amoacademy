import React from 'react';
import { PaymentStatus as PaymentStatusType } from '../../services/payments/paymentGateway';

interface PaymentStatusProps {
  status: PaymentStatusType;
  onRetry?: () => void;
  onBack?: () => void;
}

export const PaymentStatus: React.FC<PaymentStatusProps> = ({ status, onRetry, onBack }) => {
  const getStatusConfig = () => {
    switch (status.status) {
      case 'completed':
        return {
          icon: '✅',
          title: 'Pagamento Confirmado!',
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          message: 'O seu investimento foi validado. O curso já está disponível no seu portal.'
        };
      case 'pending':
        return {
          icon: '⏳',
          title: 'Aguardando Validação',
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          message: 'Estamos a processar o seu pagamento. Receberá uma notificação em breve.'
        };
      case 'failed':
        return {
          icon: '❌',
          title: 'Falha no Processamento',
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          message: 'Não foi possível completar a transação. Por favor, verifique os seus dados.'
        };
      default:
        return {
          icon: 'ℹ️',
          title: 'Estado em Verificação',
          color: 'text-slate-600',
          bgColor: 'bg-slate-50',
          borderColor: 'border-slate-200',
          message: 'A consultar o estado da transação junto da entidade financeira...'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="bg-white rounded-[3rem] p-12 text-center animate-reveal border border-slate-100 shadow-premium">
      <div className={`${config.bgColor} ${config.borderColor} border rounded-[2rem] p-12 mb-10`}>
        <div className="text-7xl mb-6">{config.icon}</div>
        <h3 className={`text-3xl font-black ${config.color} uppercase tracking-tight mb-4`}>{config.title}</h3>
        <p className="text-slate-500 font-medium leading-relaxed italic">{config.message}</p>
      </div>

      <div className="space-y-4">
        {status.status === 'failed' && onRetry && (
          <button onClick={onRetry} className="w-full py-5 bg-[#e84c5c] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl">Tentar Novamente</button>
        )}
        {onBack && (
          <button onClick={onBack} className="w-full py-5 bg-[#1a1a3a] text-white font-black text-[10px] uppercase tracking-widest rounded-2xl shadow-xl">Voltar ao Portal</button>
        )}
      </div>
    </div>
  );
};