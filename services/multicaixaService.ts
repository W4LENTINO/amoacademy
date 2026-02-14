import { APIResponse } from '../lib/apiClient';

interface MulticaixaConfig {
  entity: string;
  terminal: string;
}

const config: MulticaixaConfig = {
  entity: '99999',
  terminal: '1234567'
};

export interface MulticaixaPaymentRequest {
  amount: number;
  description: string;
  customerName: string;
}

export interface MulticaixaPaymentResponse {
  reference: string;
  entity: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  expiresAt: string;
}

class MulticaixaService {
  async initiatePayment(request: MulticaixaPaymentRequest): Promise<APIResponse<MulticaixaPaymentResponse>> {
    await new Promise(resolve => setTimeout(resolve, 800));
    const reference = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 48);

    return {
      success: true,
      data: {
        reference,
        entity: config.entity,
        amount: request.amount,
        status: 'pending',
        expiresAt: expiresAt.toISOString()
      }
    };
  }

  getPaymentInstructions(): string[] {
    return [
      'Aceda ao menu "Pagamentos de Serviços"',
      `Introduza a Entidade: ${config.entity}`,
      'Introduza a Referência gerada',
      'Confirme o montante e guarde o recibo'
    ];
  }
}

export const multicaixaService = new MulticaixaService();