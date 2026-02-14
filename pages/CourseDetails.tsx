import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Course } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface CourseDetailsProps {
  courses: Course[];
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ courses }) => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const course = courses.find(c => c.id === id);

  if (!course) return <div className="py-48 text-center font-black uppercase text-slate-200 text-3xl tracking-tighter">Formação não localizada no Arquivo Digital</div>;

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/cursos/${id}` } });
      return;
    }
    navigate(`/checkout/${id}`);
  };

  return (
    <div className="bg-[#fdfdfd] min-h-screen pb-40">
      <div className="h-[70vh] relative overflow-hidden">
        <img src={course.image} className="w-full h-full object-cover grayscale-[0.2]" alt={course.title} />
        <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[2px] flex items-center justify-center">
          <div className="text-center px-6 max-w-5xl animate-reveal">
            <span className="text-[#e84c5c] text-[12px] font-black uppercase tracking-[0.8em] mb-10 block opacity-100">{course.category}</span>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-8">{course.title}</h1>
            <p className="text-slate-300 text-lg font-light italic opacity-60 max-w-2xl mx-auto">"Excelência na Prática Farmacêutica Angolana"</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-32 grid grid-cols-1 lg:grid-cols-12 gap-24">
        <div className="lg:col-span-8 space-y-24">
          <section>
            <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tight mb-12 pb-6 border-b border-slate-100 inline-block">Proposta Académica</h2>
            <div className="text-slate-600 leading-[2.2] text-xl font-light italic space-y-8">
              <p>{course.longDescription}</p>
            </div>
          </section>

          <section className="bg-slate-50 p-16 rounded-[2.5rem] border-l-8 border-[#1a1a3a] shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight mb-16">Resultados da Aprendizagem</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {course.learningOutcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start space-x-6 group">
                  <span className="text-[#e84c5c] text-2xl group-hover:scale-125 transition-transform">⚖️</span>
                  <span className="text-slate-700 font-medium text-sm leading-relaxed uppercase tracking-tight">{outcome}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
             <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight mb-12">Metodologia de Rigor</h2>
             <p className="text-slate-500 text-lg font-light leading-relaxed mb-10 italic">
               Este programa utiliza metodologias ativas de aprendizagem, com foco em estudos de caso reais do mercado angolano e simulações laboratoriais avançadas.
             </p>
          </section>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-white border border-slate-100 p-14 shadow-premium sticky top-36 rounded-[2.5rem]">
                <div className="mb-14">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-6">Investimento de Elite</p>
                  <h3 className="text-5xl font-black text-[#e84c5c] leading-none tracking-tighter">{course.price.toLocaleString()} <span className="text-lg font-bold">AOA</span></h3>
                </div>

                <div className="space-y-8 mb-16">
                  <div className="flex justify-between py-5 border-b border-slate-50">
                    <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Carga Horária</span>
                    <span className="text-slate-900 font-black text-[11px] uppercase">{course.hours} Horas Académicas</span>
                  </div>
                  <div className="flex justify-between py-5 border-b border-slate-50">
                    <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Responsável Técnico</span>
                    <span className="text-slate-900 font-black text-[11px] uppercase italic">{course.instructor}</span>
                  </div>
                  <div className="flex justify-between py-5 border-b border-slate-50">
                    <span className="text-slate-400 font-bold uppercase text-[9px] tracking-widest">Protocolo ARMED</span>
                    <span className="text-[#10b981] font-black text-[11px] uppercase tracking-widest">Certificado Válido</span>
                  </div>
                </div>

                <button 
                  onClick={handleEnroll}
                  disabled={isLoading}
                  className="w-full bg-[#1a1a3a] hover:bg-[#e84c5c] text-white py-8 rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] transition-all mb-8 shadow-2xl disabled:opacity-50"
                >
                  {isLoading ? 'Interrogando Conselho Académico...' : 'Iniciar Candidatura de Admissão'}
                </button>
                <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-[0.3em] italic">Admissão sujeita a rigorosa avaliação curricular</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;