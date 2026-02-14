import React from 'react';
import { PaymentMethod, paymentGateway } from '../../services/payments/paymentGateway';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod | null;
  onSelect: (method: PaymentMethod) => void;
  amount: number;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedMethod,
  onSelect,
  amount
}) => {
  const methods = paymentGateway.getAvailableMethods();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-black text-[#1a1a3a] uppercase tracking-tight">Método de Pagamento</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {methods.map(method => {
          const fees = paymentGateway.calculateFees(amount, method.id as PaymentMethod);
          const total = amount + fees;

          return (
            <button
              key={method.id}
              onClick={() => onSelect(method.id as PaymentMethod)}
              className={`p-8 rounded-[2rem] border-2 transition-all text-left group ${
                selectedMethod === method.id
                  ? 'border-[#e84c5c] bg-[#e84c5c]/5 shadow-xl'
                  : 'border-slate-100 hover:border-[#e84c5c] hover:bg-slate-50'
              }`}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{method.icon}</div>
              <h4 className="font-black text-[#1a1a3a] uppercase text-sm mb-2">{method.name}</h4>
              <div className="space-y-2">
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Tempo: {method.processingTime}</p>
                 {fees > 0 && <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest">Taxa: +{fees.toLocaleString()} AOA</p>}
                 <p className="text-sm font-black text-[#e84c5c] mt-4">{total.toLocaleString()} AOA</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};