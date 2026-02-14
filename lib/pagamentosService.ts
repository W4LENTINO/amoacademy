import { apiClient, APIResponse } from './apiClient';
import { Pagamento, supabase } from './supabase';
import { notificacoesService } from './notificacoesService';

class PagamentosService {
  private readonly table = 'pagamentos';

  async criarPagamento(data: any): Promise<APIResponse<Pagamento>> {
    const pagamentoData = {
      ...data,
      estado: 'pendente',
      moeda: 'AOA',
      created_at: new Date().toISOString()
    };

    const result = await apiClient.create<Pagamento>(this.table, pagamentoData, { returning: true });
    
    if (result.success && result.data && data.inscricao_id) {
      await notificacoesService.criarNotificacaoParaAdmins({
        tipo: 'pagamento',
        titulo: 'Novo Comprovativo Submetido',
        mensagem: `Foi submetido um novo comprovativo de pagamento para validação.`,
        acao_link: `/acesso-a7f9k2/inscricoes`
      });
    }

    return result;
  }

  async confirmarPagamento(id: string): Promise<APIResponse<Pagamento>> {
    const result = await apiClient.update<Pagamento>(this.table, id, { 
      estado: 'concluido',
      data_pagamento: new Date().toISOString()
    }, { returning: true });

    if (result.success && result.data) {
      if (result.data.inscricao_id) {
        await supabase.from('inscricoes').update({ status: 'confirmada' }).eq('id', result.data.inscricao_id);
      }
      
      await notificacoesService.criarNotificacao({
        aluno_id: result.data.aluno_id,
        tipo: 'pagamento',
        titulo: 'Pagamento Confirmado',
        mensagem: 'O seu pagamento foi validado com sucesso. Bem-vindo ao programa!',
        acao_link: '/area-do-aluno'
      });
    }

    return result;
  }

  async listarPagamentosPorAluno(alunoId: string): Promise<APIResponse<Pagamento[]>> {
    return apiClient.findMany<Pagamento>(this.table, {
      filters: { aluno_id: alunoId },
      order: { column: 'created_at', ascending: false }
    });
  }
}

export const pagamentosService = new PagamentosService();
