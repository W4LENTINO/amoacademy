import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Course, BlogPost } from '../types';

interface HomeProps {
  latestCourses: Course[];
  latestPosts: BlogPost[];
}

const Home: React.FC<HomeProps> = ({ latestCourses, latestPosts }) => {
  return (
    <div className="bg-white">
      <Helmet>
        <title>ACADEMIA AMOFARMA | Excelência Farmacêutica em Angola</title>
        <meta name="description" content="Líder em formação farmacêutica de elite. Programas acreditados pela ARMED para profissionais de saúde angolanos." />
      </Helmet>

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
      {/* Rest of the component remains the same */}
    </div>
  );
};

export default Home;