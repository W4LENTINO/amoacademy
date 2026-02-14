import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useStudentData } from '../../hooks/useStudentData';
import { CourseProgress } from '../../components/student/CourseProgress';
import { CertificateCard } from '../../components/student/CertificateCard';
import { PaymentCard } from '../../components/student/PaymentCard';
import { StudentSidebar } from '../../components/student/StudentSidebar';
import { StudentHeader } from '../../components/student/StudentHeader';
import '../../styles/StudentArea.css';

const StudentDashboard: React.FC = () => {
  const { profile } = useAuth();
  const { cursosInscritos, certificados, pagamentos, notificacoesNaoLidas, estatisticas, loading } = useStudentData();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#1a1a3a] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sincronizando Arquivo Académico...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>Área do Aluno | Academia AMOFARMA</title></Helmet>
      <div className="min-h-screen bg-slate-50 flex">
        <StudentSidebar />
        <div className="flex-1 flex flex-col">
          <StudentHeader 
            title="Consola do Aluno" 
            subtitle="Bem-vindo de volta,"
            userName={profile?.nome_completo?.split(' ')[0]}
            notificationCount={notificacoesNaoLidas}
          />
          <main className="p-8 md:p-12 space-y-12 animate-reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Cursos Inscritos', val: estatisticas.cursosInscritos, icon: '📚', color: 'text-[#1a1a3a]' },
                { label: 'Cursos Concluídos', val: estatisticas.cursosConcluidos, icon: '🎓', color: 'text-emerald-600' },
                { label: 'Diplomas Digitais', val: estatisticas.certificados, icon: '📜', color: 'text-[#e84c5c]' },
                { label: 'Progresso Médio', val: `${estatisticas.mediaProgresso}%`, icon: '📈', color: 'text-blue-600' }
              ].map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-50 hover:shadow-xl transition-all">
                  <div className="text-3xl mb-4">{s.icon}</div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                  <p className={`text-4xl font-black ${s.color} tracking-tighter`}>{s.val}</p>
                </div>
              ))}
            </div>

            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-black text-[#1a1a3a] uppercase tracking-tight">Formações em Curso</h2>
                <Link to="/area-do-aluno/cursos" className="text-[10px] font-black text-[#e84c5c] uppercase tracking-widest border-b border-[#e84c5c]/20 pb-1">Ver todos os programas &rarr;</Link>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {cursosInscritos.slice(0, 2).map(c => <CourseProgress key={c.id} course={c} detailed />)}
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <h2 className="text-xl font-black text-[#1a1a3a] uppercase tracking-tight">Últimos Certificados</h2>
                <div className="space-y-6">
                  {certificados.length > 0 ? certificados.map(cert => <CertificateCard key={cert.id} certificate={cert} />) : (
                    <div className="p-12 text-center bg-white rounded-[2.5rem] border border-dashed text-slate-300 italic">Nenhum certificado emitido até ao momento.</div>
                  )}
                </div>
              </div>
              <div className="space-y-8">
                <h2 className="text-xl font-black text-[#1a1a3a] uppercase tracking-tight">Histórico Financeiro</h2>
                <div className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden border border-slate-50">
                  {pagamentos.slice(0, 3).map(p => <PaymentCard key={p.id} payment={p} />)}
                  <Link to="/area-do-aluno/pagamentos" className="block p-6 text-center text-[10px] font-black text-slate-400 bg-slate-50 hover:bg-slate-100 uppercase tracking-widest transition-colors">Extrato Completo</Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;