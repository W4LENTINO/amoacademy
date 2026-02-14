import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Course } from '../types';

interface CourseCatalogProps {
  courses: Course[];
}

const CourseCatalog: React.FC<CourseCatalogProps> = ({ courses }) => {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Farmácia Clínica', 'Gestão', 'Legislação', 'Saúde Pública'];

  const filteredCourses = filter === 'Todos' 
    ? courses 
    : courses.filter(c => c.category === filter);

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
      <Helmet>
        <title>Oferta Formativa | Academia AMOFARMA</title>
        <meta name="description" content="Especializações de elite para profissionais farmacêuticos angolanos. Programas em Farmácia Clínica, Gestão Hospitalar e Legislação ARMED." />
        <meta name="keywords" content="cursos farmácia angola, especialização farmacêutica, formação saúde luanda, pós-graduação farmácia" />
      </Helmet>

      <div className="bg-[#1a1a3a] text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e84c5c] rounded-full blur-[180px] opacity-10 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto animate-reveal relative z-10">
          <span className="text-[#e84c5c] text-[10px] font-black uppercase tracking-[0.6em] mb-6 block">Arquivo Académico</span>
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter uppercase leading-none">Excelência <br/><span className="text-[#e84c5c]">Formativa</span></h1>
          <p className="text-slate-400 text-lg max-w-2xl font-medium leading-relaxed italic opacity-80">
            "Rigor, Ciência & Prestígio." Programas desenhados para elevar o padrão da saúde em Angola.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-10">
        <div className="bg-white p-6 rounded-[2.5rem] shadow-premium mb-20 flex flex-wrap gap-3 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                filter === cat 
                ? 'bg-[#e84c5c] text-white shadow-xl scale-105' 
                : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-[#1a1a3a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredCourses.map(course => (
              <div key={course.id} className="bg-white rounded-[2.5rem] shadow-sm hover:shadow-premium transition-all group overflow-hidden border border-slate-100">
                <div className="h-60 relative overflow-hidden">
                  <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={course.title} />
                  <div className="absolute top-6 left-6 bg-[#1a1a3a]/90 backdrop-blur-md px-5 py-2.5 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white">
                    {course.category}
                  </div>
                </div>
                <div className="p-10 flex flex-col">
                  <h3 className="text-xl font-black text-[#1a1a3a] group-hover:text-[#e84c5c] transition-colors mb-4 leading-tight uppercase tracking-tight">{course.title}</h3>
                  <div className="flex items-center space-x-6 text-[9px] font-black text-slate-300 uppercase tracking-widest mb-6 border-b border-slate-50 pb-6">
                    <span className="flex items-center"><span className="mr-2 text-sm">🕒</span> {course.hours}H Rigor</span>
                    <span className="flex items-center"><span className="mr-2 text-sm">📜</span> Certificado</span>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-10 line-clamp-3 italic">
                    {course.shortDescription}
                  </p>
                  <Link to={`/cursos/${course.id}`} className="block w-full text-center bg-[#1a1a3a] hover:bg-[#e84c5c] text-white font-black py-5 rounded-2xl transition-all shadow-xl uppercase text-[10px] tracking-[0.3em]">
                    Ver Programa Detalhado
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-40 text-center bg-white rounded-[3rem] border border-dashed border-slate-200">
            <span className="text-5xl mb-6 block opacity-10">📂</span>
            <h3 className="text-xl font-black text-slate-300 uppercase tracking-[0.4em]">Nenhuma Formação Localizada</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;