import { supabase } from './supabase';

// Added 'erro_sistema' to LogTipo union to allow logging system errors in the apiClient
export type LogTipo = 
  | 'login_sucesso'
  | 'login_falha'
  | 'logout'
  | '2fa_ativado'
  | 'tentativa_invasao'
  | 'acesso_admin'
  | 'ip_bloqueado'
  | 'rate_limit_excedido'
  | 'csrf_invalido'
  | 'erro_sistema';

export interface LogEntry {
  tipo: LogTipo;
  usuario_id?: string;
  email?: string;
  detalhes?: Record<string, any>;
}

class AuditLogger {
  /**
   * Regista um evento de segurança no banco de dados
   */
  public async log(entry: LogEntry) {
    try {
      let clientIp = '0.0.0.0';
      try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        clientIp = data.ip;
      } catch (e) {
        console.warn('Não foi possível obter o IP do cliente');
      }
      
      const logData = {
        ...entry,
        ip: clientIp,
        user_agent: navigator.userAgent,
        created_at: new Date().toISOString()
      };

      if (process.env.NODE_ENV === 'development') {
        console.log(`[AUDIT LOG] ${entry.tipo.toUpperCase()}:`, logData);
      }
      
      const { error } = await supabase.from('logs_seguranca').insert([logData]);
      if (error) throw error;
    } catch (err) {
      console.warn('Falha ao persistir log de auditoria:', err);
    }
  }

  public async logSecurityAlert(entry: LogEntry) {
    await this.log({
      ...entry,
      detalhes: { ...entry.detalhes, alerta: true, nivel: 'alto' }
    });
  }
}

export const auditLogger = new AuditLogger();