
import React from 'react';
import { Link } from 'react-router-dom';
import { Enrollment } from '../types';

interface AdminDashboardProps {
  stats: {
    totalStudents: number;
    activeCourses: number;
    certsToday: number;
    pendingEnrollments: number;
    blockedIPs: number;
  };
  latestEnrollments: Enrollment[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ stats, latestEnrollments }) => {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header Summary */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">Consola de Gestão</h2>
          <p className="text-gray-400 font-medium mt-1">Dados consolidados da Academia AmoFarma - {new Date().toLocaleDateString('pt-PT')}</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border-2 border-gray-100 text-gray-500 px-6 py-3 rounded-2xl text-xs font-black tracking-widest hover:bg-gray-50 transition shadow-sm uppercase">Relatórios</button>
          <button className="bg-[#10b981] text-white px-8 py-3 rounded-2xl text-xs font-black tracking-widest shadow-xl shadow-[#10b981]/30 hover:bg-[#059669] transition uppercase transform active:scale-95">Configurar Cursos</button>
        </div>
      </div>

      {/* Grid de Estatísticas Principais - PDF 2.2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          { label: 'ALUNOS', val: stats.totalStudents, trend: '+4.2%', icon: '👨‍🎓', color: 'text-gray-800' },
          { label: 'CURSOS', val: stats.activeCourses, trend: 'Ativos', icon: '📚', color: 'text-gray-800' },
          { label: 'CERTS/DIA', val: stats.certsToday, trend: '72% Meta', icon: '📜', color: 'text-emerald-500' },
          { label: 'PENDENTES', val: stats.pendingEnrollments, trend: 'Urgente', icon: '📋', color: 'text-amber-500' },
          { label: 'IPs BLOCK', val: stats.blockedIPs, trend: '24h', icon: '🛡️', color: 'text-red-500' }
        ].map((s, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-start mb-4">
               <span className="text-2xl">{s.icon}</span>
               <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase ${
                 s.color.includes('emerald') ? 'bg-emerald-50 text-emerald-600' : 
                 s.color.includes('amber') ? 'bg-amber-50 text-amber-600' : 
                 s.color.includes('red') ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'
               }`}>{s.trend}</span>
            </div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
            <p className={`text-4xl font-black ${s.color}`}>{s.val.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Alertas de Monitorização - PDF 12.0 */}
      <div className="bg-white p-2 rounded-[2.5rem] shadow-sm border border-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <div className="bg-red-50/50 p-6 rounded-[2rem] border border-red-100 flex items-center space-x-5">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">🚨</div>
            <div>
              <p className="text-[10px] font-black text-red-400 uppercase tracking-widest">Segurança Crítica</p>
              <p className="text-sm font-black text-red-900 leading-tight">2 Bloqueios de IP nas últimas 2h</p>
            </div>
          </div>
          <div className="bg-amber-50/50 p-6 rounded-[2rem] border border-amber-100 flex items-center space-x-5">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">⚠️</div>
            <div>
              <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest">Certificados</p>
              <p className="text-sm font-black text-amber-900 leading-tight">8 Aguardam validação final</p>
            </div>
          </div>
          <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100 flex items-center space-x-5">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">📘</div>
            <div>
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Novas Inscrições</p>
              <p className="text-sm font-black text-blue-900 leading-tight">Inscrições abertas há 48h sem resposta</p>
            </div>
          </div>
          <div className="bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100 flex items-center space-x-5">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-xl shadow-inner">⚡</div>
            <div>
              <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Estado do Sistema</p>
              <p className="text-sm font-black text-emerald-900 leading-tight">Sincronização Cloud OK</p>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizações de Dados - PDF 2.2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gráfico de Crescimento (Mockup Visual) */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-50 flex flex-col">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-lg font-black text-gray-800 tracking-tight uppercase">Crescimento de Inscrições</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Histórico dos últimos 12 meses</p>
            </div>
            <select className="bg-gray-50 border-none text-[10px] font-black uppercase text-gray-500 rounded-xl p-3 outline-none ring-1 ring-gray-100">
              <option>Ano Civil 2025</option>
              <option>Ano Civil 2024</option>
            </select>
          </div>
          
          <div className="flex-1 min-h-[300px] flex items-end justify-between px-6 pb-4 relative">
             {/* Linhas de grelha simuladas */}
             <div className="absolute inset-x-0 bottom-4 h-[1px] bg-gray-100" />
             <div className="absolute inset-x-0 top-1/4 h-[1px] bg-gray-50" />
             <div className="absolute inset-x-0 top-1/2 h-[1px] bg-gray-50" />
             <div className="absolute inset-x-0 top-3/4 h-[1px] bg-gray-50" />
             
             {[45, 62, 58, 85, 74, 95, 120, 110, 105, 130, 155, 180].map((val, idx) => (
               <div key={idx} className="flex-1 mx-1.5 flex flex-col items-center group relative z-10">
                  <div 
                    className="w-full bg-[#10b981]/10 rounded-t-xl group-hover:bg-[#10b981] transition-all duration-500 cursor-pointer relative" 
                    style={{ height: `${(val / 180) * 100}%` }}
                  >
                     <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[9px] font-black px-3 py-1.5 rounded-lg whitespace-nowrap z-20 shadow-xl transition-all">
                        {val} Alunos
                     </div>
                  </div>
                  <span className="text-[8px] font-black text-gray-300 mt-4 uppercase group-hover:text-gray-600 transition-colors">
                    {['J','F','M','A','M','J','J','A','S','O','N','D'][idx]}
                  </span>
               </div>
             ))}
          </div>
        </div>

        {/* Últimas Inscrições - PDF 7.0 */}
        <div className="bg-white rounded-[3rem] shadow-sm border border-gray-50 flex flex-col overflow-hidden">
          <div className="p-10 border-b border-gray-50">
            <h3 className="text-lg font-black text-gray-800 tracking-tight uppercase">Entradas Recentes</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Últimas 10 Inscrições</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {latestEnrollments.map((e, idx) => (
              <div key={e.id} className={`p-8 hover:bg-[#10b981]/5 transition-colors flex items-center space-x-5 ${idx !== latestEnrollments.length - 1 ? 'border-b border-gray-50/50' : ''}`}>
                <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center font-black text-sm border border-gray-100 group-hover:bg-[#10b981]/20">
                  {e.studentName.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-gray-800 truncate leading-tight uppercase tracking-tight">{e.studentName}</p>
                  <p className="text-[10px] text-gray-400 font-bold truncate mt-1 uppercase tracking-wider">{e.courseName}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">{new Date(e.date).toLocaleDateString('pt-PT')}</p>
                  <span className={`text-[8px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest border ${
                    e.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                  }`}>
                    {e.status === 'confirmed' ? 'VALIDADO' : 'PENDENTE'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/acesso-a7f9k2/inscricoes" className="p-6 text-center text-[10px] font-black text-[#10b981] bg-gray-50 hover:bg-gray-100 uppercase tracking-[0.2em] transition-colors">
            Gerir Todas as Inscrições &rarr;
          </Link>
        </div>
      </div>

      {/* Tabela de Popularidade de Cursos */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-50">
         <h3 className="text-lg font-black text-gray-800 tracking-tight uppercase mb-8">Popularidade de Formações</h3>
         <div className="space-y-6">
            {[
              { label: 'Farmacovigilância Avançada', val: 78, color: 'bg-emerald-500' },
              { label: 'Gestão de Farmácia Hospitalar', val: 54, color: 'bg-blue-500' },
              { label: 'Atendimento Farmacêutico', val: 92, color: 'bg-[#10b981]' },
              { label: 'Legislação Farmacêutica Angolana', val: 32, color: 'bg-amber-500' }
            ].map((c, i) => (
              <div key={i} className="space-y-2">
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-600">
                    <span>{c.label}</span>
                    <span className="text-gray-400">{c.val}% de Ocupação</span>
                 </div>
                 <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100 shadow-inner">
                    <div className={`h-full ${c.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${c.val}%` }} />
                 </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
