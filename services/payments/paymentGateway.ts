import { APIResponse } from '../../lib/apiClient';
import { multicaixaService, MulticaixaPaymentResponse } from './multicaixa';
import { expressService, ExpressPaymentResponse } from './express';
import { bankTransferService, BankTransferResponse } from './bankTransfer';

export type PaymentMethod = 'multicaixa' | 'express' | 'bank_transfer';

export interface PaymentRequest {
  method: PaymentMethod;
  amount: number;
  currency: 'AOA';
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  returnUrl: string;
  cancelUrl: string;
  metadata?: Record<string, any>;
}

export interface PaymentStatus {
  transactionId: string;
  method: PaymentMethod;
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'expired';
  amount: number;
  paidAmount?: number;
  paidAt?: string;
  metadata?: Record<string, any>;
}

class PaymentGateway {
  /**
   * Processa o pagamento através do provedor selecionado
   */
  async processPayment(request: PaymentRequest): Promise<APIResponse<any>> {
    try {
      const sanitizedRequest = {
        ...request,
        amount: request.amount + this.calculateFees(request.amount, request.method)
      };

      switch (request.method) {
        case 'multicaixa':
          return await multicaixaService.initiatePayment(sanitizedRequest);
        case 'express':
          return await expressService.initiatePayment(sanitizedRequest as any);
        case 'bank_transfer':
          return await bankTransferService.createTransfer(sanitizedRequest);
        default:
          throw new Error('Método de pagamento inválido ou não suportado.');
      }
    } catch (error: any) {
      return { 
        success: false, 
        error: { 
          message: error.message || 'Erro ao processar transação financeira.', 
          code: 'PAYMENT_PROCESS_ERROR' 
        } 
      };
    }
  }

  /**
   * Verifica o estado atual de uma transação
   */
  async checkStatus(transactionId: string, method: PaymentMethod): Promise<APIResponse<PaymentStatus>> {
    try {
      let res;
      switch (method) {
        case 'multicaixa': 
          res = await multicaixaService.checkPaymentStatus(transactionId); 
          break;
        case 'express': 
          res = await expressService.checkPaymentStatus(transactionId); 
          break;
        case 'bank_transfer': 
          res = await bankTransferService.checkTransferStatus(transactionId); 
          break;
      }
      
      const statusData = res?.data;
      return {
        success: true,
        data: {
          transactionId,
          method,
          status: statusData?.status || 'pending',
          amount: statusData?.amount || 0,
          paidAmount: statusData?.paidAmount,
          paidAt: statusData?.paidAt,
          metadata: statusData?.metadata
        }
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: { 
          message: 'Não foi possível sincronizar o estado do pagamento.', 
          code: 'STATUS_SYNC_ERROR' 
        } 
      };
    }
  }

  /**
   * Cancela uma intenção de pagamento pendente
   */
  async cancelPayment(transactionId: string, method: PaymentMethod): Promise<APIResponse<{ success: boolean }>> {
    switch (method) {
      case 'multicaixa': return await multicaixaService.cancelPayment(transactionId);
      case 'express': return await expressService.cancelPayment(transactionId);
      case 'bank_transfer': return await bankTransferService.cancelTransfer(transactionId);
      default: return { success: false, error: { message: 'Método inválido', code: 'INVALID' } };
    }
  }

  /**
   * Retorna os métodos de pagamento disponíveis configurados
   */
  getAvailableMethods() {
    return [
      { 
        id: 'multicaixa', 
        name: 'Multicaixa', 
        description: 'Pagamento via ATM ou Internet Banking (24h)', 
        icon: '💳', 
        processingTime: 'Até 24h', 
        fee: 'Grátis' 
      },
      { 
        id: 'express', 
        name: 'Express', 
        description: 'Confirmação instantânea por aplicação móvel', 
        icon: '⚡', 
        processingTime: 'Instantâneo', 
        fee: '2.5%' 
      },
      { 
        id: 'bank_transfer', 
        name: 'Transferência', 
        description: 'Depósito direto em conta institucional', 
        icon: '🏦', 
        processingTime: '1-2 dias úteis', 
        fee: 'Grátis' 
      }
    ];
  }

  /**
   * Calcula as taxas administrativas baseadas no método
   */
  calculateFees(amount: number, method: PaymentMethod): number {
    // A rede Express cobra taxa de processamento de 2.5%
    return method === 'express' ? Math.round(amount * 0.025) : 0;
  }

  /**
   * Valida se o montante está dentro dos limites operacionais
   */
  validateAmount(amount: number, method: PaymentMethod) {
    const limits = { 
      multicaixa: { min: 500, max: 10000000 }, 
      express: { min: 100, max: 5000000 }, 
      bank_transfer: { min: 1000, max: 50000000 } 
    };
    const limit = limits[method];
    if (amount < limit.min) return { valid: false, message: `O investimento mínimo para este método é de ${limit.min.toLocaleString()} AOA.` };
    if (amount > limit.max) return { valid: false, message: `O limite máximo por transação foi excedido.` };
    return { valid: true };
  }
}

export const paymentGateway = new PaymentGateway();