import jsPDF from 'jspdf';
import 'jspdf-autotable';

export type CertificadoData = {
  aluno: string;
  curso: string;
  data_conclusao: string;
  carga_horaria?: number;
  nota?: string;
  qrCodeUrl?: string;
  codigo_verificacao?: string;
};

class PDFGenerator {
  async generateCertificado(data: CertificadoData): Promise<string> {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Estilo Visual Premium
    doc.setDrawColor(26, 26, 58);
    doc.setLineWidth(2);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
    
    doc.setDrawColor(232, 76, 92);
    doc.setLineWidth(0.5);
    doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(40);
    doc.setTextColor(26, 26, 58);
    doc.text('AMOFARMA', pageWidth / 2, 40, { align: 'center' });

    doc.setFontSize(16);
    doc.setTextColor(232, 76, 92);
    doc.text('Academia de Farmácia de Angola', pageWidth / 2, 50, { align: 'center' });

    doc.setFontSize(32);
    doc.setTextColor(26, 26, 58);
    doc.text('CERTIFICADO', pageWidth / 2, 80, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text('Conferimos este diploma a:', pageWidth / 2, 100, { align: 'center' });

    doc.setFontSize(24);
    doc.setTextColor(26, 26, 58);
    doc.setFont('helvetica', 'bold');
    doc.text(data.aluno, pageWidth / 2, 115, { align: 'center' });

    doc.setFontSize(14);
    doc.setTextColor(80, 80, 80);
    doc.setFont('helvetica', 'normal');
    doc.text(`pela conclusão com aproveitamento do programa especializado em`, pageWidth / 2, 130, { align: 'center' });

    doc.setFontSize(18);
    doc.setTextColor(232, 76, 92);
    doc.setFont('helvetica', 'bold');
    doc.text(data.curso, pageWidth / 2, 145, { align: 'center' });

    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(`Carga Horária: ${data.carga_horaria}h | Código: ${data.codigo_verificacao}`, 20, pageHeight - 20);

    return doc.output('datauristring');
  }

  async downloadPDF(pdfData: string, filename: string): Promise<void> {
    const link = document.createElement('a');
    link.href = pdfData;
    link.download = filename;
    link.click();
  }
}

export const pdfGenerator = new PDFGenerator();