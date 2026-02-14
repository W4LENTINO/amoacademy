import { apiClient, APIResponse } from './apiClient';
import { Certificado, supabase } from './supabase';
import { encryption } from './encryption';

class CertificadosService {
  private readonly table = 'certificados';

  async buscarCertificadoPorCodigo(codigo: string): Promise<APIResponse<Certificado>> {
    try {
      const { data, error } = await supabase
        .from(this.table)
        .select('*')
        .eq('codigo_verificacao', codigo)
        .single();

      if (error) throw error;

      return { success: true, data };
    } catch (e: any) {
      return { success: false, error: { message: 'Certificado não localizado', code: 'NOT_FOUND' } };
    }
  }

  async emitirCertificado(data: any): Promise<APIResponse<Certificado>> {
    const code = `AMF-${new Date().getFullYear()}-${Math.random().toString(36).substring(7).toUpperCase()}`;
    const hash = await encryption.hash(`${data.aluno_id}-${data.curso_id}-${code}`);
    
    const certificadoData = {
      ...data,
      codigo_verificacao: code,
      hash_digital: hash,
      data_emissao: new Date().toISOString().split('T')[0],
      status: 'valido',
      visualizacoes: 0
    };

    return apiClient.create<Certificado>(this.table, certificadoData, { returning: true });
  }

  async listarCertificadosPorAluno(alunoId: string): Promise<APIResponse<Certificado[]>> {
    return apiClient.findMany<Certificado>(this.table, {
      filters: { aluno_id: alunoId, status: 'valido' },
      order: { column: 'data_emissao', ascending: false }
    });
  }
}

export const certificadosService = new CertificadosService();
