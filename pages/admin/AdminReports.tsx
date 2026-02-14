import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminHeader } from '../../components/admin/AdminHeader';
import { relatoriosService } from '../../services/relatoriosService';

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
        case 'vendas':
          result = await relatoriosService.gerarRelatorioVendas(dateRange.inicio, dateRange.fim);
          break;
        case 'alunos':
          result = await relatoriosService.gerarRelatorioAlunos(dateRange.inicio, dateRange.fim);
          break;
        case 'cursos':
          result = await relatoriosService.gerarRelatorioCursos(dateRange.inicio, dateRange.fim);
          break;
        case 'financeiro':
          result = await relatoriosService.gerarRelatorioFinanceiro(dateRange.inicio, dateRange.fim);
          break;
      }
      if (result?.success) {
        setReportData(result.data);
      }
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = async () => {
    if (!reportData) return;
    
    const data = reportData.resumo ? [reportData.resumo] : reportData;
    const blob = await relatoriosService.exportarParaCSV(data, `relatorio-${activeReport}-${dateRange.inicio}.csv`);
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio-${activeReport}-${dateRange.inicio}.csv`;
    a.click();
  };

  return (
    <>
      <Helmet>
        <title>Relatórios | Painel Admin - AMOFARMA</title>
      </Helmet>

      <div className="min-h-screen bg-slate-50 flex">
        <AdminSidebar />
        
        <div className="flex-1">
          <AdminHeader 
            title="Relatórios e Estatísticas" 
            subtitle="Análise de performance académica e financeira"
          />

          <main className="p-8">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-50">
              <div className="flex flex-wrap gap-4 mb-10">
                {[
                  { id: 'vendas', label: '📊 Vendas', color: 'bg-blue-50 text-blue-600' },
                  { id: 'alunos', label: '👨‍🎓 Alunos', color: 'bg-emerald-50 text-emerald-600' },
                  { id: 'cursos', label: '📚 Cursos', color: 'bg-purple-50 text-purple-600' },
                  { id: 'financeiro', label: '💰 Financeiro', color: 'bg-amber-50 text-amber-600' }
                ].map(report => (
                  <button
                    key={report.id}
                    onClick={() => setActiveReport(report.id as any)}
                    className={`px-8 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
                      activeReport === report.id 
                        ? 'bg-[#1a1a3a] text-white shadow-xl scale-105' 
                        : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    {report.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-end gap-6 mb-12 p-8 bg-slate-50/50 rounded-3xl border border-slate-100">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Data Início</label>
                  <input
                    type="date"
                    value={dateRange.inicio}
                    onChange={(e) => setDateRange({ ...dateRange, inicio: e.target.value })}
                    className="px-5 py-3 border border-slate-200 rounded-xl focus:border-[#e84c5c] outline-none transition font-bold text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-2">Data Fim</label>
                  <input
                    type="date"
                    value={dateRange.fim}
                    onChange={(e) => setDateRange({ ...dateRange, fim: e.target.value })}
                    className="px-5 py-3 border border-slate-200 rounded-xl focus:border-[#e84c5c] outline-none transition font-bold text-sm"
                  />
                </div>
                <button
                  onClick={generateReport}
                  disabled={loading}
                  className="px-10 py-3 bg-[#e84c5c] hover:bg-[#1a1a3a] text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] transition-all disabled:opacity-50 shadow-lg shadow-red-100"
                >
                  {loading ? 'A processar...' : 'Gerar Relatório'}
                </button>
                {reportData && (
                  <button
                    onClick={exportToCSV}
                    className="px-8 py-3 border-2 border-slate-200 hover:bg-white text-slate-500 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all"
                  >
                    Exportar CSV
                  </button>
                )}
              </div>

              {reportData && (
                <div className="border-t border-slate-100 pt-10 animate-reveal">
                  <h3 className="text-xl font-black text-[#1a1a3a] uppercase tracking-tight mb-8">
                    Análise Consolidada: {activeReport.toUpperCase()}
                  </h3>
                  
                  <div className="space-y-12">
                    {reportData.resumo && (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {Object.entries(reportData.resumo).map(([key, value]) => (
                          <div key={key} className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-sm group hover:shadow-xl transition-all">
                            <p className="text-[10px] font-black text-slate-400 mb-3 uppercase tracking-widest">
                              {key.replace(/_/g, ' ')}
                            </p>
                            <p className="text-3xl font-black text-[#1a1a3a] tracking-tighter">
                              {typeof value === 'number' ? value.toLocaleString() : String(value)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {reportData.evolucao_diaria && (
                      <div className="bg-slate-50 rounded-[2.5rem] p-10 border border-slate-100">
                        <h4 className="font-black text-[10px] text-slate-400 uppercase tracking-[0.4em] mb-8">Fluxo Cronológico</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left">
                            <thead className="border-b border-slate-200">
                              <tr>
                                <th className="px-6 py-4 text-[9px] font-black text-slate-300 uppercase tracking-widest">Período</th>
                                <th className="px-6 py-4 text-[9px] font-black text-slate-300 uppercase tracking-widest text-center">Volume</th>
                                <th className="px-6 py-4 text-[9px] font-black text-slate-300 uppercase tracking-widest text-right">Valor Bruto</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {reportData.evolucao_diaria.map((item: any, index: number) => (
                                <tr key={index} className="hover:bg-white transition-colors">
                                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{item.data}</td>
                                  <td className="px-6 py-4 text-sm font-black text-[#1a1a3a] text-center">{item.quantidade}</td>
                                  <td className="px-6 py-4 text-sm font-black text-[#e84c5c] text-right">{item.valor?.toLocaleString()} AOA</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminReports;
