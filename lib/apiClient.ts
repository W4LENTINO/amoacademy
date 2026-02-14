import { supabase } from './supabase';
import { auditLogger } from './auditLogger';
import { sanitizer } from './sanitizer';

export class APIError extends Error {
  status: number;
  code: string;
  details?: any;

  constructor(message: string, status: number = 500, code: string = 'INTERNAL_ERROR', details?: any) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export type APIResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: any;
  };
  meta?: {
    total?: number;
  };
};

class APIClient {
  private async handleRequest<T>(
    operation: () => Promise<{ data: T | null; error: any; count?: number | null }>,
    context: { operacao: string; dados?: any }
  ): Promise<APIResponse<T>> {
    try {
      if (context.dados) {
        context.dados = sanitizer.sanitizeObject(context.dados);
      }

      const startTime = Date.now();
      const { data, error, count } = await operation();
      const duration = Date.now() - startTime;

      if (error) {
        await auditLogger.log({
          tipo: 'erro_sistema',
          detalhes: {
            operacao: context.operacao,
            erro: error.message,
            duration
          }
        });

        throw new APIError(
          error.message,
          error.code === 'PGRST116' ? 404 : 400,
          error.code,
          error.details
        );
      }

      return {
        success: true,
        data: data || undefined,
        meta: count !== undefined && count !== null ? { total: count } : undefined
      };
    } catch (error: any) {
      return {
        success: false,
        error: {
          message: error.message || 'Erro interno do servidor',
          code: error.code || 'INTERNAL_ERROR',
          details: error.details
        }
      };
    }
  }

  async findMany<T>(
    table: string,
    options?: {
      filters?: Record<string, any>;
      select?: string;
      order?: { column: string; ascending?: boolean };
      limit?: number;
      offset?: number;
      search?: { column: string; term: string };
    }
  ): Promise<APIResponse<T[]>> {
    return this.handleRequest(async () => {
      let query = supabase.from(table).select(options?.select || '*', { count: 'exact' });

      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) query = query.eq(key, value);
        });
      }

      if (options?.search?.term && options?.search?.column) {
        query = query.ilike(options.search.column, `%${options.search.term}%`);
      }

      if (options?.order) {
        query = query.order(options.order.column, { ascending: options.order.ascending ?? true });
      }

      if (options?.limit) {
        query = query.range(options.offset || 0, (options.offset || 0) + options.limit - 1);
      }

      return await query;
    }, { operacao: `findMany:${table}`, dados: options });
  }

  async findById<T>(table: string, id: string, select?: string): Promise<APIResponse<T>> {
    return this.handleRequest(
      async () => await supabase.from(table).select(select || '*').eq('id', id).single(),
      { operacao: `findById:${table}`, dados: { id } }
    );
  }

  async create<T>(table: string, data: Partial<T>, options?: { returning?: boolean }): Promise<APIResponse<T>> {
    return this.handleRequest(
      async () => {
        const query = supabase.from(table).insert(data);
        if (options?.returning) {
          const res = await query.select().single();
          return { data: res.data as T, error: res.error };
        }
        const res = await query;
        return { data: null, error: res.error };
      },
      { operacao: `create:${table}`, dados: data }
    );
  }

  async update<T>(table: string, id: string, data: Partial<T>, options?: { returning?: boolean }): Promise<APIResponse<T>> {
    return this.handleRequest(
      async () => {
        const query = supabase.from(table).update(data).eq('id', id);
        if (options?.returning) {
          const res = await query.select().single();
          return { data: res.data as T, error: res.error };
        }
        const res = await query;
        return { data: null, error: res.error };
      },
      { operacao: `update:${table}`, dados: { id, ...data } }
    );
  }

  async delete(table: string, id: string): Promise<APIResponse<null>> {
    return this.handleRequest(
      async () => await supabase.from(table).delete().eq('id', id),
      { operacao: `delete:${table}`, dados: { id } }
    );
  }
}

export const apiClient = new APIClient();
