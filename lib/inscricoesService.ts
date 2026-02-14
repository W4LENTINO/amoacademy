import { apiClient, APIResponse } from './apiClient';
import { Inscricao, supabase } from './supabase';
import { notificacoesService } from './notificacoesService';

class InscricoesService {
  private readonly table = 'inscricoes';

  async listarInscricoes(filtros?: any): Promise<APIResponse<Inscricao[]>> {
    return apiClient.findMany<Inscricao>(this.table, {
      filters: filtros,
      order: { column: 'data_inscricao', ascending: false }
    });
  }

  async criarInscricao(data: any): Promise<APIResponse<Inscricao>> {
    const inscricaoData = {
      ...data,
      status: 'pendente',
      data_inscricao: new Date().toISOString(),
      presenca: false,
      certificado_emitido: false
    };

    const result = await apiClient.create<Inscricao>(this.table, inscricaoData, { returning: true });
    
    if (result.success) {
      await notificacoesService.criarNotificacaoParaAdmins({
        tipo: 'curso',
        titulo: 'Nova Candidatura',
        mensagem: `${data.nome_completo} candidatou-se a um programa.`,
        acao_link: `/acesso-a7f9k2/inscricoes`
      });
    }

    return result;
  }

  async atualizarStatus(id: string, status: Inscricao['status']): Promise<APIResponse<Inscricao>> {
    return apiClient.update<Inscricao>(this.table, id, { status }, { returning: true });
  }

  async listarPorAluno(alunoId: string): Promise<APIResponse<Inscricao[]>> {
    return apiClient.findMany<Inscricao>(this.table, {
      filters: { aluno_id: alunoId },
      order: { column: 'data_inscricao', ascending: false }
    });
  }
}

export const inscricoesService = new InscricoesService();
