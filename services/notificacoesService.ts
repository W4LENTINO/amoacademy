import { apiClient, APIResponse } from '../lib/apiClient';
import { Notificacao, supabase } from '../lib/supabase';

// =====================================================
// TIPOS ESPECÍFICOS DE NOTIFICAÇÕES
// =====================================================

export type CreateNotificacaoDTO = {
  aluno_id: string;
  tipo: 'certificado' | 'curso' | 'pagamento' | 'sistema' | 'promocao';
  titulo: string;
  mensagem: string;
  acao_link?: string;
  acao_texto?: string;
};

export type NotificacoesFiltros = {
  aluno_id?: string;
  tipo?: string;
  lida?: boolean;
  data_inicio?: string;
  data_fim?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'created_at' | 'lida';
  orderDirection?: 'asc' | 'desc';
};

// =====================================================
// SERVIÇO DE NOTIFICAÇÕES
// =====================================================

class NotificacoesService {
  private readonly table = 'notificacoes';

  async listarNotificacoes(filtros?: NotificacoesFiltros): Promise<APIResponse<Notificacao[]>> {
    const filters: Record<string, any> = {};

    if (filtros?.aluno_id) {
      filters.aluno_id = filtros.aluno_id;
    }
    if (filtros?.tipo) {
      filters.tipo = filtros.tipo;
    }
    if (filtros?.lida !== undefined) {
      filters.lida = filtros.lida;
    }
    if (filtros?.data_inicio) {
      filters.created_at = { gte: filtros.data_inicio };
    }
    if (filtros?.data_fim) {
      filters.created_at = { ...filters.created_at, lte: filtros.data_fim };
    }

    return apiClient.findMany<Notificacao>(this.table, {
      filters,
      order: {
        column: filtros?.orderBy || 'created_at',
        ascending: filtros?.orderDirection === 'asc'
      },
      limit: filtros?.limit || 20,
      offset: filtros?.offset || 0
    });
  }

  async buscarNotificacaoPorId(id: string): Promise<APIResponse<Notificacao>> {
    return apiClient.findById<Notificacao>(this.table, id);
  }

  async criarNotificacao(data: CreateNotificacaoDTO): Promise<APIResponse<Notificacao>> {
    const notificacaoData = {
      ...data,
      lida: false,
      created_at: new Date().toISOString()
    };

    return apiClient.create<Notificacao>(this.table, notificacaoData, { returning: true });
  }

  async marcarComoLida(id: string): Promise<APIResponse<Notificacao>> {
    return apiClient.update<Notificacao>(this.table, id, {
      lida: true,
      updated_at: new Date().toISOString()
    }, { returning: true });
  }

  async marcarTodasComoLidas(alunoId: string): Promise<APIResponse<{ count: number }>> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .update({ lida: true, updated_at: new Date().toISOString() })
        .eq('aluno_id', alunoId)
        .eq('lida', false)
        .select();

      if (error) throw error;

      return {
        success: true,
        data: { count: data?.length || 0 }
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code
        }
      };
    }
  }

  async eliminarNotificacao(id: string): Promise<APIResponse<null>> {
    return apiClient.delete(this.table, id);
  }

  async limparTodas(alunoId: string): Promise<APIResponse<{ count: number }>> {
    try {
      const { error } = await supabase
        .from(this.table)
        .delete()
        .eq('aluno_id', alunoId);

      if (error) throw error;

      return {
        success: true,
        data: { count: 0 }
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code
        }
      };
    }
  }

  async listarNaoLidas(alunoId: string): Promise<APIResponse<Notificacao[]>> {
    return this.listarNotificacoes({
      aluno_id: alunoId,
      lida: false,
      orderBy: 'created_at',
      orderDirection: 'desc'
    });
  }

  async contarNaoLidas(alunoId: string): Promise<APIResponse<{ count: number }>> {
    try {
      const { count, error } = await supabase
        .from(this.table)
        .select('*', { count: 'exact', head: true })
        .eq('aluno_id', alunoId)
        .eq('lida', false);

      if (error) throw error;

      return {
        success: true,
        data: { count: count || 0 }
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message,
          code: error.code
        }
      };
    }
  }

  async criarNotificacaoParaAdmins(data: Omit<CreateNotificacaoDTO, 'aluno_id'>): Promise<void> {
    try {
      const { data: admins } = await supabase
        .from('perfis')
        .select('id')
        .in('role', ['admin', 'super_admin']);

      if (!admins) return;

      for (const admin of admins) {
        await this.criarNotificacao({
          ...data,
          aluno_id: admin.id,
          tipo: 'sistema'
        });
      }
    } catch (error) {
      console.error('Erro ao notificar admins:', error);
    }
  }

  async notificarCertificadoEmitido(alunoId: string, cursoNome: string, certificadoId: string): Promise<void> {
    await this.criarNotificacao({
      aluno_id: alunoId,
      tipo: 'certificado',
      titulo: '🎓 Certificado Emitido',
      mensagem: `Seu certificado do curso "${cursoNome}" já está disponível para download.`,
      acao_link: `/area-do-aluno/certificados/${certificadoId}`,
      acao_texto: 'Ver Certificado'
    });
  }

  async notificarInscricaoConfirmada(alunoId: string, cursoNome: string, inscricaoId: string): Promise<void> {
    await this.criarNotificacao({
      aluno_id: alunoId,
      tipo: 'curso',
      titulo: '✅ Inscrição Confirmada',
      mensagem: `Sua inscrição no curso "${cursoNome}" foi confirmada.`,
      acao_link: `/area-do-aluno/inscricoes/${inscricaoId}`,
      acao_texto: 'Ver Detalhes'
    });
  }

  async notificarPagamentoRecebido(alunoId: string, valor: number, pagamentoId: string): Promise<void> {
    await this.criarNotificacao({
      aluno_id: alunoId,
      tipo: 'pagamento',
      titulo: '💰 Pagamento Recebido',
      mensagem: `Recebemos o pagamento de ${valor.toLocaleString()} AOA.`,
      acao_link: `/area-do-aluno/pagamentos/${pagamentoId}`,
      acao_texto: 'Ver Recibo'
    });
  }
}

export const notificacoesService = new NotificacoesService();