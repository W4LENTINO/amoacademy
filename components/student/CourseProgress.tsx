import React from 'react';
import { Link } from 'react-router-dom';

interface CourseProgressProps {
  course: {
    id: string;
    titulo: string;
    progresso: number;
    data_inicio: string;
    data_fim: string;
    carga_horaria?: number;
    imagem?: string;
  };
  detailed?: boolean;
}

export const CourseProgress: React.FC<CourseProgressProps> = ({ course, detailed = false }) => {
  const progressColor = course.progresso < 30 ? 'bg-red-500' : course.progresso < 70 ? 'bg-amber-500' : 'bg-emerald-500';
  return (
    <div className={`bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-50 hover:shadow-xl transition-all ${detailed ? 'p-8' : ''}`}>
      {detailed ? (
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-black text-[#1a1a3a] uppercase tracking-tight mb-2">{course.titulo}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                {new Date(course.data_inicio).toLocaleDateString()} — {new Date(course.data_fim).toLocaleDateString()}
              </p>
            </div>
            <span className="text-3xl font-black text-[#e84c5c] leading-none">{course.progresso}%</span>
          </div>
          <div className="space-y-3">
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className={`h-full ${progressColor} transition-all duration-1000 ease-out`} style={{ width: `${course.progresso}%` }} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase mb-1">Carga Horária</p>
              <p className="font-bold text-[#1a1a3a]">{course.carga_horaria || 40}h</p>
            </div>
            <div className="text-right">
              <Link to={`/cursos/${course.id}`} className="inline-block bg-[#1a1a3a] text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#e84c5c] transition-all">Aceder</Link>
            </div>
          </div>
        </div>
      ) : (
        <Link to={`/cursos/${course.id}`} className="block p-5 hover:bg-slate-50 transition-colors">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
               <img src={course.imagem} className="w-full h-full object-cover" alt={course.titulo} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-black text-[#1a1a3a] text-sm uppercase truncate mb-2">{course.titulo}</h4>
              <div className="flex items-center space-x-3">
                 <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                   <div className={`h-full ${progressColor}`} style={{ width: `${course.progresso}%` }} />
                 </div>
                 <span className="text-[10px] font-black text-slate-400">{course.progresso}%</span>
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};