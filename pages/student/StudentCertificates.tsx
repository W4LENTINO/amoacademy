import React from 'react';
import { useStudentData } from '../../hooks/useStudentData.ts';
import { StudentSidebar } from '../../components/student/StudentSidebar.tsx';
import { StudentHeader } from '../../components/student/StudentHeader.tsx';
import { CertificateCard } from '../../components/student/CertificateCard.tsx';
import SEO from '../../components/SEO.tsx';

const StudentCertificates: React.FC = () => {
  const { certificados, loading } = useStudentData();
  return (
    <>
      <SEO title="Meus Certificados" />
      <div className="min-h-screen bg-slate-50 flex">
        <StudentSidebar />
        <div className="flex-1">
          <StudentHeader title="Diplomas & Credenciais" subtitle="Seu arquivo de excelência profissional" />
          <main className="p-8 md:p-12">
            {loading ? (
              <div className="flex justify-center py-24"><div className="w-12 h-12 border-4 border-[#1a1a3a] border-t-transparent rounded-full animate-spin"></div></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certificados.map(cert => <CertificateCard key={cert.id} certificate={cert} />)}
                {certificados.length === 0 && (
                  <div className="md:col-span-3 py-32 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
                    <span className="text-6xl mb-6 block opacity-10">📜</span>
                    <h3 className="text-xl font-black text-slate-300 uppercase tracking-widest">Nenhum certificado emitido</h3>
                  </div>
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};
export default StudentCertificates;