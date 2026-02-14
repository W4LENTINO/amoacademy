import axios from 'axios';
import { APIResponse } from '../../lib/apiClient';

interface ExpressConfig {
  merchantId: string;
  apiKey: string;
  environment: 'test' | 'production';
}

const config: ExpressConfig = {
  merchantId: 'EXPRESS123',
  apiKey: '',
  environment: 'test'
};

export interface ExpressPaymentRequest {
  amount: number;
  currency: 'AOA';
  description: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  returnUrl: string;
  cancelUrl: string;
}

export interface ExpressPaymentResponse {
  transactionId: string;
  checkoutUrl: string;
  qrCode: string;
  expiresIn: number;
  status: 'pending' | 'completed' | 'failed' | 'expired';
  createdAt: string;
}

class ExpressService {
  private generateTransactionId(): string {
    return `exp_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
  }

  async initiatePayment(request: ExpressPaymentRequest): Promise<APIResponse<ExpressPaymentResponse>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const transactionId = this.generateTransactionId();
      return {
        success: true,
        data: {
          transactionId,
          checkoutUrl: `https://checkout.express.co.ao/${transactionId}`,
          qrCode: 'QR_CODE_DATA',
          expiresIn: 1800,
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      };
    } catch (error) {
      return { success: false, error: { message: 'Erro ao iniciar pagamento Express', code: 'EXPRESS_ERROR' } };
    }
  }

  async checkPaymentStatus(transactionId: string): Promise<APIResponse<any>> {
    return {
      success: true,
      data: { transactionId, status: 'pending', amount: 25000 }
    };
  }

  async cancelPayment(transactionId: string): Promise<APIResponse<{ success: boolean }>> {
    return { success: true, data: { success: true } };
  }
}

export const expressService = new ExpressService();