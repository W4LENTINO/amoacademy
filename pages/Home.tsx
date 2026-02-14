import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Course, BlogPost } from '../types.ts';
import SEO from '../components/SEO.tsx';

interface HomeProps {
  latestCourses: Course[];
  latestPosts: BlogPost[];
}

const Home: React.FC<HomeProps> = ({ latestCourses, latestPosts }) => {
  return (
    <div className="bg-white">
      <SEO 
        title="Excelência Farmacêutica em Angola" 
        description="Líder em formação farmacêutica de elite em Angola. Programas acreditados para profissionais de saúde."
      />

      {/* Hero Section Prestige */}
      <section className="relative bg-[#1a1a3a] text-white min-h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-[#e84c5c] rounded-full blur-[220px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#10b981] rounded-full blur-[200px] opacity-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-25"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full"
        >
          <div className="max-w-4xl">
            <div className="flex items-center space-x-5 mb-10">
              <span className="h-[2px] w-16 bg-[#e84c5c]"></span>
              <span className="text-[#e84c5c] text-[10px] font-black uppercase tracking-[0.6em]">Angola • Instituição de Referência</span>
            </div>
            <h1 className="text-6xl md:text-[10rem] font-black leading-[0.85] tracking-tighter mb-12 text-prestige">
              Rigor, Ciência & <br/><span className="text-[#e84c5c]">Prestígio</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-16 max-w-2xl font-light italic leading-relaxed opacity-90">
              "Fazendo a Diferença a Cada Dose". A Academia AMOFARMA redefine o padrão do ensino farmacêutico nacional através da excelência técnica e inovação académica constante.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <Link 
                to="/cursos" 
                className="bg-[#e84c5c] hover:bg-white hover:text-[#1a1a3a] text-white px-14 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all shadow-2xl shadow-[#e84c5c]/30 transform active:scale-95 text-center"
              >
                Oferta Formativa
              </Link>
              <Link 
                to="/validar" 
                className="bg-white/5 border border-white/20 hover:bg-white/10 text-white px-14 py-6 rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all backdrop-blur-md text-center"
              >
                Validar Diploma
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Seção de Cursos Recentes (Exemplo) */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-20">
          <div>
            <h2 className="text-5xl font-black text-[#1a1a3a] uppercase tracking-tighter">Elite <span className="text-[#e84c5c]">Formativa</span></h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] mt-4">Últimos Programas de Especialização</p>
          </div>
          <Link to="/cursos" className="text-[10px] font-black uppercase tracking-widest text-[#e84c5c] border-b-2 border-[#e84c5c]/20 pb-1">Ver Catálogo Completo &rarr;</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
           {latestCourses.map(c => (
             <div key={c.id} className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 group hover:bg-white hover:shadow-premium transition-all">
                <div className="h-60 overflow-hidden rounded-[2rem] mb-10 shadow-lg grayscale group-hover:grayscale-0 transition-all duration-700">
                  <img src={c.image} className="w-full h-full object-cover" alt={c.title} />
                </div>
                <h3 className="text-xl font-black text-[#1a1a3a] uppercase tracking-tight mb-6 leading-tight">{c.title}</h3>
                <p className="text-slate-500 italic mb-10 text-sm leading-relaxed">{c.shortDescription}</p>
                <Link to={`/cursos/${c.id}`} className="bg-[#1a1a3a] text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#e84c5c] transition-all block text-center">Explorar Unidade</Link>
             </div>
           ))}
        </div>
      </section>
    </div>
  );
};

export default Home;