import { APIResponse } from '../../lib/apiClient';

interface BankConfig {
  bankName: string;
  iban: string;
  accountName: string;
}

const config: BankConfig = {
  bankName: 'Banco Angolano de Investimentos (BAI)',
  iban: 'AO06012345678901234567890',
  accountName: 'AMOFARMA, Lda'
};

export interface BankTransferRequest {
  amount: number;
  currency: 'AOA';
  description: string;
  customerName: string;
  customerEmail: string;
}

export interface BankTransferResponse {
  reference: string;
  iban: string;
  bankName: string;
  accountName: string;
  amount: number;
  description: string;
  dueDate: string;
  status: 'pending' | 'confirmed';
  paymentInstructions: string[];
}

class BankTransferService {
  async createTransfer(request: BankTransferRequest): Promise<APIResponse<BankTransferResponse>> {
    const reference = `TRF${Date.now().toString(36).toUpperCase()}`;
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);

    return {
      success: true,
      data: {
        reference,
        iban: config.iban,
        bankName: config.bankName,
        accountName: config.accountName,
        amount: request.amount,
        description: request.description,
        dueDate: dueDate.toISOString(),
        status: 'pending',
        paymentInstructions: [
          `Utilize o IBAN: ${config.iban}`,
          `Indique a Referência: ${reference}`,
          `Valor: ${request.amount.toLocaleString()} AOA`
        ]
      }
    };
  }

  async checkTransferStatus(reference: string): Promise<APIResponse<any>> {
    return { success: true, data: { status: 'pending' } };
  }

  async cancelTransfer(reference: string): Promise<APIResponse<{ success: boolean }>> {
    return { success: true, data: { success: true } };
  }
}

export const bankTransferService = new BankTransferService();