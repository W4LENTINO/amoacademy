import React, { useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar.tsx';
import { AdminHeader } from '../../components/admin/AdminHeader.tsx';
import { relatoriosService } from '../../services/relatoriosService.ts';
import SEO from '../../components/SEO.tsx';

const AdminReports: React.FC = () => {
  const [activeReport, setActiveReport] = useState<'vendas' | 'alunos' | 'cursos' | 'financeiro'>('vendas');
  const [dateRange, setDateRange] = useState({
    inicio: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    fim: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any>(null);

  const generateReport = async () => {
    setLoading(true);
    try {
      let result;
      switch (activeReport) {
        case 'vendas': result = await relatoriosService.gerarRelatorioVendas(dateRange.inicio, dateRange.fim); break;
        default: break;
      }
      if (result?.success) setReportData(result.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Relatórios e Estatísticas" />
      <div className="min-h-screen bg-slate-50 flex">
        <AdminSidebar />
        <div className="flex-1">
          <AdminHeader title="Relatórios e Estatísticas" subtitle="Análise de performance académica e financeira" />
          <main className="p-8">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50">
               <button onClick={generateReport} disabled={loading} className="px-10 py-3 bg-[#e84c5c] text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all disabled:opacity-50">Gerar Relatório</button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminReports;