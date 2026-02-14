import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../../hooks/useAdminData.ts';
import { StatusBadge } from '../../components/admin/StatusBadge.tsx';
import SEO from '../../components/SEO.tsx';

const AdminDashboard: React.FC = () => {
  const { stats, recentActivities, enrollments, loading } = useAdminData();

  if (loading || !stats) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#1a1a3a] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Sincronizando Consola Master...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-reveal">
      <SEO title="Painel Administrativo" />
      
      {/* Dynamic Command Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-slate-200 pb-10">
        <div>
          <h2 className="text-4xl font-black text-[#1a1a3a] tracking-tighter uppercase leading-none">Consola Central de Gestão</h2>
          <div className="flex items-center mt-6 space-x-6">
            <span className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-3 animate-pulse"></span>
              Protocolos Online
            </span>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Luanda HQ • {new Date().toLocaleTimeString()}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link to="/acesso-a7f9k2/relatorios" className="bg-white border border-slate-200 text-slate-500 px-8 py-4 rounded-xl text-[10px] font-black tracking-widest hover:bg-slate-50 transition shadow-sm uppercase">Extrair Relatórios</Link>
          <Link to="/acesso-a7f9k2/cursos" className="bg-[#1a1a3a] text-white px-10 py-4 rounded-xl text-[10px] font-black tracking-widest shadow-xl shadow-[#1a1a3a]/20 hover:bg-[#e84c5c] transition uppercase">Configurar Unidades</Link>
        </div>
      </div>

      {/* Analytics Grid Elite */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { label: 'Matrículas Activas', value: stats.totalStudents, trend: `+${stats.studentGrowth}%`, icon: '👥', color: 'text-[#1a1a3a]' },
          { label: 'Unidades Letivas', value: stats.activeCourses, trend: 'Estável', icon: '📚', color: 'text-[#1a1a3a]' },
          { label: 'Diplomas Gerados', value: stats.certsToday, trend: '92% Efic.', icon: '📜', color: 'text-emerald-600' },
          { label: 'Novos Candidatos', value: stats.pendingEnrollments, trend: 'URGENTE', icon: '📋', color: 'text-[#e84c5c]' },
          { label: 'Alertas Perímetro', value: stats.securityAlerts, trend: '-24h', icon: '🛡️', color: 'text-red-600' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-50 hover:shadow-premium transition-all group">
            <div className="flex justify-between items-start mb-8">
              <div className="text-4xl opacity-10 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">{item.icon}</div>
              <span className={`text-[9px] font-black px-3 py-1.5 uppercase rounded-lg tracking-widest ${
                item.color.includes('emerald') ? 'bg-emerald-50 text-emerald-600' : 
                item.color.includes('red') ? 'bg-red-50 text-red-600' : 'bg-slate-50 text-slate-400'
              }`}>
                {item.trend}
              </span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">{item.label}</p>
            <p className={`text-5xl font-black ${item.color} leading-none tracking-tighter`}>{item.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Operational Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Security Command Feed */}
        <div className="lg:col-span-2 bg-slate-900 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e84c5c] rounded-full blur-[200px] opacity-10 -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-16 border-b border-white/10 pb-8">
              <h3 className="font-black text-2xl uppercase tracking-tighter">Security Operations Center</h3>
              <span className="text-[10px] font-black text-[#e84c5c] uppercase tracking-[0.6em] animate-pulse">Live Perímetro Monitor</span>
            </div>
            
            <div className="space-y-8">
              {recentActivities.slice(0, 4).map((log, i) => (
                <div key={i} className="flex items-center space-x-8 p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/10 transition-colors cursor-default">
                  <span className="font-mono text-xs text-white/20">{log.time}</span>
                  <div className={`w-3 h-3 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] ${
                    log.status === 'danger' ? 'bg-red-500' : log.status === 'success' ? 'bg-emerald-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                     <p className="text-sm font-bold text-white/90 uppercase tracking-tight">{log.title}</p>
                     <p className="text-xs text-white/40 mt-1 font-medium italic">{log.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enrollment Queue */}
        <div className="bg-white rounded-[4rem] shadow-sm border border-slate-100 overflow-hidden flex flex-col">
          <div className="p-12 border-b border-slate-50 bg-slate-50/30">
            <h3 className="font-black text-[#1a1a3a] uppercase text-xl tracking-tighter">Fila de Admissão</h3>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Validação Curricular Pendente</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-50 student-scrollbar">
            {enrollments.length > 0 ? enrollments.slice(0, 6).map((e) => (
              <div key={e.id} className="p-10 hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 bg-slate-100 group-hover:bg-[#1a1a3a] group-hover:text-white rounded-2xl flex items-center justify-center text-slate-400 font-black text-lg transition-all uppercase border border-slate-100">
                    {e.studentName?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-black text-[#1a1a3a] uppercase truncate leading-none mb-2">{e.studentName}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase truncate tracking-widest">{e.courseName}</p>
                  </div>
                  <StatusBadge status={e.status === 'confirmed' ? 'valid' : 'pending'} />
                </div>
              </div>
            )) : (
              <div className="p-24 text-center text-slate-200 font-black text-[10px] uppercase tracking-[0.5em]">Fila Limpa.</div>
            )}
          </div>
          <Link to="/acesso-a7f9k2/inscricoes" className="block p-10 text-center text-[10px] font-black text-[#1a1a3a] bg-slate-50 hover:bg-slate-100 uppercase tracking-[0.6em] transition-colors border-t border-slate-100">
            Gerir Todo o Fluxo &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;