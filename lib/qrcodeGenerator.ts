import QRCode from 'qrcode';

class QRCodeGenerator {
  private readonly baseUrl = window.location.origin;

  async generate(data: string | object): Promise<string> {
    try {
      const content = typeof data === 'string' ? data : JSON.stringify(data);
      return await QRCode.toDataURL(content, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1a1a3a',
          light: '#ffffff'
        }
      });
    } catch (err) {
      console.error('Falha ao gerar QR Code:', err);
      throw err;
    }
  }

  async generateForCertificate(codigoVerificacao: string): Promise<string> {
    const url = `${this.baseUrl}/validar?codigo=${codigoVerificacao}`;
    return this.generate(url);
  }
}

export const qrcodeGenerator = new QRCodeGenerator();