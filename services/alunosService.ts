import { apiClient, APIResponse } from '../lib/apiClient';
import { Perfil } from '../lib/supabase';

class AlunosService {
  private readonly table = 'perfis';

  async atualizarAluno(id: string, data: Partial<Perfil>): Promise<APIResponse<Perfil>> {
    return apiClient.update<Perfil>(this.table, id, data, { returning: true });
  }
}

export const alunosService = new AlunosService();