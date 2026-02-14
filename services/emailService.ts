import { APIResponse } from '../lib/apiClient';

// Nota: O Resend real precisaria de uma chave de API válida.
// Implementação simulada para o ambiente do browser.

export type EmailData = {
  to: string | string[];
  subject: string;
  template: string;
  data: Record<string, any>;
};

class EmailService {
  private readonly from = 'AMOFARMA <noreply@amofarma.ao>';

  async enviarEmail(data: EmailData): Promise<APIResponse<any>> {
    try {
      console.log(`[EMAIL SIMULATION] Sending '${data.template}' to ${data.to}: ${data.subject}`);
      // Simulação de delay de rede
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return {
        success: true,
        data: { id: `sim_${Math.random().toString(36).substring(7)}`, status: 'sent' }
      };
    } catch (error: any) {
      return { success: false, error: { message: error.message, code: 'EMAIL_ERROR' } };
    }
  }

  async notificarBoasVindas(email: string, nome: string): Promise<void> {
    await this.enviarEmail({
      to: email,
      subject: 'Bem-vindo à Academia AMOFARMA',
      template: 'boas_vindas',
      data: { nome, link_confirmacao: '/confirmar-email' }
    });
  }
}

export const emailService = new EmailService();