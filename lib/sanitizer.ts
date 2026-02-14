/**
 * Academia AMOFARMA - Sanitizer Service
 * Proteção de integridade de dados no frontend
 */

class SanitizerService {
  /**
   * Remove tags HTML perigosas e scripts de uma string
   */
  public sanitizeString(input: string): string {
    if (!input || typeof input !== 'string') return '';
    // Proteção básica contra tags e scripts
    let sanitized = input.replace(/<[^>]*>/g, '');
    sanitized = sanitized.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/javascript:/gi, 'blocked:');
    
    if (sanitized.length > 10000) {
      sanitized = sanitized.substring(0, 10000);
    }
    return sanitized;
  }

  /**
   * Valida e limpa formato de Bilhete de Identidade Angolano
   */
  public sanitizeBI(bi: string): string {
    const sanitized = bi.replace(/[^0-9A-Z]/gi, '').toUpperCase().substring(0, 14);
    const biRegex = /^[0-9]{9}[A-Z]{2}[0-9]{3}$/;
    return biRegex.test(sanitized) ? sanitized : '';
  }

  /**
   * Valida e limpa email
   */
  public sanitizeEmail(email: string): string {
    const sanitized = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(sanitized) ? sanitized : '';
  }

  /**
   * Sanitiza um objeto recursivamente
   */
  public sanitizeObject<T extends object>(obj: T): T {
    const result: any = Array.isArray(obj) ? [] : {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        result[key] = this.sanitizeString(value);
      } else if (typeof value === 'object' && value !== null) {
        result[key] = this.sanitizeObject(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }
}

export const sanitizer = new SanitizerService();