/**
 * Academia AMOFARMA - Encryption Service (Browser Compatible)
 */

class EncryptionService {
  /**
   * Gera um hash SHA-256 de uma string
   */
  async hash(data: string): Promise<string> {
    const msgUint8 = new TextEncoder().encode(data + (process.env.HASH_SALT || 'amofarma-default-salt'));
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Mascara dados sensíveis para exibição segura
   */
  maskSensitiveData(data: string, visibleChars: number = 4): string {
    if (!data) return '';
    if (data.length <= visibleChars) {
      return '*'.repeat(data.length);
    }
    const visible = data.slice(-visibleChars);
    const masked = '*'.repeat(data.length - visibleChars);
    return masked + visible;
  }

  /**
   * Gera um token aleatório seguro
   */
  generateToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
  }
}

export const encryption = new EncryptionService();
