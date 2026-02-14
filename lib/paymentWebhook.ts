import { paymentGateway } from '../services/payments/paymentGateway';
import { supabase } from './supabase';
import { notificacoesService } from './notificacoesService';

export class PaymentWebhook {
  async handleWebhook(provider: 'multicaixa' | 'express', payload: any): Promise<{ received: boolean }> {
    try {
      const transactionId = payload.transactionId || payload.reference;
      const res = await paymentGateway.checkStatus(transactionId, provider as any);
      
      if (res.success && res.data) {
        const payment = res.data;
        if (payment.status === 'completed') {
           // Lógica para libertar curso no Supabase
           console.log(`[WEBHOOK] Pagamento ${transactionId} confirmado. Actualizando perfil...`);
        }
      }
      return { received: true };
    } catch (error) {
      console.error('[WEBHOOK ERROR]', error);
      return { received: false };
    }
  }
}

export const paymentWebhook = new PaymentWebhook();