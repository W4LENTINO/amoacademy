import { useState, useCallback } from 'react';
import { paymentGateway, PaymentMethod, PaymentRequest, PaymentStatus } from '../services/payments/paymentGateway';
import { useAuth } from './useAuth';

interface UsePaymentProps {
  amount: number;
  description: string;
  onSuccess?: (payment: PaymentStatus) => void;
  onError?: (error: string) => void;
}

export const usePayment = ({ amount, description, onSuccess, onError }: UsePaymentProps) => {
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [paymentData, setPaymentData] = useState<any>(null);
  const [status, setStatus] = useState<PaymentStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableMethods = paymentGateway.getAvailableMethods();

  const initiatePayment = useCallback(async (method: PaymentMethod) => {
    if (!user || !profile) {
      setError('Utilizador não autenticado');
      return null;
    }

    setLoading(true);
    setError(null);
    setSelectedMethod(method);

    try {
      const request: PaymentRequest = {
        method,
        amount,
        currency: 'AOA',
        description,
        customerName: profile.nome_completo,
        customerEmail: user.email!,
        customerPhone: profile.telefone || undefined,
        returnUrl: `${window.location.origin}/area-do-aluno/pagamentos`,
        cancelUrl: `${window.location.origin}/cursos`,
      };

      const result = await paymentGateway.processPayment(request);

      if (result.success && result.data) {
        setPaymentData(result.data);
        return result.data;
      } else {
        setError(result.error?.message || 'Erro ao processar pagamento');
        onError?.(result.error?.message || 'Erro ao processar pagamento');
        return null;
      }
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [amount, description, user, profile, onError]);

  return {
    loading,
    selectedMethod,
    paymentData,
    status,
    error,
    availableMethods,
    initiatePayment,
    reset: () => { setSelectedMethod(null); setPaymentData(null); setError(null); }
  };
};

export const useCoursePayment = ({ courseId, courseName, amount, onSuccess, onError }: any) => {
  return usePayment({
    amount,
    description: `Inscrição: ${courseName}`,
    onSuccess,
    onError
  });
};