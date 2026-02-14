import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useCoursePayment } from '../hooks/usePayment';
import { PaymentMethodSelector } from '../components/payments/PaymentMethodSelector';
import { PaymentSummary } from '../components/payments/PaymentSummary';
import { MulticaixaForm } from '../components/payments/MulticaixaForm';
import { ExpressForm } from '../components/payments/ExpressForm';
import { BankTransferForm } from '../components/payments/BankTransferForm';

const Checkout: React.FC = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState<'method' | 'summary' | 'instructions'>('method');
  const [method, setMethod] = useState<any>(null);

  // Simulação de dados do curso (em produção viria de um hook useCourse)
  const course = { id: courseId, title: 'Programa de Especialização', price: 25000 };

  const { initiatePayment, paymentData, loading } = useCoursePayment({
    courseId: course.id,
    courseName: course.title,
    amount: course.price,
    onSuccess: () => navigate('/area-do-aluno/pagamentos')
  });

  const handleSelectMethod = (m: any) => {
    setMethod(m);
    setStep('summary');
  };

  const handleConfirm = async () => {
    const res = await initiatePayment(method);
    if (res) setStep('instructions');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-24 px-6">
      <Helmet><title>Checkout Seguro | Academia AMOFARMA</title></Helmet>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 animate-reveal">
           <div className="w-16 h-16 bg-[#e84c5c] rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-8 shadow-xl">AMF</div>
           <h1 className="text-4xl font-black text-[#1a1a3a] uppercase tracking-tighter mb-4">Checkout <span className="text-[#e84c5c]">Seguro</span></h1>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Inscrição em: {course.title}</p>
        </div>

        <div className="space-y-12">
          {step === 'method' && (
            <PaymentMethodSelector 
              selectedMethod={method} 
              onSelect={handleSelectMethod} 
              amount={course.price} 
            />
          )}

          {step === 'summary' && (
            <PaymentSummary 
              amount={course.price} 
              method={method} 
              fees={method === 'express' ? course.price * 0.025 : 0}
              onConfirm={handleConfirm}
              onBack={() => setStep('method')}
            />
          )}

          {step === 'instructions' && paymentData && (
            <>
              {method === 'multicaixa' && <MulticaixaForm paymentData={paymentData} onConfirm={() => navigate('/area-do-aluno')} onCancel={() => setStep('method')} />}
              {method === 'express' && <ExpressForm paymentData={paymentData} onConfirm={() => navigate('/area-do-aluno')} onCancel={() => setStep('method')} />}
              {method === 'bank_transfer' && <BankTransferForm paymentData={paymentData} onConfirm={() => navigate('/area-do-aluno')} onCancel={() => setStep('method')} />}
            </>
          )}

          {loading && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[200] flex items-center justify-center">
               <div className="bg-white p-12 rounded-[2rem] text-center shadow-premium animate-reveal">
                  <div className="w-12 h-12 border-4 border-[#e84c5c] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Comunicando com Gateway Financeiro...</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;