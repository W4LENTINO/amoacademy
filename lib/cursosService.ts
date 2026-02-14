import { apiClient, APIResponse } from './apiClient';
import { Curso, supabase } from './supabase';

export type CursosFiltros = {
  categoria?: string;
  status?: 'activo' | 'inactivo' | 'rascunho';
  destaque_home?: boolean;
  search?: string;
  limit?: number;
  offset?: number;
};

class CursosService {
  private readonly table = 'cursos';

  async listarCursos(filtros?: CursosFiltros): Promise<APIResponse<Curso[]>> {
    const filters: Record<string, any> = {};
    if (filtros?.categoria) filters.categoria = filtros.categoria;
    if (filtros?.status) filters.status = filtros.status;
    if (filtros?.destaque_home !== undefined) filters.destaque_home = filtros.destaque_home;

    return apiClient.findMany<Curso>(this.table, {
      filters,
      search: filtros?.search ? { column: 'titulo', term: filtros.search } : undefined,
      limit: filtros?.limit || 10,
      offset: filtros?.offset || 0,
      order: { column: 'created_at', ascending: false }
    });
  }

  async buscarCursoPorId(id: string): Promise<APIResponse<Curso>> {
    return apiClient.findById<Curso>(this.table, id);
  }

  async criarCurso(data: Partial<Curso>): Promise<APIResponse<Curso>> {
    return apiClient.create<Curso>(this.table, data, { returning: true });
  }

  async atualizarCurso(id: string, data: Partial<Curso>): Promise<APIResponse<Curso>> {
    return apiClient.update<Curso>(this.table, id, data, { returning: true });
  }

  async eliminarCurso(id: string): Promise<APIResponse<null>> {
    return apiClient.delete(this.table, id);
  }

  async getEstatisticas(): Promise<APIResponse<any>> {
    try {
      const [total, activos, categorias] = await Promise.all([
        supabase.from(this.table).select('*', { count: 'exact', head: true }),
        supabase.from(this.table).select('*', { count: 'exact', head: true }).eq('status', 'activo'),
        supabase.from(this.table).select('categoria')
      ]);

      const counts: any = {};
      categorias.data?.forEach((c: any) => {
        counts[c.categoria] = (counts[c.categoria] || 0) + 1;
      });

      return {
        success: true,
        data: {
          total_cursos: total.count || 0,
          cursos_activos: activos.count || 0,
          por_categoria: counts
        }
      };
    } catch (e: any) {
      return { success: false, error: { message: e.message, code: 'STATS_ERROR' } };
    }
  }
}

export const cursosService = new CursosService();
