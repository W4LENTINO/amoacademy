import React from 'react';
import { Helmet } from 'react-helmet';
import { useStudentData } from '../../hooks/useStudentData';
import { StudentSidebar } from '../../components/student/StudentSidebar';
import { StudentHeader } from '../../components/student/StudentHeader';
import { CourseProgress } from '../../components/student/CourseProgress';

const StudentCourses: React.FC = () => {
  const { cursosInscritos, loading } = useStudentData();
  return (
    <>
      <Helmet><title>Meus Programas | Academia AMOFARMA</title></Helmet>
      <div className="min-h-screen bg-slate-50 flex">
        <StudentSidebar />
        <div className="flex-1">
          <StudentHeader title="Meus Programas" subtitle="Gestão de percurso académico" />
          <main className="p-8 md:p-12">
            {loading ? (
              <div className="flex justify-center py-24"><div className="w-12 h-12 border-4 border-[#1a1a3a] border-t-transparent rounded-full animate-spin"></div></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {cursosInscritos.map(c => <CourseProgress key={c.id} course={c} detailed />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};
export default StudentCourses;