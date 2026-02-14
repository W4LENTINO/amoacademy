import axios from 'axios';
import { APIResponse } from '../../lib/apiClient';

interface MulticaixaConfig {
  entity: string;
  terminal: string;
  environment: 'test' | 'production';
  apiKey: string;
}

const config: MulticaixaConfig = {
  entity: '99999',
  terminal: '1234567',
  environment: 'test',
  apiKey: ''
};

export interface MulticaixaPaymentRequest {
  amount: number;
  currency: 'AOA';
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface MulticaixaPaymentResponse {
  transactionId: string;
  reference: string;
  entity: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  paymentUrl?: string;
  qrCode?: string;
  createdAt: string;
  expiresAt: string;
}

export interface MulticaixaStatusResponse {
  transactionId: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  amount: number;
  paidAmount?: number;
  paidAt?: string;
}

class MulticaixaService {
  private generateReference(): string {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    return `MCX${timestamp.slice(-8)}${random}`;
  }

  private generateTransactionId(): string {
    return `txn_${Math.random().toString(36).substring(2, 15)}`;
  }

  async initiatePayment(request: MulticaixaPaymentRequest): Promise<APIResponse<MulticaixaPaymentResponse>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const reference = this.generateReference();
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      const response: MulticaixaPaymentResponse = {
        transactionId: this.generateTransactionId(),
        reference,
        entity: config.entity,
        amount: request.amount,
        status: 'pending',
        paymentUrl: `https://multicaixa.co.ao/pay/${reference}`,
        createdAt: new Date().toISOString(),
        expiresAt: expiresAt.toISOString()
      };

      return { success: true, data: response };
    } catch (error) {
      return { success: false, error: { message: 'Erro ao iniciar pagamento Multicaixa', code: 'MULTICAIXA_ERROR' } };
    }
  }

  async checkPaymentStatus(reference: string): Promise<APIResponse<MulticaixaStatusResponse>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return {
        success: true,
        data: {
          transactionId: this.generateTransactionId(),
          reference,
          status: 'pending',
          amount: 25000
        }
      };
    } catch (error) {
      return { success: false, error: { message: 'Erro ao verificar status', code: 'STATUS_CHECK_ERROR' } };
    }
  }

  async cancelPayment(reference: string): Promise<APIResponse<{ success: boolean }>> {
    return { success: true, data: { success: true } };
  }
}

export const multicaixaService = new MulticaixaService();