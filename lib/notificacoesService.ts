import { apiClient, APIResponse } from './apiClient';
import { supabase, Notificacao } from './supabase';

// Standardized Notificacao type across the application by importing it from the central supabase library
class NotificacoesService {
  private readonly table = 'notificacoes';

  async listarNotificacoes(alunoId: string): Promise<APIResponse<Notificacao[]>> {
    return apiClient.findMany<Notificacao>(this.table, {
      filters: { aluno_id: alunoId },
      order: { column: 'created_at', ascending: false },
      limit: 50
    });
  }

  async criarNotificacao(data: Partial<Notificacao>): Promise<APIResponse<Notificacao>> {
    return apiClient.create<Notificacao>(this.table, data, { returning: true });
  }

  async marcarComoLida(id: string): Promise<APIResponse<any>> {
    return apiClient.update(this.table, id, { lida: true });
  }

  async criarNotificacaoParaAdmins(data: Partial<Notificacao>): Promise<void> {
    const { data: admins } = await supabase.from('perfis').select('id').in('role', ['admin', 'super_admin']);
    if (admins) {
      const logs = admins.map(admin => ({ ...data, aluno_id: admin.id }));
      await supabase.from(this.table).insert(logs);
    }
  }
}

export const notificacoesService = new NotificacoesService();