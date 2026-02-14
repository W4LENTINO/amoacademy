import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO.tsx';

interface HomeProps {
  latestCourses: any[];
}

const Home: React.FC<HomeProps> = ({ latestCourses }) => {
  return (
    <div className="bg-white">
      <SEO title="Excelência Farmacêutica" description="Instituição Angolana de Referência para Formação Farmacêutica Avançada." />
      
      {/* Hero Master */}
      <section className="relative bg-[#1a1a3a] text-white py-32 md:py-56 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#e84c5c] rounded-full blur-[200px] opacity-10"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10"
        >
          <div className="max-w-4xl">
            <span className="text-[#e84c5c] text-[10px] font-black uppercase tracking-[0.6em] mb-10 block animate-pulse">Angola • Centro de Excelência</span>
            <h1 className="text-6xl md:text-9xl font-black leading-[0.85] tracking-tighter mb-12 uppercase">
              Ciência <br/>& <span className="text-[#e84c5c]">Prestígio</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-300 mb-20 max-w-2xl font-light italic leading-relaxed opacity-80">
              "Fazendo a Diferença a Cada Dose". Formando a próxima elite farmacêutica através do rigor técnico e integridade ética.
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <Link to="/cursos" className="bg-[#e84c5c] hover:bg-white hover:text-[#1a1a3a] text-white px-16 py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl text-center transform hover:scale-105 active:scale-95">
                Explorar Programas
              </Link>
              <Link to="/simulador" className="border-2 border-white/20 hover:bg-white/10 text-white px-16 py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all text-center">
                Plano de Carreira
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust Bar */}
      <div className="bg-slate-50 py-10 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap justify-between items-center opacity-40 grayscale gap-8">
           <span className="font-black text-2xl tracking-tighter">ARMED</span>
           <span className="font-black text-2xl tracking-tighter">OF-ANGOLA</span>
           <span className="font-black text-2xl tracking-tighter">OMS-PROTOCOL</span>
           <span className="font-black text-2xl tracking-tighter">ISO-9001</span>
        </div>
      </div>

      {/* Featured Courses */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div>
            <h2 className="text-5xl font-black text-[#1a1a3a] uppercase tracking-tighter leading-none">Arquivo <br/> Académico</h2>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] mt-4 text-xs">Especializações de Alto Impacto Sanitário</p>
          </div>
          <Link to="/cursos" className="text-xs font-black uppercase tracking-widest text-[#e84c5c] border-b-2 border-[#e84c5c]/10 pb-2 hover:border-[#e84c5c] transition-all">Ver Oferta Completa &rarr;</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {latestCourses.map(course => (
            <motion.div 
              key={course.id} 
              whileHover={{ y: -10 }}
              className="group bg-white rounded-[3.5rem] p-2 overflow-hidden hover:shadow-premium transition-all duration-700 border border-slate-50"
            >
              <div className="h-72 overflow-hidden rounded-[3rem] relative grayscale group-hover:grayscale-0 transition-all duration-1000">
                <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" alt={course.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a3a]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="px-10 py-12">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#e84c5c] mb-4 block">{course.category}</span>
                <h3 className="text-2xl font-black text-[#1a1a3a] uppercase tracking-tight mb-6 leading-tight group-hover:text-[#e84c5c] transition-colors">{course.title}</h3>
                <p className="text-slate-500 text-sm mb-12 line-clamp-2 italic leading-relaxed font-light">"{course.shortDescription}"</p>
                <Link to={`/cursos/${course.id}`} className="bg-[#1a1a3a] text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#e84c5c] transition-all block text-center shadow-xl">Ver Detalhes do Programa</Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
         <div className="max-w-5xl mx-auto bg-[#1a1a3a] rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-[#e84c5c]"></div>
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-10 leading-none">Pronto para <br/> a Elite?</h2>
            <p className="text-slate-400 text-lg mb-16 max-w-xl mx-auto font-light italic">Junte-se aos profissionais que estão a redefinir a saúde em Angola.</p>
            <Link to="/register" className="inline-block bg-white text-[#1a1a3a] hover:bg-[#e84c5c] hover:text-white px-16 py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl">Solicitar Admissão Agora</Link>
         </div>
      </section>
    </div>
  );
};

export default Home;